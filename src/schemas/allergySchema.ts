import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"

const allergySchema = z.object({
  allergyId: uuidSchema,

  name: z
    .string()
    .nonempty({ message: "Tên dị ứng không được để trống" })
    .min(3, { message: "Tên dị ứng phải có ít nhất 3 ký tự" })
    .max(255, { message: "Tên dị ứng không được dài hơn 255 ký tự" })
    .regex(/^[\p{L} ]+$/u, {
      message: "Tên dị ứng chỉ được chứa chữ cái và khoảng trắng"
    }),
  description: z
    .string()
    .nonempty({ message: "Mô tả dị ứng không được để trống" })
    .min(10, { message: "Mô tả dị ứng phải có ít nhất 10 ký tự" }),

  ...auditFields
})

export const createUpdateAllergySchema = allergySchema.pick({
  name: true,
  description: true
})

export type AllergyType = z.infer<typeof allergySchema>
export type CreateUpdateAllergyType = z.infer<typeof createUpdateAllergySchema>
