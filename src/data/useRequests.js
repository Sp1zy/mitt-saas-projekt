import { useCallback, useEffect, useRef, useState } from 'react';
import { listRequests, createRequest, updateRequest, deleteRequest } from './requestsRepository.js';
import { isRequestEditable } from './requestStatus.js';
import { nextQueuePosition, planMoveToIndex } from './queueOrdering.js';

export function useRequests(userId) {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const latestRequestsRef = useRef(requests);

    useEffect(() => {
        latestRequestsRef.current = requests;
    }, [requests]);

    const reloadRequests = useCallback(async () => {
        setIsLoading(true);
        setErrorMessage(null);
        try {
            setRequests(await listRequests());
        } catch (loadError) {
            setErrorMessage(loadError.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        reloadRequests();
    }, [reloadRequests]);

    const runMutation = async (mutate) => {
        setErrorMessage(null);
        try {
            await mutate();
            return true;
        } catch (mutationError) {
            setErrorMessage(mutationError.message);
            return false;
        }
    };

    const mergeUpdatedRequests = (updatedRequests) => {
        setRequests((previousRequests) =>
            previousRequests.map((request) => updatedRequests.find((updated) => updated.id === request.id) ?? request),
        );
        latestRequestsRef.current = latestRequestsRef.current.map(
            (request) => updatedRequests.find((updated) => updated.id === request.id) ?? request,
        );
    };

    const persistPositions = async (positionUpdates) => {
        if (positionUpdates.length === 0) return;
        const updatedRequests = await Promise.all(
            positionUpdates.map(({ id, position }) => updateRequest(id, { position })),
        );
        mergeUpdatedRequests(updatedRequests);
    };

    const queuedRequests = () => latestRequestsRef.current.filter(isRequestEditable);

    const addRequest = ({ title, details }) =>
        runMutation(async () => {
            const position = nextQueuePosition(queuedRequests());
            const createdRequest = await createRequest({ userId, title, details, position });
            setRequests((previousRequests) => [...previousRequests, createdRequest]);
        });

    const editRequest = (requestId, changes) =>
        runMutation(async () => {
            mergeUpdatedRequests([await updateRequest(requestId, changes)]);
        });

    const removeRequest = (requestId) =>
        runMutation(async () => {
            await deleteRequest(requestId);
            setRequests((previousRequests) => previousRequests.filter((request) => request.id !== requestId));
        });

    const setUrgent = (requestId, isUrgent) =>
        runMutation(async () => {
            mergeUpdatedRequests([await updateRequest(requestId, { isUrgent })]);
            if (isUrgent) await persistPositions(planMoveToIndex(queuedRequests(), requestId, 0));
        });

    const reorderRequest = (requestId, targetIndex) =>
        runMutation(async () => {
            await persistPositions(planMoveToIndex(queuedRequests(), requestId, targetIndex));
        });

    return {
        requests,
        isLoading,
        errorMessage,
        addRequest,
        editRequest,
        removeRequest,
        reorderRequest,
        setUrgent,
        reloadRequests,
    };
}
