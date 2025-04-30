import DataTable from "@/components/DataTable";
import { CustomerColumns } from "./CustomerColumns";
import { useCustomers } from "../hooks/useCustomers";

const CustomerTable = () => {
  const { customers, loading, page, setPage, pageSize, setPageSize, search, setSearch, total } =
    useCustomers();

  return (
    <DataTable
      columns={CustomerColumns}
      setSearch={setSearch}
      data={customers}
      pageNo={page}
      pageSize={pageSize}
      setPage={setPage}
      total={total}
      search={search}
      setPageSize={setPageSize}
      loading={loading}
    />
  );
};

export default CustomerTable;
