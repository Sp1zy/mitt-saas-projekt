import { isRequestEditable, isRequestDelivered } from '../../data/requestStatus.js';
import { formatDate } from '../../data/formatDate.js';
import { UrgentBadge } from './StatusBadge.jsx';
import { StatusStepper } from './StatusStepper.jsx';

function CheckIcon() {
    return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12l5 5L20 7" />
        </svg>
    );
}

function DeliveredCard({ request, onOpen }) {
    return (
        <li>
            <button
                type="button"
                onClick={() => onOpen(request.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-800/80 bg-slate-900/60 hover:border-slate-700 text-left transition-colors"
            >
                <span className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-300 flex items-center justify-center shrink-0">
                    <CheckIcon />
                </span>
                <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-slate-200 truncate">{request.title}</span>
                    <span className="block text-xs text-slate-500">Done {formatDate(request.updatedAt)}</span>
                </span>
            </button>
        </li>
    );
}

function inFlightMeta(request) {
    const engineerLabel = request.assignedEngineer ? `Built by ${request.assignedEngineer}` : 'Engineer assigned soon';
    const dueLabel = request.sprintEndsOn ? ` · due ${formatDate(request.sprintEndsOn)}` : '';
    return `${engineerLabel}${dueLabel}`;
}

export function RequestCard({ request, queueIndex, onOpen, dragProps = {} }) {
    if (isRequestDelivered(request)) {
        return <DeliveredCard request={request} onOpen={onOpen} />;
    }

    const isQueued = isRequestEditable(request);
    const metaLabel = isQueued ? `Added ${formatDate(request.createdAt)}` : inFlightMeta(request);
    const borderClassName = request.isUrgent ? 'border-amber-400/40 hover:border-amber-400/70' : 'border-slate-800 hover:border-slate-700';

    return (
        <li {...dragProps} title={isQueued ? 'Drag to change the order' : undefined}>
            <article className={`rounded-xl border bg-slate-900 transition-colors ${borderClassName} ${isQueued ? 'cursor-grab active:cursor-grabbing' : ''}`}>
                <button type="button" onClick={() => onOpen(request.id)} className="w-full text-left p-4 group">
                    <span className="flex items-start gap-3">
                        {isQueued && queueIndex !== null && (
                            <span className="font-mono text-sm text-slate-500 tabular-nums pt-0.5 shrink-0">{queueIndex + 1}</span>
                        )}
                        <span className="min-w-0 flex-1">
                            <span className="block font-semibold text-white group-hover:text-violet-200 line-clamp-2 transition-colors">{request.title}</span>
                            {request.details && <span className="block text-sm text-slate-400 mt-1 line-clamp-1">{request.details}</span>}
                            <span className="flex items-center gap-2 mt-2">
                                {request.isUrgent && <UrgentBadge />}
                                <span className="text-xs text-slate-500">{metaLabel}</span>
                            </span>
                        </span>
                    </span>
                    {!isQueued && (
                        <span className="block mt-4 pt-3 border-t border-slate-800">
                            <StatusStepper status={request.status} />
                        </span>
                    )}
                </button>
            </article>
        </li>
    );
}
