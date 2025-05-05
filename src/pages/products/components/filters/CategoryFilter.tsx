import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import CategoryService from "@/apis/CategoryService";
import { FilterFormValues } from "@/types/FilterFormValues";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Category } from "@/types/Category";

interface CategoryFilterProps {
  watch: UseFormWatch<FilterFormValues>;
  setValue: UseFormSetValue<FilterFormValues>;
}

const CategoryFilter = ({ watch, setValue }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectedCategory = watch("category");

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await CategoryService.getAllCategories();
        setCategories(response); // Store complete category objects
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    // If the category is already selected, deselect it
    if (selectedCategory === categoryId.toString()) {
      setValue("category", undefined);
    } else {
      // Otherwise, select the new category
      setValue("category", categoryId.toString()); // Convert number to string for URL params
    }
    // Submit the form immediately to apply the filter
    setTimeout(
      () =>
        document
          .querySelector("form")
          ?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true })),
      0
    );
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading categories...</div>
        ) : (
          categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id.toString() ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedCategory === category.id.toString()
                  ? "bg-mainOrange hover:bg-mainOrange/90"
                  : "hover:bg-slate-100"
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </Badge>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
