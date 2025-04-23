import Rating from "@/components/Rating";
import UserAvatar from "@/components/UserAvatar";
import { Rating as RatingType } from "@/types/Rating";
import { distanceToNow } from "@/utils/dateFormat";
import { getFullName } from "@/utils/userDataFormat";

interface ReviewItemProps {
  rating: RatingType;
}

const ReviewItem = ({ rating }: ReviewItemProps) => {
  const imageUrl = rating.customer.avatar;
  const firstName = rating.customer.firstName;
  const lastName = rating.customer.lastName;
  const customerFullName = getFullName(firstName, lastName);
  const timeDistance = distanceToNow(new Date(rating.createdOn));
  return (
    <>
      <div className="border-b pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
              {rating.customer.avatar}
            </div> */}
            <UserAvatar imageUrl={imageUrl} firstName={firstName} lastName={lastName} />
            <div className="ml-3">
              <div className="font-medium">{customerFullName}</div>
              <Rating avgRating={rating.score} />
            </div>
          </div>
          <div className="text-sm text-gray-500">{timeDistance}</div>
        </div>
        <p className="mt-2 text-gray-700">{rating.comment}</p>
      </div>
    </>
  );
};

export default ReviewItem;
