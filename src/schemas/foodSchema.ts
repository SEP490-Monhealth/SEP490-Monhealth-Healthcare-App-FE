import { z } from "zod"

import { DishTypeSchemaEnum, MealTypeSchemaEnum } from "@/constants/enum/Food"

import { auditFields, uuidSchema } from "./baseSchema"
import { categorySchema } from "./categorySchema"
import { nutritionSchema } from "./nutritionSchema"
import { userSchema } from "./userSchema"

const portionSchema = () => require("./portionSchema").portionSchema

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

  views: z.number().default(0),

  isPublic: z.boolean(),

  status: z.boolean(),

  ...auditFields
})

const nutritionFood = nutritionSchema.pick({
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

export const informationFoodSchema = z.object({
  mealType: foodSchema.shape.mealType,
  dishType: foodSchema.shape.dishType,

  category: foodSchema.shape.category,
  name: foodSchema.shape.name,
  description: foodSchema.shape.description,

  portion: portionSchema().pick({
    size: true,
    weight: true,
    unit: true
  })
})

export const nutritionFoodSchema = z.object({
  nutrition: nutritionFood
})

export const createFoodSchema = z.object({
  userId: userSchema.shape.userId,

  mealType: foodSchema.shape.mealType,
  dishType: foodSchema.shape.dishType,

  category: foodSchema.shape.category,
  name: foodSchema.shape.name,
  description: foodSchema.shape.description,

  portion: portionSchema().pick({
    size: true,
    weight: true,
    unit: true
  }),

  nutrition: nutritionFood
})

export const updateFoodSchema = foodSchema.pick({
  mealType: true,
  dishType: true,

  category: true,
  name: true,
  description: true,

  isPublic: true
})

export const combinedFoodSchema = z.object({
  mealType: informationFoodSchema.shape.mealType.optional(),
  dishType: informationFoodSchema.shape.dishType.optional(),
  category: informationFoodSchema.shape.category.optional(),
  name: informationFoodSchema.shape.name.optional(),
  description: informationFoodSchema.shape.description.optional(),
  portion: informationFoodSchema.shape.portion.optional(),
  nutrition: nutritionFoodSchema.shape.nutrition.optional()
})

export type FoodType = z.infer<typeof foodSchema>
export type CreateFoodType = z.infer<typeof createFoodSchema>
export type UpdateFoodType = z.infer<typeof updateFoodSchema>
