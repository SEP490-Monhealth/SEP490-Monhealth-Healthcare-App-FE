import { z } from "zod"

import { CategoryTypeSchemaEnum } from "@/constants/enum/Category"

import { auditFields, uuidSchema } from "./baseSchema"

export const categorySchema = z.object({
  categoryId: uuidSchema,

  type: CategoryTypeSchemaEnum,

  name: z
    .string()
    .nonempty({ message: "Tên danh mục không được để trống" })
    .min(3, { message: "Tên danh mục phải có ít nhất 3 ký tự" })
    .max(255, { message: "Tên danh mục không được dài hơn 255 ký tự" })
    .regex(/^[\p{L} ]+$/u, {
      message: "Tên danh mục chỉ được chứa chữ cái và khoảng trắng"
    }),
  description: z
    .string()
    .nonempty({ message: "Mô tả danh mục không được để trống" })
    .min(10, { message: "Mô tả danh mục phải có ít nhất 10 ký tự" }),

  imageUrl: z.string().optional(),

  ...auditFields
})

export const createUpdateCategorySchema = categorySchema.pick({
  type: true,
  name: true,
  description: true
})

export type CategoryType = z.infer<typeof categorySchema>
export type CreateUpdateCategoryType = z.infer<
  typeof createUpdateCategorySchema
>
