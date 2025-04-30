import { Row } from "@tanstack/react-table";
import React from "react";
import { Checkbox } from "./ui/checkbox";

interface DataTableCheckboxRowProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  row: Row<TData>;
}

export default function DataTableCheckboxRow<TData>({ row }: DataTableCheckboxRowProps<TData>) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      className="data-[state=checked]:bg-mainOrange data-[state=checked]:text-white data-[state=checked]:border-none"
    />
  );
}
