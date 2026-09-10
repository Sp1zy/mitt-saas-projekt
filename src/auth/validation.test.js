import {
    validateEmail,
    validatePassword,
    validatePasswordConfirmation,
    validateRequiredText,
    validateRequiredChoice,
    validateWebsiteUrl,
    hasAnyError,
} from './validation.js';

describe('validateEmail', () => {
    it('requires a value', () => {
        expect(validateEmail('   ')).toBe('Email is required.');
    });

    it('rejects malformed addresses', () => {
        expect(validateEmail('not-an-email')).toBe('Enter a valid email address.');
        expect(validateEmail('jane@acme')).toBe('Enter a valid email address.');
        expect(validateEmail('jane @acme.com')).toBe('Enter a valid email address.');
    });

    it('accepts a normal address with surrounding whitespace', () => {
        expect(validateEmail('  jane@acme.com ')).toBeNull();
    });
});

describe('validatePassword', () => {
    it('reports the first unmet requirement in order', () => {
        expect(validatePassword('short')).toBe('Password must be at least 8 characters.');
        expect(validatePassword('12345678')).toBe('Password must contain at least one letter.');
        expect(validatePassword('lettersonly')).toBe('Password must contain at least one number.');
    });

    it('accepts a password meeting every rule', () => {
        expect(validatePassword('hunter2secret')).toBeNull();
    });
});

describe('validatePasswordConfirmation', () => {
    it('requires a confirmation', () => {
        expect(validatePasswordConfirmation('hunter2secret', '')).toBe('Confirm your password.');
    });

    it('rejects a mismatch', () => {
        expect(validatePasswordConfirmation('hunter2secret', 'hunter2secrets')).toBe('Passwords do not match.');
    });

    it('accepts a match', () => {
        expect(validatePasswordConfirmation('hunter2secret', 'hunter2secret')).toBeNull();
    });
});

describe('validateRequiredText and validateRequiredChoice', () => {
    it('names the field in the message', () => {
        expect(validateRequiredText('  ', 'Company name')).toBe('Company name is required.');
        expect(validateRequiredChoice('', 'a company size')).toBe('Choose a company size.');
    });

    it('passes non-empty values', () => {
        expect(validateRequiredText('Acme', 'Company name')).toBeNull();
        expect(validateRequiredChoice('solo', 'a company size')).toBeNull();
    });
});

describe('validateWebsiteUrl', () => {
    it('is optional', () => {
        expect(validateWebsiteUrl('')).toBeNull();
    });

    it('accepts bare domains and full urls', () => {
        expect(validateWebsiteUrl('acme.com')).toBeNull();
        expect(validateWebsiteUrl('https://www.acme.co.uk/about')).toBeNull();
    });

    it('rejects text without a dotted hostname', () => {
        expect(validateWebsiteUrl('not a website')).toBe('Enter a valid website, like example.com.');
        expect(validateWebsiteUrl('localhost')).toBe('Enter a valid website, like example.com.');
    });
});

describe('hasAnyError', () => {
    it('ignores null entries', () => {
        expect(hasAnyError({ email: null, password: null })).toBe(false);
        expect(hasAnyError({ email: null, password: 'Required.' })).toBe(true);
    });
});
