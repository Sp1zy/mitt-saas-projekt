import React, { useState } from 'react';

const ENGINEERS = [
    {
        id: 1,
        name: 'Zainab J.',
        initial: 'J',
        role: 'Lead AI & Automation Engineer',
        category: 'ai',
        availability: 'Available for Sprints',
        stack: ['Python', 'React', 'Flask', 'Grok SDK', 'Electron'],
        deliverables: [
            'Built multi-OS CRM desktop architecture integrated with custom AI agents.',
            'Designed NLP and computer vision pipelines for automated data extraction.'
        ]
    },
    {
        id: 2,
        name: 'Zainab J.',
        initial: 'Z',
        role: 'Full-Stack Web Application Developer',
        category: 'fullstack',
        availability: 'Available for Sprints',
        stack: ['JavaScript', 'Python', 'WordPress', 'HTML/CSS', 'Full-Stack Development'],
        deliverables: [
            'Built responsive websites and full-stack web solutions, including frontend development, backend development, API integration, and custom WordPress development.',
            'Developed Python and AI-powered automation workflows for website auditing, e-commerce product/image processing, asset generation, and document sourcing.'
        ]
    }
];

export default function DevPortfolioGrid() {
    const [filter, setFilter] = useState('all');

    const filteredEngineers = ENGINEERS.filter((eng) => {
        if (filter === 'ai') return eng.category === 'ai';
        if (filter === 'fullstack') return eng.category === 'fullstack';
        return true;
    });

    return (
        <div className="w-full text-slate-100">
            {/* FILTER BUTTONS */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${filter === 'all'
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                            : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
                        }`}
                >
                    All Engineers
                </button>
                <button
                    onClick={() => setFilter('ai')}
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${filter === 'ai'
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                            : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
                        }`}
                >
                    AI & Automation
                </button>
                <button
                    onClick={() => setFilter('fullstack')}
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${filter === 'fullstack'
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                            : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
                        }`}
                >
                    Full-Stack
                </button>
            </div>

            {/* CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredEngineers.map((engineer) => (
                    <div
                        key={engineer.id}
                        className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/40 transition-all flex flex-col justify-between"
                    >
                        <div>
                            {/* Header Info */}
                            <div className="flex items-start justify-between gap-4 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 font-bold text-xl flex items-center justify-center">
                                        {engineer.initial}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white leading-snug">
                                            {engineer.name}
                                        </h3>
                                        <p className="text-xs font-medium text-violet-400">
                                            {engineer.role}
                                        </p>
                                    </div>
                                </div>

                                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                                    {engineer.availability}
                                </span>
                            </div>

                            {/* Core Tech Stack */}
                            <div className="mb-6">
                                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-3">
                                    Core Tech Stack
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {engineer.stack.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-300 text-xs font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Proven Deliverables */}
                            <div className="mb-8">
                                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-3">
                                    Proven Deliverables
                                </p>
                                <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
                                    {engineer.deliverables.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-violet-400 font-bold mt-0.5">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Action CTA */}
                        <a
                            href="#pricing"
                            className="w-full text-center bg-slate-800 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl transition-all border border-slate-700/50 hover:border-indigo-500 text-sm block"
                        >
                            Reserve Sprint Capacity with {engineer.name.split(' ')[0]}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}