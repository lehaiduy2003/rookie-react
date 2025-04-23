import { Rating } from "@/types/Rating";
import ReviewItem from "./ReviewItem";

interface ReviewListProps {
  ratings: Rating[];
}

const ReviewList = ({ ratings }: ReviewListProps) => {
  return (
    <div className="p-4 border rounded-lg mt-4">
      {ratings && ratings.length > 0 ? (
        <div className="space-y-4">
          {ratings.map((rating, index) => (
            <ReviewItem key={index} rating={rating} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews yet.</p>
          <p className="mt-2">Be the first to review this product!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
