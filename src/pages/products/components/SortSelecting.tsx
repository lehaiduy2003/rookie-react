import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortOption {
  label: string;
  value: string;
  sortBy: string;
  sortDir: string;
}

// Available sort options with corresponding API parameters
const sortOptions: SortOption[] = [
  {
    label: "Price Low to High",
    value: "price-low-high",
    sortBy: "price",
    sortDir: "asc",
  },
  {
    label: "Price High to Low",
    value: "price-high-low",
    sortBy: "price",
    sortDir: "desc",
  },
  {
    label: "Newest",
    value: "newest",
    sortBy: "createdOn",
    sortDir: "desc",
  },
];

const SortSelecting = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Find current sort option based on URL params
  const currentSortBy = searchParams.get("sortBy") || "";
  const currentSortDir = searchParams.get("sortDir") || "";

  // Determine which option is currently selected based on sortBy and sortDir
  const getCurrentSortValue = () => {
    const selectedOption = sortOptions.find(
      (option) => option.sortBy === currentSortBy && option.sortDir === currentSortDir
    );
    return selectedOption ? selectedOption.value : "";
  };

  // Handle sort option change
  const handleSortChange = (value: string) => {
    const selectedOption = sortOptions.find((option) => option.value === value);

    if (selectedOption) {
      // Update URL parameters based on the selected option
      searchParams.set("sortBy", selectedOption.sortBy);
      searchParams.set("sortDir", selectedOption.sortDir);
      searchParams.set("page", "1"); // Reset to first page when sorting changes
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="flex items-center gap-3 p-2 bg-white">
      <div className="flex items-center">
        <span className="text-sm font-medium mr-2">Sort by:</span>
        <Select value={getCurrentSortValue()} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px] h-9">
            <SelectValue placeholder="Sort products" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem id={`sort-${option.value}`} key={option.value} value={option.value}>
                <div className="flex items-center">{option.label}</div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SortSelecting;
