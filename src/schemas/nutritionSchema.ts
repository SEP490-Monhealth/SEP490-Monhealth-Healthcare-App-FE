import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"

export const nutritionSchema = z.object({
  nutritionId: uuidSchema,

  calories: z
    .number()
    .min(1, { message: "Nặng gượng phải lớn hơn hoặc bằng 1" }),
  protein: z.number().min(1, { message: "Chất đạm phải lớn hơn hoặc bằng 1" }),
  carbs: z.number().min(1, { message: "Tinh bột phải lớn hơn hoặc bằng 1" }),
  fat: z.number().min(1, { message: "Chất béo phải lớn hơn hoặc bằng 1" }),
  fiber: z.number().min(1, { message: "Chất xơ phải lớn hơn hoặc bằng 1" }),
  sugar: z.number().min(1, { message: "Đường phải lớn hơn hoặc bằng 1" }),

  saturatedFat: z.number().optional(),
  unsaturatedFat: z.number().optional(),
  cholesterol: z.number().optional(),
  sodium: z.number().optional(),
  potassium: z.number().optional(),
  calcium: z.number().optional(),
  iron: z.number().optional(),
  vitaminA: z.number().optional(),
  vitaminB1: z.number().optional(),
  vitaminB2: z.number().optional(),
  vitaminB3: z.number().optional(),
  vitaminC: z.number().optional(),
  vitaminD: z.number().optional(),
  vitaminE: z.number().optional(),

  ...timestampFields
})

export const updateNutrition = nutritionSchema.omit({
  nutritionId: true,
  createdAt: true,
  updatedAt: true
})

export const createFoodNutritionSchema = nutritionSchema.pick({
  calories: true,
  protein: true,
  carbs: true,
  fat: true,
  fiber: true,
  sugar: true,
  saturatedFat: true,
  unsaturatedFat: true,
  cholesterol: true,
  sodium: true,
  potassium: true,
  calcium: true,
  iron: true,
  vitaminA: true,
  vitaminB1: true,
  vitaminB2: true,
  vitaminB3: true,
  vitaminC: true,
  vitaminD: true,
  vitaminE: true
})

export type NutritionType = z.infer<typeof nutritionSchema>
export type UpdateNutritionType = z.infer<typeof updateNutrition>
