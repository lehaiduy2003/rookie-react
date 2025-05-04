import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductService from "@/apis/ProductService";
import { ProductPaging } from "@/types/Product";

// Constants
const PAGE_SIZE = 10;

const useProductSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [productPaging, setProductPaging] = useState<ProductPaging | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Extract all search parameters
  const currentPage = parseInt(searchParams.get("page") || "1");
  const apiPage = currentPage - 1; // Convert to 0-indexed for API

  const category = searchParams.get("category") || undefined;
  const name = searchParams.get("name") || undefined;
  const featured = searchParams.get("featured") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const sortDir = searchParams.get("sortDir") || undefined;
  const minPrice = searchParams.get("minPrice") || undefined;
  const maxPrice = searchParams.get("maxPrice") || undefined;
  const rating = searchParams.get("rating") || undefined;

  // Update a single search parameter while preserving others
  const updateSearchParam = (param: string, value: string | null) => {
    const currentParams = Object.fromEntries(searchParams.entries());

    const isInValidParam =
      value === null ||
      value === "" ||
      value === "undefined" ||
      value === "null" ||
      value === undefined;

    if (isInValidParam) {
      // Remove parameter if value is invalid
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [param]: _, ...rest } = currentParams; // This properly removes the specific parameter
      setSearchParams(rest);
    } else {
      // Update or add the parameter
      setSearchParams({
        ...currentParams,
        [param]: value,
        // Reset to page 1 when changing any filter except page itself
        ...(param !== "page" ? { page: "1" } : {}),
      });
    }
  };

  // Clear all filter parameters but keep sorting and pagination
  const clearAllFilters = () => {
    const { page, sortBy, sortDir } = Object.fromEntries(searchParams.entries());
    setSearchParams({ page: page || "1", sortBy: sortBy || "id", sortDir: sortDir || "asc" });
  };

  // Update multiple search parameters at once
  const updateMultipleParams = (params: Record<string, string | null>) => {
    // Create a new URLSearchParams object from current parameters
    const newParams = new URLSearchParams(searchParams);

    // Reset to page 1 when changing filters
    newParams.set("page", "1");

    // Process each parameter
    for (const [key, value] of Object.entries(params)) {
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        value === "undefined" ||
        value === "null"
      ) {
        // Remove parameter if value is invalid
        newParams.delete(key);
      } else {
        // Update parameter with new value
        newParams.set(key, value);
      }
    }

    setSearchParams(newParams);
  };

  // Count active filters (excluding sorting and pagination)
  const countActiveFilters = () => {
    let count = 0;
    if (searchParams.has("minPrice") || searchParams.has("maxPrice")) count++;
    if (searchParams.has("rating")) count++;
    if (searchParams.has("featured")) count++;
    return count;
  };

  // Fetch products whenever search parameters change
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Build API params object
        const params: Record<string, string> = {
          pageNo: apiPage.toString(),
          pageSize: PAGE_SIZE.toString(),
        };

        // Add optional filters if they exist
        if (category) params.categoryId = category;
        if (name) params.name = name;
        if (featured) params.featured = featured;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        if (rating) params.rating = rating;
        if (sortBy) params.sortBy = sortBy;
        if (sortDir) params.sortDir = sortDir;

        // Call the API
        const response = await ProductService.getProducts(params);
        setProductPaging(response);

        // Scroll to top when page changes
        window.scrollTo(0, 0);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [apiPage, category, name, featured, minPrice, maxPrice, rating, sortBy, sortDir]);

  return {
    // Search parameters
    searchParams,
    currentPage,
    category,
    name,
    featured,
    sortBy,
    sortDir,
    minPrice,
    maxPrice,
    rating,

    // Data state
    productPaging,
    isLoading,
    error,

    // Actions
    updateSearchParam,
    updateMultipleParams,
    clearAllFilters,
    countActiveFilters,
  };
};

export default useProductSearch;
