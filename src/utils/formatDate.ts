export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds === 0) {
    return 'Just now';
  }

  if (diffInSeconds < 0) {
    return 'In the future';
  }

  const intervals = [
    { seconds: 31536000, label: 'year' },
    { seconds: 2592000, label: 'month' },
    { seconds: 604800, label: 'week' },
    { seconds: 86400, label: 'day' },
    { seconds: 3600, label: 'hour' },
    { seconds: 60, label: 'minute' },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
}
