import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";

export const columns = [
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