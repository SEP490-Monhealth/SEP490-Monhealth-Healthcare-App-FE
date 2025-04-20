"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "../atoms/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../atoms/select"

interface DataTablePaginationProps {
  page: number
  setPage: (page: number) => void
  totalPages: number
  limit: number
  setLimit: (limit: number) => void
}

function DataTablePagination({
  page,
  setPage,
  totalPages,
  limit,
  setLimit
}: DataTablePaginationProps) {
  const handlePrevPage = (e: React.MouseEvent) => {
    e.preventDefault()
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNextPage = (e: React.MouseEvent) => {
    e.preventDefault()
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  const handleLimitChange = (value: string) => {
    const newLimit = Number(value)
    setLimit(newLimit)
    if (page > 1) {
      setPage(1)
    }
  }

  const renderPagination = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      pages.push(...Array.from({ length: totalPages }, (_, i) => i + 1))
    } else {
      pages.push(1)

      if (page > 3) {
        pages.push("...")
      }

      const start = Math.max(2, page - 1)
      const end = Math.min(totalPages - 1, page + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (page < totalPages - 2) {
        pages.push("...")
      }

      pages.push(totalPages)
    }

    return pages.map((pageNumber, index) =>
      pageNumber === "..." ? (
        <PaginationItem key={`ellipsis-${index}`}>
          <PaginationEllipsis />
        </PaginationItem>
      ) : (
        <PaginationItem key={pageNumber}>
          <PaginationLink
            href="#"
            isActive={page === pageNumber}
            onClick={(e) => {
              e.preventDefault()
              setPage(Number(pageNumber))
            }}
          >
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      )
    )
  }

  return (
    <div className="mt-4 flex items-center justify-between px-2">
      <p className="text-sm font-medium whitespace-nowrap">
        Trang {page} / {totalPages}
      </p>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={handlePrevPage}
              className={page <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {renderPagination()}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={handleNextPage}
              className={
                page >= totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium whitespace-nowrap">Dòng mỗi trang</p>

        <Select value={`${limit}`} onValueChange={handleLimitChange}>
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default DataTablePagination
