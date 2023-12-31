"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { ToggleStatus } from "@/components/ui/toggle-status"

export type ProductColumn = {
  id: string
  name: string
  price: string
  image?: string
  category: string
  status: boolean
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <ToggleStatus url={`/api/product/${row.original.id}`} status={row.original.status}/>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original}/>
  }
]
