const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

// A bare date like 2026-09-12 parses as UTC midnight, which shifts a day in western time zones.
function toLocalDate(isoDate) {
    return DATE_ONLY_PATTERN.test(isoDate) ? new Date(`${isoDate}T00:00:00`) : new Date(isoDate);
}

export function formatDate(isoDate) {
    return DATE_FORMATTER.format(toLocalDate(isoDate));
}
