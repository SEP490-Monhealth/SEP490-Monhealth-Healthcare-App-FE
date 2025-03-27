import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"
import { userSchema } from "./userSchema"

const reviewSchema = z.object({
  reviewId: uuidSchema,
  userId: uuidSchema,
  bookingId: uuidSchema,

  member: z.object({
    fullName: userSchema.shape.fullName,
    email: userSchema.shape.email,
    phoneNumber: userSchema.shape.phoneNumber,
    avatarUrl: userSchema.shape.avatarUrl
  }),

  rating: z.number({ message: "Đánh giá phải là số" }).min(1).max(5),
  comment: z
    .string()
    .nonempty({ message: "Bình luận không được trống" })
    .max(1000, { message: "Bình luận không được quá 1000 ký tự" }),

  ...timestampFields
})

export type ReviewType = z.infer<typeof reviewSchema>
