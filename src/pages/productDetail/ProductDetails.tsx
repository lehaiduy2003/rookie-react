import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductDetail } from "@/types/ProductDetail";
import { Button } from "@/components/ui/button";
import Rating from "@/components/Rating";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ProductService from "@/apis/ProductService";
import { Skeleton } from "@/components/ui/skeleton";
import ProductImage from "./components/ProductImage";
import ProductMetaData from "./components/ProductMetaData";
import ActionButtons from "./components/ActionButtons";
import OwnerSection from "./components/OwnerSection";
import ReviewList from "./components/ReviewList";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Fetch product details
  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    ProductService.getProduct(id)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  // Handle quantity changes
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const incrementQuantity = () => {
    // Don't allow adding more than available stock
    if (product && quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image skeleton */}
          <div className="md:w-1/2">
            <Skeleton className="w-full aspect-square rounded-lg" />
          </div>

          {/* Details skeleton */}
          <div className="md:w-1/2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <p className="mt-2 text-gray-500">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild className="mt-4 bg-mainOrange">
          <Link to="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb navigation */}
      <div className="mb-6">
        <Link to="/products" className="flex items-center text-sm text-gray-500 hover:text-primary">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to products
        </Link>
      </div>

      {/* Product details layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image - left side */}
        <div className="md:w-1/2">
          <ProductImage imageUrl={product.imageUrl} name={product.name} />
          {/* add thumbnails images here if available */}
        </div>

        {/* Product Info - Right side */}
        <div className="md:w-1/2">
          {/* Title and basic info */}
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* Category */}
          <div className="mt-2">
            <Link
              to={`/products?category=${product.category.id}`}
              className="text-sm text-primary hover:underline"
            >
              {product.category.name}
            </Link>
          </div>

          {/* Rating */}
          <div className="mt-2">
            <Rating avgRating={product.avgRating} ratingCount={product.ratingCount} />
          </div>

          {/* Price */}
          <div className="mt-4">
            <div className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</div>
            <div className="text-sm text-gray-500 mt-1">
              {product.quantity > 0 ? (
                <span className="text-green-600">In Stock ({product.quantity} available)</span>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Quantity selector */}
          <ActionButtons
            quantity={quantity}
            stock={product.quantity}
            decrementQuantity={decrementQuantity}
            incrementQuantity={incrementQuantity}
          />

          {/* Product metadata & shipping information */}
          <ProductMetaData
            createdOn={new Date(product.createdOn)}
            updatedOn={new Date(product.updatedOn)}
            description={product.description}
            category={product.category}
          />
        </div>
      </div>

      <div className="mt-10 border-t pt-6">
        <OwnerSection createdBy={product.createdBy} />
      </div>

      {/* Additional product information tabs */}
      <div className="mt-12">
        <h3 className="font-bold">Review from Customer</h3>
        <ReviewList ratings={product.ratings} />
      </div>
    </div>
  );
};

export default ProductDetails;
