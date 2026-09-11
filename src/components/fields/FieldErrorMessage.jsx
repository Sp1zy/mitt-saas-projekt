export function FieldErrorMessage({ id, message }) {
    if (!message) return null;
    return (
        <p id={id} role="alert" className="mt-2 text-xs text-red-400">
            {message}
        </p>
    );
}
