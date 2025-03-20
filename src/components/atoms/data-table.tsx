"use client"

import React, { useState } from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { Plus } from "lucide-react"

import { Input } from "@/components/atoms/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/atoms/table"
import { DataTableViewOptions } from "@/components/molecules/data-table-view-options"

import {
  DataTableFilter,
  DataTableFilterProps,
  DataTableFilters
} from "../molecules/data-table-filter"
import { DataTablePagination } from "../molecules/data-table-pagination"
import { Button } from "./button"

interface DataTableProps<TData, TValue> {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  visibility?: VisibilityState
  search: string
  setSearch: (search: string) => void
  placeholder?: string
  page: number
  setPage: (page: number) => void
  totalPages: number
  limit: number
  setLimit: (limit: number) => void
  filters?: DataTableFilterProps[]
  onClearAllFilters?: () => void
  addNewButton?: boolean
  onAddNew?: () => void
}

export function DataTable<TData, TValue>({
  data,
  columns,
  visibility = {},
  search,
  setSearch,
  placeholder = "Tìm kiếm...",
  page = 1,
  setPage,
  totalPages,
  limit = 10,
  setLimit,
  filters = [],
  onClearAllFilters,
  addNewButton,
  onAddNew
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(visibility)
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div>
      <div className="mb-2 flex items-center py-4">
        <div className="flex gap-4">
          <Input
            placeholder={placeholder}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-md"
          />

          {filters.length === 1 ? (
            <DataTableFilter
              name={filters[0].name}
              label={filters[0].label}
              options={filters[0].options}
              value={filters[0].value}
              onChange={filters[0].onChange}
            />
          ) : (
            filters.length > 1 && (
              <DataTableFilters
                filters={filters}
                onClearAll={onClearAllFilters}
              />
            )
          )}
        </div>

        <div className="ml-auto flex gap-4">
          {addNewButton && (
            <Button onClick={onAddNew}>
              <Plus className="h-4 w-4" />
              Thêm mới
            </Button>
          )}

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
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        limit={limit}
        setLimit={setLimit}
      />
    </div>
  )
}
