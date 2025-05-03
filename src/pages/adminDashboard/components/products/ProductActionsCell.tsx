import AlertModal from "@/components/AlertModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Toaster } from "sonner";
import ProductDetails from "./ProductDetails";
import { Product } from "@/types/Product";
import { useProducts } from "../../hooks/useProducts";

const ProductActionsCell = ({ product }: { product: Product }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
  const { deleteProduct } = useProducts();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="text-mainOrange hover:text-mainOrange/80">
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id.toString())}>
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowDetailsDrawer(true)}>
            View details
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500 focus:text-red-500"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showDetailsDrawer && (
        <ProductDetails
          productId={product.id} // for fetching product details
          isOpen={showDetailsDrawer}
          onOpenChange={setShowDetailsDrawer}
        />
      )}

      {showDeleteModal && (
        <AlertModal
          title="Delete product?"
          description={`Are you sure you want to delete ${product.name}?`}
          onConfirm={async () => {
            await deleteProduct(product.id);
            setShowDeleteModal(false);
          }}
          trigger={<span style={{ display: "none" }} />}
          open={showDeleteModal}
          onOpenChange={setShowDeleteModal}
        />
      )}
      <Toaster />
    </>
  );
};

export default ProductActionsCell;
