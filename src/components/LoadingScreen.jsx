import { Spinner } from './Spinner.jsx';

export function LoadingScreen({ message = 'Loading...' }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-400 flex flex-col items-center justify-center gap-4 font-sans">
            <span className="text-violet-500">
                <Spinner size="large" label={message} />
            </span>
            <p className="text-sm">{message}</p>
        </div>
    );
}
