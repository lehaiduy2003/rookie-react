import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AlertModal from "@/components/AlertModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MyForm } from "@/components/MyForm";
import { distanceToNow } from "@/utils/dateUtil";
import { ProductForm, ProductFormSchema } from "@/types/UpdatingProduct";
import CategoryService from "@/apis/CategoryService";
import { Category } from "@/types/Category";
import { deleteProductById, updateProduct } from "../../utils/productData";
import { ProductDetail } from "@/types/ProductDetail";
import ProductService from "@/apis/ProductService";

interface ProductDetailsProps {
  productId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, isOpen, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await ProductService.getProduct(productId.toString());
        setProducts(products);
        const categories = await CategoryService.getAllCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, productId]);

  const form = useForm<ProductForm>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: products?.name || "",
      description: products?.description || "",
      price: products?.price || 0,
      quantity: products?.quantity || 0,
      categoryId: products?.category?.id.toString() || "0",
      imageUrl: products?.imageUrl || "",
      featured: products?.featured || false,
      isActive: products?.isActive || false,
    },
  });

  // Reset form when product changes
  useEffect(() => {
    if (products) {
      form.reset({
        name: products?.name || "",
        description: products?.description || "",
        price: products?.price || 0,
        quantity: products?.quantity || 0,
        categoryId: products?.category?.id.toString() || "0",
        imageUrl: products?.imageUrl || "",
        featured: products?.featured || false,
        isActive: products?.isActive || false,
      });
    }
  }, [products, form]);

  async function onSubmit(data: ProductForm) {
    if (!products) return;

    try {
      setIsUpdating(true);
      await updateProduct(products.id.toString(), data);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update product:", error);
    } finally {
      setIsUpdating(false);
    }
  }

  if (!products) {
    return null;
  }

  // Form fields definition
  const formFields = [
    {
      name: "name",
      label: "Product Name",
      type: "text",
      placeholder: "Product name",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Product description",
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "Product price",
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      placeholder: "Product quantity",
    },
    {
      name: "categoryId",
      label: "Category",
      type: "select",
      placeholder: "Select a category",
      options: [
        { value: "0", label: "Select a category" },
        ...categories.map((category) => ({
          value: category.id.toString(),
          label: category.name,
        })),
      ],
    },
    {
      name: "imageUrl",
      label: "Image URL",
      type: "text",
      placeholder: "Product image URL",
    },
    {
      name: "featured",
      label: "Featured",
      type: "checkbox",
      placeholder: "Featured product",
    },
    {
      name: "isActive",
      label: "Active Status",
      type: "checkbox",
      placeholder: "Active product",
    },
  ];

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
            <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="edit">Edit</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6 py-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={`${products.imageUrl}`} alt={`${products.name}`} />
                    <AvatarFallback>{products.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>

                  <div className="text-center">
                    <h3 className="text-xl font-medium">{products.name}</h3>
                    {products.isActive ? (
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
                      <p>{products.id}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-muted-foreground">Name</h4>
                      <p>{products.name}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-muted-foreground">Description</h4>
                    <p>{products.description || "—"}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-muted-foreground">Price</h4>
                      <p>${products.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-muted-foreground">Quantity</h4>
                      <p>{products.quantity}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-muted-foreground">Category</h4>
                      <p>{products.category?.name || "—"}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-muted-foreground">Image URL</h4>
                      <p className="truncate">{products.imageUrl || "—"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-muted-foreground">Created On</h4>
                      <p>
                        {products.createdOn ? distanceToNow(new Date(products.createdOn)) : "—"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-muted-foreground">Last Updated</h4>
                      <p>
                        {products.updatedOn ? distanceToNow(new Date(products.updatedOn)) : "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="edit" className="py-4">
                <div className="px-1">
                  <MyForm
                    form={form}
                    fields={formFields}
                    onSubmit={onSubmit}
                    loading={isUpdating}
                    customButton={
                      <div className="flex flex-col gap-3 pt-4">
                        {/* Buttons */}
                        <div className="flex gap-2 pt-4">
                          <Button
                            type="submit"
                            className="flex-1 bg-mainOrange hover:bg-mainOrange/90"
                            disabled={isUpdating}
                          >
                            {isUpdating ? "Saving..." : "Save Changes"}
                          </Button>
                          <DrawerClose asChild>
                            <Button variant="outline" className="flex-1">
                              Cancel
                            </Button>
                          </DrawerClose>
                        </div>
                      </div>
                    }
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DrawerContent>
      </Drawer>

      <AlertModal
        title="Delete Product"
        description={`Are you sure you want to delete ${products.name}? This action cannot be undone.`}
        trigger={<span style={{ display: "none" }} />}
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={async () => {
          if (products.id) {
            await deleteProductById(products.id.toString());
            onOpenChange(false);
          }
        }}
      />
    </>
  );
};

export default ProductDetails;
