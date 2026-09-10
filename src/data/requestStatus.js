export const REQUEST_STATUS = {
    QUEUED: 'queued',
    IN_PROGRESS: 'in_progress',
    IN_REVIEW: 'in_review',
    DONE: 'done',
};

export const REQUEST_STATUS_LABEL = {
    [REQUEST_STATUS.QUEUED]: 'Up next',
    [REQUEST_STATUS.IN_PROGRESS]: 'Being built',
    [REQUEST_STATUS.IN_REVIEW]: 'Ready for review',
    [REQUEST_STATUS.DONE]: 'Done',
};

const IN_FLIGHT_STATUSES = [REQUEST_STATUS.IN_PROGRESS, REQUEST_STATUS.IN_REVIEW];

export function isRequestEditable(request) {
    return request.status === REQUEST_STATUS.QUEUED;
}

export function isRequestInFlight(request) {
    return IN_FLIGHT_STATUSES.includes(request.status);
}

export function isRequestDelivered(request) {
    return request.status === REQUEST_STATUS.DONE;
}
