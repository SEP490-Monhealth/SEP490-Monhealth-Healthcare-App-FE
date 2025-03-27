"use client"

import { Filter } from "lucide-react"

import { Button } from "../atoms/button"
import { Checkbox } from "../atoms/checkbox"
import { Label } from "../atoms/label"
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/popover"
import { Separator } from "../atoms/separator"

export interface DataTableOptionProps {
  value: string
  label: string
}

export interface DataTableFilterProps {
  name: string
  label: string
  options: DataTableOptionProps[]
  value?: string
  onChange: (value: string) => void
}

export interface DataTableFiltersProps {
  filters: DataTableFilterProps[]
  onClearAll?: () => void
}

export function DataTableFilters({
  filters,
  onClearAll
}: DataTableFiltersProps) {
  const activeFiltersCount = filters.filter(
    (filter) => filter.value && filter.value !== ""
  ).length

  const handleClearAllFilters = () => {
    if (onClearAll) {
      onClearAll()
    } else {
      filters.forEach((filter) => {
        if (filter.value) {
          filter.onChange("")
        }
      })
    }
  }

  const popoverWidth = Math.min(filters.length * 200, 600)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className="h-4 w-4" />
          Bộ lọc
          {activeFiltersCount > 0 && <span>({activeFiltersCount})</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2" style={{ width: `${popoverWidth}px` }}>
        <h4 className="px-2 py-1.5 text-sm font-medium select-none data-[inset]:pl-8">
          Bộ lọc
        </h4>
        <Separator className="my-1" />

        <div className="flex flex-row justify-between p-2">
          {filters.map((filter) => (
            <div key={filter.name} className="flex flex-col gap-2">
              <Label className="mb-2 font-medium">{filter.label}</Label>

              <div className="space-y-3">
                {filter.options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`${filter.name}-${option.value}`}
                      checked={filter.value === option.value}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          filter.onChange(option.value)
                        } else {
                          filter.onChange("")
                        }
                      }}
                    />
                    <Label
                      htmlFor={`${filter.name}-${option.value}`}
                      className="text-sm font-normal"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {activeFiltersCount > 0 && (
          <Button
            variant="outline"
            className="mt-2 w-full"
            onClick={handleClearAllFilters}
          >
            Xóa tất cả bộ lọc
          </Button>
        )}
      </PopoverContent>
    </Popover>
  )
}

export function DataTableFilter({
  label,
  options,
  value,
  onChange
}: DataTableFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className="h-4 w-4" />
          {label}
          {value && (
            <span>
              ({options.find((opt) => opt.value === value)?.label || value})
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2">
        <div className="">
          <h4 className="px-2 py-1.5 text-sm font-medium select-none data-[inset]:pl-8">
            {label}
          </h4>
          <Separator className="my-1" />

          <div className="space-y-3 p-2">
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${option.value}`}
                  checked={value === option.value}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onChange(option.value)
                    } else {
                      onChange("")
                    }
                  }}
                />
                <Label
                  htmlFor={`${option.value}`}
                  className="text-sm font-normal"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>

          {value && (
            <Button
              variant="outline"
              className="mt-2 w-full"
              onClick={() => onChange("")}
            >
              Xóa bộ lọc
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
