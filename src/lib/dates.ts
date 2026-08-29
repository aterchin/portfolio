const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export interface DateParts {
  year: number;
  month: number; // 1–12
  day: number;
}

// Parse YYYY-MM-DD as a calendar date — not `new Date(iso)`, which is UTC
// midnight and can shift a day behind in US timezones.
export function parseISODate(iso: string): DateParts {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month, day };
}

export function formatLongDate(iso: string): string {
  const { year, month, day } = parseISODate(iso);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

export function formatLongDateOrdinal(iso: string): string {
  const { year, month, day } = parseISODate(iso);
  return `${MONTHS[month - 1]} ${ordinal(day)}, ${year}`;
}

export function isAfter(iso: string, comparedTo: string): boolean {
  return iso > comparedTo;
}

function ordinal(n: number): string {
  const rem100 = n % 100;
  if (rem100 >= 11 && rem100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}
