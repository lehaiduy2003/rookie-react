import { useState, useEffect } from "react";
import UserService from "@/apis/UserService";
import { useDebounce } from "@/hooks/useDebounce";
import { UserDetail } from "@/types/UserDetail";

export function useCustomers() {
  const [customers, setCustomers] = useState<UserDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Default page number
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const debouncedSearch = useDebounce(search, 300);

  // This effect is used debouncing already via the useDebounce hook in search input
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await UserService.getUsers({
          pageNo: String(page - 1), // page number start from 0 from server
          pageSize: String(pageSize),
          ...(debouncedSearch && { email: debouncedSearch }),
        });
        setCustomers(response.content);
        setTotal(response.totalElements); // backend returns total elements
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [page, pageSize, debouncedSearch]);

  return {
    customers,
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
