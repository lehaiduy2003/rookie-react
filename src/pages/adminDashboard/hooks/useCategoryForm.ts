import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@/types/Category";
import { CategoryFormValues, categoryFormSchema } from "@/types/CategoryFormValues";

/**
 * Custom hook to manage category form logic
 *
 * Handles form initialization, validation, and preparation of field configurations
 * for the MyForm component
 */
export function useCategoryForm(categories: Category[], selectedCategory: Category | null) {
  // Initialize form with react-hook-form and zod validation
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
      parentId: "",
    },
  });

  // Reset form when the editing category changes
  useEffect(() => {
    if (selectedCategory) {
      form.reset({
        name: selectedCategory.name,
        description: selectedCategory.description || "",
        parentId: selectedCategory.parentId?.toString() || "",
      });
    } else {
      form.reset({
        name: "",
        description: "",
        parentId: "",
      });
    }
  }, [selectedCategory, form]);

  // Generate category form fields configuration for MyForm component
  const categoryFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter category name",
    },
    {
      name: "description",
      label: "Description (Optional)",
      type: "textarea",
      placeholder: "Enter category description",
    },
    {
      name: "parentId",
      label: "Parent Category (Optional)",
      type: "select",
      placeholder: "None (Top Level)",
      options: [
        { value: "0", label: "None (Top Level)" },
        ...categories
          .filter((cat) =>
            // Filter out current category to prevent cycles
            selectedCategory ? cat.id !== selectedCategory.id : true
          )
          .map((cat) => ({
            value: cat.id.toString(),
            label: cat.name,
          })),
      ],
    },
  ];

  return {
    form,
    categoryFields,
  };
}
