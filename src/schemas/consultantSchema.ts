import { z } from "zod"

import { VerificationStatusSchemaEnum } from "@/constants/enum/Consultant"

import { timestampFields, uuidSchema } from "./baseSchema"
import { expertiseSchema } from "./expertiseSchema"
import { userSchema } from "./userSchema"

export const consultantSchema = z.object({
  consultantId: uuidSchema,
  expertiseId: uuidSchema,

  fullName: userSchema.shape.fullName,
  email: userSchema.shape.email,
  phoneNumber: userSchema.shape.phoneNumber,
  avatarUrl: userSchema.shape.avatarUrl,

  bio: z.string().min(10, { message: "Tiểu sử phải có ít nhất 10 ký tự" }),
  experience: z
    .number()
    .int()
    .min(0, { message: "Kinh nghiệm phải là số nguyên không âm" }),

  expertise: expertiseSchema.shape.name,

  bookingCount: z.number().default(0),
  ratingCount: z.number().default(0),
  averageRating: z.number().min(0).max(5).default(0),

  views: z.number().default(0),

  verificationStatus: VerificationStatusSchemaEnum,
  status: z.boolean(),

  ...timestampFields
})

export type ConsultantType = z.infer<typeof consultantSchema>
