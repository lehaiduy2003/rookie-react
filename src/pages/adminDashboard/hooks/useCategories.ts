import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Category } from "@/types/Category";
import { CategoryTree } from "@/types/CategoryTree";
import CategoryService from "@/apis/CategoryService";
import { CategoryFormValues } from "@/types/CategoryFormValues";

/**
 * Custom hook for managing categories data and operations
 * Separates data fetching and state management logic from UI components
 */
export default function useCategories() {
  // State management for categories data
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryTree, setCategoryTree] = useState<CategoryTree[]>([]);
  const [flattenedCategories, setFlattenedCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for category search
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  // State for category form operations
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  /**
   * Flatten the category tree for searching and other operations
   */
  const flattenCategoryTree = (tree: CategoryTree[]): Category[] => {
    const result: Category[] = [];

    const traverse = (node: CategoryTree) => {
      result.push({
        id: node.id,
        name: node.name,
        description: node.description,
        parentId: null, // We don't have parent ID in the tree structure
      });

      if (node.subCategories && node.subCategories.length > 0) {
        node.subCategories.forEach((child: CategoryTree) => traverse(child));
      }
    };

    tree.forEach((node) => traverse(node));
    return result;
  };

  /**
   * Fetch flat category list from the API
   * Used for regular operations and search
   */
  const fetchData = async () => {
    try {
      let result: Category[];
      setLoading(true);
      setError(null);
      if (debouncedSearch) {
        // Use name filter if search term is provided
        result = await CategoryService.getAllCategories({ name: debouncedSearch });
      } else {
        result = await CategoryService.getAllCategories();
      }

      setCategories(result);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch category tree from the API
   * Used for hierarchical display
   */
  const fetchCategoryTree = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await CategoryService.getCategoryTree();
      setCategoryTree(result);

      // Also flatten the tree for easier operations
      const flattened = flattenCategoryTree(result);
      setFlattenedCategories(flattened);
    } catch (err) {
      console.error("Error fetching category tree:", err);
      setError("Failed to load category hierarchy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories when search term changes
  useEffect(() => {
    fetchData();
  }, [debouncedSearch]);

  /**
   * Create a new category
   */
  const createCategory = async (data: CategoryFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const categoryData = {
        ...data,
        parentId: data.parentId === "0" ? null : parseInt(data.parentId),
      };
      await CategoryService.createCategory(categoryData);
      await fetchData(); // Refresh the list after creation
      return true;
    } catch (err) {
      console.error("Error creating category:", err);
      setError("Failed to create category. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update an existing category
   */
  const updateCategory = async (id: number, data: CategoryFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const categoryData = {
        ...data,
        parentId: data.parentId === "0" ? null : parseInt(data.parentId),
      };
      await CategoryService.updateCategory(id, categoryData);
      await fetchData(); // Refresh the list after update
      return true;
    } catch (err) {
      console.error("Error updating category:", err);
      setError("Failed to update category. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a category by ID
   */
  const deleteCategory = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await CategoryService.deleteCategory(id);
      await fetchData(); // Refresh the list after deletion
      return true;
    } catch (err) {
      console.error("Error deleting category:", err);
      setError("Failed to delete category. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Setup for category creation
   */
  const startCreating = () => {
    setSelectedCategory(null);
    setIsCreating(true);
  };

  /**
   * Setup for category editing
   */
  const startEditing = (category: Category | CategoryTree) => {
    // Convert CategoryTree to Category if needed
    const categoryToEdit: Category = {
      id: category.id,
      name: category.name,
      description: category.description,
      parentId: "parentId" in category ? category.parentId : null,
    };

    setSelectedCategory(categoryToEdit);
    setIsCreating(true);
  };

  /**
   * Setup for category deletion
   */
  const startDeleting = (id: number) => {
    setCategoryToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  /**
   * Cancel current operation
   */
  const cancelOperation = () => {
    setIsCreating(false);
    setSelectedCategory(null);
    setIsDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  return {
    // State variables
    categories,
    categoryTree,
    flattenedCategories,
    loading,
    error,
    search,
    selectedCategory,
    isCreating,
    isDeleteDialogOpen,
    categoryToDelete,

    // Actions
    setSearch,
    fetchData,
    fetchCategoryTree,
    createCategory,
    updateCategory,
    deleteCategory,
    startCreating,
    startEditing,
    startDeleting,
    cancelOperation,
  };
}
