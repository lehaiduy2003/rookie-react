import { useEffect, useState } from "react";

/**
 * This value can be used in the component to conditionally render elements
 * or apply styles based on the media query
 * This is useful for responsive design, where the layout or styles need to change
 * based on the screen size or orientation
 * This allows the component to be more flexible and adapt to different devices
 * and screen sizes, improving the user experience
 * and making the component more accessible
 * @param query The media query string to match against
 * @returns A boolean value indicating whether the media query matches or not
 */
export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    // a function to handle the change event
    // and update the state with the new value
    // This function will be called when the media query matches or unmatches
    // and will update the state accordingly
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    // Check if the matchMedia is compatible with the current browser
    const result = matchMedia(query);
    // Add the event listener to listen for changes in the media query
    // This will call the onChange function whenever the media query matches or unmatches
    // and will update the state accordingly
    result.addEventListener("change", onChange);
    // Set the initial value based on the current state of the media query
    // This will set the state to true if the media query matches, or false if it doesn't
    // This is useful for the initial render, so that the component can use the correct value
    // without waiting for the event listener to be triggered
    setValue(result.matches);

    // Cleanup function to remove the event listener
    // This will prevent memory leaks and ensure that the event listener is removed
    // when the component unmounts or the query changes
    // This is important to avoid having multiple event listeners for the same media query
    // which could cause performance issues or unexpected behavior
    return () => result.removeEventListener("change", onChange);
  }, [query]);

  // return the current value of the media query
  // This will be true if the media query matches, or false if it doesn't
  return value;
}
