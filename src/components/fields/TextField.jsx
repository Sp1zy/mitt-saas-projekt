import { INPUT_CLASS_NAME, INVALID_INPUT_CLASS_NAME } from '../formStyles.js';
import { FieldLabel } from './FieldLabel.jsx';
import { FieldErrorMessage } from './FieldErrorMessage.jsx';

export function TextField({ id, label, optionalHint, errorMessage, ...inputProps }) {
    const errorMessageId = `${id}-error`;
    return (
        <div>
            <FieldLabel htmlFor={id} optionalHint={optionalHint}>{label}</FieldLabel>
            <input
                id={id}
                className={errorMessage ? INVALID_INPUT_CLASS_NAME : INPUT_CLASS_NAME}
                aria-invalid={Boolean(errorMessage)}
                aria-describedby={errorMessage ? errorMessageId : undefined}
                {...inputProps}
            />
            <FieldErrorMessage id={errorMessageId} message={errorMessage} />
        </div>
    );
}
