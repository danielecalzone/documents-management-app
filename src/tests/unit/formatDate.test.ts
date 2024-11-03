import { formatRelativeDate } from '../../../src/utils/formatDate';

describe('formatRelativeDate Utility', () => {
  it('should format string dates as "1 day ago" if within the past day', () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const dateString = date.toISOString();

    const result = formatRelativeDate(dateString);
    expect(result).toBe('1 day ago');
  });

  it('should format string dates correctly for "just now"', () => {
    const dateString = new Date().toISOString();
    const result = formatRelativeDate(dateString);
    expect(result).toBe('Just now');
  });

  it('should format string dates as "2 days ago" for dates two days ago', () => {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    const dateString = date.toISOString();

    const result = formatRelativeDate(dateString);
    expect(result).toBe('2 days ago');
  });

  it('should format future dates correctly', () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const dateString = date.toISOString();

    const result = formatRelativeDate(dateString);
    expect(result).toBe('In the future');
  });

  it('should format string dates as "1 hour ago" for dates one hour ago', () => {
    const date = new Date();
    date.setHours(date.getHours() - 1);
    const dateString = date.toISOString();

    const result = formatRelativeDate(dateString);
    expect(result).toBe('1 hour ago');
  });

  it('should format string dates as "3 hours ago" for dates three hours ago', () => {
    const date = new Date();
    date.setHours(date.getHours() - 3);
    const dateString = date.toISOString();

    const result = formatRelativeDate(dateString);
    expect(result).toBe('3 hours ago');
  });

  it('should format string dates as "1 minute ago" for dates one minute ago', () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 1);
    const dateString = date.toISOString();

    const result = formatRelativeDate(dateString);
    expect(result).toBe('1 minute ago');
  });

  it('should format string dates as "5 minutes ago" for dates five minutes ago', () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 5);
    const dateString = date.toISOString();

    const result = formatRelativeDate(dateString);
    expect(result).toBe('5 minutes ago');
  });

  it('should format string dates as "1 month ago" for dates one month ago', () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const dateString = date.toISOString();

    const result = formatRelativeDate(dateString);
    expect(result).toBe('1 month ago');
  });

  it('should format string dates as "2 months ago" for dates two months ago', () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 2);
    const dateString = date.toISOString();

    const result = formatRelativeDate(dateString);
    expect(result).toBe('2 months ago');
  });

  it('should format string dates as "1 year ago" for dates one year ago', () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const dateString = date.toISOString();

    const result = formatRelativeDate(dateString);
    expect(result).toBe('1 year ago');
  });

  it('should format string dates as "3 years ago" for dates three years ago', () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 3);
    const dateString = date.toISOString();

    const result = formatRelativeDate(dateString);
    expect(result).toBe('3 years ago');
  });

  it('should handle invalid date strings gracefully', () => {
    const dateString = 'invalid-date-string';
    const result = formatRelativeDate(dateString);
    expect(result).toBe('Invalid date');
  });

  it('should handle edge cases around daylight saving time', () => {
    const date = new Date();
    date.setHours(date.getHours() - 24);
    const dateString = date.toISOString();

    const result = formatRelativeDate(dateString);
    expect(result).toBe('1 day ago');
  });
});
