import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AddButtonProps {
  linkRef: string;
  label: string;
}

const AddButton = ({ linkRef, label }: AddButtonProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-auto hidden h-8 lg:flex text-mainOrange hover:text-mainOrange/80"
    >
      <Link to={linkRef}>{label}</Link>
    </Button>
  );
};

export default AddButton;
