import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import useFilterForm from "../../hooks/useFilterForm";

const ActiveFilters = () => {
  const { searchParams, removeFilter } = useFilterForm();

  const hasActiveFilters = () => {
    return (
      searchParams.has("minPrice") ||
      searchParams.has("maxPrice") ||
      searchParams.has("rating") ||
      searchParams.has("featured")
    );
  };

  if (!hasActiveFilters()) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {searchParams.has("minPrice") && (
        <FilterBadge
          label={`Min: $${searchParams.get("minPrice")}`}
          onRemove={() => removeFilter("minPrice")}
        />
      )}

      {searchParams.has("maxPrice") && (
        <FilterBadge
          label={`Max: $${searchParams.get("maxPrice")}`}
          onRemove={() => removeFilter("maxPrice")}
        />
      )}

      {searchParams.has("rating") && (
        <FilterBadge
          label={`${searchParams.get("rating")}★ and up`}
          onRemove={() => removeFilter("rating")}
        />
      )}

      {searchParams.has("featured") && (
        <FilterBadge label="Featured" onRemove={() => removeFilter("featured")} />
      )}
    </div>
  );
};

// Helper component for filter badges
interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
}

const FilterBadge = ({ label, onRemove }: FilterBadgeProps) => {
  return (
    <Badge variant="secondary" className="px-2 py-1 flex items-center">
      <span>{label}</span>
      <Button
        type="button" // Add this to prevent form submission
        onClick={(e) => {
          e.preventDefault(); // Prevent event bubbling
          e.stopPropagation(); // Stop propagation
          onRemove();
        }}
        variant="ghost"
        size="sm"
        className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
      >
        <X className="h-3 w-3 text-gray-500 hover:text-red-500" />
      </Button>
    </Badge>
  );
};

export default ActiveFilters;
