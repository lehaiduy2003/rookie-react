import { Category } from "@/types/Category";
import { ProductDetail } from "@/types/ProductDetail";
import { ProductForm, ProductFormSchema } from "@/types/ProductFormValues";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type modeType = "onChange" | "onBlur" | "onSubmit" | "all";

const useProductForm = (
  product: ProductDetail | null,
  categories: Category[],
  mode: modeType = "onChange"
) => {
  const form = useForm<ProductForm>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      quantity: product?.quantity || 0,
      categoryId: product?.category?.id.toString() || "0",
      imageUrl: product?.imageUrl || "",
      featured: product?.featured || false,
      isActive: product?.isActive || false,
    },
    mode: mode,
  });

  // Reset form when product changes
  useEffect(() => {
    if (product) {
      form.reset({
        name: product?.name || "",
        description: product?.description || "",
        price: product?.price || 0,
        quantity: product?.quantity || 0,
        categoryId: product?.category?.id.toString() || "0",
        imageUrl: product?.imageUrl || "",
        featured: product?.featured || false,
        isActive: product?.isActive || false,
      });
    }
  }, [product, form]);

  // Form fields definition
  const productFields = [
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

  return {
    form,
    productFields,
  };
};

export default useProductForm;
