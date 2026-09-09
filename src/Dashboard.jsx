import React from 'react';

export function Dashboard({ onLogout, portalUrl }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-8 max-w-5xl mx-auto font-sans">
            <header className="flex justify-between items-center mb-12 pb-6 border-b border-slate-800">
                <h1 className="text-2xl font-bold">Client Dashboard</h1>
                <div className="flex gap-4">
                    <a
                        href={portalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                    >
                        Stripe Billing
                    </a>
                    <button
                        onClick={onLogout}
                        className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                    >
                        Log Out
                    </button>
                </div>
            </header>

            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800">
                <h2 className="text-xl font-bold mb-4">Active Requests</h2>
                <p className="text-slate-400 text-sm">Welcome back! Manage your active development tasks and sprints here.</p>
            </div>
        </div>
    );
}