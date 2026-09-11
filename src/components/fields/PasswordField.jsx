import { useState } from 'react';
import { INPUT_CLASS_NAME, INVALID_INPUT_CLASS_NAME } from '../formStyles.js';
import { FieldLabel } from './FieldLabel.jsx';
import { FieldErrorMessage } from './FieldErrorMessage.jsx';

const TOGGLE_BUTTON_CLASS_NAME =
    'absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 hover:text-slate-300 ' +
    'focus:outline-none focus-visible:text-violet-400 transition-colors';

const ICON_CLASS_NAME = 'w-5 h-5';

function EyeIcon() {
    return (
        <svg className={ICON_CLASS_NAME} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function EyeOffIcon() {
    return (
        <svg className={ICON_CLASS_NAME} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    );
}

export function PasswordField({ id, label, errorMessage, ...inputProps }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const errorMessageId = `${id}-error`;
    const baseClassName = errorMessage ? INVALID_INPUT_CLASS_NAME : INPUT_CLASS_NAME;

    const togglePasswordVisibility = () => setIsPasswordVisible((wasVisible) => !wasVisible);

    return (
        <div>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <div className="relative">
                <input
                    id={id}
                    type={isPasswordVisible ? 'text' : 'password'}
                    className={`${baseClassName} pr-12`}
                    aria-invalid={Boolean(errorMessage)}
                    aria-describedby={errorMessage ? errorMessageId : undefined}
                    {...inputProps}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                    aria-pressed={isPasswordVisible}
                    className={TOGGLE_BUTTON_CLASS_NAME}
                >
                    {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            </div>
            <FieldErrorMessage id={errorMessageId} message={errorMessage} />
        </div>
    );
}
