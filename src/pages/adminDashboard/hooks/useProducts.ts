import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import ProductService from "@/apis/ProductService";
import { Product } from "@/types/Product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Default page number
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const debouncedSearch = useDebounce(search, 300);

  // This effect is used debouncing already via the useDebounce hook in search input
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await ProductService.getProducts({
          pageNo: String(page - 1), // page number start from 0 from server
          pageSize: String(pageSize),
          ...(debouncedSearch && { name: debouncedSearch }),
        });
        setProducts(response.content);
        setTotal(response.totalElements); // backend returns total elements
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, pageSize, debouncedSearch]);

  return {
    products,
    loading,
    page,
    setPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
    total,
  };
}
