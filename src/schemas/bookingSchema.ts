import { z } from "zod"

import { BookingStatusSchemaEnum } from "@/constants/enum/Booking"

import { auditFields, uuidSchema } from "./baseSchema"
import { userInfoSchema } from "./userSchema"

const bookingSchema = z.object({
  bookingId: uuidSchema,
  userId: uuidSchema,
  consultantId: uuidSchema,

  member: userInfoSchema,
  consultant: userInfoSchema,

  date: z.string().nonempty({ message: "Ngày không được để trống" }),
  startTime: z
    .string()
    .nonempty({ message: "Thời gian bắt đầu không được để trống" }),
  endTime: z
    .string()
    .nonempty({ message: "Thời gian kết thúc không được để trống" }),

  notes: z.string().optional(),
  cancellationReason: z.string().optional(),

  isReviewed: z.boolean().default(false),

  status: BookingStatusSchemaEnum,

  completedAt: z.string(),

  ...auditFields
})

export type BookingType = z.infer<typeof bookingSchema>
