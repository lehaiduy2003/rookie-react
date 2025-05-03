import RenderCategoryTreeNode from "./RenderCategoryTreeNode";
import { CategoryTree } from "@/types/CategoryTree";

interface TreeViewProps {
  categoryTree: CategoryTree[];
  startEditing: (category: CategoryTree) => void;
  startDeleting: (categoryId: number) => void;
}

/**
 * // Tree view with accordions
 * @param categoryTree - The category tree to render
 * @param startEditing - Function to start editing a category
 * @param startDeleting - Function to start deleting a category
 * @returns
 */
const TreeView = ({ categoryTree, startEditing, startDeleting }: TreeViewProps) => {
  const hasChildren = (category: CategoryTree) => {
    return category.subCategories && category.subCategories.length > 0;
  };
  return (
    <div className="divide-y">
      {categoryTree.map((category) => (
        <RenderCategoryTreeNode
          key={category.id}
          category={category}
          depth={0}
          startEditing={startEditing}
          startDeleting={startDeleting}
          hasChildren={hasChildren(category)} // Check if the category has children
        />
      ))}
    </div>
  );
};

export default TreeView;
