import { format, parseISO } from "date-fns";

export function formatDate(
  date: string | Date,
  formatStr: string = "MMM dd, yyyy hh:mm a"
): string {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch (error) {
    console.error("Date formatting error:", error);
    return "Invalid date";
  }
}

export function formatDateShort(date: string | Date): string {
  return formatDate(date, "MMM dd, yyyy");
}

export function formatDateTime(date: string | Date): string {
  return formatDate(date, "MMM dd, yyyy hh:mm a");
}
