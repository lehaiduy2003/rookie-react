import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import { CreatedBy } from "@/types/CreatedBy";
import { getFullName } from "@/utils/userDataFormat";
interface OwnerSectionProps {
  createdBy: CreatedBy;
}

const OwnerSection = ({ createdBy }: OwnerSectionProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold mb-4">Product Owner</h3>
      <div className="flex items-center p-4 border rounded-lg bg-gray-50">
        <UserAvatar
          imageUrl={createdBy.avatar}
          firstName={createdBy.firstName}
          lastName={createdBy.lastName}
        />
        <div className="ml-4">
          <div className="font-medium">{getFullName(createdBy.firstName, createdBy.lastName)}</div>
        </div>
        {createdBy.id && (
          <Button variant="outline" size="sm" className="ml-auto">
            View Seller Profile
          </Button>
        )}
      </div>
    </>
  );
};

export default OwnerSection;
