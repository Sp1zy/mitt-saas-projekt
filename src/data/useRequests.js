import { useCallback, useEffect, useState } from 'react';
import { listRequests, createRequest, updateRequest, deleteRequest } from './requestsRepository.js';

export function useRequests(userId) {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

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

    const addRequest = ({ title, details }) =>
        runMutation(async () => {
            const createdRequest = await createRequest({ userId, title, details });
            setRequests((previousRequests) => [createdRequest, ...previousRequests]);
        });

    const editRequest = (requestId, changes) =>
        runMutation(async () => {
            const updatedRequest = await updateRequest(requestId, changes);
            setRequests((previousRequests) =>
                previousRequests.map((request) => (request.id === requestId ? updatedRequest : request)),
            );
        });

    const removeRequest = (requestId) =>
        runMutation(async () => {
            await deleteRequest(requestId);
            setRequests((previousRequests) => previousRequests.filter((request) => request.id !== requestId));
        });

    return { requests, isLoading, errorMessage, addRequest, editRequest, removeRequest, reloadRequests };
}
