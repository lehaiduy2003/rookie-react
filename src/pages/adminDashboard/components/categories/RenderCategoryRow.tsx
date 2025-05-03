import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Category } from "@/types/Category";
import { Pencil, Trash2 } from "lucide-react";

interface RenderCategoryRowProps {
  category: Category;
  startEditing: (category: Category) => void;
  startDeleting: (categoryId: number) => void;
}

/**
 * Render a single category row in the table
 */
const RenderCategoryRow = ({ category, startEditing, startDeleting }: RenderCategoryRowProps) => {
  return (
    <TableRow key={category.id}>
      <TableCell className="font-medium">{category.id}</TableCell>
      <TableCell className="font-medium">{category.name}</TableCell>
      <TableCell className="hidden md:table-cell max-w-xs truncate">
        {category.description || "-"}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button size="icon" variant="ghost" onClick={() => startEditing(category)}>
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => startDeleting(category.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default RenderCategoryRow;
