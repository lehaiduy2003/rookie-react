import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilterFormValues, filterSchema } from "@/types/FilterFormValues";
import useProductSearch from "./useProductSearch";
import { useEffect } from "react";

const useFilterForm = () => {
  const {
    searchParams,
    minPrice,
    maxPrice,
    rating,
    featured,
    category,
    updateSearchParam,
    updateMultipleParams,
    clearAllFilters,
    countActiveFilters,
  } = useProductSearch();

  // Initialize form with values from URL parameters
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      rating: rating ? Number(rating) : undefined,
      category: category || undefined,
      featured: featured === "true",
    },
  });

  const { handleSubmit, watch, setValue, reset } = form;

  // Update form when URL parameters change
  useEffect(() => {
    reset({
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      rating: rating ? Number(rating) : undefined,
      category: category || undefined,
      featured: featured === "true",
    });
  }, [minPrice, maxPrice, rating, featured, category, reset]);

  // Handle form submission
  const onSubmit = (data: FilterFormValues) => {
    // Create an object to hold all updates
    const updates: Record<string, string | null> = {};

    // Handle price filters
    updates.minPrice = data.minPrice !== undefined ? data.minPrice.toString() : null;
    updates.maxPrice = data.maxPrice !== undefined ? data.maxPrice.toString() : null;
    updates.rating = data.rating !== undefined ? data.rating.toString() : null;
    updates.category = data.category || null;
    updates.featured = data.featured ? "true" : null;

    // Make sure we're always updating the URL, even if all values are null
    updateMultipleParams(updates);
    console.log("Updated search params");
  };

  // Remove specific filter - FIX THIS FUNCTION
  const removeFilter = (paramKey: string) => {
    // Actually update the URL parameter using updateParam from useProductSearch
    updateSearchParam(paramKey, null);

    // Reset corresponding form value
    switch (paramKey) {
      case "minPrice":
        setValue("minPrice", undefined);
        break;
      case "maxPrice":
        setValue("maxPrice", undefined);
        break;
      case "rating":
        setValue("rating", undefined);
        break;
      case "featured":
        setValue("featured", false);
        break;
      case "category":
        setValue("category", undefined);
        break;
    }
  };

  // Clear all filters
  const clearFilters = () => {
    // Reset form values
    reset({
      minPrice: undefined,
      maxPrice: undefined,
      rating: undefined,
      category: undefined,
      featured: false,
    });

    // Clear URL parameters
    clearAllFilters();
  };

  return {
    form,
    searchParams,
    handleSubmit,
    onSubmit,
    clearFilters,
    countActiveFilters,
    removeFilter,
    watch,
    setValue,
  };
};

export default useFilterForm;
