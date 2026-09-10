import { REQUEST_STATUS, REQUEST_STATUS_LABEL, isRequestEditable } from '../../data/requestStatus.js';
import { sortByPosition } from '../../data/queueOrdering.js';
import { RequestCard } from './RequestCard.jsx';
import { useDragReorder } from './useDragReorder.js';

const LANE_ACCENT_CLASS_NAME = {
    upNext: 'text-violet-300',
    inProgress: 'text-indigo-300',
    inReview: 'text-amber-300',
    delivered: 'text-emerald-300',
};

function Lane({ laneId, title, hint, count, accent, children }) {
    const headingId = `lane-${laneId}-heading`;
    return (
        <section
            aria-labelledby={headingId}
            className="flex flex-col gap-3 shrink-0 w-[82vw] sm:w-80 lg:w-auto snap-start rounded-2xl border border-slate-800 bg-slate-900/40 p-3"
        >
            <header className="px-1 pt-1">
                <h2 id={headingId} className="flex items-baseline gap-2">
                    <span className={`text-xs font-semibold uppercase tracking-widest whitespace-nowrap ${LANE_ACCENT_CLASS_NAME[accent]}`}>{title}</span>
                    <span className="text-xs font-mono tabular-nums text-slate-500">{count}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">{hint}</p>
            </header>
            {children}
        </section>
    );
}

function EmptyLane({ children }) {
    return <p className="text-sm text-slate-500 px-4 py-8 text-center rounded-xl border border-dashed border-slate-800">{children}</p>;
}

function DropLine({ isVisible }) {
    return <div aria-hidden="true" className={`h-0.5 -my-1.5 rounded-full transition-colors ${isVisible ? 'bg-violet-400' : 'bg-transparent'}`} />;
}

function StatusLane({ laneId, title, hint, accent, requests, emptyMessage, onOpenRequest }) {
    return (
        <Lane laneId={laneId} title={title} hint={hint} count={requests.length} accent={accent}>
            {requests.length === 0 ? (
                <EmptyLane>{emptyMessage}</EmptyLane>
            ) : (
                <ul className="flex flex-col gap-3">
                    {requests.map((request) => (
                        <RequestCard key={request.id} request={request} queueIndex={null} onOpen={onOpenRequest} />
                    ))}
                </ul>
            )}
        </Lane>
    );
}

function UpNextLane({ requests, isFirstRequest, onReorder, onOpenNewRequest, onOpenRequest }) {
    const queueIds = requests.map((request) => request.id);
    const { draggedId, dropSlot, dragPropsFor } = useDragReorder(queueIds, onReorder);

    return (
        <Lane laneId="up-next" title={REQUEST_STATUS_LABEL[REQUEST_STATUS.QUEUED]} hint="Top card is built first" count={requests.length} accent="upNext">
            {requests.length > 0 && (
                <ul className="flex flex-col gap-3">
                    {requests.map((request, queueIndex) => (
                        <li key={request.id} className={`flex flex-col ${request.id === draggedId ? 'opacity-40' : ''}`}>
                            <DropLine isVisible={dropSlot === queueIndex && draggedId !== null} />
                            <ul>
                                <RequestCard
                                    request={request}
                                    queueIndex={queueIndex}
                                    dragProps={dragPropsFor(request.id, queueIndex)}
                                    onOpen={onOpenRequest}
                                />
                            </ul>
                            {queueIndex === requests.length - 1 && <DropLine isVisible={dropSlot === requests.length && draggedId !== null} />}
                        </li>
                    ))}
                </ul>
            )}
            {requests.length === 0 && !isFirstRequest && <EmptyLane>Nothing waiting. Add a request and we start on it next.</EmptyLane>}
            <button
                type="button"
                onClick={onOpenNewRequest}
                className="w-full py-3 rounded-xl border border-dashed border-violet-500/40 text-sm font-semibold text-violet-300 hover:bg-violet-500/10 hover:border-violet-400 transition-colors"
            >
                {isFirstRequest ? '+ Add your first request' : '+ Add a request'}
            </button>
        </Lane>
    );
}

function withStatus(requests, status) {
    return requests.filter((request) => request.status === status);
}

export function Board({ requests, onOpenRequest, onReorder, onOpenNewRequest }) {
    const upNextRequests = sortByPosition(requests.filter(isRequestEditable));
    const deliveredRequests = withStatus(requests, REQUEST_STATUS.DONE).sort((first, second) =>
        second.updatedAt.localeCompare(first.updatedAt),
    );

    return (
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 lg:grid lg:grid-cols-4 lg:overflow-visible lg:snap-none lg:mx-0 lg:px-0 items-start">
            <UpNextLane
                requests={upNextRequests}
                isFirstRequest={requests.length === 0}
                onReorder={onReorder}
                onOpenNewRequest={onOpenNewRequest}
                onOpenRequest={onOpenRequest}
            />
            <StatusLane
                laneId="in-progress"
                title={REQUEST_STATUS_LABEL[REQUEST_STATUS.IN_PROGRESS]}
                hint="We are working on these"
                accent="inProgress"
                requests={withStatus(requests, REQUEST_STATUS.IN_PROGRESS)}
                emptyMessage="Nothing being built yet. We start with the top card in Up next."
                onOpenRequest={onOpenRequest}
            />
            <StatusLane
                laneId="in-review"
                title={REQUEST_STATUS_LABEL[REQUEST_STATUS.IN_REVIEW]}
                hint="Finished, waiting for your OK"
                accent="inReview"
                requests={withStatus(requests, REQUEST_STATUS.IN_REVIEW)}
                emptyMessage="When something is ready for you to check, it shows up here."
                onOpenRequest={onOpenRequest}
            />
            <StatusLane
                laneId="delivered"
                title={REQUEST_STATUS_LABEL[REQUEST_STATUS.DONE]}
                hint="Approved and live"
                accent="delivered"
                requests={deliveredRequests}
                emptyMessage="Finished work ends up here."
                onOpenRequest={onOpenRequest}
            />
        </div>
    );
}
