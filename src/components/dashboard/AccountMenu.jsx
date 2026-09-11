import { getDisplayName, getCompanyName } from '../../auth/userMetadata.js';

const MAX_INITIALS = 2;

function toInitials(displayName) {
    return displayName
        .split(/[\s@]+/)
        .filter(Boolean)
        .slice(0, MAX_INITIALS)
        .map((word) => word[0])
        .join('')
        .toUpperCase();
}

export function AccountMenu({ user, onSignOut }) {
    const displayName = getDisplayName(user);
    const companyName = getCompanyName(user);

    return (
        <details className="relative">
            <summary className="list-none cursor-pointer flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-slate-900 transition-colors [&::-webkit-details-marker]:hidden">
                <span className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-white">
                    {toInitials(displayName)}
                </span>
                <span className="hidden sm:block text-left leading-tight">
                    <span className="block text-sm font-semibold text-white">{displayName}</span>
                    {companyName && <span className="block text-xs text-slate-500">{companyName}</span>}
                </span>
            </summary>
            <div className="absolute right-0 mt-2 w-60 rounded-xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/50 p-2">
                <p className="px-3 py-2 text-xs text-slate-500 truncate">{user.email}</p>
                <button
                    type="button"
                    onClick={onSignOut}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
                >
                    Log out
                </button>
            </div>
        </details>
    );
}
