import { LABEL_CLASS_NAME } from '../formStyles.js';

export function FieldLabel({ htmlFor, optionalHint, children }) {
    return (
        <div className="flex items-baseline gap-2 mb-2">
            <label htmlFor={htmlFor} className={LABEL_CLASS_NAME}>{children}</label>
            {optionalHint && <span className="text-xs text-slate-600">{optionalHint}</span>}
        </div>
    );
}
