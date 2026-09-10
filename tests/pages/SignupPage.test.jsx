import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import { SignupPage } from '../../src/pages/SignupPage.jsx';
import { VALID_ACCOUNT, VALID_COMPANY, completeAccountStep, completeCompanyStep } from '../helpers/signupFlow.js';

const mockAuth = vi.hoisted(() => ({
    isAuthenticated: false,
    isLoading: false,
    authError: null,
    signUp: vi.fn(),
}));

vi.mock('../../src/auth/AuthProvider.jsx', () => ({
    useAuth: () => mockAuth,
}));

function renderSignupPage() {
    render(
        <MemoryRouter initialEntries={['/signup']}>
            <Routes>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/dashboard" element={<p>Dashboard landing</p>} />
            </Routes>
        </MemoryRouter>,
    );
    return userEvent.setup();
}

beforeEach(() => {
    mockAuth.isAuthenticated = false;
    mockAuth.isLoading = false;
    mockAuth.authError = null;
    mockAuth.signUp.mockReset();
});

describe('SignupPage onboarding', () => {
    it('shows the confirm-email notice when Supabase returns no session', async () => {
        mockAuth.signUp.mockResolvedValue({ isSuccess: true, needsEmailConfirmation: true });
        const user = renderSignupPage();

        await completeAccountStep(user);
        await completeCompanyStep(user);

        expect(mockAuth.signUp).toHaveBeenCalledWith({
            email: VALID_ACCOUNT.email,
            password: VALID_ACCOUNT.password,
            profile: VALID_COMPANY,
        });
        expect(await screen.findByText('Check your inbox')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Go to sign in' })).toHaveAttribute('href', '/login');
    });

    it('stays on the form and shows the auth error when signup fails', async () => {
        mockAuth.signUp.mockResolvedValue({ isSuccess: false, needsEmailConfirmation: false });
        mockAuth.authError = 'User already registered';
        const user = renderSignupPage();

        await completeAccountStep(user);
        await completeCompanyStep(user);

        expect(screen.queryByText('Check your inbox')).not.toBeInTheDocument();
        expect(screen.getByRole('alert')).toHaveTextContent('User already registered');
    });

    it('redirects an already signed-in visitor to the dashboard', () => {
        mockAuth.isAuthenticated = true;
        renderSignupPage();
        expect(screen.getByText('Dashboard landing')).toBeInTheDocument();
    });
});
