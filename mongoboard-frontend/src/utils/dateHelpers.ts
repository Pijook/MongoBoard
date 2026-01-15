import { format } from 'date-fns';

export const formatTaskDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy');
  } catch {
    return dateString;
  }
};

export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
};
