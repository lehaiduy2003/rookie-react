import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { FilterFormValues } from "@/types/FilterFormValues";

interface RatingFilterProps {
  watch: UseFormWatch<FilterFormValues>;
  setValue: UseFormSetValue<FilterFormValues>;
}

export const RatingFilter = ({ watch, setValue }: RatingFilterProps) => {
  return (
    <div className="space-y-3">
      <h3 className="font-medium">Customer Rating</h3>
      <RadioGroup
        value={watch("rating")?.toString()}
        onValueChange={(value) => setValue("rating", parseInt(value))}
        className="flex flex-col space-y-2"
      >
        <RatingOption value="1" label="1 star and up" stars={1} />
        <RatingOption value="2" label="2 stars and up" stars={2} />
        <RatingOption value="3" label="3 stars and up" stars={3} />
        <RatingOption value="4" label="4 stars and up" stars={4} />
      </RadioGroup>
    </div>
  );
};

// Helper component for rating options
interface RatingOptionProps {
  value: string;
  label: string;
  disabled?: boolean;
  stars?: number;
}

const RatingOption = ({ value, label, stars }: RatingOptionProps) => (
  <div className={`flex items-center space-x-2`}>
    <RadioGroupItem value={value} id={`rating-${value}`} />
    <Label htmlFor={`rating-${value}`} className="cursor-pointer flex items-center">
      {stars ? (
        <span className="text-yellow-500 mr-1">{Array(stars).fill("★").join("")}</span>
      ) : null}
      {label}
    </Label>
  </div>
);
