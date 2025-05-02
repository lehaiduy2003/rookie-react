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
import { deleteProductById } from "../../utils/productData";
import { Product } from "@/types/Product";

const ProductActionsCell = ({ product }: { product: Product }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
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
            Copy product ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowDetailsDrawer(true)}>
            View product details
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500 focus:text-red-500"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete product
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showDetailsDrawer && (
        <ProductDetails
          productId={product.id}
          isOpen={showDetailsDrawer}
          onOpenChange={setShowDetailsDrawer}
        />
      )}

      {showDeleteModal && (
        <AlertModal
          title="Delete product?"
          description={`Are you sure you want to delete ${product.name}?`}
          onConfirm={async () => {
            await deleteProductById(product.id.toString());
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
