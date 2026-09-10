import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignupForm } from '../../src/components/SignupForm.jsx';
import { VALID_ACCOUNT, VALID_COMPANY, completeAccountStep, completeCompanyStep } from '../helpers/signupFlow.js';

function renderSignupForm(overrides = {}) {
    const onSignup = vi.fn().mockResolvedValue(undefined);
    render(<SignupForm onSignup={onSignup} errorMessage={null} {...overrides} />);
    return { onSignup, user: userEvent.setup() };
}

describe('SignupForm account step', () => {
    it('starts on step 1 with every password requirement unmet', () => {
        renderSignupForm();
        expect(screen.getByText(/step 1 of 2/i)).toBeInTheDocument();
        expect(screen.getAllByText(', not met')).toHaveLength(3);
    });

    it('blocks Continue and shows one error per field when empty', async () => {
        const { user, onSignup } = renderSignupForm();
        await user.click(screen.getByRole('button', { name: 'Continue' }));

        expect(screen.getByText('Email is required.')).toBeInTheDocument();
        expect(screen.getByText('Password must be at least 8 characters.')).toBeInTheDocument();
        expect(screen.getByText('Confirm your password.')).toBeInTheDocument();
        expect(screen.getByText(/step 1 of 2/i)).toBeInTheDocument();
        expect(onSignup).not.toHaveBeenCalled();
    });

    it('validates the email on blur and clears the error on edit', async () => {
        const { user } = renderSignupForm();
        const emailInput = screen.getByLabelText('Email');
        await user.type(emailInput, 'not-an-email');
        await user.tab();
        expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();
        expect(emailInput).toHaveAttribute('aria-invalid', 'true');

        await user.type(emailInput, '@acme.com');
        expect(screen.queryByText('Enter a valid email address.')).not.toBeInTheDocument();
    });

    it('ticks password requirements as they are met', async () => {
        const { user } = renderSignupForm();
        await user.type(screen.getByLabelText('Password'), 'hunter2secret');
        expect(screen.getAllByText(', met')).toHaveLength(3);
        expect(screen.queryByText(', not met')).not.toBeInTheDocument();
    });

    it('rejects a mismatched confirmation', async () => {
        const { user } = renderSignupForm();
        await user.type(screen.getByLabelText('Email'), VALID_ACCOUNT.email);
        await user.type(screen.getByLabelText('Password'), VALID_ACCOUNT.password);
        await user.type(screen.getByLabelText('Confirm password'), 'different1');
        await user.click(screen.getByRole('button', { name: 'Continue' }));
        expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
    });

    it('toggles password visibility with the eye button', async () => {
        const { user } = renderSignupForm();
        const passwordInput = screen.getByLabelText('Password');
        expect(passwordInput).toHaveAttribute('type', 'password');

        await user.click(screen.getAllByRole('button', { name: 'Show password' })[0]);
        expect(passwordInput).toHaveAttribute('type', 'text');
        expect(screen.getByRole('button', { name: 'Hide password' })).toHaveAttribute('aria-pressed', 'true');
    });

    it('moves to step 2 once the account fields are valid', async () => {
        const { user } = renderSignupForm();
        await completeAccountStep(user);
        expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument();
        expect(screen.getByLabelText('Your name')).toBeInTheDocument();
    });
});

describe('SignupForm company step', () => {
    it('requires name, company, size and primary need', async () => {
        const { user, onSignup } = renderSignupForm();
        await completeAccountStep(user);
        await user.click(screen.getByRole('button', { name: 'Create Account' }));

        expect(screen.getByText('Your name is required.')).toBeInTheDocument();
        expect(screen.getByText('Company name is required.')).toBeInTheDocument();
        expect(screen.getByText('Choose a company size.')).toBeInTheDocument();
        expect(screen.getByText('Choose what you need help with.')).toBeInTheDocument();
        expect(onSignup).not.toHaveBeenCalled();
    });

    it('validates an optional website only when filled', async () => {
        const { user } = renderSignupForm();
        await completeAccountStep(user);
        await user.type(screen.getByLabelText('Website'), 'not a website');
        await user.tab();
        expect(screen.getByText('Enter a valid website, like example.com.')).toBeInTheDocument();
    });

    it('keeps the account values when going back', async () => {
        const { user } = renderSignupForm();
        await completeAccountStep(user);
        await user.click(screen.getByRole('button', { name: 'Back' }));

        expect(screen.getByText(/step 1 of 2/i)).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toHaveValue(VALID_ACCOUNT.email);
        expect(screen.getByLabelText('Password')).toHaveValue(VALID_ACCOUNT.password);
        expect(screen.getByLabelText('Confirm password')).toHaveValue(VALID_ACCOUNT.password);
    });

    it('submits the trimmed account and profile payload', async () => {
        const { user, onSignup } = renderSignupForm();
        await completeAccountStep(user);
        await completeCompanyStep(user);

        expect(onSignup).toHaveBeenCalledTimes(1);
        expect(onSignup).toHaveBeenCalledWith({
            email: VALID_ACCOUNT.email,
            password: VALID_ACCOUNT.password,
            profile: VALID_COMPANY,
        });
    });

    it('shows the server error banner', async () => {
        renderSignupForm({ errorMessage: 'User already registered' });
        expect(screen.getByRole('alert')).toHaveTextContent('User already registered');
    });
});
