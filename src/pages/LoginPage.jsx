import { Link, Navigate, useLocation } from 'react-router';
import { useAuth } from '../auth/AuthProvider.jsx';
import { SiteHeader } from '../components/SiteHeader.jsx';
import { LoginForm } from '../components/LoginForm.jsx';
import { LoadingScreen } from '../components/LoadingScreen.jsx';
import { SECONDARY_BUTTON_CLASS_NAME } from '../components/formStyles.js';

const DEFAULT_AFTER_LOGIN_PATH = '/dashboard';

export function LoginPage() {
    const { isAuthenticated, isLoading, authError, signIn } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <LoadingScreen message="Checking session..." />;
    }

    if (isAuthenticated) {
        const returnTo = location.state?.returnTo ?? DEFAULT_AFTER_LOGIN_PATH;
        return <Navigate to={returnTo} replace />;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-violet-500 selection:text-white">
            <SiteHeader>
                <Link to="/#pricing" className={SECONDARY_BUTTON_CLASS_NAME}>View Plans</Link>
            </SiteHeader>

            <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-semibold mb-8">
                        <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
                        Client Portal
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-[1.15]">
                        Welcome{' '}
                        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                            back.
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                        Sign in to track your sprints, queue requests, and manage billing.
                    </p>

                    <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl shadow-indigo-950/40 text-left">
                        <LoginForm onLogin={signIn} errorMessage={authError} />
                    </div>

                    <p className="text-slate-500 text-sm mt-8">
                        No account yet?{' '}
                        <Link to="/signup" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors">
                            Create one
                        </Link>
                    </p>
                </div>
            </section>
        </div>
    );
}
