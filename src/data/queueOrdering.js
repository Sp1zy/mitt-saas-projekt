export function sortByPosition(requests) {
    return [...requests].sort(
        (first, second) => first.position - second.position || first.createdAt.localeCompare(second.createdAt),
    );
}

export function nextQueuePosition(queuedRequests) {
    if (queuedRequests.length === 0) return 0;
    return Math.max(...queuedRequests.map((request) => request.position)) + 1;
}

function toPositionUpdates(orderedRequests) {
    return orderedRequests
        .map((request, index) => ({ id: request.id, position: index }))
        .filter((update, index) => orderedRequests[index].position !== update.position);
}

export function planMoveToIndex(queuedRequests, requestId, targetIndex) {
    const queue = sortByPosition(queuedRequests);
    const target = queue.find((request) => request.id === requestId);
    if (!target) return [];
    const withoutTarget = queue.filter((request) => request.id !== requestId);
    const clampedIndex = Math.max(0, Math.min(targetIndex, withoutTarget.length));
    const reordered = [...withoutTarget.slice(0, clampedIndex), target, ...withoutTarget.slice(clampedIndex)];
    return toPositionUpdates(reordered);
}
