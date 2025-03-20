import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"

const foodSchema = z.object({
  foodId: uuidSchema,
  userId: uuidSchema,

  name: z
    .string()
    .nonempty({ message: "Tên món ăn không được để trống" })
    .min(3, { message: "Tên món ăn phải có ít nhất 3 ký tự" })
    .max(255, { message: "Tên món ăn không được quá 255 ký tự" }),
  description: z
    .string()
    .min(10, { message: "Mô tả phải có ít nhất 10 ký tự" }),

  views: z.number().default(0),

  isPublic: z.boolean().default(false),

  status: z.boolean(),

  ...auditFields
})

export type FoodType = z.infer<typeof foodSchema>
