import { flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import DataTablePagination from "./DataTablePagination";
import DataTableViewOptions from "./DataTableViewOptions";
import { JSX, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import useDataTable, { useDataTableProps } from "@/hooks/useDataTable";

interface DataTableProps<TData, TValue> extends useDataTableProps<TData, TValue> {
  loading: boolean;
  search: string;
  setSearch: (search: string) => void;
  setPageSize: (pageSize: number) => void;
  addButton?: JSX.Element;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  pageNo,
  setPage,
  pageSize,
  setPageSize,
  total,
  search,
  setSearch,
  addButton,
  loading,
}: DataTableProps<TData, TValue>) {
  const table = useDataTable({
    data,
    columns,
    pageNo,
    pageSize,
    setPage,
    total,
  });

  useEffect(() => {
    setPage(1); // reset to first page when data changes
  }, [setPage, search, pageSize, total]);

  return (
    <div className="px-10 py-2">
      <div className="flex items-center py-4">
        <Input
          id="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <div className="ml-auto flex items-center gap-2">
          {addButton}
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              // Loading skeleton UI
              <>
                {Array.from({ length: pageSize }).map((_, index) => (
                  <TableRow key={`loading-row-${index}`} className="animate-pulse">
                    {Array.from({ length: columns.length }).map((_, cellIndex) => (
                      <TableCell key={`loading-cell-${index}-${cellIndex}`}>
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-mainOrange/5">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell id="cell-result" colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} setPageSize={setPageSize} />
      </div>
    </div>
  );
}
