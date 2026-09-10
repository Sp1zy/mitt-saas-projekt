import { useState } from 'react';
import {
    validateEmail,
    validatePassword,
    validatePasswordConfirmation,
    validateRequiredText,
    validateRequiredChoice,
    validateWebsiteUrl,
    hasAnyError,
} from '../auth/validation.js';
import { COMPANY_SIZE_OPTIONS, PRIMARY_NEED_OPTIONS, PLAN_INTEREST_OPTIONS } from '../data/onboardingOptions.js';
import { TextField } from './fields/TextField.jsx';
import { TextAreaField } from './fields/TextAreaField.jsx';
import { SelectField } from './fields/SelectField.jsx';
import { PasswordField } from './fields/PasswordField.jsx';
import { PasswordRequirements } from './fields/PasswordRequirements.jsx';
import { FormErrorBanner } from './FormErrorBanner.jsx';
import { SubmitButton } from './SubmitButton.jsx';
import { PRIMARY_BUTTON_CLASS_NAME, SECONDARY_BUTTON_CLASS_NAME } from './formStyles.js';

const SIGNUP_STEP = {
    ACCOUNT: 'account',
    COMPANY: 'company',
};

const SIGNUP_STEP_ORDER = [SIGNUP_STEP.ACCOUNT, SIGNUP_STEP.COMPANY];

const SIGNUP_STEP_TITLES = {
    [SIGNUP_STEP.ACCOUNT]: 'Your account',
    [SIGNUP_STEP.COMPANY]: 'About your company',
};

const EMPTY_SIGNUP_FIELDS = {
    email: '',
    password: '',
    passwordConfirmation: '',
    fullName: '',
    companyName: '',
    websiteUrl: '',
    companySize: '',
    primaryNeed: '',
    planInterest: '',
    projectSummary: '',
};

const ACCOUNT_FIELD_VALIDATORS = {
    email: (fields) => validateEmail(fields.email),
    password: (fields) => validatePassword(fields.password),
    passwordConfirmation: (fields) => validatePasswordConfirmation(fields.password, fields.passwordConfirmation),
};

const COMPANY_FIELD_VALIDATORS = {
    fullName: (fields) => validateRequiredText(fields.fullName, 'Your name'),
    companyName: (fields) => validateRequiredText(fields.companyName, 'Company name'),
    websiteUrl: (fields) => validateWebsiteUrl(fields.websiteUrl),
    companySize: (fields) => validateRequiredChoice(fields.companySize, 'a company size'),
    primaryNeed: (fields) => validateRequiredChoice(fields.primaryNeed, 'what you need help with'),
};

const FIELD_VALIDATORS_BY_STEP = {
    [SIGNUP_STEP.ACCOUNT]: ACCOUNT_FIELD_VALIDATORS,
    [SIGNUP_STEP.COMPANY]: COMPANY_FIELD_VALIDATORS,
};

function validateStepFields(fields, fieldValidators) {
    const validatedEntries = Object.entries(fieldValidators).map(([fieldName, validate]) => [fieldName, validate(fields)]);
    return Object.fromEntries(validatedEntries);
}

function toSignupRequest(fields) {
    return {
        email: fields.email.trim(),
        password: fields.password,
        profile: {
            fullName: fields.fullName.trim(),
            companyName: fields.companyName.trim(),
            websiteUrl: fields.websiteUrl.trim(),
            companySize: fields.companySize,
            primaryNeed: fields.primaryNeed,
            planInterest: fields.planInterest,
            projectSummary: fields.projectSummary.trim(),
        },
    };
}

export function SignupForm({ onSignup, errorMessage }) {
    const [currentStep, setCurrentStep] = useState(SIGNUP_STEP.ACCOUNT);
    const [fields, setFields] = useState(EMPTY_SIGNUP_FIELDS);
    const [fieldErrors, setFieldErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = (fieldName) => (changeEvent) => {
        const nextValue = changeEvent.target.value;
        setFields((previousFields) => ({ ...previousFields, [fieldName]: nextValue }));
        setFieldErrors((previousErrors) => ({ ...previousErrors, [fieldName]: null }));
    };

    const validateFieldOnBlur = (fieldName) => () => {
        const validate = FIELD_VALIDATORS_BY_STEP[currentStep][fieldName];
        setFieldErrors((previousErrors) => ({ ...previousErrors, [fieldName]: validate(fields) }));
    };

    const validateCurrentStep = () => {
        const nextErrors = validateStepFields(fields, FIELD_VALIDATORS_BY_STEP[currentStep]);
        setFieldErrors(nextErrors);
        return !hasAnyError(nextErrors);
    };

    const goBackToAccountStep = () => {
        setFieldErrors({});
        setCurrentStep(SIGNUP_STEP.ACCOUNT);
    };

    const handleSubmit = async (submitEvent) => {
        submitEvent.preventDefault();
        if (!validateCurrentStep()) return;
        if (currentStep === SIGNUP_STEP.ACCOUNT) {
            setCurrentStep(SIGNUP_STEP.COMPANY);
            return;
        }
        setIsSubmitting(true);
        await onSignup(toSignupRequest(fields));
        setIsSubmitting(false);
    };

    const stepProps = { fields, fieldErrors, updateField, validateFieldOnBlur };
    const isAccountStep = currentStep === SIGNUP_STEP.ACCOUNT;

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <StepIndicator currentStep={currentStep} />
            {isAccountStep ? <AccountStep {...stepProps} /> : <CompanyStep {...stepProps} />}
            <FormErrorBanner message={errorMessage} />
            {isAccountStep ? (
                <button type="submit" className={`${PRIMARY_BUTTON_CLASS_NAME} w-full mt-1`}>
                    Continue
                </button>
            ) : (
                <div className="flex gap-3 mt-1">
                    <button type="button" onClick={goBackToAccountStep} className={`${SECONDARY_BUTTON_CLASS_NAME} py-3`}>
                        Back
                    </button>
                    <SubmitButton isSubmitting={isSubmitting} busyLabel="Creating account..." className={`${PRIMARY_BUTTON_CLASS_NAME} flex-1`}>
                        Create Account
                    </SubmitButton>
                </div>
            )}
        </form>
    );
}

function StepIndicator({ currentStep }) {
    const currentStepIndex = SIGNUP_STEP_ORDER.indexOf(currentStep);
    return (
        <div className="mb-1">
            <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                    Step {currentStepIndex + 1} of {SIGNUP_STEP_ORDER.length}
                </p>
                <p className="text-sm text-slate-400">{SIGNUP_STEP_TITLES[currentStep]}</p>
            </div>
            <div className="flex gap-1.5" aria-hidden="true">
                {SIGNUP_STEP_ORDER.map((step, stepIndex) => (
                    <span
                        key={step}
                        className={`h-1 flex-1 rounded-full transition-colors ${stepIndex <= currentStepIndex ? 'bg-violet-500' : 'bg-slate-800'}`}
                    />
                ))}
            </div>
        </div>
    );
}

function AccountStep({ fields, fieldErrors, updateField, validateFieldOnBlur }) {
    return (
        <>
            <TextField
                id="signup-email"
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={fields.email}
                onChange={updateField('email')}
                onBlur={validateFieldOnBlur('email')}
                errorMessage={fieldErrors.email}
                required
            />
            <div>
                <PasswordField
                    id="signup-password"
                    label="Password"
                    autoComplete="new-password"
                    placeholder="Create a password"
                    value={fields.password}
                    onChange={updateField('password')}
                    onBlur={validateFieldOnBlur('password')}
                    errorMessage={fieldErrors.password}
                    required
                />
                <PasswordRequirements password={fields.password} />
            </div>
            <PasswordField
                id="signup-password-confirmation"
                label="Confirm password"
                autoComplete="new-password"
                placeholder="Repeat your password"
                value={fields.passwordConfirmation}
                onChange={updateField('passwordConfirmation')}
                onBlur={validateFieldOnBlur('passwordConfirmation')}
                errorMessage={fieldErrors.passwordConfirmation}
                required
            />
        </>
    );
}

function CompanyStep({ fields, fieldErrors, updateField, validateFieldOnBlur }) {
    return (
        <>
            <div className="grid sm:grid-cols-2 gap-5">
                <TextField
                    id="signup-full-name"
                    label="Your name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Doe"
                    value={fields.fullName}
                    onChange={updateField('fullName')}
                    onBlur={validateFieldOnBlur('fullName')}
                    errorMessage={fieldErrors.fullName}
                    required
                />
                <TextField
                    id="signup-company-name"
                    label="Company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Acme Inc."
                    value={fields.companyName}
                    onChange={updateField('companyName')}
                    onBlur={validateFieldOnBlur('companyName')}
                    errorMessage={fieldErrors.companyName}
                    required
                />
            </div>
            <TextField
                id="signup-website-url"
                label="Website"
                optionalHint="Optional"
                type="url"
                inputMode="url"
                autoComplete="url"
                placeholder="acme.com"
                value={fields.websiteUrl}
                onChange={updateField('websiteUrl')}
                onBlur={validateFieldOnBlur('websiteUrl')}
                errorMessage={fieldErrors.websiteUrl}
            />
            <div className="grid sm:grid-cols-2 gap-5">
                <SelectField
                    id="signup-company-size"
                    label="Company size"
                    options={COMPANY_SIZE_OPTIONS}
                    placeholder="Select size"
                    value={fields.companySize}
                    onChange={updateField('companySize')}
                    onBlur={validateFieldOnBlur('companySize')}
                    errorMessage={fieldErrors.companySize}
                    required
                />
                <SelectField
                    id="signup-plan-interest"
                    label="Plan"
                    optionalHint="Optional"
                    options={PLAN_INTEREST_OPTIONS}
                    placeholder="Considering..."
                    value={fields.planInterest}
                    onChange={updateField('planInterest')}
                />
            </div>
            <SelectField
                id="signup-primary-need"
                label="What do you need help with?"
                options={PRIMARY_NEED_OPTIONS}
                placeholder="Select one"
                value={fields.primaryNeed}
                onChange={updateField('primaryNeed')}
                onBlur={validateFieldOnBlur('primaryNeed')}
                errorMessage={fieldErrors.primaryNeed}
                required
            />
            <TextAreaField
                id="signup-project-summary"
                label="First thing to ship"
                optionalHint="Optional"
                rows={3}
                placeholder="A sentence or two about what you would like us to build first."
                value={fields.projectSummary}
                onChange={updateField('projectSummary')}
            />
        </>
    );
}
