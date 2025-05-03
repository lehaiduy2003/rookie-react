import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RenderCategoryRow from "./RenderCategoryRow";
import { Category } from "@/types/Category";

interface FlatViewProps {
  filteredCategories: Category[];
  startEditing: (category: Category) => void;
  startDeleting: (categoryId: number) => void;
}

/**
 * FlatView Component for displaying categories in a table format
 * @param filteredCategories - The list of filtered categories to display
 * @param startEditing - Function to initiate editing a category
 * @param startDeleting - Function to initiate deleting a category
 * @returns JSX.Element
 */
const FlatView = ({ filteredCategories, startEditing, startDeleting }: FlatViewProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Description</TableHead>
          <TableHead className="text-right w-24">Parent</TableHead>
          <TableHead className="text-right w-24">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredCategories.map((category) => (
          <RenderCategoryRow
            key={category.id}
            category={category}
            startEditing={startEditing}
            startDeleting={startDeleting}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default FlatView;
