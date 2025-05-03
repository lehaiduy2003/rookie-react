import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ProductDetail } from "@/types/ProductDetail";
import { distanceToNow } from "@/utils/dateUtil";

const ProductBasicInfo = ({ product }: { product: ProductDetail }) => {
  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={`${product.imageUrl}`} alt={`${product.name}`} />
          <AvatarFallback>{product.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="text-center">
          <h3 className="text-xl font-medium">{product.name}</h3>
          {product.isActive ? (
            <Badge className="mt-1 bg-green-500">Active</Badge>
          ) : (
            <Badge className="mt-1 bg-gray-500">Inactive</Badge>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-muted-foreground">Product ID</h4>
            <p>{product.id}</p>
          </div>
          <div>
            <h4 className="font-medium text-muted-foreground">Name</h4>
            <p>{product.name}</p>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-muted-foreground">Description</h4>
          <p>{product.description || "—"}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-muted-foreground">Price</h4>
            <p>${product.price.toFixed(2)}</p>
          </div>
          <div>
            <h4 className="font-medium text-muted-foreground">Quantity</h4>
            <p>{product.quantity}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-muted-foreground">Category</h4>
            <p>{product.category?.name || "—"}</p>
          </div>
          <div>
            <h4 className="font-medium text-muted-foreground">Image URL</h4>
            <p className="truncate">{product.imageUrl || "—"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-muted-foreground">Created On</h4>
            <p>{product.createdOn ? distanceToNow(new Date(product.createdOn)) : "—"}</p>
          </div>
          <div>
            <h4 className="font-medium text-muted-foreground">Last Updated</h4>
            <p>{product.updatedOn ? distanceToNow(new Date(product.updatedOn)) : "—"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBasicInfo;
