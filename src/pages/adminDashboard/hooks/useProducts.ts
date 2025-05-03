import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import ProductService from "@/apis/ProductService";
import { Product } from "@/types/Product";
import { ProductForm } from "@/types/ProductFormValues";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1); // Default page number
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const debouncedSearch = useDebounce(search, 300);

  // This effect is used debouncing already via the useDebounce hook in search input
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
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, pageSize, debouncedSearch]);

  const getProduct = async (productId: number) => {
    setLoading(true);
    try {
      const response = await ProductService.getProduct(productId.toString());
      return response;
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setError("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productId: number, data: ProductForm) => {
    setLoading(true);
    try {
      await ProductService.updateProductById(productId.toString(), data);
      await fetchProducts(); // Refresh the product list after update
    } catch (error) {
      console.error("Failed to update product:", error);
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId: number) => {
    setLoading(true);
    try {
      await ProductService.deleteProductById(productId.toString());
      await fetchProducts(); // Refresh the product list after deletion
    } catch (error) {
      console.error("Failed to delete product:", error);
      setError("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (data: ProductForm) => {
    setLoading(true);
    try {
      await ProductService.createProduct(data);
      await fetchProducts(); // Refresh the product list after creation
    } catch (error) {
      console.error("Failed to create product:", error);
      setError("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

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
    error,
    getProduct,
    updateProduct,
    deleteProduct,
    createProduct,
  };
}
