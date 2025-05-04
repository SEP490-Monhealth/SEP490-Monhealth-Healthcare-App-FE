import React from "react"

import { FieldErrors, UseFormRegister } from "react-hook-form"

import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"

import { CreateFoodNutritionInfoType } from "@/schemas/foodSchema"

interface FoodAddNutritionTabDialogProps {
  register: UseFormRegister<CreateFoodNutritionInfoType>
  errors: FieldErrors<CreateFoodNutritionInfoType>
}

function FoodAddNutritionTabDialog({
  register,
  errors
}: FoodAddNutritionTabDialogProps) {
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-4">
      <div>
        <div className="space-y-2">
          <Label htmlFor="nutrition.calories">Năng lượng</Label>
          <Input
            id="nutrition.calories"
            type="number"
            placeholder="Nhập lượng năng lượng"
            {...register("nutrition.calories", { valueAsNumber: true })}
          />
          {errors?.nutrition?.calories && (
            <p className="mt-1 ml-1 text-sm text-red-600">
              {errors.nutrition.calories.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="space-y-2">
          <Label htmlFor="nutrition.protein">Chất đạm</Label>
          <Input
            id="nutrition.protein"
            type="number"
            placeholder="Nhập lượng chất đạm"
            {...register("nutrition.protein", { valueAsNumber: true })}
          />
          {errors?.nutrition?.protein && (
            <p className="mt-1 ml-1 text-sm text-red-600">
              {errors.nutrition.protein.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="space-y-2">
          <Label htmlFor="nutrition.carbs">Tinh bột</Label>
          <Input
            id="nutrition.carbs"
            type="number"
            placeholder="Nhập lượng tinh bột"
            {...register("nutrition.carbs", { valueAsNumber: true })}
          />
          {errors?.nutrition?.carbs && (
            <p className="mt-1 ml-1 text-sm text-red-600">
              {errors.nutrition.carbs.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="space-y-2">
          <Label htmlFor="nutrition.fat">Chất béo</Label>
          <Input
            id="nutrition.fat"
            type="number"
            placeholder="Nhập lượng chất béo"
            {...register("nutrition.fat", { valueAsNumber: true })}
          />
          {errors?.nutrition?.fat && (
            <p className="mt-1 ml-1 text-sm text-red-600">
              {errors.nutrition.fat.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="space-y-2">
          <Label htmlFor="nutrition.fiber">Chất xơ</Label>
          <Input
            id="nutrition.fiber"
            type="number"
            placeholder="Nhập lượng chất xơ"
            {...register("nutrition.fiber", { valueAsNumber: true })}
          />
          {errors?.nutrition?.fiber && (
            <p className="mt-1 ml-1 text-sm text-red-600">
              {errors.nutrition.fiber.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="space-y-2">
          <Label htmlFor="nutrition.sugar">Đường</Label>
          <Input
            id="nutrition.sugar"
            type="number"
            placeholder="Nhập lượng đường"
            {...register("nutrition.sugar", { valueAsNumber: true })}
          />
          {errors?.nutrition?.sugar && (
            <p className="mt-1 ml-1 text-sm text-red-600">
              {errors.nutrition.sugar.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="nutrition.saturatedFat">Chất béo bão hòa</Label>
        <Input
          id="nutrition.saturatedFat"
          type="number"
          placeholder="Nhập lượng chất béo bão hòa"
          {...register("nutrition.saturatedFat", { valueAsNumber: true })}
        />
      </div>

      <div>
        <Label htmlFor="nutrition.unsaturatedFat">Chất béo không bão hòa</Label>
        <Input
          id="nutrition.unsaturatedFat"
          type="number"
          placeholder="Nhập lượng chất béo không bão hòa"
          {...register("nutrition.unsaturatedFat", { valueAsNumber: true })}
        />
      </div>

      <div>
        <Label htmlFor="nutrition.cholesterol">Cholesterol</Label>
        <Input
          id="nutrition.cholesterol"
          type="number"
          placeholder="Nhập lượng cholesterol"
          {...register("nutrition.cholesterol", { valueAsNumber: true })}
        />
      </div>

      <div>
        <Label htmlFor="nutrition.sodium">Natri</Label>
        <Input
          id="nutrition.sodium"
          type="number"
          placeholder="Nhập lượng natri"
          {...register("nutrition.sodium", { valueAsNumber: true })}
        />
      </div>

      <div>
        <Label htmlFor="nutrition.potassium">Kali</Label>
        <Input
          id="nutrition.potassium"
          type="number"
          placeholder="Nhập lượng kali"
          {...register("nutrition.potassium", { valueAsNumber: true })}
        />
      </div>

      <div>
        <Label htmlFor="nutrition.calcium">Canxi</Label>
        <Input
          id="nutrition.calcium"
          type="number"
          placeholder="Nhập lượng canxi"
          {...register("nutrition.calcium", { valueAsNumber: true })}
        />
      </div>

      <div>
        <Label htmlFor="nutrition.iron">Sắt</Label>
        <Input
          id="nutrition.iron"
          type="number"
          placeholder="Nhập lượng sắt"
          {...register("nutrition.iron", { valueAsNumber: true })}
        />
      </div>

      <div>
        <Label htmlFor="nutrition.vitaminA">Vitamin A</Label>
        <Input
          id="nutrition.vitaminA"
          type="number"
          placeholder="Nhập lượng vitamin A"
          {...register("nutrition.vitaminA", { valueAsNumber: true })}
        />
      </div>

      <div>
        <Label htmlFor="nutrition.vitaminB1">Vitamin B1</Label>
        <Input
          id="nutrition.vitaminB1"
          type="number"
          placeholder="Nhập lượng vitamin B1"
          {...register("nutrition.vitaminB1", { valueAsNumber: true })}
        />
      </div>

      <div>
        <Label htmlFor="nutrition.vitaminB2">Vitamin B2</Label>
        <Input
          id="nutrition.vitaminB2"
          type="number"
          placeholder="Nhập lượng vitamin B2"
          {...register("nutrition.vitaminB2", { valueAsNumber: true })}
        />
      </div>

      <div>
        <Label htmlFor="nutrition.vitaminB3">Vitamin B3</Label>
        <Input
          id="nutrition.vitaminB3"
          type="number"
          placeholder="Nhập lượng vitamin B3"
          {...register("nutrition.vitaminB3", { valueAsNumber: true })}
        />
      </div>

      <div>
        <Label htmlFor="nutrition.vitaminC">Vitamin C</Label>
        <Input
          id="nutrition.vitaminC"
          type="number"
          placeholder="Nhập lượng vitamin C"
          {...register("nutrition.vitaminC", { valueAsNumber: true })}
        />
      </div>

      <div>
        <Label htmlFor="nutrition.vitaminD">Vitamin D</Label>
        <Input
          id="nutrition.vitaminD"
          type="number"
          placeholder="Nhập lượng vitamin D"
          {...register("nutrition.vitaminD", { valueAsNumber: true })}
        />
      </div>

      <div>
        <Label htmlFor="nutrition.vitaminE">Vitamin E</Label>
        <Input
          id="nutrition.vitaminE"
          type="number"
          placeholder="Nhập lượng vitamin E"
          {...register("nutrition.vitaminE", { valueAsNumber: true })}
        />
      </div>
    </div>
  )
}

export default FoodAddNutritionTabDialog
