import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, Share2, ShoppingCart } from "lucide-react";
import { BiSolidPurchaseTag } from "react-icons/bi";
interface ActionButtonsProps {
  quantity: number;
  stock: number;
  decrementQuantity: () => void;
  incrementQuantity: () => void;
}

const ActionButtons = ({
  quantity,
  stock,
  decrementQuantity,
  incrementQuantity,
}: ActionButtonsProps) => {
  return (
    <>
      <div className="mt-6 flex items-center">
        <span className="mr-4 text-gray-700">Quantity:</span>
        <div className="flex items-center border rounded-md">
          <Button
            id="btn-minus"
            variant="ghost"
            size="icon"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center">{quantity}</span>
          <Button
            id="btn-plus"
            variant="ghost"
            size="icon"
            onClick={incrementQuantity}
            disabled={quantity >= stock}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          id="btn-buy"
          className="flex-grow bg-mainOrange hover:bg-mainOrange/90"
          disabled={stock === 0}
        >
          <BiSolidPurchaseTag className="mr-2 h-5 w-5" />
          Buy Now
        </Button>
        <Button
          id="btn-add-to-cart"
          className="flex-grow bg-white text-mainOrange border-1 border-mainOrange hover:bg-mainOrange/10"
          disabled={stock === 0}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
        <Button id="btn-favorite" variant="outline" size="icon">
          <Heart className="h-5 w-5" />
        </Button>
        <Button id="btn-share" variant="outline" size="icon">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
};

export default ActionButtons;
