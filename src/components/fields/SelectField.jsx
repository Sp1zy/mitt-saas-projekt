import { INPUT_CLASS_NAME, INVALID_INPUT_CLASS_NAME } from '../formStyles.js';
import { FieldLabel } from './FieldLabel.jsx';
import { FieldErrorMessage } from './FieldErrorMessage.jsx';

function ChevronDownIcon() {
    return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
        </svg>
    );
}

export function SelectField({ id, label, optionalHint, errorMessage, options, placeholder, value, ...selectProps }) {
    const errorMessageId = `${id}-error`;
    const baseClassName = errorMessage ? INVALID_INPUT_CLASS_NAME : INPUT_CLASS_NAME;
    const placeholderColorClassName = value ? '' : 'text-slate-600';
    return (
        <div>
            <FieldLabel htmlFor={id} optionalHint={optionalHint}>{label}</FieldLabel>
            <div className="relative">
                <select
                    id={id}
                    value={value}
                    className={`${baseClassName} appearance-none pr-10 ${placeholderColorClassName}`}
                    aria-invalid={Boolean(errorMessage)}
                    aria-describedby={errorMessage ? errorMessageId : undefined}
                    {...selectProps}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value} className="text-slate-100">
                            {option.label}
                        </option>
                    ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
                    <ChevronDownIcon />
                </span>
            </div>
            <FieldErrorMessage id={errorMessageId} message={errorMessage} />
        </div>
    );
}
