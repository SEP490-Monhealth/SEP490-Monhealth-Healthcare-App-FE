import React from "react"

import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"
import { Textarea } from "@/components/globals/atoms/textarea"

import {
  DishTypeEnum,
  MealTypeEnum,
  dishTypeMap,
  mealTypeMap
} from "@/constants/enum/Food"

import { FoodType } from "@/schemas/foodSchema"

import { formatDate } from "@/utils/formatters"

interface FoodDetailTabDialogProps {
  foodData: FoodType
}

function FoodDetailTabDialog({ foodData }: FoodDetailTabDialogProps) {
  const getMealTypeLabels = (mealTypes: MealTypeEnum[] | null | undefined) => {
    if (!mealTypes || mealTypes.length === 0) {
      return "--"
    }
    return mealTypes.map((type) => mealTypeMap[type]?.label || "--").join(", ")
  }

  const getDishTypeLabels = (dishTypes: DishTypeEnum[] | null | undefined) => {
    if (!dishTypes || dishTypes.length === 0) {
      return "--"
    }
    return dishTypes.map((dish) => dishTypeMap[dish]?.label || "--").join(", ")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="foodId">Mã món ăn</Label>
          <Input id="foodId" type="text" value={foodData.foodId} disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Tên món ăn</Label>
          <Input id="name" type="text" value={foodData.name} disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Danh mục</Label>
          <Input id="category" type="text" value={foodData.category} disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mealType"></Label>
          <Input
            id="mealType"
            type="text"
            value={getMealTypeLabels(foodData.mealType)}
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dishType"></Label>
          <Input
            id="dishType"
            type="text"
            value={getDishTypeLabels(foodData.dishType)}
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Mô tả</Label>
          <Textarea
            id="description"
            rows={4}
            value={foodData.description}
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="isPublic">Công khai</Label>
          <Input
            id="isPublic"
            type="text"
            value={foodData.isPublic ? "Công khai" : "Riêng tư"}
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Trạng thái</Label>
          <Input
            id="status"
            type="text"
            value={foodData.status ? "Hoạt động" : "Ngừng hoạt động"}
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="createdAt">Ngày tạo</Label>
          <Input
            id="createdAt"
            type="text"
            value={formatDate(foodData.createdAt)}
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="updatedAt">Ngày cập nhật</Label>
          <Input
            id="updatedAt"
            type="text"
            value={formatDate(foodData.updatedAt)}
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="createdBy">Người tạo</Label>
          <Input
            id="createdBy"
            type="text"
            value={foodData.createdBy}
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="updatedBy">Người cập nhật</Label>
          <Input
            id="updatedBy"
            type="text"
            value={foodData.updatedBy}
            disabled
          />
        </div>
      </div>
    </div>
  )
}

export default FoodDetailTabDialog
