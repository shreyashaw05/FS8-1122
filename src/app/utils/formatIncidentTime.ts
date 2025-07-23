import { format } from 'date-fns';

export function formatIncidentTime(tsStart: string, tsEnd: string) {
  try {
    const start = new Date(tsStart);
    const end = new Date(tsEnd);
    const dateStr = format(start, 'dd-MMM-yyyy');
    const startTime = format(start, 'HH:mm');
    const endTime = format(end, 'HH:mm');
    return `${startTime} - ${endTime} on ${dateStr}`;
  } catch {
    return `${tsStart} - ${tsEnd}`;
  }
}
