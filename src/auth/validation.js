const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WEBSITE_HOSTNAME_PATTERN = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i;
const URL_SCHEME_PATTERN = /^https?:\/\//i;

export const MIN_PASSWORD_LENGTH = 8;

export const PASSWORD_REQUIREMENTS = [
    {
        id: 'length',
        label: `${MIN_PASSWORD_LENGTH}+ characters`,
        failureMessage: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
        isMetBy: (password) => password.length >= MIN_PASSWORD_LENGTH,
    },
    {
        id: 'letter',
        label: 'One letter',
        failureMessage: 'Password must contain at least one letter.',
        isMetBy: (password) => /[A-Za-z]/.test(password),
    },
    {
        id: 'number',
        label: 'One number',
        failureMessage: 'Password must contain at least one number.',
        isMetBy: (password) => /\d/.test(password),
    },
];

export function validateEmail(email) {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return 'Email is required.';
    if (!EMAIL_PATTERN.test(trimmedEmail)) return 'Enter a valid email address.';
    return null;
}

export function validatePassword(password) {
    const firstUnmetRequirement = PASSWORD_REQUIREMENTS.find((requirement) => !requirement.isMetBy(password));
    return firstUnmetRequirement ? firstUnmetRequirement.failureMessage : null;
}

export function validatePasswordConfirmation(password, passwordConfirmation) {
    if (!passwordConfirmation) return 'Confirm your password.';
    if (password !== passwordConfirmation) return 'Passwords do not match.';
    return null;
}

export function validateRequiredText(value, fieldLabel) {
    return value.trim() ? null : `${fieldLabel} is required.`;
}

export function validateRequiredChoice(value, choiceDescription) {
    return value ? null : `Choose ${choiceDescription}.`;
}

export function validateWebsiteUrl(websiteUrl) {
    const trimmedUrl = websiteUrl.trim();
    if (!trimmedUrl) return null;
    const hostname = extractHostname(trimmedUrl);
    if (!hostname || !WEBSITE_HOSTNAME_PATTERN.test(hostname)) return 'Enter a valid website, like example.com.';
    return null;
}

function extractHostname(websiteUrl) {
    const urlWithScheme = URL_SCHEME_PATTERN.test(websiteUrl) ? websiteUrl : `https://${websiteUrl}`;
    try {
        return new URL(urlWithScheme).hostname;
    } catch (parseError) {
        return null;
    }
}

export function hasAnyError(fieldErrors) {
    return Object.values(fieldErrors).some(Boolean);
}
