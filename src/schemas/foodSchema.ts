import { z } from "zod"

import { DishTypeSchemaEnum, MealTypeSchemaEnum } from "@/constants/enum/Food"

import { auditFields, uuidSchema } from "./baseSchema"
import { categorySchema } from "./categorySchema"

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
    .max(255, { message: "Tên món ăn không được quá 255 ký tự" }),
  description: z
    .string()
    .nonempty({ message: "Mô tả món ăn không được để trống" })
    .min(10, { message: "Mô tả món ăn phải có ít nhất 10 ký tự" }),

  views: z.number().default(0),

  isPublic: z.boolean(),

  status: z.boolean(),

  ...auditFields
})

export type FoodType = z.infer<typeof foodSchema>
