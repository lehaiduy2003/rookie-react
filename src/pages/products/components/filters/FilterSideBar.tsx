import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PriceRangeFilter from "./PriceRangeFilter";
import { RatingFilter } from "./RatingFilter";
import FeaturedFilter from "./FeaturedFilter";
import useFilterForm from "../../hooks/useFilterForm";
import ActiveFilters from "./ActiveFilters"; // Make sure this import matches your export
import CategoryFilter from "./CategoryFilter";

const FilterSideBar = () => {
  const { form, handleSubmit, onSubmit, clearFilters, countActiveFilters, watch, setValue } =
    useFilterForm();

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Filters</CardTitle>
          {countActiveFilters() > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
              Clear all
            </Button>
          )}
        </div>

        {/* Active filters display */}
        <ActiveFilters />
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Category Filter */}
          <CategoryFilter watch={watch} setValue={setValue} />

          {/* Price Range Filter */}
          <PriceRangeFilter form={form} />

          <Separator />

          {/* Rating Filter */}
          <RatingFilter watch={watch} setValue={setValue} />

          <Separator />

          {/* Featured Filter */}
          <FeaturedFilter watch={watch} setValue={setValue} />

          <Button
            type="submit"
            className="w-full bg-mainOrange hover:bg-mainOrange/90"
            onClick={() => {
              console.log("Form submitted with values:", form.getValues());
              console.log("Watch values:", watch());
            }}
          >
            Apply Filters
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FilterSideBar;
