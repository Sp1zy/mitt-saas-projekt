export const REQUEST_STATUS = {
    QUEUED: 'queued',
    IN_PROGRESS: 'in_progress',
    IN_REVIEW: 'in_review',
    DONE: 'done',
};

export const REQUEST_STATUS_LABEL = {
    [REQUEST_STATUS.QUEUED]: 'Queued',
    [REQUEST_STATUS.IN_PROGRESS]: 'In Progress',
    [REQUEST_STATUS.IN_REVIEW]: 'In Review',
    [REQUEST_STATUS.DONE]: 'Done',
};

export function isRequestEditable(request) {
    return request.status === REQUEST_STATUS.QUEUED;
}
