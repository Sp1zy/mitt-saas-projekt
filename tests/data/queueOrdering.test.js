import { sortByPosition, nextQueuePosition, planMoveToIndex } from '../../src/data/queueOrdering.js';
import { makeRequest } from '../helpers/requests.js';

describe('sortByPosition', () => {
    it('orders by position, then creation time for ties', () => {
        const older = makeRequest({ id: 'older', position: 0, createdAt: '2026-09-01T10:00:00.000Z' });
        const newer = makeRequest({ id: 'newer', position: 0, createdAt: '2026-09-02T10:00:00.000Z' });
        const later = makeRequest({ id: 'later', position: 5 });
        expect(sortByPosition([later, newer, older]).map((request) => request.id)).toEqual(['older', 'newer', 'later']);
    });
});

describe('nextQueuePosition', () => {
    it('starts at zero and appends after the highest position', () => {
        expect(nextQueuePosition([])).toBe(0);
        expect(nextQueuePosition([makeRequest({ position: 2 }), makeRequest({ position: 7 })])).toBe(8);
    });
});

describe('planMoveToIndex', () => {
    const first = makeRequest({ id: 'first', position: 0 });
    const second = makeRequest({ id: 'second', position: 1 });
    const third = makeRequest({ id: 'third', position: 2 });

    it('moves the request to the top and shifts the rest', () => {
        expect(planMoveToIndex([first, second, third], 'third', 0)).toEqual([
            { id: 'third', position: 0 },
            { id: 'first', position: 1 },
            { id: 'second', position: 2 },
        ]);
    });

    it('normalizes duplicate positions from before ordering existed', () => {
        const legacyRequests = [
            makeRequest({ id: 'a', position: 0, createdAt: '2026-09-01T10:00:00.000Z' }),
            makeRequest({ id: 'b', position: 0, createdAt: '2026-09-02T10:00:00.000Z' }),
            makeRequest({ id: 'c', position: 0, createdAt: '2026-09-03T10:00:00.000Z' }),
        ];
        expect(planMoveToIndex(legacyRequests, 'c', 0)).toEqual([
            { id: 'a', position: 1 },
            { id: 'b', position: 2 },
        ]);
    });

    it('drops the request at a middle slot, clamps out-of-range slots, and ignores unknown ids', () => {
        expect(planMoveToIndex([first, second, third], 'first', 1)).toEqual([
            { id: 'second', position: 0 },
            { id: 'first', position: 1 },
        ]);
        expect(planMoveToIndex([first, second, third], 'first', 99)).toEqual([
            { id: 'second', position: 0 },
            { id: 'third', position: 1 },
            { id: 'first', position: 2 },
        ]);
        expect(planMoveToIndex([first, second, third], 'missing', 0)).toEqual([]);
    });
});
