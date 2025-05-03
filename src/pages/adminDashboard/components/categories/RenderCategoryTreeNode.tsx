import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CategoryTree } from "@/types/CategoryTree";
import { ChevronRight, Pencil, Trash2 } from "lucide-react";

interface RenderCategoryTreeNodeProps {
  category: CategoryTree;
  depth?: number;
  startEditing: (category: CategoryTree) => void;
  startDeleting: (categoryId: number) => void;
  hasChildren?: boolean;
}
/**
 * Render a category tree node with accordion for subcategories
 */
const RenderCategoryTreeNode = ({
  category,
  depth = 0,
  startEditing,
  startDeleting,
  hasChildren,
}: RenderCategoryTreeNodeProps) => {
  // Generate unique ID for accordion
  const accordionId = `category-${category.id}`;
  const len = category.subCategories.length;

  return (
    <div key={category.id} className={cn("border-b ml-4", depth > 0 && "ml-2")}>
      {hasChildren ? (
        <Accordion type="single" collapsible>
          <AccordionItem value={accordionId} className="border-b-0">
            <div className="flex items-center justify-between py-2">
              <AccordionTrigger className="hover:no-underline py-2 flex-1">
                <div className="flex items-center">
                  <span className="font-medium">{category.name}</span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({len > 0 ? `${len}` : category.description})
                  </span>
                </div>
              </AccordionTrigger>
              <div className="flex items-center gap-2 pr-4">
                <Button size="sm" variant="ghost" onClick={() => startEditing(category)}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                {/* No delete button for categories with subcategories */}
              </div>
            </div>
            <AccordionContent>
              <div className="space-y-1 mb-4 border-l-2 border-gray-200">
                {category.subCategories.map((subCategory: CategoryTree) =>
                  RenderCategoryTreeNode({
                    category: subCategory,
                    depth: depth + 1, // increase depth for subcategories
                    startEditing,
                    startDeleting,
                    hasChildren: subCategory.subCategories.length > 0, // check if it has children, anchor of the recursion
                  })
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <div className="flex items-center justify-between py-4 px-4">
          <div>
            <div className="font-medium flex items-center">
              {depth > 0 && <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />}
              {category.name}
            </div>

            <div className="text-sm text-muted-foreground ml-6">
              {category.description || "No description"}
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={() => startEditing(category)}>
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => startDeleting(category.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenderCategoryTreeNode;
