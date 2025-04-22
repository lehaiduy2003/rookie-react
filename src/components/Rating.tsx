import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  avgRating: number;
  ratingCount: number;
}

/**
 * Renders star icons based on the average rating
 * Supports half-star display by rounding to the nearest 0.5
 *
 * Examples:
 * - 4.2 -> 4.0 stars (4 full, 0 half)
 * - 4.3 -> 4.5 stars (4 full, 1 half)
 * - 3.7 -> 3.5 stars (3 full, 1 half)
 *
 * @param avgRating - The average rating to display (0-5)
 * @returns An array of star components
 */
const renderStars = (avgRating: number) => {
  const stars = [];

  // Round to nearest 0.5
  // Multiply by 2, round to integer, then divide by 2
  // E.g., 4.3 * 2 = 8.6 → round → 9 → 9/2 = 4.5
  const roundedToHalf = Math.round(avgRating * 2) / 2;
  // Get the integer part (full stars)
  const fullStars = Math.floor(roundedToHalf);
  // Determine if we need a half star
  // If the rounded value has .5 decimal, we need a half star
  const hasHalfStar = roundedToHalf % 1 !== 0;

  // Add filled stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
  }

  // Add half star if needed
  if (hasHalfStar) {
    stars.push(<StarHalf key="half-star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
  }

  // Add empty stars to complete the 5-star display
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
  }

  return stars;
};

/**
 * Rating component that displays stars based on average rating
 * Shows either star rating + review count or "No ratings yet" message
 */
const Rating = ({ avgRating, ratingCount }: RatingProps) => {
  return (
    <div className="text-sm text-muted-foreground mt-1">
      {ratingCount > 0 ? (
        // Display stars and review count when ratings exist
        <div className="flex items-center">
          {/* Star rating display */}
          <div className="flex">{renderStars(avgRating)}</div>
          {/* Review count */}
          <span className="ml-1">({ratingCount} reviews)</span>
        </div>
      ) : (
        <span>No ratings yet</span>
      )}
    </div>
  );
};

export default Rating;
