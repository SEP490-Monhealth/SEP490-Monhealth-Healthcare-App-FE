import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"

const nutritionSchema = z.object({
  nutritionId: uuidSchema,

  calories: z.number().min(0, { message: "Calo phải lớn hơn hoặc bằng 0" }),
  protein: z.number().min(0, { message: "Protein phải lớn hơn hoặc bằng 0" }),
  carbs: z.number().min(0, { message: "Carbs phải lớn hơn hoặc bằng 0" }),
  fat: z.number().min(0, { message: "Chất béo phải lớn hơn hoặc bằng 0" }),
  fiber: z.number().min(0, { message: "Chất xơ phải lớn hơn hoặc bằng 0" }),
  sugar: z.number().min(0, { message: "Đường phải lớn hơn hoặc bằng 0" }),

  saturatedFat: z.number().min(0),
  unsaturatedFat: z.number().min(0),
  cholesterol: z.number().min(0),
  sodium: z.number().min(0),
  potassium: z.number().min(0),
  calcium: z.number().min(0),
  iron: z.number().min(0),
  vitaminA: z.number().min(0),
  vitaminB1: z.number().min(0),
  vitaminB2: z.number().min(0),
  vitaminB3: z.number().min(0),
  vitaminC: z.number().min(0),
  vitaminD: z.number().min(0),
  vitaminE: z.number().min(0),

  ...timestampFields
})

const updateNutrition = nutritionSchema.omit({
  nutritionId: true,
  createdAt: true,
  updatedAt: true
})

export type NutritionType = z.infer<typeof nutritionSchema>
export type UpdateNutritionType = z.infer<typeof updateNutrition>
