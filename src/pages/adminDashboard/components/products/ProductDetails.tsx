import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import AlertModal from "@/components/AlertModal";
import { ProductDetail } from "@/types/ProductDetail";
import { useProducts } from "../../hooks/useProducts";
import useProductForm from "../../hooks/useProductForm";
import useCategories from "../../hooks/useCategories";
import { successToast } from "@/utils/toastLogic";
import ProductBasicInfo from "./ProductBasicInfo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Toaster } from "sonner";
import EditForm from "../EditForm";

interface ProductDetailsProps {
  productId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, isOpen, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState("info");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [product, setProduct] = useState<ProductDetail>();

  const { error, loading, getProduct, updateProduct, deleteProduct } = useProducts();

  const { categories } = useCategories();

  const { form, productFields } = useProductForm(product || null, categories);
  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProduct(productId);
      setProduct(productData);
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return null;
  }

  return (
    <>
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-2xl font-bold">Product Details</DrawerTitle>
              <Button variant="destructive" size="icon" onClick={() => setShowDeleteModal(true)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <DrawerDescription>View and manage product information</DrawerDescription>
          </DrawerHeader>

          <div className="px-4 overflow-y-auto">
            <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Information</TabsTrigger>
                <TabsTrigger value="edit">Edit</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-6 py-4">
                <ProductBasicInfo product={product} />
              </TabsContent>

              <TabsContent value="edit" className="py-4">
                <div className="px-1">
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <EditForm
                    form={form}
                    fields={productFields}
                    onSubmit={async (data) => {
                      await updateProduct(product.id, data);
                      onOpenChange(false);
                      successToast("Product updated successfully");
                    }}
                    loading={loading}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DrawerContent>
      </Drawer>

      <AlertModal
        title="Delete Product"
        description={`Are you sure you want to delete ${product.name}? This action cannot be undone.`}
        trigger={<span style={{ display: "none" }} />}
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={async () => {
          if (product.id) {
            await deleteProduct(product.id);
            setShowDeleteModal(false);
            onOpenChange(false);
            successToast("Product deleted successfully");
          }
        }}
      />
      <Toaster />
    </>
  );
};

export default ProductDetails;
