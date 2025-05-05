import ProductService from "@/apis/ProductService";
import { ProductDetail } from "@/types/ProductDetail";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useProductDetails = () => {
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

  return {
    id,
    product,
    isLoading,
    quantity,
    decrementQuantity,
    incrementQuantity,
  };
};

export default useProductDetails;
