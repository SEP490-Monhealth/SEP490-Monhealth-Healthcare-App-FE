import { z } from "zod"

import { CategoryTypeSchemaEnum } from "@/constants/enum/Category"

import { timestampFields, uuidSchema } from "./baseSchema"

const allergySchema = z.object({
  allergyId: uuidSchema,

  name: z
    .string()
    .nonempty({ message: "Tên dị ứng không được để trống" })
    .max(50, { message: "Tên dị ứng không được dài hơn 50 ký tự" })
    .regex(/^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/, {
      message: "Tên dị ứng chỉ được chứa chữ cái, số và khoảng trắng"
    }),
  description: z.string().max(200, {
    message: "Mô tả dị ứng không được dài hơn 200 ký tự"
  }),

  ...timestampFields
})

export const createUpdateAllergySchema = allergySchema.pick({
  name: true,
  description: true
})

export type AllergyType = z.infer<typeof allergySchema>
export type CreateUpdateAllergyType = z.infer<typeof createUpdateAllergySchema>
