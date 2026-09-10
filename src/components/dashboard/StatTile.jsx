export function StatTile({ label, value, hint }) {
    return (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">{label}</p>
            <p className="text-4xl font-black tracking-tight text-white mt-3">{value}</p>
            {hint && <p className="text-sm text-slate-500 mt-1">{hint}</p>}
        </div>
    );
}
