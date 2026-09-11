const BASE_INPUT_CLASS_NAME =
    'w-full px-4 py-3 rounded-xl bg-slate-950 border text-slate-100 text-sm placeholder:text-slate-600 ' +
    'focus:outline-none focus:ring-2 transition-all';

export const INPUT_CLASS_NAME = `${BASE_INPUT_CLASS_NAME} border-slate-800 focus:border-violet-500 focus:ring-violet-500/20`;

export const INVALID_INPUT_CLASS_NAME = `${BASE_INPUT_CLASS_NAME} border-red-500/60 focus:border-red-500 focus:ring-red-500/20`;

export const LABEL_CLASS_NAME = 'block text-xs font-semibold uppercase tracking-widest text-slate-500';

export const PRIMARY_BUTTON_CLASS_NAME =
    'bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold ' +
    'px-6 py-3 rounded-xl transition-all shadow-xl shadow-indigo-600/25 active:scale-95';

export const SECONDARY_BUTTON_CLASS_NAME =
    'border border-slate-800 hover:border-slate-600 text-slate-300 font-semibold px-5 py-2.5 rounded-xl ' +
    'transition-all bg-slate-900/80 active:scale-95';
