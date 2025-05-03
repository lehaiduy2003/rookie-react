import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MyForm } from "@/components/MyForm";
import ImageUploader from "@/components/ImageUploader";
import { successToast } from "@/utils/toastLogic";
import { ProductForm } from "@/types/ProductFormValues";
import useCategories from "./hooks/useCategories";
import useProductForm from "./hooks/useProductForm";
import { useProducts } from "./hooks/useProducts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Save } from "lucide-react";

/**
 * ProductCreating Component
 *
 * A comprehensive form interface for creating new products with logically
 * organized sections in a single panel layout. Utilizes existing hooks for
 * form management and API operations.
 */
const ProductCreating = () => {
  // Navigation for redirecting after successful submission
  const navigate = useNavigate();

  // Get categories data from custom hook
  const { categories } = useCategories();

  // Get product creation functionality from custom hook
  const { createProduct, loading, error } = useProducts();

  // State for image URL management
  const [imageUrl, setImageUrl] = useState<string>("");

  // Initialize form with custom hook
  const { form, productFields } = useProductForm(null, categories);

  /**
   * Handle image upload event
   * @param url - The URL of the uploaded image
   */
  const handleImageUpload = (url: string) => {
    setImageUrl(url);
    form.setValue("imageUrl", url);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/products")}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Create New Product</h1>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Product Information</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Product Image</h3>
            <ImageUploader imageUrl={imageUrl} onImageUpload={handleImageUpload} />
            {form.formState.errors.imageUrl && (
              <p className="text-sm text-red-500 mt-2">{form.formState.errors.imageUrl.message}</p>
            )}
          </div>

          <Separator className="my-6" />

          {/* Using the MyForm component for form rendering */}
          <MyForm
            form={form}
            fields={productFields}
            onSubmit={async (data: ProductForm) => {
              await createProduct(data);
              successToast("Product created successfully");
              navigate("/admin/products");
            }}
            loading={loading}
            customButton={
              <div className="flex justify-end space-x-4 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate("/admin/products")}>
                  Cancel
                </Button>
                <Button
                  id="submit"
                  type="submit"
                  className="bg-mainOrange hover:bg-mainOrange/90"
                  disabled={loading}
                >
                  {loading ? (
                    "Creating..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Create Product
                    </>
                  )}
                </Button>
              </div>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCreating;
