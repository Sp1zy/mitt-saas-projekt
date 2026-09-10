import { REQUEST_STATUS } from '../../data/requestStatus.js';
import { StatTile } from './StatTile.jsx';

function countWithStatus(requests, statuses) {
    return requests.filter((request) => statuses.includes(request.status)).length;
}

export function RequestStats({ requests }) {
    const queuedCount = countWithStatus(requests, [REQUEST_STATUS.QUEUED]);
    const inFlightCount = countWithStatus(requests, [REQUEST_STATUS.IN_PROGRESS, REQUEST_STATUS.IN_REVIEW]);
    const deliveredCount = countWithStatus(requests, [REQUEST_STATUS.DONE]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatTile label="In queue" value={queuedCount} hint="Waiting for a sprint" />
            <StatTile label="In flight" value={inFlightCount} hint="Being built or reviewed" />
            <StatTile label="Delivered" value={deliveredCount} hint="Shipped so far" />
        </div>
    );
}
