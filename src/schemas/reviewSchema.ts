import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"

const reviewSchema = z.object({
  reviewId: uuidSchema,
  userId: uuidSchema,
  bookingId: uuidSchema,

  rating: z.number({ message: "Đánh giá phải là số" }).min(1).max(5),
  comment: z.string().nonempty({ message: "Bình luận không được trống" }),

  ...timestampFields
})

export type ReviewType = z.infer<typeof reviewSchema>
