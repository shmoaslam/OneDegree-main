import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React from "react"; 
import { FaEdit } from "react-icons/fa";

export const columns = (handleEdit , handleDelete) => [
  // {
  //   name: "Id",
  //   selector: (row) => row.store_id,
  //   sortable: true,
  // },
  {
    name: "Stiore Name",
    selector: (row) => row.store_name,
    sortable: true,
  },
  {
    name: "Store Address",
    selector: (row) => row.store_address,
    sortable: true,
  },
  {
    name: "Locality",
    selector: (row) => row.locality,
    sortable: true,
  },
  {
    name: "City",
    selector: (row) => row.city,
    sortable: true,
  },
  {
    name: "Pincode",
    selector: (row) => row.pincode,
    sortable: true,
  },
  {
    name: "Edit",
    cell: (row) => (
      <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 items-center">
        <FaEdit size={20} aria-label="Actions" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleEdit(row)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(row)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    ),
  },
];
