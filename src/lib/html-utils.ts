export function readableDate(date?: number | Date | string) {
  if (!date) {
    return '';
  }

  return new Date(date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
