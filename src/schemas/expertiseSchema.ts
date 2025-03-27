import { z } from "zod"

import { auditFields } from "./baseSchema"

export const expertiseSchema = z.object({
  expertiseId: z.string().uuid(),

  name: z
    .string()
    .nonempty({ message: "Tên chuyên môn không được để trống" })
    .min(3, { message: "Tên chuyên môn phải có ít nhất 3 ký tự" })
    .max(50, { message: "Tên chuyên môn không được quá 50 ký tự" }),
  description: z
    .string()
    .nonempty({ message: "Mô tả chuyên môn không được để trống" })
    .min(10, { message: "Mô tả chuyên môn phải có ít nhất 10 ký tự" }),

  ...auditFields
})

export const createUpdateExpertiseSchema = expertiseSchema.pick({
  name: true,
  description: true
})

export type ExpertiseType = z.infer<typeof expertiseSchema>
export type CreateUpdateExpertiseType = z.infer<
  typeof createUpdateExpertiseSchema
>
