import React, { useState } from "react"

import LoadingPage from "@/app/admin/loading"
import { Control, Controller, FieldValues } from "react-hook-form"

import { Checkbox } from "@/components/globals/atoms/checkbox"
import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/globals/atoms/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/globals/atoms/select"

import {
  DishTypeEnum,
  MealTypeEnum,
  getDishTypeLabels,
  getMealTypeLabels
} from "@/constants/enum/Food"

import { useCategories } from "@/hooks/useCategory"

interface FoodInformationProps {
  control: Control<FieldValues>
  errors: any
  setValue: any
}

const mealTypeOptions = Object.keys(MealTypeEnum)
  .filter((key) => isNaN(Number(key)))
  .map((key) => {
    const enumKey = key as keyof typeof MealTypeEnum
    const enumValue = MealTypeEnum[enumKey]
    return {
      value: enumValue,
      label: getMealTypeLabels([enumValue])[0]
    }
  })

const dishTypeOptions = Object.keys(DishTypeEnum)
  .filter((key) => isNaN(Number(key)))
  .map((key) => {
    const enumKey = key as keyof typeof DishTypeEnum
    const enumValue = DishTypeEnum[enumKey]
    return {
      value: enumValue,
      label: getDishTypeLabels([enumValue])[0]
    }
  })

const unit = [
  {
    label: "Gram",
    value: "gram"
  },
  {
    label: "Ml",
    value: "ml"
  }
]

function InformationFood({ control, errors, setValue }: FoodInformationProps) {
  const [selectedMeals, setSelectedMeals] = useState<MealTypeEnum[]>([])
  const [selectedDishes, setSelectedDishes] = useState<DishTypeEnum[]>([])

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError
  } = useCategories(1, undefined, 0)

  const handleMealTypeChange = (value: string) => {
    const mealTypeValue = Number(value) as MealTypeEnum

    if (selectedMeals.includes(mealTypeValue)) {
      const updatedMeals = selectedMeals.filter(
        (item) => item !== mealTypeValue
      )
      setSelectedMeals(updatedMeals)
      setValue("mealType", updatedMeals)
    } else {
      const updatedMeals = [...selectedMeals, mealTypeValue]
      setSelectedMeals(updatedMeals)
      setValue("mealType", updatedMeals)
    }
  }

  const handleDishTypeChange = (value: string) => {
    const dishTypeValue = Number(value) as DishTypeEnum

    if (selectedDishes.includes(dishTypeValue)) {
      const updatedMeals = selectedDishes.filter(
        (item) => item !== dishTypeValue
      )
      setSelectedDishes(updatedMeals)
      setValue("dishType", updatedMeals)
    } else {
      const updatedMeals = [...selectedDishes, dishTypeValue]
      setSelectedDishes(updatedMeals)
      setValue("dishType", updatedMeals)
    }
  }

  const selectedMealsLabel = selectedMeals
    .map((meal) => getMealTypeLabels([meal])[0])
    .join(", ")

  const selectedDishesLabel = selectedDishes
    .map((dish) => getDishTypeLabels([dish])[0])
    .join(", ")

  if (isCategoriesLoading) return <LoadingPage />
  if (categoriesError) return <p>Error: {categoriesError?.message}</p>

  return (
    <div className="grid grid-cols-6 gap-x-6 gap-y-4">
      <div className="col-span-3">
        <Popover>
          <PopoverTrigger asChild>
            <div className="space-y-2">
              <Label>Loại bữa ăn</Label>
              <Input
                readOnly
                value={selectedMealsLabel}
                placeholder="Chọn loại bữa ăn"
                className="cursor-pointer"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-52">
            <div className="space-y-2">
              <p className="text-primary text-sm font-medium">Loại bữa ăn</p>
              {mealTypeOptions.map((option) => {
                const isChecked = selectedMeals.includes(option.value)
                return (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() =>
                        handleMealTypeChange(String(option.value))
                      }
                      id={`${option.value}`}
                    />

                    <label
                      htmlFor={`${option.value}`}
                      className="cursor-pointer text-sm"
                    >
                      {option.label}
                    </label>
                  </div>
                )
              })}
            </div>
          </PopoverContent>
        </Popover>

        {errors.mealType && (
          <p className="mt-1 ml-1 text-sm text-red-600">
            {errors.mealType.message}
          </p>
        )}
      </div>

      <div className="col-span-3">
        <Popover>
          <PopoverTrigger asChild>
            <div className="space-y-2">
              <Label>Loại món ăn</Label>
              <Input
                readOnly
                value={selectedDishesLabel}
                placeholder="Chọn loại món ăn"
                className="cursor-pointer"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-52">
            <div className="space-y-2">
            <p className="text-primary text-sm font-medium">Loại món ăn</p>
              {dishTypeOptions.map((option) => {
                const isChecked = selectedDishes.includes(option.value)
                return (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() =>
                        handleDishTypeChange(String(option.value))
                      }
                      id={`${option.value}`}
                    />
                    <label
                      htmlFor={`${option.value}`}
                      className="cursor-pointer text-sm"
                    >
                      {option.label}
                    </label>
                  </div>
                )
              })}
            </div>
          </PopoverContent>
        </Popover>

        {errors.mealType && (
          <p className="mt-1 ml-1 text-sm text-red-600">
            {errors.mealType.message}
          </p>
        )}
      </div>

      <div className="col-span-3">
        <div className="space-y-2">
          <Label htmlFor="name">Tên món ăn</Label>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                placeholder="VD: Cơm tấm sườn"
                onChange={onChange}
              />
            )}
          />
        </div>

        {errors.name && (
          <p className="mt-1 ml-1 text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="col-span-3">
        <div className="space-y-2">
          <Label htmlFor="category">Danh mục</Label>
          <Select onValueChange={(value) => setValue("category", value)}>
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue placeholder="Chọn loại danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Loại danh mục</SelectLabel>
                {categoriesData?.categories.map((option) => (
                  <SelectItem key={option.name} value={option.name}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {errors.category && (
          <p className="mt-1 ml-1 text-sm text-red-600">
            {errors.category.message}
          </p>
        )}
      </div>

      <div className="col-span-6">
        <div className="space-y-2">
          <Label htmlFor="description">Mô tả</Label>
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                placeholder="VD: Món ăn bổ dưỡng thích hợp để thanh lọc"
                onChange={onChange}
              />
            )}
          />
        </div>

        {errors.description && (
          <p className="mt-1 ml-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="col-span-2">
        <div className="space-y-2">
          <Label htmlFor="portion.size">Kích thước</Label>
          <Controller
            name="portion.size"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                placeholder="VD: Phần, hộp, lon,..."
                onChange={onChange}
              />
            )}
          />
        </div>

        {errors.portion?.size && (
          <p className="mt-1 ml-1 text-sm text-red-600">
            {errors.portion.size.message}
          </p>
        )}
      </div>

      <div className="col-span-2">
        <div className="space-y-2">
          <Label htmlFor="portion.weight">Khối lượng</Label>
          <Controller
            name="portion.weight"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                min={1}
                type="number"
                placeholder="VD: 100"
                onChange={(e) => {
                  const inputValue = e.target.value
                  const parsedValue =
                    inputValue === "" ? "" : parseInt(inputValue, 10)
                  onChange(parsedValue)
                }}
              />
            )}
          />
        </div>

        {errors.portion?.weight && (
          <p className="mt-1 ml-1 text-sm text-red-600">
            {errors.portion.weight.message}
          </p>
        )}
      </div>

      <div className="col-span-2">
        <div className="space-y-2">
          <Label htmlFor="portion.unit">Đơn vị</Label>
          <Select onValueChange={(value) => setValue("portion.unit", value)}>
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue placeholder="Chọn loại đơn vị" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Loại đơn vị</SelectLabel>
                {unit.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {errors.portion?.unit && (
          <p className="mt-1 ml-1 text-sm text-red-600">
            {errors.portion.unit.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default InformationFood
