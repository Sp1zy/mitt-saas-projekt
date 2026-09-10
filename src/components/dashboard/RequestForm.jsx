import { useState } from 'react';
import { validateRequiredText, hasAnyError } from '../../auth/validation.js';
import { TextField } from '../fields/TextField.jsx';
import { TextAreaField } from '../fields/TextAreaField.jsx';
import { SubmitButton } from '../SubmitButton.jsx';
import { PRIMARY_BUTTON_CLASS_NAME, SECONDARY_BUTTON_CLASS_NAME } from '../formStyles.js';

const EMPTY_REQUEST_VALUES = { title: '', details: '' };

export function RequestForm({ idPrefix, initialValues = EMPTY_REQUEST_VALUES, submitLabel, onSubmit, onCancel }) {
    const [values, setValues] = useState(initialValues);
    const [fieldErrors, setFieldErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = (fieldName) => (changeEvent) => {
        const nextValue = changeEvent.target.value;
        setValues((previousValues) => ({ ...previousValues, [fieldName]: nextValue }));
        setFieldErrors((previousErrors) => ({ ...previousErrors, [fieldName]: null }));
    };

    const handleSubmit = async (submitEvent) => {
        submitEvent.preventDefault();
        const nextErrors = { title: validateRequiredText(values.title, 'Request title') };
        setFieldErrors(nextErrors);
        if (hasAnyError(nextErrors)) return;
        setIsSubmitting(true);
        const isSaved = await onSubmit({ title: values.title.trim(), details: values.details.trim() });
        setIsSubmitting(false);
        if (isSaved) setValues(EMPTY_REQUEST_VALUES);
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <TextField
                id={`${idPrefix}-title`}
                label="Request"
                type="text"
                placeholder="What do you need built?"
                value={values.title}
                onChange={updateField('title')}
                errorMessage={fieldErrors.title}
                required
            />
            <TextAreaField
                id={`${idPrefix}-details`}
                label="Details"
                optionalHint="Optional"
                rows={3}
                placeholder="Links, acceptance criteria, anything the engineer needs"
                value={values.details}
                onChange={updateField('details')}
            />
            <div className="flex flex-wrap gap-3">
                <SubmitButton isSubmitting={isSubmitting} busyLabel="Saving..." className={PRIMARY_BUTTON_CLASS_NAME}>
                    {submitLabel}
                </SubmitButton>
                {onCancel && (
                    <button type="button" onClick={onCancel} className={`${SECONDARY_BUTTON_CLASS_NAME} py-3`}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
