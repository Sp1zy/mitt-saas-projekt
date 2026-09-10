import { REQUEST_STATUS } from './requestStatus.js';
import { formatDate } from './formatDate.js';

const MAX_ACTIVITY_ENTRIES = 5;

const ACTIVITY_MESSAGE_BY_STATUS = {
    [REQUEST_STATUS.QUEUED]: (request) => `"${request.title}" added to the queue.`,
    [REQUEST_STATUS.IN_PROGRESS]: (request) => `${request.assignedEngineer ?? 'An engineer'} started work on "${request.title}".`,
    [REQUEST_STATUS.IN_REVIEW]: (request) => `"${request.title}" moved to review.`,
    [REQUEST_STATUS.DONE]: (request) => `"${request.title}" delivered.`,
};

function toActivityEntry(request) {
    return {
        id: request.id,
        occurredOn: formatDate(request.updatedAt),
        message: ACTIVITY_MESSAGE_BY_STATUS[request.status](request),
    };
}

export function toActivityEntries(requests) {
    const newestFirst = [...requests].sort((first, second) => second.updatedAt.localeCompare(first.updatedAt));
    return newestFirst.slice(0, MAX_ACTIVITY_ENTRIES).map(toActivityEntry);
}
