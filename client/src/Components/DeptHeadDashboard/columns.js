// Import statement removed since it's TypeScript-specific
// import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// Type annotation removed
// export type Payment = {
import { DataTableRowActions } from "./data-table-row-actions";

// Type annotation removed
// export const columns: ColumnDef<Payment>[] = [
export const columns = [
  {
    accessorKey: "firstname",
    header: "Name",
  },
  {
    accessorKey: "mobileNo",
    header: "Mobile Number",
  },
  {
    accessorKey: "issueSubcategory",
    header: "Issue",
  },
  {
    accessorKey: "complaintDescription",
    header: "Description",
  },
  {
    accessorKey: "area",
    header: "Area",
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
