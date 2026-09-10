const SPINNER_SIZE_CLASS_NAME = {
    small: 'w-4 h-4 border-2',
    large: 'w-10 h-10 border-4',
};

export function Spinner({ size = 'small', label = 'Loading' }) {
    return (
        <span
            role="status"
            aria-label={label}
            className={`inline-block shrink-0 rounded-full border-current border-t-transparent animate-spin ${SPINNER_SIZE_CLASS_NAME[size]}`}
        />
    );
}
