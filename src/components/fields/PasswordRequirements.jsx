import { PASSWORD_REQUIREMENTS } from '../../auth/validation.js';

export function PasswordRequirements({ password }) {
    return (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1" aria-label="Password requirements">
            {PASSWORD_REQUIREMENTS.map((requirement) => {
                const isMet = requirement.isMetBy(password);
                return (
                    <li
                        key={requirement.id}
                        className={`flex items-center gap-1.5 text-xs transition-colors ${isMet ? 'text-emerald-400' : 'text-slate-500'}`}
                    >
                        <span aria-hidden="true">{isMet ? '✓' : '○'}</span>
                        {requirement.label}
                        <span className="sr-only">{isMet ? ', met' : ', not met'}</span>
                    </li>
                );
            })}
        </ul>
    );
}
