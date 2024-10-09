import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const fetchUsers = async ({ queryKey }) => {
  const [_, filters] = queryKey;
  const params = new URLSearchParams(filters);
  const response = await fetch(`https://jsonplaceholder.typicode.com/users?${params}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        <Input
          placeholder="Filter name..."
          onChange={(event) => column.setFilterValue(event.target.value)}
          className="max-w-sm mt-2"
        />
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        <Input
          placeholder="Filter email..."
          onChange={(event) => column.setFilterValue(event.target.value)}
          className="max-w-sm mt-2"
        />
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        <Input
          placeholder="Filter phone..."
          onChange={(event) => column.setFilterValue(event.target.value)}
          className="max-w-sm mt-2"
        />
      </div>
    ),
  },
  {
    accessorKey: "company.name",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        <Input
          placeholder="Filter company..."
          onChange={(event) => column.setFilterValue(event.target.value)}
          className="max-w-sm mt-2"
        />
      </div>
    ),
  },
];

const UserTable = () => {
  const [filters, setFilters] = useState({});
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ["users", filters],
    queryFn: fetchUsers,
  });

  const table = useReactTable({
    data: users || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: (columnFilters) => {
      const newFilters = columnFilters.reduce((acc, filter) => {
        if (filter.value) {
          acc[filter.id] = filter.value;
        }
        return acc;
      }, {});
      setFilters(newFilters);
    },
    state: {
      columnFilters: Object.entries(filters).map(([id, value]) => ({ id, value })),
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>
            {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => table.setPageIndex(page - 1)}
                    isActive={table.getState().pagination.pageIndex === page - 1}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default UserTable;