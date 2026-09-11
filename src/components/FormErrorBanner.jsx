export function FormErrorBanner({ message }) {
    if (!message) return null;
    return (
        <p role="alert" className="px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
            {message}
        </p>
    );
}
