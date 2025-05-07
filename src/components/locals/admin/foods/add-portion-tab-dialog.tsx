"use client"

import React from "react"

import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/globals/atoms/select"

interface FoodAddPortionTabDialogProps {
  register: any
  setValue: any
  errors: any
}

function FoodAddPortionTabDialog({
  register,
  setValue,
  errors
}: FoodAddPortionTabDialogProps) {
  const unitOptions = [
    { label: "gram (g)", value: "g" },
    { label: "mililiter (ml)", value: "ml" }
  ]

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      <div className="col-span-2">
        <div className="space-y-2">
          <Label htmlFor="portion.size">Kích thước</Label>
          <Input
            id="portion.size"
            type="text"
            placeholder="Nhập kích thước"
            {...register("portion.size")}
          />
          {errors?.portion?.size && (
            <p className="mt-1 ml-1 text-sm text-red-600">
              {errors.portion.size.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="space-y-2">
          <Label htmlFor="portion.weight">Khối lượng</Label>
          <Input
            id="portion.weight"
            type="number"
            placeholder="Nhập khối lượng"
            {...register("portion.weight", { valueAsNumber: true })}
          />
          {errors?.portion?.weight && (
            <p className="mt-1 ml-1 text-sm text-red-600">
              {errors.portion.weight.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="space-y-2">
          <Label htmlFor="portion.unit">Đơn vị</Label>
          <Select onValueChange={(value) => setValue("portion.unit", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn đơn vị" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Đơn vị</SelectLabel>
                {unitOptions.map((option) => (
                  <SelectItem key={option.label} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {errors?.portion?.unit && (
            <p className="mt-1 ml-1 text-sm text-red-600">
              {errors.portion.unit.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FoodAddPortionTabDialog
