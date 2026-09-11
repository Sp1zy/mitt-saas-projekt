import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase.js';
import { toUserMetadata } from './userMetadata.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: sessionResult }) => {
            setSession(sessionResult.session);
            setIsLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_unusedEvent, nextSession) => {
            setSession(nextSession);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async (email, password) => {
        setAuthError(null);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setAuthError(error.message);
        return !error;
    };

    const signUp = async ({ email, password, profile }) => {
        setAuthError(null);
        const { data: signUpResult, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: toUserMetadata(profile) },
        });
        if (error) {
            setAuthError(error.message);
            return { isSuccess: false, needsEmailConfirmation: false };
        }
        const needsEmailConfirmation = signUpResult.session === null;
        return { isSuccess: true, needsEmailConfirmation };
    };

    const signOut = async () => {
        setAuthError(null);
        const { error } = await supabase.auth.signOut();
        if (error) setAuthError(error.message);
    };

    const authState = {
        session,
        user: session?.user ?? null,
        isAuthenticated: Boolean(session),
        isLoading,
        authError,
        signIn,
        signUp,
        signOut,
    };

    return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('useAuth must be used inside <AuthProvider>');
    }
    return authContext;
}
