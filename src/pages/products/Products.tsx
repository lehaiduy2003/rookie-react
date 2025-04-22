import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useEffect, useState } from "react";
import { ProductPaging } from "@/types/Product";
import ProductService from "@/apis/ProductService";
import CustomPagination from "@/components/CustomPagination";
import { useSearchParams } from "react-router-dom";
import SortSelecting from "./components/SortSelecting";
import FilterSideBar from "./components/FilterSideBar";
import ProductList from "./components/ProductList";

// Constants
const PAGE_SIZE = 40;

const fetchProducts = (
  categoryId?: string,
  name?: string,
  featured?: string,
  pageNo: string = "0",
  pageSize: string = PAGE_SIZE.toString(),
  sortBy: string = "id",
  sortDir: string = "asc"
) => {
  const params: Record<string, string> = {
    pageNo,
    pageSize,
    sortBy,
    sortDir,
  };
  if (categoryId) {
    params.categoryId = categoryId;
  }
  if (name) {
    params.name = name;
  }
  if (featured) {
    params.featured = featured;
  }
  return ProductService.getProducts(params);
};

const Products = () => {
  const [productPaging, setProductPaging] = useState<ProductPaging | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get page from URL or default to 1, then convert to API page (0-indexed)
  const pageFromUrl = parseInt(searchParams.get("page") || "1");
  const currentApiPage = pageFromUrl - 1; // Convert to 0-indexed for API

  const featured = searchParams.get("featured") || undefined; // Default to false if not specified
  const sortBy = searchParams.get("sortBy") || "id"; // Default to avgRating if not specified
  const sortDir = searchParams.get("sortDir") || "asc"; // Default to desc if not specified
  const categoryId = searchParams.get("category") || undefined; // Get category from URL
  const name = searchParams.get("name") || undefined; // Get name from URL

  // Fetch products from the API
  useEffect(() => {
    setIsLoading(true);

    fetchProducts(
      categoryId,
      name,
      featured,
      currentApiPage.toString(),
      PAGE_SIZE.toString(),
      sortBy,
      sortDir
    )
      .then((res) => {
        setProductPaging(res);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setIsLoading(false);
        // Scroll to top when page changes
        window.scrollTo(0, 0);
      });
  }, [currentApiPage, featured, sortBy, sortDir, categoryId, name]);

  // Update URL when page changes
  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col md:flex-row m-10 md:mx-auto w-full max-w-screen-2xl flex-grow">
        <div className="hidden md:block w-1/4 mr-4">
          <h1 className="text-2xl font-bold mb-2">Filter</h1>
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
                currentPage={pageFromUrl}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
