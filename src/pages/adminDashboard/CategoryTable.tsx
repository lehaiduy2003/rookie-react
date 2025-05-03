import { useEffect, useMemo } from "react";
import { PlusCircle, Search, Loader2 } from "lucide-react";
import useCategories from "./hooks/useCategories";
import { useCategoryForm } from "./hooks/useCategoryForm";
import { successToast } from "@/utils/toastLogic";
import { MyForm } from "@/components/MyForm";
import AlertModal from "@/components/AlertModal";
import { CategoryFormValues } from "@/types/CategoryFormValues";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FlatView from "./components/categories/FlatView";
import TreeView from "./components/categories/TreeView";

/**
 * CategoryTable Component
 *
 * A comprehensive interface for managing categories with an accordion view,
 * search functionality, and CRUD operations through modal dialogs.
 */
const CategoryTable = () => {
  // Use our custom hook for all category operations
  const {
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
  } = useCategories();

  // Fetch categories on component mount
  useEffect(() => {
    fetchData();
    fetchCategoryTree();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Form submission handler for both create and update operations
   */
  const handleFormSubmit = async (data: CategoryFormValues) => {
    let success = false;

    if (selectedCategory) {
      // Update existing category
      success = await updateCategory(selectedCategory.id, data);
      if (success) {
        successToast("Category Updated", "The category has been updated successfully");
      }
    } else {
      // Create new category
      success = await createCategory(data);
      if (success) {
        successToast("Category Created", "The category has been created successfully");
      }
    }

    if (success) {
      cancelOperation();
      fetchCategoryTree(); // Refresh the tree after successful operation
    }
  };

  // Use the form hook to manage form state and validation
  const { form, categoryFields } = useCategoryForm(categories, selectedCategory);

  /**
   * Filtered categories based on search term
   */
  const filteredCategories = useMemo(() => {
    if (!search) return categoryTree;

    // If searching, use the flattened list instead of tree
    const searchLower = search.toLowerCase();
    return flattenedCategories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchLower) ||
        (cat.description && cat.description.toLowerCase().includes(searchLower))
    );
  }, [search, categoryTree, flattenedCategories]);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Search bar section */}
      <div className="flex justify-between mb-6 gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 w-full"
          />
        </div>
        <Button onClick={startCreating} className="bg-mainOrange hover:bg-mainOrange/90">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md mb-4">
          {error}
          <Button
            variant="link"
            className="text-red-600 p-0 h-auto ml-2 underline"
            onClick={fetchData}
          >
            Retry
          </Button>
        </div>
      )}

      {/* Loading state or Categories */}
      {loading ? (
        <div className="flex justify-center items-center h-48 bg-gray-50 rounded-md border">
          <Loader2 className="h-8 w-8 animate-spin text-mainOrange" />
        </div>
      ) : (
        <div className="bg-white rounded-md border shadow-sm">
          {search ? (
            // Search results in flat table view
            flattenedCategories.length > 0 ? (
              <FlatView
                filteredCategories={filteredCategories}
                startEditing={startEditing}
                startDeleting={startDeleting}
              />
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No categories found matching your search
              </div>
            )
          ) : // Tree view with accordions
          categoryTree.length > 0 ? (
            <TreeView
              categoryTree={categoryTree}
              startEditing={startEditing}
              startDeleting={startDeleting}
            />
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No categories found. Add your first category!
            </div>
          )}
        </div>
      )}

      {/* Category Form Dialog - Using MyForm component */}
      <Dialog open={isCreating} onOpenChange={(open) => !open && cancelOperation()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedCategory ? "Edit Category" : "Add Category"}</DialogTitle>
            <DialogDescription>
              {selectedCategory
                ? "Update the details for this category"
                : "Fill in the details to create a new category"}
            </DialogDescription>
          </DialogHeader>

          <MyForm
            form={form}
            fields={categoryFields}
            onSubmit={(data) => handleFormSubmit(data)}
            loading={loading}
            customButton={
              <div className="flex justify-between gap-2">
                <Button type="button" variant="outline" onClick={cancelOperation}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-mainOrange hover:bg-mainOrange/90"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {selectedCategory ? "Updating..." : "Creating..."}
                    </>
                  ) : selectedCategory ? (
                    "Update Category"
                  ) : (
                    "Create Category"
                  )}
                </Button>
              </div>
            }
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog - Using AlertModal component */}
      <AlertModal
        trigger={null} // No trigger as we control opening via state
        title="Delete Category"
        description="This action cannot be undone. This will permanently delete the category and remove it from our servers."
        onConfirm={() => {
          if (categoryToDelete !== null) {
            deleteCategory(categoryToDelete).then((success) => {
              if (success) {
                successToast("Category Deleted", "The category has been deleted successfully");
                fetchCategoryTree(); // Refresh the tree after deletion
              }
            });
          }
        }}
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          if (!open) cancelOperation();
        }}
      />
    </div>
  );
};

export default CategoryTable;
