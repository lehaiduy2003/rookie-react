import CustomPagination from "@/components/CustomPagination";
import SortSelecting from "./components/SortSelecting";
import FilterSideBar from "./components/filters/FilterSideBar";
import ProductList from "./components/ProductList";
import useProductSearch from "./hooks/useProductSearch";

const Products = () => {
  const { productPaging, isLoading, currentPage, updateSearchParam } = useProductSearch();

  // Handle page change
  const handlePageChange = (newPage: number) => {
    updateSearchParam("page", newPage.toString());
  };

  return (
    <div className="container w-full mx-auto px-4 py-8 flex flex-col md:flex-row">
      <div className="hidden md:block w-1/4 mr-4">
        <FilterSideBar />
      </div>
      <div className="w-full md:w-3/4">
        <div className="flex flex-row justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Results</h1>
            <p className="text-sm text-muted-foreground mb-4">
              {productPaging?.totalElements || 0} items found
            </p>
          </div>
          <SortSelecting />
        </div>
        <ProductList products={productPaging?.content} isLoading={isLoading} />

        {/* Display pagination only when data is available */}
        {productPaging && !isLoading && (
          <div className="mt-6">
            <CustomPagination
              totalPages={productPaging.totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
