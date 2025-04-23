import CategoryNavbar from "@/components/CategoryNavbar";
import ProductView from "@/components/ProductView";
import { ProductPaging } from "@/types/Product";
import { useEffect, useState } from "react";
import ProductService from "@/apis/ProductService";
import { Link } from "react-router-dom";

const Home = () => {
  const [productPaging, setProductPaging] = useState<ProductPaging>();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products from the API
  useEffect(() => {
    setIsLoading(true);
    ProductService.getProducts({
      featured: "true",
      pageSize: "12",
      sortBy: "avgRating",
      sortDir: "desc",
    })
      .then((res) => {
        setProductPaging(res);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <CategoryNavbar />
      <h1 className="text-2xl font-bold mb-2 self-start">Featured Products</h1>
      <ProductView products={productPaging?.content} isLoading={isLoading} />
      {/* display the button only when not loading */}
      {!isLoading && productPaging && (
        <Link
          to="/products?featured=true"
          className="px-6 py-2 mb-4 text-mainOrange font-semibold hover:text-orange-700 transition-colors border border-mainOrange hover:border-orange-700 rounded-full"
        >
          View more products
        </Link>
      )}
    </div>
  );
};

export default Home;
