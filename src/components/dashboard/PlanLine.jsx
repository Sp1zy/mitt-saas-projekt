import { formatDate } from '../../data/formatDate.js';
import { SECONDARY_BUTTON_CLASS_NAME } from '../formStyles.js';

const USD_FORMATTER = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export function PlanLine({ subscription, portalUrl, onTogglePause }) {
    const statusSentence = subscription.isPaused
        ? 'Your plan is paused. Nothing new gets built until you resume.'
        : `Next payment ${formatDate(subscription.renewsOn)}.`;
    return (
        <section aria-label="Plan" className="rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-4 lg:min-w-96">
            <p className="text-sm text-slate-400">
                <span className="font-semibold text-white">{subscription.planName}</span>
                {' plan, '}
                {USD_FORMATTER.format(subscription.priceInUsd)} per month.
            </p>
            <p className="text-sm text-slate-400 mt-1">{statusSentence}</p>
            <div className="flex flex-wrap gap-2 mt-3">
                <a href={portalUrl} target="_blank" rel="noreferrer" className={`${SECONDARY_BUTTON_CLASS_NAME} text-sm py-2`}>
                    Manage billing
                </a>
                <button type="button" onClick={onTogglePause} className={`${SECONDARY_BUTTON_CLASS_NAME} text-sm py-2`}>
                    {subscription.isPaused ? 'Resume plan' : 'Pause plan'}
                </button>
            </div>
        </section>
    );
}
