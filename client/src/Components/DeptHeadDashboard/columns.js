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
    accessorKey: "complainantName",
    header: "Complainant Name",
  },
  {
    accessorKey: "issueDescription",
    header: "Issue Description",
  },
  {
    accessorKey: "fieldStaff",
    header: "Field Staff",
  },
  {
    accessorKey: "msgFieldstaff",
    header: "Message for FieldStaff",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  {
    accessorKey: "WardNo",
    header: "Ward No",
  },
];
