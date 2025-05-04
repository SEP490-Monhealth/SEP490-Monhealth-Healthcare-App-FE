import { z } from "zod"

import { DishTypeSchemaEnum, MealTypeSchemaEnum } from "@/constants/enum/Food"

import { auditFields, uuidSchema } from "./baseSchema"
import { categorySchema } from "./categorySchema"
import { createFoodNutritionSchema, nutritionSchema } from "./nutritionSchema"
import { createFoodPortionSchema } from "./portionSchema"

export const foodSchema = z.object({
  foodId: uuidSchema,
  userId: uuidSchema,

  category: categorySchema.shape.name,

  mealType: z.array(MealTypeSchemaEnum),
  dishType: z.array(DishTypeSchemaEnum),

  name: z
    .string()
    .nonempty({ message: "Tên món ăn không được để trống" })
    .min(3, { message: "Tên món ăn phải có ít nhất 3 ký tự" })
    .max(50, { message: "Tên món ăn không được quá 50 ký tự" })
    .regex(/^[\p{L} ]+$/u, {
      message: "Tên món ăn chỉ được chứa chữ cái và khoảng trắng"
    }),
  description: z
    .string()
    .nonempty({ message: "Mô tả món ăn không được để trống" })
    .min(10, { message: "Mô tả món ăn phải có ít nhất 10 ký tự" }),

  nutrition: z.object({
    calories: nutritionSchema.shape.calories
  }),

  referenceUrl: z.string().optional(),

  views: z.number().default(0),

  isPublic: z.boolean(),
  status: z.boolean(),

  ...auditFields
})

export const createFoodSchema = z.object({
  userId: uuidSchema,

  category: categorySchema.shape.name,

  mealType: z.array(MealTypeSchemaEnum),
  dishType: z.array(DishTypeSchemaEnum),

  name: z
    .string()
    .nonempty({ message: "Tên món ăn không được để trống" })
    .min(3, { message: "Tên món ăn phải có ít nhất 3 ký tự" })
    .max(50, { message: "Tên món ăn không được quá 50 ký tự" })
    .regex(/^[\p{L} ]+$/u, {
      message: "Tên món ăn chỉ được chứa chữ cái và khoảng trắng"
    }),
  description: z
    .string()
    .nonempty({ message: "Mô tả món ăn không được để trống" })
    .min(10, { message: "Mô tả món ăn phải có ít nhất 10 ký tự" }),

  referenceUrl: z.string().optional(),

  portion: createFoodPortionSchema,

  nutrition: createFoodNutritionSchema
})

export const createFoodBasicInfoSchema = createFoodSchema.pick({
  category: true,
  mealType: true,
  dishType: true,
  name: true,
  description: true,
  referenceUrl: true
})

export const createFoodPortionInfoSchema = createFoodSchema.pick({
  portion: true
})

export const createFoodNutritionInfoSchema = createFoodSchema.pick({
  nutrition: true
})

export type FoodType = z.infer<typeof foodSchema>
export type CreateFoodType = z.infer<typeof createFoodSchema>

export type CreateFoodBasicInfoType = z.infer<typeof createFoodBasicInfoSchema>
export type CreateFoodPortionInfoType = z.infer<
  typeof createFoodPortionInfoSchema
>
export type CreateFoodNutritionInfoType = z.infer<
  typeof createFoodNutritionInfoSchema
>
