import DataTableColumnHeader from "@/components/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import CustomerActionsCell from "./CustomerActionsCell";
import DataTableCheckboxHeader from "@/components/DataTableCheckboxHeader";
import DataTableCheckboxRow from "@/components/DataTableCheckboxRow";
import { UserDetail } from "@/types/UserDetail";

export const CustomerColumns: ColumnDef<UserDetail>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableCheckboxHeader table={table} />,
    cell: ({ row }) => <DataTableCheckboxRow row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="First Name" />,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Name" />,
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Active" />,
  },
  {
    accessorKey: "createdOn",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created On" />,
  },
  {
    accessorKey: "updatedOn",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Updated On" />,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <CustomerActionsCell customer={row.original} />;
    },
  },
];
