import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserDetail } from "@/types/UserDetail";
import { distanceToNow } from "@/utils/dateUtil";

const CustomerBasicInfo = ({ customer }: { customer: UserDetail }) => {
  return (
    <>
      {/*Avatar and active status section */}
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${customer.firstName} ${customer.lastName}`}
          />
          <AvatarFallback>
            {customer.firstName?.[0]}
            {customer.lastName?.[0]}
          </AvatarFallback>
        </Avatar>

        {/* Customer name and email section */}
        <div className="text-center">
          <h3 className="text-xl font-medium">
            {customer.firstName} {customer.lastName}
          </h3>
          <p className="text-muted-foreground">{customer.email}</p>
          {/* Active status badge */}
          {customer.isActive ? (
            <Badge className="mt-1 bg-green-500">Active</Badge>
          ) : (
            <Badge className="mt-1 bg-gray-500">Inactive</Badge>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {/* Customer ID and Phone section */}
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[200px]">
            <h4 className="font-medium text-muted-foreground">Customer ID</h4>
            <p>{customer.id}</p>
          </div>
          <div className="flex-1 min-w-[200px]">
            <h4 className="font-medium text-muted-foreground">Phone</h4>
            <p>{customer.phoneNumber || "—"}</p>
          </div>
        </div>

        {/* Address section */}
        <div className="w-full">
          <h4 className="font-medium text-muted-foreground">Address</h4>
          <p>{customer.address || "—"}</p>
        </div>

        {/* Dates section */}
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[200px]">
            <h4 className="font-medium text-muted-foreground">Created On</h4>
            <p>{customer.createdOn ? distanceToNow(new Date(customer.createdOn)) : "—"}</p>
          </div>
          <div className="flex-1 min-w-[200px]">
            <h4 className="font-medium text-muted-foreground">Last Updated</h4>
            <p>{customer.updatedOn ? distanceToNow(new Date(customer.updatedOn)) : "—"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerBasicInfo;
