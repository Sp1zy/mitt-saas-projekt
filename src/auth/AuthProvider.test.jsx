import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthProvider.jsx';
import { supabase } from './supabase.js';

vi.mock('./supabase.js', () => ({
    supabase: {
        auth: {
            getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
            onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
            signUp: vi.fn(),
        },
    },
}));

const SIGNUP_REQUEST = {
    email: 'jane@acme.com',
    password: 'hunter2secret',
    profile: {
        fullName: 'Jane Doe',
        companyName: 'Acme Inc.',
        websiteUrl: 'acme.com',
        companySize: '2-10',
        primaryNeed: 'new_product',
        planInterest: 'monthly_pro',
        projectSummary: 'Ship a billing portal.',
    },
};

async function renderAuth() {
    const rendered = renderHook(() => useAuth(), { wrapper: AuthProvider });
    await waitFor(() => expect(rendered.result.current.isLoading).toBe(false));
    return rendered;
}

describe('AuthProvider.signUp', () => {
    beforeEach(() => {
        supabase.auth.signUp.mockReset();
    });

    it('sends the profile as user metadata and reports confirmation when no session comes back', async () => {
        supabase.auth.signUp.mockResolvedValue({ data: { user: { id: 'user-1' }, session: null }, error: null });
        const { result } = await renderAuth();

        let signUpResult;
        await act(async () => {
            signUpResult = await result.current.signUp(SIGNUP_REQUEST);
        });

        expect(supabase.auth.signUp).toHaveBeenCalledWith({
            email: SIGNUP_REQUEST.email,
            password: SIGNUP_REQUEST.password,
            options: {
                data: {
                    full_name: 'Jane Doe',
                    company_name: 'Acme Inc.',
                    website_url: 'acme.com',
                    company_size: '2-10',
                    primary_need: 'new_product',
                    plan_interest: 'monthly_pro',
                    project_summary: 'Ship a billing portal.',
                },
            },
        });
        expect(signUpResult).toEqual({ isSuccess: true, needsEmailConfirmation: true });
        expect(result.current.authError).toBeNull();
    });

    it('reports no confirmation needed when a session comes back', async () => {
        supabase.auth.signUp.mockResolvedValue({ data: { user: { id: 'user-1' }, session: { access_token: 'token' } }, error: null });
        const { result } = await renderAuth();

        let signUpResult;
        await act(async () => {
            signUpResult = await result.current.signUp(SIGNUP_REQUEST);
        });

        expect(signUpResult).toEqual({ isSuccess: true, needsEmailConfirmation: false });
    });

    it('surfaces the Supabase error message', async () => {
        supabase.auth.signUp.mockResolvedValue({ data: { user: null, session: null }, error: { message: 'User already registered' } });
        const { result } = await renderAuth();

        let signUpResult;
        await act(async () => {
            signUpResult = await result.current.signUp(SIGNUP_REQUEST);
        });

        expect(signUpResult).toEqual({ isSuccess: false, needsEmailConfirmation: false });
        expect(result.current.authError).toBe('User already registered');
    });
});
