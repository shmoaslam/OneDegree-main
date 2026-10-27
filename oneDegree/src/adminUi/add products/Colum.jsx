import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react"; 
import { FaEdit } from "react-icons/fa";

export const columns = (handleEdit, handleDelete) => [
  {
    name: "Name",
    selector: (row) => row.product_name,
    sortable: true,
  },
  {
    name: "Size",
    selector: (row) => row.size,
    sortable: true,
  },
  {
    name: "Category",
    selector: (row) => row.category_name,
    sortable: true,
  },
  {
    name: "Material",
    selector: (row) => row.material_name,
    sortable: true,
  },
  {
    name: "Collection",
    selector: (row) => row.collection_name,
    sortable: true,
  },
  // {
  //   name: "Images",
  //   selector: (row) => row.image,
  //   sortable: true,
  //   cell: (row) => (
  //     <img
  //       src={row.image}
  //       alt={row.name}
  //       className="w-10 h-10 object-cover rounded"
  //     />
  //   ),
  // },
  {
    name: "Color",
    selector: (row) => row.colors[0].color_name,
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-2 items-center">
          <FaEdit size={20} aria-label="Actions" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() =>{
             handleEdit(row)}}>
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
