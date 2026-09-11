import { useState } from 'react';
import { validateEmail, validateRequiredText, hasAnyError } from '../auth/validation.js';
import { TextField } from './fields/TextField.jsx';
import { PasswordField } from './fields/PasswordField.jsx';
import { FormErrorBanner } from './FormErrorBanner.jsx';
import { SubmitButton } from './SubmitButton.jsx';
import { PRIMARY_BUTTON_CLASS_NAME } from './formStyles.js';

function validateLoginFields(email, password) {
    return {
        email: validateEmail(email),
        password: validateRequiredText(password, 'Password'),
    };
}

export function LoginForm({ onLogin, errorMessage }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEmailChange = (changeEvent) => {
        setEmail(changeEvent.target.value);
        setFieldErrors((previousErrors) => ({ ...previousErrors, email: null }));
    };

    const handlePasswordChange = (changeEvent) => {
        setPassword(changeEvent.target.value);
        setFieldErrors((previousErrors) => ({ ...previousErrors, password: null }));
    };

    const validateEmailOnBlur = () => {
        setFieldErrors((previousErrors) => ({ ...previousErrors, email: validateEmail(email) }));
    };

    const handleSubmit = async (submitEvent) => {
        submitEvent.preventDefault();
        const nextErrors = validateLoginFields(email, password);
        setFieldErrors(nextErrors);
        if (hasAnyError(nextErrors)) return;
        setIsSubmitting(true);
        await onLogin(email.trim(), password);
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <TextField
                id="login-email"
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={handleEmailChange}
                onBlur={validateEmailOnBlur}
                errorMessage={fieldErrors.email}
                required
            />
            <PasswordField
                id="login-password"
                label="Password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                errorMessage={fieldErrors.password}
                required
            />
            <FormErrorBanner message={errorMessage} />
            <SubmitButton isSubmitting={isSubmitting} busyLabel="Signing in..." className={`${PRIMARY_BUTTON_CLASS_NAME} w-full mt-1`}>
                Sign In to Dashboard
            </SubmitButton>
        </form>
    );
}
