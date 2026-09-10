import { SECONDARY_BUTTON_CLASS_NAME } from '../formStyles.js';

const USD_FORMATTER = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function PlanStatusPill({ isPaused }) {
    const pillClassName = isPaused
        ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
        : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
    const dotClassName = isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse';

    return (
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${pillClassName}`}>
            <span className={`w-2 h-2 rounded-full ${dotClassName}`}></span>
            {isPaused ? 'Paused' : 'Active'}
        </span>
    );
}

export function PlanSummaryCard({ subscription, portalUrl, onTogglePause }) {
    const pauseButtonLabel = subscription.isPaused ? 'Resume Subscription' : 'Pause Subscription';

    return (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-900 border border-violet-500/30 shadow-xl shadow-indigo-950/40">
            <div className="flex justify-between items-start gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">Current Plan</p>
                    <h2 className="text-2xl font-black tracking-tight text-white mt-2">{subscription.planName}</h2>
                    <p className="text-sm text-slate-400 mt-1">
                        <span className="text-white font-semibold">{USD_FORMATTER.format(subscription.priceInUsd)}</span> / month
                    </p>
                </div>
                <PlanStatusPill isPaused={subscription.isPaused} />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800 text-sm">
                <div>
                    <p className="text-slate-500">Days left in cycle</p>
                    <p className="text-white font-bold text-xl mt-1">{subscription.daysRemainingInCycle}</p>
                </div>
                <div>
                    <p className="text-slate-500">Renews on</p>
                    <p className="text-white font-bold text-xl mt-1">{subscription.renewsOn}</p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6">
                <button onClick={onTogglePause} className={SECONDARY_BUTTON_CLASS_NAME}>
                    {pauseButtonLabel}
                </button>
                <a
                    href={portalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                >
                    Manage billing →
                </a>
            </div>
        </div>
    );
}
