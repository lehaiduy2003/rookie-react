import { Table } from "@tanstack/react-table";
import React from "react";
import { Checkbox } from "./ui/checkbox";

interface DataTableCheckboxHeaderProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
}

export default function DataTableCheckboxHeader<TData>({
  table,
}: DataTableCheckboxHeaderProps<TData>) {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
      className="data-[state=checked]:bg-mainOrange data-[state=checked]:text-white data-[state=checked]:border-none"
    />
  );
}
