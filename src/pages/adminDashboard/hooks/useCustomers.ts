import { useState, useEffect } from "react";
import UserService from "@/apis/UserService";
import { useDebounce } from "@/hooks/useDebounce";
import { UserDetail } from "@/types/UserDetail";
import { CustomerForm } from "@/types/CustomerFormValues";

export function useCustomers() {
  const [customers, setCustomers] = useState<UserDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1); // Default page number
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const debouncedSearch = useDebounce(search, 300);

  // This effect is used debouncing already via the useDebounce hook in search input
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
      setError("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, pageSize, debouncedSearch]);

  const updateCustomer = async (customerId: number, data: CustomerForm) => {
    setLoading(true);
    try {
      await UserService.updateById(customerId.toString(), data);
      await fetchCustomers(); // Refresh the customer list after update
    } catch (error) {
      console.error("Failed to update customer:", error);
      setError("Failed to update customer");
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (customerId: number) => {
    setLoading(true);
    try {
      await UserService.deleteUserById(customerId.toString());
      await fetchCustomers(); // Refresh the customer list after deletion
    } catch (error) {
      console.error("Failed to delete customer:", error);
      setError("Failed to delete customer");
    } finally {
      setLoading(false);
    }
  };

  return {
    customers,
    loading,
    page,
    setPage,
    pageSize,
    error,
    setPageSize,
    search,
    setSearch,
    total,
    updateCustomer,
    deleteCustomer,
  };
}
