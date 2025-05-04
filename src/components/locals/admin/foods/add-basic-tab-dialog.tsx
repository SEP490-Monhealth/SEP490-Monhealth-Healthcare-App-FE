"use client"

import React from "react"

import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"
import MultipleSelector, {
  Option
} from "@/components/globals/atoms/multiselect"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/globals/atoms/select"
import { Textarea } from "@/components/globals/atoms/textarea"

import { CategoryTypeEnum } from "@/constants/enum/Category"
import {
  DishTypeEnum,
  MealTypeEnum,
  dishTypeMap,
  mealTypeMap
} from "@/constants/enum/Food"

import { useCategories } from "@/hooks/useCategory"

interface FoodAddBasicTabDialogProps {
  register: any
  setValue: any
  watch: any
  errors: any
}

function FoodAddBasicTabDialog({
  register,
  setValue,
  watch,
  errors
}: FoodAddBasicTabDialogProps) {
  const { data: categoriesData } = useCategories(
    1,
    undefined,
    CategoryTypeEnum.Food,
    ""
  )

  const mealTypeOptions: Option[] = Object.entries(mealTypeMap).map(
    ([key, value]) => ({
      value: key,
      label: value.label
    })
  )

  const dishTypeOptions: Option[] = Object.entries(dishTypeMap).map(
    ([key, value]) => ({
      value: key,
      label: value.label
    })
  )

  const currentMealTypes = watch("mealType") || []
  const currentDishTypes = watch("dishType") || []

  const selectedMealTypes = currentMealTypes.map((type: MealTypeEnum) => ({
    value: type.toString(),
    label: mealTypeMap[type]?.label
  }))

  const selectedDishTypes = currentDishTypes.map((type: DishTypeEnum) => ({
    value: type.toString(),
    label: dishTypeMap[type]?.label
  }))

  const handleMealTypeChange = (selected: Option[]) => {
    const selectedValues = selected.map(
      (option) => parseInt(option.value, 10) as MealTypeEnum
    )
    setValue("mealType", selectedValues, {
      shouldValidate: true,
      shouldDirty: true
    })
  }

  const handleDishTypeChange = (selected: Option[]) => {
    const selectedValues = selected.map(
      (option) => parseInt(option.value, 10) as DishTypeEnum
    )
    setValue("dishType", selectedValues, {
      shouldValidate: true,
      shouldDirty: true
    })
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      <div className="col-span-2">
        <div className="space-y-2">
          <Label htmlFor="category">Danh mục</Label>
          <Select onValueChange={(value) => setValue("category", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Danh mục</SelectLabel>
                {categoriesData?.categories.map((option) => (
                  <SelectItem key={option.name} value={option.name}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {errors?.category && (
            <p className="mt-1 ml-1 text-sm text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="space-y-2">
          <Label htmlFor="mealType">Loại bữa ăn</Label>
          <MultipleSelector
            value={selectedMealTypes}
            defaultOptions={mealTypeOptions}
            placeholder="Chọn loại bữa ăn"
            hidePlaceholderWhenSelected
            onChange={handleMealTypeChange}
            commandProps={{
              label: "Chọn loại bữa ăn"
            }}
            emptyIndicator={
              <p className="text-center text-sm">Không tìm thấy kết quả</p>
            }
          />
          {errors?.mealType && (
            <p className="mt-1 ml-1 text-sm text-red-600">
              {errors.mealType.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="space-y-2">
          <Label htmlFor="dishType">Loại món ăn</Label>
          <MultipleSelector
            value={selectedDishTypes}
            defaultOptions={dishTypeOptions}
            placeholder="Chọn loại món ăn"
            hidePlaceholderWhenSelected
            onChange={handleDishTypeChange}
            commandProps={{
              label: "Chọn loại món ăn"
            }}
            emptyIndicator={
              <p className="text-center text-sm">Không tìm thấy kết quả</p>
            }
          />
          {errors?.dishType && (
            <p className="mt-1 ml-1 text-sm text-red-600">
              {errors.dishType.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="space-y-2">
          <Label htmlFor="name">Tên thức ăn</Label>
          <Input
            id="name"
            type="text"
            placeholder="Nhập tên thức ăn"
            {...register("name")}
          />
          {errors?.name && (
            <p className="mt-1 ml-1 text-sm text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="space-y-2">
          <Label htmlFor="referenceUrl">Nguồn tham khảo (tùy chọn)</Label>
          <Input
            id="referenceUrl"
            type="url"
            placeholder="Nhập URL nguồn tham khảo"
            {...register("referenceUrl")}
          />
        </div>
      </div>

      <div className="col-span-2">
        <div className="space-y-2">
          <Label htmlFor="description">Mô tả</Label>
          <Textarea
            id="description"
            rows={4}
            placeholder="Nhập mô tả thức ăn"
            {...register("description")}
          />
          {errors?.description && (
            <p className="mt-1 ml-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FoodAddBasicTabDialog
