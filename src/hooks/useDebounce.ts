import { useEffect, useState } from "react";

/**
 * A custom hook that debounces a value.
 * It delays updating the debounced value until after a specified delay.
 * This is useful for optimizing performance by reducing the number of updates
 * to a value that may change frequently, such as user input.
 * @param value value to be debounced
 * @param delay delay in milliseconds
 * @returns debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    // Cleanup function to clear the timeout if the value or delay changes
    // This prevents the previous timeout from executing if the value or delay changes
    // before the timeout is reached, ensuring that the debounced value is always
    // updated correctly based on the latest value and delay
    // This is important to avoid having multiple timeouts running at the same time
    // which could cause performance issues or unexpected behavior
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
