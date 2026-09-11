import { renderHook, act, waitFor } from '@testing-library/react';
import { useRequests } from '../../src/data/useRequests.js';
import { listRequests, createRequest, updateRequest, deleteRequest } from '../../src/data/requestsRepository.js';
import { makeRequest, installStatefulUpdateMock } from '../helpers/requests.js';

vi.mock('../../src/data/requestsRepository.js', () => ({
    listRequests: vi.fn(),
    createRequest: vi.fn(),
    updateRequest: vi.fn(),
    deleteRequest: vi.fn(),
}));

const USER_ID = 'user-1';

async function renderLoadedHook(initialRequests) {
    listRequests.mockResolvedValue(initialRequests);
    const rendered = renderHook(() => useRequests(USER_ID));
    await waitFor(() => expect(rendered.result.current.isLoading).toBe(false));
    return rendered;
}

beforeEach(() => {
    vi.clearAllMocks();
});

describe('useRequests loading', () => {
    it('loads requests on mount', async () => {
        const existing = makeRequest();
        const { result } = await renderLoadedHook([existing]);
        expect(result.current.requests).toEqual([existing]);
        expect(result.current.errorMessage).toBeNull();
    });

    it('surfaces a load failure', async () => {
        listRequests.mockRejectedValue(new Error('relation "public.requests" does not exist'));
        const { result } = renderHook(() => useRequests(USER_ID));
        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.errorMessage).toBe('relation "public.requests" does not exist');
        expect(result.current.requests).toEqual([]);
    });
});

describe('useRequests mutations', () => {
    it('appends a created request at the next queue position', async () => {
        const existing = makeRequest({ position: 4 });
        const created = makeRequest({ title: 'New one', position: 5 });
        createRequest.mockResolvedValue(created);
        const { result } = await renderLoadedHook([existing]);

        let isSaved;
        await act(async () => {
            isSaved = await result.current.addRequest({ title: 'New one', details: 'Details' });
        });

        expect(isSaved).toBe(true);
        expect(createRequest).toHaveBeenCalledWith({ userId: USER_ID, title: 'New one', details: 'Details', position: 5 });
        expect(result.current.requests).toEqual([existing, created]);
    });

    it('replaces an edited request in place', async () => {
        const first = makeRequest();
        const second = makeRequest();
        const edited = { ...second, title: 'Renamed' };
        updateRequest.mockResolvedValue(edited);
        const { result } = await renderLoadedHook([first, second]);

        await act(async () => {
            await result.current.editRequest(second.id, { title: 'Renamed', details: '' });
        });

        expect(updateRequest).toHaveBeenCalledWith(second.id, { title: 'Renamed', details: '' });
        expect(result.current.requests).toEqual([first, edited]);
    });

    it('drops a removed request', async () => {
        const first = makeRequest();
        const second = makeRequest();
        deleteRequest.mockResolvedValue(undefined);
        const { result } = await renderLoadedHook([first, second]);

        await act(async () => {
            await result.current.removeRequest(first.id);
        });

        expect(deleteRequest).toHaveBeenCalledWith(first.id);
        expect(result.current.requests).toEqual([second]);
    });

    it('marks a request urgent and moves it to the top of the queue', async () => {
        const first = makeRequest({ position: 0 });
        const second = makeRequest({ position: 1 });
        installStatefulUpdateMock(updateRequest, [first, second]);
        const { result } = await renderLoadedHook([first, second]);

        await act(async () => {
            await result.current.setUrgent(second.id, true);
        });

        expect(updateRequest).toHaveBeenCalledWith(second.id, { isUrgent: true });
        expect(updateRequest).toHaveBeenCalledWith(second.id, { position: 0 });
        expect(updateRequest).toHaveBeenCalledWith(first.id, { position: 1 });
        const secondAfter = result.current.requests.find((request) => request.id === second.id);
        expect(secondAfter).toMatchObject({ isUrgent: true, position: 0 });
    });

    it('reorders a request to a dropped slot', async () => {
        const first = makeRequest({ position: 0 });
        const second = makeRequest({ position: 1 });
        const third = makeRequest({ position: 2 });
        installStatefulUpdateMock(updateRequest, [first, second, third]);
        const { result } = await renderLoadedHook([first, second, third]);

        await act(async () => {
            await result.current.reorderRequest(third.id, 0);
        });

        expect(updateRequest).toHaveBeenCalledTimes(3);
        expect(result.current.requests.map((request) => [request.id, request.position])).toEqual([
            [first.id, 1],
            [second.id, 2],
            [third.id, 0],
        ]);
    });

    it('clearing urgent leaves the order alone', async () => {
        const first = makeRequest({ position: 0, isUrgent: true });
        updateRequest.mockResolvedValue({ ...first, isUrgent: false });
        const { result } = await renderLoadedHook([first]);

        await act(async () => {
            await result.current.setUrgent(first.id, false);
        });

        expect(updateRequest).toHaveBeenCalledTimes(1);
        expect(result.current.requests[0].isUrgent).toBe(false);
    });

    it('keeps state and reports the error when a mutation fails', async () => {
        const existing = makeRequest();
        createRequest.mockRejectedValue(new Error('new row violates row-level security policy'));
        const { result } = await renderLoadedHook([existing]);

        let isSaved;
        await act(async () => {
            isSaved = await result.current.addRequest({ title: 'Blocked', details: '' });
        });

        expect(isSaved).toBe(false);
        expect(result.current.errorMessage).toBe('new row violates row-level security policy');
        expect(result.current.requests).toEqual([existing]);
    });
});
