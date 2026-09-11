import { INPUT_CLASS_NAME, INVALID_INPUT_CLASS_NAME } from '../formStyles.js';
import { FieldLabel } from './FieldLabel.jsx';
import { FieldErrorMessage } from './FieldErrorMessage.jsx';

export function TextAreaField({ id, label, optionalHint, errorMessage, ...textAreaProps }) {
    const errorMessageId = `${id}-error`;
    return (
        <div>
            <FieldLabel htmlFor={id} optionalHint={optionalHint}>{label}</FieldLabel>
            <textarea
                id={id}
                className={`${errorMessage ? INVALID_INPUT_CLASS_NAME : INPUT_CLASS_NAME} resize-none`}
                aria-invalid={Boolean(errorMessage)}
                aria-describedby={errorMessage ? errorMessageId : undefined}
                {...textAreaProps}
            />
            <FieldErrorMessage id={errorMessageId} message={errorMessage} />
        </div>
    );
}
