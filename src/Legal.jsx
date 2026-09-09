import React from 'react';

export function TermsOfService({ onBack }) {
    return (
        <div className="min-h-screen w-full bg-slate-950 text-slate-100 font-sans antialiased selection:bg-violet-500 selection:text-white">
            {/* Navigation Header */}
            <header className="border-b border-slate-800 sticky top-0 bg-slate-950/80 backdrop-blur-md z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-indigo-500/25">
                            A
                        </div>
                        <span className="font-extrabold text-2xl tracking-tight text-white">ApexDesk</span>
                    </div>
                    <button
                        onClick={onBack}
                        className="border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                    >
                        ← Back to Home
                    </button>
                </div>
            </header>

            {/* Main Content Container */}
            <main className="max-w-4xl mx-auto px-6 py-16">
                <div className="mb-10 pb-6 border-b border-slate-800">
                    <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">Legal Agreement</span>
                    <h1 className="text-4xl font-black text-white mt-2 mb-3">Terms of Service</h1>
                    <p className="text-slate-400 text-sm">Last updated: August 2026</p>
                </div>

                <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
                    <section>
                        <h2 className="text-lg font-bold text-white mb-3">1. Service Overview</h2>
                        <p className="text-slate-400">
                            ApexDesk provides full-stack web development and UI/UX design subscription services. By purchasing a subscription pass or recurring plan, you agree to comply with and be bound by these Terms of Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3">2. Work Requests & Delivery</h2>
                        <p className="text-slate-400 mb-3">
                            Requests are managed via your assigned project board or channel. Submissions are processed sequentially based on your active tier limits (1 active task for Standard/Sprint, 2 active tasks for Pro).
                        </p>
                        <p className="text-slate-400">
                            Deliverables are provided in continuous 48-hour development sprints. Estimated completion times vary depending on task complexity.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3">3. Intellectual Property Ownership</h2>
                        <p className="text-slate-400">
                            Upon full receipt of payment for completed services, 100% of the legal title, source code, repositories, and design assets created specifically for you belong entirely to you. ApexDesk retains no residual claims over your proprietary code or assets.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3">4. Billing, Pause & Cancellations</h2>
                        <p className="text-slate-400 mb-3">
                            Monthly subscriptions are billed in advance on a recurring basis. You may pause or cancel your plan at any time through your client portal or Stripe billing interface.
                        </p>
                        <p className="text-slate-400">
                            When pausing a plan, unused days remaining in the current billing cycle stay in your account balance and never expire.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3">5. Limitation of Liability</h2>
                        <p className="text-slate-400">
                            ApexDesk provides technical execution on an "as-is" basis. We are not liable for any indirect, incidental, or consequential damages resulting from downtime, software bugs, or third-party API dependencies.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}

export function PrivacyPolicy({ onBack }) {
    return (
        <div className="min-h-screen w-full bg-slate-950 text-slate-100 font-sans antialiased selection:bg-violet-500 selection:text-white">
            {/* Navigation Header */}
            <header className="border-b border-slate-800 sticky top-0 bg-slate-950/80 backdrop-blur-md z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-indigo-500/25">
                            A
                        </div>
                        <span className="font-extrabold text-2xl tracking-tight text-white">ApexDesk</span>
                    </div>
                    <button
                        onClick={onBack}
                        className="border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                    >
                        ← Back to Home
                    </button>
                </div>
            </header>

            {/* Main Content Container */}
            <main className="max-w-4xl mx-auto px-6 py-16">
                <div className="mb-10 pb-6 border-b border-slate-800">
                    <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">Data & Security</span>
                    <h1 className="text-4xl font-black text-white mt-2 mb-3">Privacy Policy</h1>
                    <p className="text-slate-400 text-sm">Last updated: August 2026</p>
                </div>

                <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
                    <section>
                        <h2 className="text-lg font-bold text-white mb-3">1. Information We Collect</h2>
                        <p className="text-slate-400">
                            We collect basic account information necessary to process your subscription and deliver services, including your name, business email, contact details, and technical project requirements.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3">2. Payment Processing</h2>
                        <p className="text-slate-400">
                            Payment information (credit cards, billing details) is directly handled and stored by payment provider Stripe. ApexDesk never stores full payment credentials or financial records on internal servers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3">3. How We Use Your Data</h2>
                        <p className="text-slate-400">
                            Your information is exclusively used to deliver requested development services, process payment transactions, maintain account authentication, and communicate project updates. We never sell, rent, or trade client information to third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3">4. Security & Confidentiality</h2>
                        <p className="text-slate-400">
                            We maintain strict administrative and electronic safeguards to protect your repositories, code assets, and proprietary information. Non-Disclosure Agreements (NDAs) apply to all active subscription clients.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}