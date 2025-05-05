"use client"

import React, { useRef, useState } from "react"

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
import { Plus, X } from "lucide-react"

import { Input } from "@/components/globals/atoms/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/globals/atoms/table"

import DataTableViewOptions from "@/components/globals/molecules/data-table-view-options"

import {
  DataTableFilter,
  DataTableFilterProps,
  DataTableFilters
} from "../molecules/data-table-filter"
import DataTablePagination from "../molecules/data-table-pagination"
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
  const inputRef = useRef<HTMLInputElement>(null)

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

  const handleClearInput = () => {
    setSearch("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div>
      <div className="mb-2 flex items-center py-4">
        <div className="flex gap-4">
          <div className="relative">
            <Input
              placeholder={placeholder}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-md"
            />

            {search && (
              <button
                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Clear input"
                onClick={handleClearInput}
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>

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
