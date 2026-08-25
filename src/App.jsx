import React, { useState } from 'react';

export default function App() {
    const [isYearly, setIsYearly] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            q: 'How does the request queue work in practice?',
            a: 'Once subscribed, you get access to a private Trello/Slack board. You can add unlimited design or development tickets. We work through them sequentially, shipping updates every 48 hours.'
        },
        {
            q: 'What if I have a complex project that takes longer than 48 hours?',
            a: 'Large features (like a complete web app dashboard or custom database integration) are broken into clear 48-hour sprint milestones. You receive functional code updates every two days until completed.'
        },
        {
            q: 'How does subscription pausing work?',
            a: 'If you only have two weeks of work needed this month, pause your subscription on day 14. Your remaining balance stays locked in your account until you are ready to resume.'
        },
        {
            q: 'Who actually owns the code and intellectual property?',
            a: 'You hold 100% legal ownership of all source code, design files, custom scripts, and assets created during your subscription period upon payment.'

            q: 'What if I don`t like the final design or code implementation?'
            a: 'We offer unlimited revisions.Leave feedback directly on the pull request, Figma file, or staging link, and we will iterate until it meets your exact standards.'
        }
    ];

    return (
        <div className="min-h-screen bg-[#0E0E10] text-[#E4E4E7] font-sans antialiased selection:bg-orange-500 selection:text-white">

            {/* 1. Navigation Header */}
            <header className="border-b border-stone-800 sticky top-0 bg-[#0E0E10]/90 backdrop-blur-md z-50">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-bold text-lg text-white shadow-md shadow-orange-600/30 hover:scale-105 transition-transform">
                            A
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">ApexDesk</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-400">
                        <a href="#features" className="hover:text-orange-500 transition-colors">Why Us</a>
                        <a href="#pricing" className="hover:text-orange-500 transition-colors">Pricing</a>
                        <a href="#faq" className="hover:text-orange-500 transition-colors">FAQ</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="text-sm font-medium text-stone-300 hover:text-white transition-colors hidden sm:block">
                            Log in
                        </button>
                        <a
                            href="#pricing"
                            className="bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-md shadow-orange-600/20 active:scale-95 inline-block"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </header>

            {/* 2. Hero Section */}
            <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold mb-6">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                    Web Agency Subscription – No Hidden Fees
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                    Dedicated Web Developers & Designers for Your Business <span className="text-orange-500">At a Flat Monthly Rate.</span>
                </h1>

                <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                    Stop paying thousands in agency markups or dealing with unreliable freelancers. Get a dedicated, professional web developer to build, maintain, and scale your website.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <a href="#pricing" className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-orange-600/25 active:scale-95 text-center">
                        Book a Free Consultation
                    </a>
                    <a href="#features" className="w-full sm:w-auto border border-stone-800 hover:border-stone-700 text-stone-200 font-semibold px-8 py-3.5 rounded-xl transition-all bg-stone-900 shadow-sm active:scale-95 text-center">
                        View Pricing & Services
                    </a>
                </div>
            </section>

            {/* 3. Social Proof / Logos */}
            <section className="border-y border-stone-800/80 bg-stone-900/30 py-8">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-6">
                        Trusted by fast-growing companies and brands
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 text-stone-400 font-bold text-lg tracking-wider">
                        <span>NORDIC_LABS</span>
                        <span>VERTEX</span>
                        <span>AURA.IO</span>
                        <span>FLOWSPACE</span>
                        <span>KINETIC</span>
                    </div>
                </div>
            </section>

            {/* 4. Metrics Section */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800">
                        <p className="text-3xl font-extrabold text-orange-500">48h</p>
                        <p className="text-xs font-medium text-stone-400 mt-1">Average Turnaround</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800">
                        <p className="text-3xl font-extrabold text-white">100%</p>
                        <p className="text-xs font-medium text-stone-400 mt-1">Flat Monthly Rate</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800">
                        <p className="text-3xl font-extrabold text-orange-500">2-3x</p>
                        <p className="text-xs font-medium text-stone-400 mt-1">Faster than Traditional Agencies</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800">
                        <p className="text-3xl font-extrabold text-white">99.8/100</p>
                        <p className="text-xs font-medium text-stone-400 mt-1">PageSpeed Score</p>
                    </div>
                </div>
            </section>

            {/* 5. Features Section */}
            <section id="features" className="max-w-6xl mx-auto px-6 py-16 border-t border-stone-800/80">
                <div className="text-center mb-12">
                    <span className="text-orange-500 font-semibold text-xs tracking-widest uppercase">Why ApexDesk?</span>
                    <h2 className="text-3xl font-bold text-white mt-2">Build your website without bureaucracy</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-stone-900/50 border border-stone-800 p-6 rounded-2xl hover:border-orange-500/50 transition-all">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-xl mb-4">💰</div>
                        <h3 className="font-bold text-lg text-white mb-2">Flat Monthly Cost</h3>
                        <p className="text-stone-400 text-sm">No surprises or expensive hourly billing. You know exactly what your web development costs every month.</p>
                    </div>

                    <div className="bg-stone-900/50 border border-stone-800 p-6 rounded-2xl hover:border-orange-500/50 transition-all">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-xl mb-4">⚡</div>
                        <h3 className="font-bold text-lg text-white mb-2">Lightning Fast Delivery</h3>
                        <p className="text-stone-400 text-sm">Minor updates and new features are typically delivered within 48 hours directly to your codebase.</p>
                    </div>

                    <div className="bg-stone-900/50 border border-stone-800 p-6 rounded-2xl hover:border-orange-500/50 transition-all">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-xl mb-4">♾️</div>
                        <h3 className="font-bold text-lg text-white mb-2">Unlimited Requests</h3>
                        <p className="text-stone-400 text-sm">Add as many tasks or pages as you like to your queue. We work through them systematically one by one.</p>
                    </div>
                </div>
            </section>

            {/* 6. Pricing Section */}
            <section id="pricing" className="max-w-6xl mx-auto px-6 py-16 border-t border-stone-800/80">
                <div className="text-center mb-12">
                    <span className="text-orange-500 font-semibold text-xs tracking-widest uppercase">Transparent Pricing</span>
                    <h2 className="text-3xl font-bold text-white mt-2">Choose the plan that fits your growth</h2>
                    <p className="text-stone-400 text-sm mt-2">Pause or cancel your subscription at any time.</p>

                    {/* Toggle Billing */}
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <span className={`text-sm ${!isYearly ? 'text-white font-semibold' : 'text-stone-400'}`}>Monthly</span>
                        <button
                            onClick={() => setIsYearly(!isYearly)}
                            className="w-12 h-6 bg-stone-800 rounded-full p-1 transition-colors relative focus:outline-none"
                        >
                            <div className={`w-4 h-4 bg-orange-500 rounded-full transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                        <span className={`text-sm ${isYearly ? 'text-white font-semibold' : 'text-stone-400'}`}>
                            Yearly <span className="text-xs text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full font-bold">Save 20%</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Plan 1 */}
                    <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-8 flex flex-col justify-between hover:border-stone-700 transition-all">
                        <div>
                            <h3 className="text-xl font-bold text-white">Standard Web</h3>
                            <p className="text-stone-400 text-sm mt-1">Perfect for growing businesses needing ongoing updates and fresh designs.</p>
                            <div className="my-6">
                                <span className="text-4xl font-extrabold text-white">
                                    {isYearly ? '$24.99' : '$29.99'}
                                </span>
                                <span className="text-stone-400 text-sm"> / hr</span>
                            </div>
                            <ul className="space-y-3 text-sm text-stone-300 mb-8">
                                <li className="flex items-center gap-2">✓ Unlimited requests (one at a time)</li>
                                <li className="flex items-center gap-2">✓ Responsive web development (React/Tailwind)</li>
                                <li className="flex items-center gap-2">✓ UI/UX Design in Figma</li>
                                <li className="flex items-center gap-2">✓ Average 48-hour delivery</li>
                                <li className="flex items-center gap-2">✓ Pause or cancel anytime</li>
                            </ul>
                        </div>
                        <button className="w-full bg-stone-800 hover:bg-stone-700 text-white font-semibold py-3 rounded-xl transition-all">
                            Get Started with Standard
                        </button>
                    </div>

                    {/* Plan 2 (Featured) */}
                    <div className="bg-stone-900/90 border-2 border-orange-600 rounded-2xl p-8 shadow-xl shadow-orange-600/10 relative flex flex-col justify-between">
                        <div className="absolute -top-3 right-6 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Most Popular
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Pro & E-Commerce</h3>
                            <p className="text-stone-400 text-sm mt-1">For businesses requiring double output, custom integrations, or e-commerce.</p>
                            <div className="my-6">
                                <span className="text-4xl font-extrabold text-white">
                                    {isYearly ? '$34.99' : '$39.99'}
                                </span>
                                <span className="text-stone-400 text-sm"> / hr</span>
                            </div>
                            <ul className="space-y-3 text-sm text-stone-300 mb-8">
                                <li className="flex items-center gap-2">✓ <strong className="text-orange-400">2 active requests at a time</strong></li>
                                <li className="flex items-center gap-2">✓ Advanced e-commerce solutions & APIs</li>
                                <li className="flex items-center gap-2">✓ Priority support & dedicated Slack channel</li>
                                <li className="flex items-center gap-2">✓ SEO & Speed optimization included</li>
                                <li className="flex items-center gap-2">✓ Dedicated Senior Fullstack Developer</li>
                            </ul>
                        </div>
                        <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-orange-600/25">
                            Get Started with Pro
                        </button>
                    </div>
                </div>
            </section>

            {/* 7. FAQ Section */}
            <section id="faq" className="max-w-4xl mx-auto px-6 py-16 border-t border-stone-800/80">
                <div className="text-center mb-12">
                    <span className="text-orange-500 font-semibold text-xs tracking-widest uppercase">FAQ</span>
                    <h2 className="text-3xl font-bold text-white mt-2">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-stone-800 rounded-xl bg-stone-900/40 overflow-hidden">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full p-5 text-left font-semibold text-white flex justify-between items-center hover:bg-stone-800/40 transition-colors"
                            >
                                <span>{faq.q}</span>
                                <span className="text-orange-500 text-xl font-bold">
                                    {openFaq === index ? '−' : '+'}
                                </span>
                            </button>
                            {openFaq === index && (
                                <div className="p-5 pt-0 text-stone-400 text-sm border-t border-stone-800/50 mt-2">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* 8. Footer */}
            <footer className="border-t border-stone-800 bg-[#08080A] text-stone-400 py-12">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-orange-600 flex items-center justify-center font-bold text-xs text-white">
                            A
                        </div>
                        <span className="font-bold text-white tracking-tight">ApexDesk</span>
                        <span className="text-xs text-stone-500 ml-2">© {new Date().getFullYear()} All rights reserved.</span>
                    </div>

                    <div className="flex gap-6 text-stone-400">
                        <a href="#features" className="hover:text-white transition-colors">Why Us</a>
                        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                        <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
                    </div>
                </div>
            </footer>

        </div>
    );
}