import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { successToast } from "@/utils/toastLogic";
import ProductService from "@/apis/ProductService";
import { ProductFormSchema, ProductForm } from "@/types/UpdatingProduct";
import { getAllCategories } from "./utils/categoryData";
import ProductImageUploader from "./components/products/ProductImageUploader";

/**
 * ProductCreating Component
 *
 * A comprehensive form interface for creating new products with logically
 * organized sections in a single panel layout.
 */
const ProductCreating = () => {
  // State for handling API loading states
  const [loading, setLoading] = useState(false);
  // Navigation for redirecting after successful submission
  const navigate = useNavigate();
  // State to store available categories from API
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  // State for image URL management
  const [imageUrl, setImageUrl] = useState<string>("");

  // Initialize form with validation schema
  const form = useForm<ProductForm>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      quantity: 0,
      categoryId: "",
      imageUrl: "",
      featured: false,
      isActive: true,
    },
    mode: "onChange", // Validate form fields on change for better UX
  });

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        // Transform categories data for select component
        const formattedCategories = categoriesData.map((category) => ({
          value: category.id.toString(),
          label: category.name,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        successToast("Error", "Failed to load product categories", {
          label: "Retry",
          onClick: fetchCategories,
        });
      }
    };

    fetchCategories();
  }, []);

  /**
   * Handle image upload event
   * @param url - The URL of the uploaded image
   */
  const handleImageUpload = (url: string) => {
    setImageUrl(url);
    form.setValue("imageUrl", url);
  };

  /**
   * Handle form submission to create a new product
   * @param data - Form data for the new product
   */
  const handleCreateProduct = async (data: ProductForm) => {
    setLoading(true);
    try {
      // Create product with form data
      await ProductService.createProduct({
        ...data,
        categoryId: Number(data.categoryId),
      });

      successToast("Product Created", "The product has been created successfully");

      // Redirect to products list after successful creation
      navigate("/admin/products");
    } catch (error) {
      console.error("Error creating product:", error);
      successToast("Error", "Failed to create product", {
        label: "Retry",
        onClick: () => handleCreateProduct(data),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create New Product</h1>
        <Button id="cancel" variant="outline" onClick={() => navigate("/admin/products")}>
          Cancel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Product Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Form wrapper */}
          <form onSubmit={form.handleSubmit(handleCreateProduct)} className="space-y-8">
            {/* Basic Information Section */}
            <div>
              <h3 className="text-lg font-medium mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name field */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter product name"
                    {...form.register("name")}
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                  )}
                </div>

                {/* Price field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="price"
                    type="number"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    {...form.register("price", { valueAsNumber: true })}
                  />
                  {form.formState.errors.price && (
                    <p className="text-sm text-red-500">{form.formState.errors.price.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">Product price in dollars</p>
                </div>

                {/* Category field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="categoryId"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    {...form.register("categoryId")}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {form.formState.errors.categoryId && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.categoryId.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Product Description Section */}
            <div>
              <h3 className="text-lg font-medium mb-4">Product Description</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="description"
                  placeholder="Enter detailed product description"
                  className="min-h-32 resize-none"
                  {...form.register("description")}
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>
            </div>

            <Separator />

            {/* Inventory & Settings Section */}
            <div>
              <h3 className="text-lg font-medium mb-4">Inventory & Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quantity field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Stock Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="0"
                    min="0"
                    {...form.register("quantity", { valueAsNumber: true })}
                  />
                  {form.formState.errors.quantity && (
                    <p className="text-sm text-red-500">{form.formState.errors.quantity.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">Number of items in stock</p>
                </div>

                <div className="space-y-4">
                  {/* Active status field */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      className="h-4 w-4 rounded border-gray-300"
                      {...form.register("isActive")}
                    />
                    <div>
                      <label htmlFor="isActive" className="text-sm font-medium">
                        Active Status
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Product will be visible in store when active
                      </p>
                    </div>
                  </div>

                  {/* Featured field */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      className="h-4 w-4 rounded border-gray-300"
                      {...form.register("featured")}
                    />
                    <div>
                      <label htmlFor="featured" className="text-sm font-medium">
                        Featured Product
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Product will be displayed in featured sections
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Product Image Section */}
            <div>
              <h3 className="text-lg font-medium mb-4">Product Image</h3>
              <ProductImageUploader imageUrl={imageUrl} onImageUpload={handleImageUpload} />
              {form.formState.errors.imageUrl && (
                <p className="text-sm text-red-500 mt-2">
                  {form.formState.errors.imageUrl.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
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
                {loading ? "Creating..." : "Create Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCreating;
