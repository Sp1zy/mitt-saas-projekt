import { Routes, Route, Navigate } from 'react-router';
import { ProtectedRoute } from './auth/ProtectedRoute.jsx';
import { LandingPage } from './pages/LandingPage.jsx';
import { TermsPage } from './pages/TermsPage.jsx';
import { PrivacyPage } from './pages/PrivacyPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { SignupPage } from './pages/SignupPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';


export default function App() {
<<<<<<< HEAD
    const [view, setView] = useState('main'); // 'main' | 'terms' | 'privacy' | 'dashboard'
    const [openFaq, setOpenFaq] = useState(null);

    if (view === 'terms') return <TermsOfService onBack={() => setView('main')} />;
    if (view === 'privacy') return <PrivacyPolicy onBack={() => setView('main')} />;
    if (view === 'dashboard') return <Dashboard onLogout={() => setView('main')} portalUrl={STRIPE_PORTAL_URL} />;

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            q: 'How fast do requests actually get completed?',
            a: 'Instead of promising an entire complex web app in 2 days, we work in continuous 48-hour development sprints. Smaller tasks (like bug fixes or UI updates) often finish in 24–48 hours, while larger features are delivered in steady 2-day functional milestones.'
        },
        {
            q: 'How does the subscription "Pause" feature work?',
            a: 'If you only have 12 days of work needed this month, click Pause in your dashboard. Your subscription stops immediately, and your remaining 18 days stay locked in your account balance to use whenever you\'re ready.'
        },
        {
            q: 'What is the difference between a 2-Week Sprint and a Monthly Subscription?',
            a: 'The 2-Week Sprint ($1,490) is a one-time payment for short-term projects with no recurring billing. The Monthly Subscription ($2,490/mo) is a recurring plan designed for ongoing dev needs with full pause/cancel flexibility.'
        },
        {
            q: 'Who owns the code and design files?',
            a: 'You hold 100% ownership of all source code, GitHub repositories, and design assets as soon as work is delivered.'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-violet-500 selection:text-white">
            {/* 1. NAVIGATION BAR */}
            <header className="border-b border-slate-800 sticky top-0 bg-slate-950/80 backdrop-blur-md z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('main')}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-indigo-500/25">
                            A
                        </div>
                        <span className="font-extrabold text-2xl tracking-tight text-white">
                            ApexDesk
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                        <a href="#features" className="hover:text-violet-400 transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-violet-400 transition-colors">How It Works</a>
                        <a href="#pricing" className="hover:text-violet-400 transition-colors">Pricing</a>
                        <a href="#contact" className="hover:text-violet-400 transition-colors">Contact</a>
                        <a href="#faq" className="hover:text-violet-400 transition-colors">FAQ</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <a
                            href="#pricing"
                            className="border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all hidden sm:inline-block"
                        >
                            View Plans
                        </a>
                        <button
                            onClick={() => setView('dashboard')}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                        >
                            Client Login
                        </button>
                    </div>
                </div>
            </header>

            {/* 2. HERO SECTION */}
            <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-semibold mb-8">
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
                    Senior Engineering Capacity • On Demand
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-8 leading-[1.15]">
                    Dedicated Senior Developers. <br className="hidden sm:inline" />
                    <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                        Zero Agency Markup.
                    </span>
                </h1>

                <p className="text-slate-400 text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
                    Get dedicated senior web design and full-stack development. Submit unlimited requests and receive continuous code updates every 48 hours.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <a
                        href="#contact"
                        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-xl shadow-indigo-600/25 active:scale-95 text-center"
                    >
                        Get In Touch
                    </a>
                    <a
                        href="https://calendly.com/strahlechristian/30min?month=2026-09"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold px-8 py-4 rounded-xl transition-all bg-slate-900/80 active:scale-95 text-center"
                    >
                        Book a 15-Min Intro Call
                    </a>
                </div>

                <div className="pt-8 border-t border-slate-900">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">
                        Technologies We Master
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400 text-sm font-medium">
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-cyan-400 font-bold">⚛</span> React
                        </span>
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-emerald-400 font-bold">⬢</span> Node.js
                        </span>
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-sky-400 font-bold">≈</span> Tailwind
                        </span>
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-blue-500 font-bold">W</span> Webflow
                        </span>
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-violet-400 font-bold">#</span> C#
                        </span>
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-indigo-400 font-bold">🐘</span> PostgreSQL
                        </span>
                    </div>
                </div>
            </section>

            {/* 3. VALUE PROPOSITIONS */}
            <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-900">
                <div className="text-center mb-16">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
                        Why ApexDesk
                    </h2>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white">
                        Engineered for speed, predictability, and full control
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/40 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center font-bold text-2xl mb-6">
                            ⚡
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                            Continuous 48-Hour Sprint Updates
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            We break your feature roadmap into manageable 48-hour development sprints. Track steady, functional progress every two business days.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/40 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center font-bold text-2xl mb-6">
                            💳
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                            Predictable Flat Rates
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            No billable hour tracking, surprise invoices, or scope negotiations. Choose a fixed 2-week sprint or a flexible monthly subscription.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/40 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center font-bold text-2xl mb-6">
                            ♾️
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                            Unlimited Requests & Revisions
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Add as many tasks to your Trello/Slack queue as you need. We work through them sequentially and iterate until you are 100% satisfied.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/40 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center font-bold text-2xl mb-6">
                            🛡️
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                            100% IP & Code Ownership
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            You retain full legal ownership of all source code, Figma design files, and repositories from day one.
                        </p>
                    </div>
                </div>
            </section>

            {/* 4. HOW IT WORKS */}
            <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-900">
                <div className="text-center mb-16">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
                        Simple Process
                    </h2>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white">
                        How ApexDesk Works
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl bg-slate-900/30 border border-slate-800 relative">
                        <div className="text-5xl font-black text-slate-800 mb-6">01</div>
                        <h3 className="text-lg font-bold text-white mb-3">Subscribe & Submit</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Create tasks in your private Trello/Slack queue.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-slate-900/30 border border-slate-800 relative">
                        <div className="text-5xl font-black text-indigo-950/60 mb-6">02</div>
                        <h3 className="text-lg font-bold text-white mb-3">48-Hour Development Sprints</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Your dedicated developer ships code updates every 2 business days.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-slate-900/30 border border-slate-800 relative">
                        <div className="text-5xl font-black text-violet-950/60 mb-6">03</div>
                        <h3 className="text-lg font-bold text-white mb-3">Review & Deploy</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Approve the build or request instant revisions until production-ready.
                        </p>
                    </div>
                </div>
            </section>

            {/* 4.5. PORTFOLIO SHOWCASE */}
            <section id="portfolio" className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-900">
                <div className="text-center mb-16">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
                        Meet our Developers
                    </h2>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white">
                        Pre-vetted Senior Engineers Ready to Join Your Team
                    </p>
                </div>

                <DevPortfolioGrid />
            </section>

            {/* 5. PRICING SECTION */}
            <section id="pricing" className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-900">
                <div className="text-center mb-16">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
                        Transparent Investment
                    </h2>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white">
                        Choose the plan that fits your execution pace
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {/* Card 1 */}
                    <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
                        <div>
                            <h3 className="text-xl font-bold text-white">2-Week Sprint Pass</h3>
                            <p className="text-slate-400 text-xs mt-2 min-h-[36px]">
                                Best for: Single landing pages, MVP builds, or clearing emergency bug backlogs.
                            </p>
                            <div className="my-8">
                                <span className="text-4xl font-extrabold text-white">$1,490</span>
                                <span className="text-slate-400 text-xs block mt-1">USD / One-Time</span>
                            </div>
                            <ul className="space-y-4 text-sm text-slate-300 mb-8 border-t border-slate-800/80 pt-6">
                                <li className="flex items-center gap-3">
                                    <span className="text-violet-400 font-bold">✓</span> 1 active request at a time
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-violet-400 font-bold">✓</span> Continuous 48h sprint updates
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-violet-400 font-bold">✓</span> Dedicated frontend/full-stack dev
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-violet-400 font-bold">✓</span> Zero recurring commitment
                                </li>
                            </ul>
                        </div>
                        <a
                            href="https://checkout.revolut.com/pay/615a0401-a863-43d0-8ea2-52b7941ecfd9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3.5 rounded-xl transition-all block"
                        >
                            Book Sprint Pass
                        </a>
                    </div>

                    {/* Card 2 */}
                    <div className="p-8 rounded-2xl bg-slate-900 border-2 border-indigo-500 flex flex-col justify-between relative shadow-2xl shadow-indigo-500/10">
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                            Most Popular
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Monthly Standard</h3>
                            <p className="text-slate-400 text-xs mt-2 min-h-[36px]">
                                Best for: Ongoing web app features, continuous maintenance, and agency overflow.
                            </p>
                            <div className="my-8">
                                <span className="text-4xl font-extrabold text-white">$2,490</span>
                                <span className="text-slate-400 text-xs block mt-1">USD / Month</span>
                            </div>
                            <ul className="space-y-4 text-sm text-slate-300 mb-8 border-t border-slate-800/80 pt-6">
                                <li className="flex items-center gap-3">
                                    <span className="text-violet-400 font-bold">✓</span> 1 active request at a time
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-violet-400 font-bold">✓</span> Average 48h progress updates
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-violet-400 font-bold">✓</span> Dedicated developer & UI designer
                                </li>
                                <li className="flex items-center gap-3 text-indigo-300 font-medium">
                                    <span className="text-violet-400 font-bold">✓</span> PAUSE OR CANCEL ANYTIME (unused days roll over)
                                </li>
                            </ul>
                        </div>
                        <a
                            href="https://checkout.revolut.com/pay/4f605bd8-f473-4f5c-955b-3ade898e5ffd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/25 block"
                        >
                            Start Monthly Standard
                        </a>
                    </div>

                    {/* Card 3 */}
                    <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
                        <div>
                            <h3 className="text-xl font-bold text-white">Monthly Pro</h3>
                            <p className="text-slate-400 text-xs mt-2 min-h-[36px]">
                                Best for: Complex SaaS apps, multi-developer projects, and high-velocity agencies.
                            </p>
                            <div className="my-8">
                                <span className="text-4xl font-extrabold text-white">$3,990</span>
                                <span className="text-slate-400 text-xs block mt-1">USD / Month</span>
                            </div>
                            <ul className="space-y-4 text-sm text-slate-300 mb-8 border-t border-slate-800/80 pt-6">
                                <li className="flex items-center gap-3">
                                    <span className="text-violet-400 font-bold">✓</span> <strong>2 active requests at a time</strong>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-violet-400 font-bold">✓</span> Priority daily updates
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-violet-400 font-bold">✓</span> Senior tech lead & designer
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-violet-400 font-bold">✓</span> Dedicated Slack channel
                                </li>
                                <li className="flex items-center gap-3 text-indigo-300 font-medium">
                                    <span className="text-violet-400 font-bold">✓</span> PAUSE OR CANCEL ANYTIME
                                </li>
                            </ul>
                        </div>
                        <a
                            href="https://checkout.revolut.com/pay/f49a98fa-4a9f-490a-80b3-51e612f829bf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3.5 rounded-xl transition-all block"
                        >
                            Start Monthly Pro
                        </a>
                    </div>
                </div>
            </section>

            {/* 6. CONTACT / GET IN TOUCH SECTION */}
            <section id="contact" className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-900">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
                            Get In Touch
                        </h2>
                        <h3 className="text-3xl font-extrabold text-white mb-4">
                            Have questions before subscribing?
                        </h3>
                        <p className="text-slate-400 text-sm mb-8">
                            Let’s discuss your project scope, developer availability, or custom feature requirements.
                        </p>

                        <div className="space-y-6 mb-10">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 font-bold">
                                    ✉
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 block">Email Us</span>
                                    <a href="mailto:contact@getapexdesk.com" className="text-white font-medium hover:text-violet-400 transition-colors">
                                        contact@getapexdesk.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                            <h4 className="text-sm font-bold text-white mb-4">What happens next?</h4>
                            <ol className="space-y-3">
                                <li className="flex items-center gap-3 text-xs text-slate-300">
                                    <span className="w-5 h-5 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center text-[10px]">1</span>
                                    We review your project requirements and technical scope.
                                </li>
                                <li className="flex items-center gap-3 text-xs text-slate-300">
                                    <span className="w-5 h-5 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center text-[10px]">2</span>
                                    Match you with a dedicated senior full-stack developer.
                                </li>
                                <li className="flex items-center gap-3 text-xs text-slate-300">
                                    <span className="w-5 h-5 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center text-[10px]">3</span>
                                    Start shipping your first feature updates within 48 hours.
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                                    <input type="text" required placeholder="Alex Morgan" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                                    <input type="email" required placeholder="alex@company.com" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">Website or Project URL</label>
                                <input type="url" placeholder="https://yourcompany.com" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500" />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">Message / Scope Overview *</label>
                                <textarea rows={4} required placeholder="Tell us about the features or app you want built..." className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"></textarea>
                            </div>

                            <button type="submit" className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-violet-600/20">
                                Send Message
                            </button>
                            <p className="text-[11px] text-center text-slate-500 mt-2">
                                We usually respond within 12-24 hours on business days.
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* 7. FREQUENTLY ASKED QUESTIONS */}
            <section id="faq" className="max-w-4xl mx-auto px-6 py-24 border-t border-slate-900">
                <div className="text-center mb-16">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
                        Clear Answers
                    </h2>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white">
                        Frequently Asked Questions
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-slate-800 rounded-2xl bg-slate-900/40 overflow-hidden transition-all"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full p-6 text-left flex items-center justify-between font-bold text-white hover:text-violet-400 transition-colors"
                            >
                                <span>{faq.q}</span>
                                <span className="text-violet-400 text-xl font-mono ml-4">
                                    {openFaq === index ? '−' : '+'}
                                </span>
                            </button>
                            {openFaq === index && (
                                <div className="px-6 pb-6 text-sm text-slate-400 border-t border-slate-800/50 pt-4 leading-relaxed">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* 8. FOOTER */}
            <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                <div>
                    © {new Date().getFullYear()} ApexDesk LLC. All rights reserved.
                </div>
                <div className="flex items-center gap-6">
                    <a href="mailto:contact@getapexdesk.com" className="hover:text-slate-300 transition-colors">
                        contact@getapexdesk.com
                    </a>
                    <button onClick={() => setView('terms')} className="hover:text-slate-300 transition-colors">Terms of Service</button>
                    <button onClick={() => setView('privacy')} className="hover:text-slate-300 transition-colors">Privacy Policy</button>
                </div>
            </footer>
        </div>
=======
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
>>>>>>> 2fa57eb392706c605446da7f8d262420f8d994ab
    );
}