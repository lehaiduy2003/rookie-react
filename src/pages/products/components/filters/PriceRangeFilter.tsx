import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilterFormValues } from "@/types/FilterFormValues";
import { UseFormReturn } from "react-hook-form";

interface PriceRangeFilterProps {
  form: UseFormReturn<FilterFormValues>;
}

const PriceRangeFilter = ({ form }: PriceRangeFilterProps) => {
  const { register, formState } = form;
  const { errors } = formState;

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Price Range</h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="minPrice">Min Price</Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="0"
            min={0}
            {...register("minPrice")}
            className={errors.minPrice ? "border-red-500" : ""}
          />
          {errors.minPrice && (
            <p className="text-xs text-red-500 mt-1">{errors.minPrice.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="maxPrice">Max Price</Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="1000"
            min={0}
            {...register("maxPrice")}
            className={errors.maxPrice ? "border-red-500" : ""}
          />
          {errors.maxPrice && (
            <p className="text-xs text-red-500 mt-1">{errors.maxPrice.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
