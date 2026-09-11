import { REQUEST_STATUS, REQUEST_STATUS_LABEL } from '../../data/requestStatus.js';

const STATUS_STEPS = [REQUEST_STATUS.QUEUED, REQUEST_STATUS.IN_PROGRESS, REQUEST_STATUS.IN_REVIEW, REQUEST_STATUS.DONE];

const DOT_CLASS_NAME = {
    done: 'bg-violet-500',
    current: 'bg-violet-400 ring-4 ring-violet-500/25',
    upcoming: 'bg-slate-700',
};

function stepState(stepIndex, currentIndex) {
    if (stepIndex < currentIndex) return 'done';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
}

export function StatusStepper({ status }) {
    const currentIndex = STATUS_STEPS.indexOf(status);
    return (
        <ol aria-label={`Status: ${REQUEST_STATUS_LABEL[status]}`} className="flex items-center gap-2">
            {STATUS_STEPS.map((step, stepIndex) => {
                const state = stepState(stepIndex, currentIndex);
                const isLast = stepIndex === STATUS_STEPS.length - 1;
                return (
                    <li key={step} className={`flex items-center gap-2 ${isLast ? '' : 'flex-1'}`}>
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${DOT_CLASS_NAME[state]}`} aria-hidden="true" />
                        <span className={`text-xs whitespace-nowrap ${state === 'current' ? 'text-white font-semibold' : 'text-slate-500'}`}>
                            {REQUEST_STATUS_LABEL[step]}
                        </span>
                        {!isLast && <span className={`h-px flex-1 min-w-3 ${state === 'done' ? 'bg-violet-500/60' : 'bg-slate-800'}`} aria-hidden="true" />}
                    </li>
                );
            })}
        </ol>
    );
}
