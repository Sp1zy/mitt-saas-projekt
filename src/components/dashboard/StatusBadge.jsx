import { REQUEST_STATUS, REQUEST_STATUS_LABEL } from '../../data/requestStatus.js';

const BADGE_CLASS_NAME_BY_STATUS = {
    [REQUEST_STATUS.QUEUED]: 'border-slate-700 bg-slate-800/60 text-slate-300',
    [REQUEST_STATUS.IN_PROGRESS]: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300',
    [REQUEST_STATUS.IN_REVIEW]: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    [REQUEST_STATUS.DONE]: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
};

export function StatusBadge({ status }) {
    return (
        <span className={`inline-block px-2.5 py-1 rounded-full border text-xs font-semibold whitespace-nowrap ${BADGE_CLASS_NAME_BY_STATUS[status]}`}>
            {REQUEST_STATUS_LABEL[status]}
        </span>
    );
}

function FlagIcon() {
    return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M5 3a1 1 0 0 1 1-1h12.3a1 1 0 0 1 .8 1.6L16.5 8l2.6 4.4a1 1 0 0 1-.8 1.6H7v7a1 1 0 1 1-2 0V3z" />
        </svg>
    );
}

// Amber, not red: red reads as an error. Amber says "attention, do this first" without alarm,
// and the flag icon carries the meaning for anyone who cannot rely on color.
export function UrgentBadge() {
    return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-200 text-xs font-semibold whitespace-nowrap">
            <FlagIcon />
            Urgent
        </span>
    );
}
