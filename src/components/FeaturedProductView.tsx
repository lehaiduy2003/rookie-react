import ProductService from "@/apis/ProductService";
import { Product, ProductPaging } from "@/types/Product";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import CardList from "./CardList";

const FeaturedProductView = () => {
  const [products, setProducts] = useState<ProductPaging>();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products from the API
  useEffect(() => {
    setIsLoading(true);
    ProductService.getProducts({ featured: "true", sortBy: "avgRating", sortDir: "desc" })
      .then((res) => {
        setProducts(res);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Define custom render function for each product
  const renderProduct = (product: Product) => <ProductCard key={product.id} product={product} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Featured Products</h1>

      <CardList
        items={products?.content || []}
        renderItem={renderProduct}
        isLoading={isLoading}
        keyExtractor={(product) => product.id}
        emptyMessage="No featured products available"
        className="my-6"
      />
    </div>
  );
};

export default FeaturedProductView;
