let nextRequestNumber = 1;

// Makes a mocked updateRequest behave like the real one: each call returns the
// full row with every earlier change applied, not just the fields passed in.
export function installStatefulUpdateMock(updateRequestMock, requests) {
    const rowsById = Object.fromEntries(requests.map((request) => [request.id, { ...request }]));
    updateRequestMock.mockImplementation(async (requestId, changes) => {
        rowsById[requestId] = { ...rowsById[requestId], ...changes };
        return rowsById[requestId];
    });
}

export function makeRequest(overrides = {}) {
    const requestNumber = nextRequestNumber;
    nextRequestNumber += 1;
    const day = String((requestNumber % 28) + 1).padStart(2, '0');
    const timestamp = `2026-09-${day}T10:00:00.000Z`;
    return {
        id: `request-${requestNumber}`,
        title: `Request ${requestNumber}`,
        details: '',
        status: 'queued',
        isUrgent: false,
        position: requestNumber,
        assignedEngineer: null,
        sprintEndsOn: null,
        createdAt: timestamp,
        updatedAt: timestamp,
        ...overrides,
    };
}
