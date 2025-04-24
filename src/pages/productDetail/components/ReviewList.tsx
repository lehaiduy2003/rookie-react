import { Rating } from "@/types/Rating";
import ReviewItem from "./ReviewItem";
import useAuthStore from "@/stores/authStore";
import Review from "./Review";

interface ReviewListProps {
  productId: string;
  ratings: Rating[];
}

const ReviewList = ({ ratings, productId }: ReviewListProps) => {
  const userDetail = useAuthStore((state) => state.userDetail);
  const id = userDetail?.id;
  const role = userDetail?.role;

  // Remove this early return - this is causing your issue!
  // if (id !== undefined && role !== undefined) {
  //   return <Review productId={productId} userId={id?.toString()}></Review>;
  // }

  const canReview = id !== undefined && role !== undefined && role === "CUSTOMER";

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

      {/* Review Form Section */}
      {canReview ? (
        <Review productId={productId} userId={id?.toString()} />
      ) : (
        <div className="text-center py-4 bg-gray-50 rounded-lg mb-6">
          <p className="text-gray-500">Please log in as a customer to leave a review.</p>
        </div>
      )}

      {/* Review List Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-4">Product Reviews</h3>

        <div className="space-y-4">
          {ratings && ratings.length > 0 ? (
            ratings.map((rating, index) => <ReviewItem key={index} rating={rating} />)
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No reviews yet.</p>
              <p className="mt-2">Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
