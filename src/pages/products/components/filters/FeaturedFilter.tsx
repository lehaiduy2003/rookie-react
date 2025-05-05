import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { FilterFormValues } from "@/types/FilterFormValues";

interface FeaturedFilterProps {
  watch: UseFormWatch<FilterFormValues>;
  setValue: UseFormSetValue<FilterFormValues>;
}

const FeaturedFilter = ({ watch, setValue }: FeaturedFilterProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="featured"
        checked={watch("featured")}
        onCheckedChange={(checked) => {
          setValue("featured", checked === true);
        }}
      />
      <Label htmlFor="featured" className="text-sm font-medium leading-none cursor-pointer">
        Show Featured Products Only
      </Label>
    </div>
  );
};

export default FeaturedFilter;
