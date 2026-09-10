import { REQUEST_STATUS, REQUEST_STATUS_LABEL } from '../../data/requestStatus.js';

const BADGE_CLASS_NAME_BY_STATUS = {
    [REQUEST_STATUS.QUEUED]: 'border-slate-700 bg-slate-800/60 text-slate-300',
    [REQUEST_STATUS.IN_PROGRESS]: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300',
    [REQUEST_STATUS.IN_REVIEW]: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    [REQUEST_STATUS.DONE]: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
};

export function StatusBadge({ status }) {
    return (
        <span className={`inline-block px-3 py-1.5 rounded-full border text-xs font-semibold ${BADGE_CLASS_NAME_BY_STATUS[status]}`}>
            {REQUEST_STATUS_LABEL[status]}
        </span>
    );
}
