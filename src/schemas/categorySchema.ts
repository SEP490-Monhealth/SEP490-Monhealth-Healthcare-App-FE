import { z } from "zod"

import { CategoryTypeSchemaEnum } from "@/constants/enum/Category"

import { timestampFields, uuidSchema } from "./baseSchema"

const categorySchema = z.object({
  categoryId: uuidSchema,

  name: z
    .string()
    .nonempty({ message: "Tên danh mục không được để trống" })
    .max(50, { message: "Tên danh mục không được dài hơn 50 ký tự" })
    .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/, {
      message: "Tên danh mục chỉ được chứa chữ cái, số và khoảng trắng"
    }),
  description: z
    .string()
    .max(200, {
      message: "Mô tả danh mục không được dài hơn 200 ký tự"
    })
    .optional(),

  imageUrl: z.string().optional(),

  ...timestampFields
})

export const createUpdateCategorySchema = z.object({
  name: categorySchema.shape.name,
  description: categorySchema.shape.description,
  imageUrl: categorySchema.shape.imageUrl,
  type: CategoryTypeSchemaEnum
})

export type CategoryType = z.infer<typeof categorySchema>
export type CreateUpdateCategoryType = z.infer<
  typeof createUpdateCategorySchema
>
