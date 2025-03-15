import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"

const consultantSchema = z.object({
  consultantId: uuidSchema,
  userId: uuidSchema,

  bio: z.string().min(10, { message: "Tiểu sử phải có ít nhất 10 ký tự" }),
  experience: z
    .number()
    .int()
    .min(0, { message: "Kinh nghiệm phải là số nguyên không âm" }),

  ratingCount: z.number().default(0),

  averageRating: z.number().min(0).max(5).default(0),

  views: z.number().default(0),

  isVerified: z.boolean().default(false),

  status: z.boolean(),

  ...timestampFields
})

export type ConsultantType = z.infer<typeof consultantSchema>
