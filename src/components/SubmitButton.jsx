import { Spinner } from './Spinner.jsx';

export function SubmitButton({ isSubmitting, busyLabel, className, children }) {
    return (
        <button type="submit" disabled={isSubmitting} className={`inline-flex items-center justify-center gap-2 ${className}`}>
            {isSubmitting && <Spinner label={busyLabel} />}
            {isSubmitting ? busyLabel : children}
        </button>
    );
}
