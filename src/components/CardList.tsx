import { ReactNode } from "react";
import Spinning from "./Spinning";

interface CardListProps<T> {
  /**
   * Array of items to render as cards
   */
  items: T[];
  /**
   * Function to render each card item - allows custom rendering
   * @param item - The item to render
   * @param index - The index of the item in the array
   */
  renderItem: (item: T, index: number) => ReactNode;
  /**
   * Optional CSS class name for styling the card list container
   */
  className?: string;

  /**
   * Optional function to get a unique key for each item
   * @param item - The item to get a key for
   */
  keyExtractor?: (item: T) => string | number;

  /**
   * Optional loading state indicator
   */
  isLoading?: boolean;

  /**
   * Optional message to display when there are no items
   */
  emptyMessage?: string;
}

/**
 * A reusable component for displaying a list of items as cards
 * It accepts generic type parameter T to work with any data type
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const CardList = <T extends unknown>({
  items,
  renderItem,
  className = "",
  keyExtractor,
  isLoading = false,
  emptyMessage = "No items found",
}: CardListProps<T>) => {
  // Check if items are loading
  // If loading, show a spinner
  if (isLoading) {
    return <Spinning />;
  }

  // Check if items are empty
  // If empty, show a message
  // If no items are provided, show the empty message
  if (!items || items.length === 0) {
    return <div className="text-center p-8 text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div className={`flex flex-wrap -mx-2 ${className}`}>
      {/* Map through the items and render each one using the provided renderItem function */}
      {items.map((item, index) => (
        <div
          // Use the keyExtractor function to get a unique key for each item
          // If no keyExtractor is provided, use the index as the key
          key={keyExtractor ? keyExtractor(item) : index}
          className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
        >
          {/* Render the item using the provided renderItem function */}
          <div className="h-full">{renderItem(item, index)}</div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
