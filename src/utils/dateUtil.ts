/**
 * This function takes a date object and returns a string representing the time difference
 * between the current date and the provided date in a human-readable format.
 * It calculates the difference in seconds, minutes, hours, and days, and returns the
 * appropriate string based on the largest time unit that is greater than zero.
 * @param date - The date to compare with the current date.
 * @returns {string} - A string representing the time difference in a human-readable format.
 */
export const distanceToNow = (date: Date): string => {
  const now = new Date();
  // Calculate the difference in seconds, minutes, hours, and days
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else {
    return `${diffInDays} days ago`;
  }
};
