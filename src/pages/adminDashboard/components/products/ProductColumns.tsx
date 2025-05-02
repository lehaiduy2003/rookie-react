import DataTableColumnHeader from "@/components/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import DataTableCheckboxHeader from "@/components/DataTableCheckboxHeader";
import DataTableCheckboxRow from "@/components/DataTableCheckboxRow";
import ProductActionsCell from "./ProductActionsCell";
import { Product } from "@/types/Product";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ProductColumns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableCheckboxHeader table={table} />,
    cell: ({ row }) => <DataTableCheckboxRow row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "imageUrl",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Image" />,
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageUrl") as string | undefined;
      return (
        <Avatar className="h-10 w-10">
          <AvatarImage src={imageUrl || ""} alt={(row.getValue("name") as string) || "Product"} />
          <AvatarFallback>
            {(row.getValue("name") as string)?.charAt(0)?.toUpperCase() || "P"}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
  },
  {
    accessorKey: "featured",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Featured" />,
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Activity" />,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <ProductActionsCell product={row.original} />;
    },
  },
];
