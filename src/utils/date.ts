// Date formatting utilities with robust parsing for various backend date strings

export type DateInput = string | number | Date | null | undefined;

function pad2(value: number): string {
	return value < 10 ? `0${value}` : String(value);
}

/**
 * Attempts to parse a variety of date/time strings into a Date object.
 * Handles formats like:
 * - '2025-08-18'
 * - '2025-08-18 00:00:00'
 * - '2025-08-18T00:00:00Z'
 * - '2025-08-18T00:00:00.000000Z'
 */
export function parseToDate(input: DateInput): Date | null {
	if (!input) return null;
	if (input instanceof Date) return isNaN(input.getTime()) ? null : input;

	const raw = String(input).trim();
	if (!raw) return null;

	// If it's only a date (YYYY-MM-DD)
	const dateOnlyMatch = /^\d{4}-\d{2}-\d{2}$/.test(raw);
	if (dateOnlyMatch) {
		const [y, m, d] = raw.split('-').map(Number);
		return new Date(y, m - 1, d);
	}

	// Normalize common variants
	let normalized = raw.replace(' ', 'T');
	// Trim microseconds to milliseconds if present (e.g., .000000Z → .000Z)
	normalized = normalized.replace(/\.\d{6}Z$/, '.000Z');
	// If still not ISO, try appending Z to treat as UTC when it looks like a full timestamp
	if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(normalized)) {
		normalized = `${normalized}Z`;
	}

	const date = new Date(normalized);
	return isNaN(date.getTime()) ? null : date;
}

/** Formats a date as dd/MM/yyyy (Italian style). */
export function formatDateIT(input: DateInput): string {
	const d = parseToDate(input);
	if (!d) return '';
	return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;
}

/** Formats date and time as dd/MM/yyyy HH:mm. */
export function formatDateTimeIT(input: DateInput): string {
	const d = parseToDate(input);
	if (!d) return '';
	return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}


