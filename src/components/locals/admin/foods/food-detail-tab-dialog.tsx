"use client"

import React from "react"

import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"
import { Textarea } from "@/components/globals/atoms/textarea"

import { getDishTypeLabels, getMealTypeLabels } from "@/constants/enum/Food"

import { FoodType } from "@/schemas/foodSchema"

import { formatDate } from "@/utils/formatters"

interface FoodDetailTabDialogProps {
  foodData: FoodType
}

function FoodDetailTabDialog({ foodData }: FoodDetailTabDialogProps) {
  const mealTypeLabels = foodData.mealType
    ? getMealTypeLabels(foodData.mealType).join(", ")
    : "--"

  const dishTypeLabels = foodData.dishType
    ? getDishTypeLabels(foodData.dishType).join(", ")
    : "--"

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      <div className="space-y-2">
        <Label htmlFor="foodId">Mã món ăn</Label>
        <Input id="foodId" type="text" value={foodData.foodId} readOnly />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Tên món ăn</Label>
        <Input id="name" type="text" value={foodData.name} readOnly />
      </div>

      <div className="col-span-2">
        <div className="grid grid-cols-3 gap-x-6 gap-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Danh mục</Label>
            <Input
              id="category"
              type="text"
              value={foodData.category}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mealType">Loại bữa ăn</Label>
            <Input
              id="mealType"
              type="text"
              value={mealTypeLabels || "--"}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dishType">Loại món ăn</Label>
            <Input
              id="dishType"
              type="text"
              value={dishTypeLabels || "--"}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="col-span-2 space-y-2">
        <Label htmlFor="description">Mô tả</Label>
        <Textarea
          id="description"
          rows={4}
          value={foodData.description}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="isPublic">Công khai</Label>
        <Input
          id="isPublic"
          type="text"
          value={foodData.isPublic ? "Công khai" : "Riêng tư"}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Trạng thái</Label>
        <Input
          id="status"
          type="text"
          value={foodData.status ? "Hoạt động" : "Ngừng hoạt động"}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="createdAt">Ngày tạo</Label>
        <Input
          id="createdAt"
          type="text"
          value={formatDate(foodData.createdAt)}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="createdBy">Người tạo</Label>
        <Input id="createdBy" type="text" value={foodData.createdBy} readOnly />
      </div>

      <div className="space-y-2">
        <Label htmlFor="updatedAt">Ngày cập nhật</Label>
        <Input
          id="updatedAt"
          type="text"
          value={formatDate(foodData.updatedAt)}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="updatedBy">Người cập nhật</Label>
        <Input id="updatedBy" type="text" value={foodData.updatedBy} readOnly />
      </div>
    </div>
  )
}

export default FoodDetailTabDialog
