"use client"

import React from "react"

import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"

import { NutritionType } from "@/schemas/nutritionSchema"

interface FoodNutritionTabDialogProps {
  nutritionData: NutritionType
}

function FoodNutritionTabDialog({
  nutritionData
}: FoodNutritionTabDialogProps) {
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-4">
      <div className="space-y-2">
        <Label htmlFor="calories">Năng lượng</Label>
        <div className="relative">
          <Input
            id="calories"
            type="number"
            value={nutritionData.calories || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            kcal
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="protein">Chất đạm</Label>
        <div className="relative">
          <Input
            id="protein"
            type="number"
            value={nutritionData.protein || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            g
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="carbs">Tinh bột</Label>
        <div className="relative">
          <Input
            id="carbs"
            type="number"
            value={nutritionData.carbs || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            g
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fat">Chất béo</Label>
        <div className="relative">
          <Input
            id="fat"
            type="number"
            value={nutritionData.fat || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            g
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fiber">Chất xơ</Label>
        <div className="relative">
          <Input
            id="fiber"
            type="number"
            value={nutritionData.fiber || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            g
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sugar">Đường</Label>
        <div className="relative">
          <Input
            id="sugar"
            type="number"
            value={nutritionData.sugar || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            g
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="saturatedFat">Chất béo bão hòa</Label>
        <div className="relative">
          <Input
            id="saturatedFat"
            type="number"
            value={nutritionData.saturatedFat || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            g
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="unsaturatedFat">Chất béo không bão hòa</Label>
        <div className="relative">
          <Input
            id="unsaturatedFat"
            type="number"
            value={nutritionData.unsaturatedFat || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            g
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cholesterol">Cholesterol</Label>
        <div className="relative">
          <Input
            id="cholesterol"
            type="number"
            value={nutritionData.cholesterol || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            mg
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sodium">Natri</Label>
        <div className="relative">
          <Input
            id="sodium"
            type="number"
            value={nutritionData.sodium || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            mg
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="potassium">Kali</Label>
        <div className="relative">
          <Input
            id="potassium"
            type="number"
            value={nutritionData.potassium || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            mg
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="calcium">Canxi</Label>
        <div className="relative">
          <Input
            id="calcium"
            type="number"
            value={nutritionData.calcium || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            mg
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="iron">Sắt</Label>
        <div className="relative">
          <Input
            id="iron"
            type="number"
            value={nutritionData.iron || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            mg
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vitaminA">Vitamin A</Label>
        <div className="relative">
          <Input
            id="vitaminA"
            type="number"
            value={nutritionData.vitaminA || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            IU
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vitaminB1">Vitamin B1</Label>
        <div className="relative">
          <Input
            id="vitaminB1"
            type="number"
            value={nutritionData.vitaminB1 || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            mg
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vitaminB2">Vitamin B2</Label>
        <div className="relative">
          <Input
            id="vitaminB2"
            type="number"
            value={nutritionData.vitaminB2 || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            mg
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vitaminB3">Vitamin B3</Label>
        <div className="relative">
          <Input
            id="vitaminB3"
            type="number"
            value={nutritionData.vitaminB3 || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            mg
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vitaminC">Vitamin C</Label>
        <div className="relative">
          <Input
            id="vitaminC"
            type="number"
            value={nutritionData.vitaminC || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            mg
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vitaminD">Vitamin D</Label>
        <div className="relative">
          <Input
            id="vitaminD"
            type="number"
            value={nutritionData.vitaminD || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            IU
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vitaminE">Vitamin E</Label>
        <div className="relative">
          <Input
            id="vitaminE"
            type="number"
            value={nutritionData.vitaminE || 0}
            readOnly
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            mg
          </span>
        </div>
      </div>
    </div>
  )
}

export default FoodNutritionTabDialog
