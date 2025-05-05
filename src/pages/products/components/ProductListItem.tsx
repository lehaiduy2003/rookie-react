import RatingStar from "@/components/RatingStar";
import { Product } from "@/types/Product";
import { Link } from "react-router-dom";

interface ProductListItemProps {
  product: Product;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 hover:bg-[#FB6E52]/5 transition-colors">
      {/* Product Image */}
      <div className="w-full md:w-[120px] h-[120px] flex-shrink-0">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.imageUrl || "https://placehold.co/120x120?text=No+Image"}
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
          />
        </Link>
      </div>
      {/* Product list item body */}
      <div className="flex-grow flex flex-col">
        <div className="flex justify-between w-90%">
          <Link
            to={`/products/${product.id}`}
            className="text-lg font-medium hover:text-primary transition-colors truncate"
          >
            {product.name}
          </Link>
          <div className="text-lg font-semibold">${product.price.toFixed(2)}</div>
        </div>
        {/* Ratings */}
        <RatingStar avgRating={product.avgRating} ratingCount={product.ratingCount} />
      </div>
    </div>
  );
};

export default ProductListItem;
