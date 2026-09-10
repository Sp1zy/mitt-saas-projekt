export function ActivityFeed({ activityEntries }) {
    return (
        <ul className="flex flex-col gap-4">
            {activityEntries.map((entry) => (
                <li key={entry.id} className="flex gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-violet-500 shrink-0" />
                    <div>
                        <p className="text-sm text-slate-200">{entry.message}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{entry.occurredOn}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}
