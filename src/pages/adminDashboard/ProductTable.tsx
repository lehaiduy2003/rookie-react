import { useProducts } from "./hooks/useProducts";
import DataTable from "@/components/DataTable";
import { ProductColumns } from "./components/products/ProductColumns";
import AddButton from "./components/products/AddButton";

const ProductTable = () => {
  const { products, loading, page, setPage, pageSize, setPageSize, search, setSearch, total } =
    useProducts();

  return (
    <DataTable
      columns={ProductColumns}
      setSearch={setSearch}
      data={products}
      pageNo={page}
      pageSize={pageSize}
      setPage={setPage}
      total={total}
      search={search}
      setPageSize={setPageSize}
      loading={loading}
      addButton={<AddButton linkRef="/admin/products/creating" label="Create Product" />}
    />
  );
};

export default ProductTable;
