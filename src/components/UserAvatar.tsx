import { getInitials } from "@/utils/userDataFormat";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  firstName: string;
  lastName: string;
  imageUrl?: string;
}

const UserAvatar = ({ firstName, lastName, imageUrl }: UserAvatarProps) => {
  return (
    <Avatar className="w-10 h-10 border border-gray-300 rounded-full">
      {imageUrl && <AvatarImage src={imageUrl} alt={`${firstName} ${lastName}`} />}
      <AvatarFallback className="bg-gray-200 text-gray-500 rounded-full h-full w-full flex items-center justify-center">
        {getInitials(firstName, lastName)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
