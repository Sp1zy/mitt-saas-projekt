import { useState } from 'react';
import { Link, Navigate } from 'react-router';
import { useAuth } from '../auth/AuthProvider.jsx';
import { SiteHeader } from '../components/SiteHeader.jsx';
import { SignupForm } from '../components/SignupForm.jsx';
import { LoadingScreen } from '../components/LoadingScreen.jsx';
import { SECONDARY_BUTTON_CLASS_NAME } from '../components/formStyles.js';

function ConfirmationNotice() {
    return (
        <div className="p-8 rounded-2xl bg-slate-900 border border-emerald-500/30 shadow-2xl shadow-indigo-950/40 text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">Check your inbox</p>
            <p className="text-slate-300 leading-relaxed">
                We sent a confirmation link to your email. Open it to activate your account, then sign in.
            </p>
            <Link to="/login" className={`${SECONDARY_BUTTON_CLASS_NAME} inline-block mt-6`}>
                Go to sign in
            </Link>
        </div>
    );
}

export function SignupPage() {
    const { isAuthenticated, isLoading, authError, signUp } = useAuth();
    const [isAwaitingConfirmation, setIsAwaitingConfirmation] = useState(false);

    if (isLoading) {
        return <LoadingScreen message="Checking session..." />;
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleSignup = async (signupRequest) => {
        const { isSuccess, needsEmailConfirmation } = await signUp(signupRequest);
        if (isSuccess && needsEmailConfirmation) {
            setIsAwaitingConfirmation(true);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-violet-500 selection:text-white">
            <SiteHeader>
                <Link to="/login" className={SECONDARY_BUTTON_CLASS_NAME}>Sign In</Link>
            </SiteHeader>

            <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-lg text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-semibold mb-8">
                        <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
                        Client Portal
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-[1.15]">
                        Create your{' '}
                        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                            account.
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                        One login for sprint tracking, request queue, and billing.
                    </p>

                    {isAwaitingConfirmation ? (
                        <ConfirmationNotice />
                    ) : (
                        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl shadow-indigo-950/40 text-left">
                            <SignupForm onSignup={handleSignup} errorMessage={authError} />
                        </div>
                    )}

                    <p className="text-slate-500 text-sm mt-8">
                        Already have an account?{' '}
                        <Link to="/login" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </section>
        </div>
    );
}
