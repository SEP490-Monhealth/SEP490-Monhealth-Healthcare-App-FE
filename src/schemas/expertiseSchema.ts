import { z } from "zod"

import { timestampFields } from "./baseSchema"

export const expertiseSchema = z.object({
  expertiseId: z.string().uuid(),

  name: z
    .string()
    .nonempty({ message: "Tên chuyên môn không được để trống" })
    .min(3, { message: "Tên chuyên môn phải có ít nhất 3 ký tự" })
    .max(255, { message: "Tên chuyên môn không được quá 255 ký tự" }),
  description: z.string().optional(),

  ...timestampFields
})

export type ExpertiseType = z.infer<typeof expertiseSchema>
