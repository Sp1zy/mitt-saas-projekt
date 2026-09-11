import { Link } from 'react-router';

export function SiteHeader({ children }) {
    return (
        <header className="border-b border-slate-800 sticky top-0 bg-slate-950/80 backdrop-blur-md z-50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-indigo-500/25">
                        A
                    </div>
                    <span className="font-extrabold text-2xl tracking-tight text-white">ApexDesk</span>
                </Link>
                <div className="flex items-center gap-3">{children}</div>
            </div>
        </header>
    );
}
