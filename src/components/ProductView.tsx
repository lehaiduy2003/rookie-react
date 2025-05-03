import { Product } from "@/types/Product";
import ProductCard from "./ProductCard";
import CardList from "./CardList";

interface ProductViewProps {
  products: Product[] | undefined;
  isLoading: boolean;
}

const ProductView = ({ products, isLoading }: ProductViewProps) => {
  // Define custom render function for each product
  const renderProduct = (product: Product) => <ProductCard key={product.id} product={product} />;

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <CardList
        items={products || []}
        renderItem={renderProduct}
        isLoading={isLoading}
        keyExtractor={(product) => product.id}
        emptyMessage="No featured products available"
      />
    </div>
  );
};

export default ProductView;
