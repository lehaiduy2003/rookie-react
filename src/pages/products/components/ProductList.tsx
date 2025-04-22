import { Product } from "@/types/Product";
import ProductListItem from "./ProductListItem";
import RenderSkeletons from "./RenderSkeletons";

interface ProductListProps {
  products?: Product[];
  isLoading: boolean;
}

/**
 * ProductList component displays products in a vertical list format
 * with loading states and empty state handling
 */
const ProductList = ({ products, isLoading }: ProductListProps) => {
  // Display empty state when no products are available
  if (!isLoading && (!products || products.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-md bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">No products found</h3>
        <p className="mt-1 text-sm text-gray-500">Try changing your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="divide-y border rounded-lg overflow-hidden bg-white w-full">
      {isLoading ? (
        <RenderSkeletons />
      ) : (
        products?.map((product) => <ProductListItem product={product} key={product.id} />)
      )}
    </div>
  );
};

export default ProductList;
