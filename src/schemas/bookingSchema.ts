import { z } from "zod"

import { BookingStatusSchemaEnum } from "@/constants/enum/Booking"

import { auditFields, uuidSchema } from "./baseSchema"
import { userSchema } from "./userSchema"

const bookingSchema = z.object({
  bookingId: uuidSchema,
  userId: uuidSchema,
  consultantId: uuidSchema,

  member: z.object({
    memberName: userSchema.shape.fullName,
    email: userSchema.shape.email,
    phoneNumber: userSchema.shape.phoneNumber,
    memberAvatar: userSchema.shape.avatarUrl
  }),

  consultant: z.object({
    consultantName: userSchema.shape.fullName,
    email: userSchema.shape.email,
    phoneNumber: userSchema.shape.phoneNumber,
    consultantAvatar: userSchema.shape.avatarUrl
  }),

  date: z.string().nonempty({ message: "Ngày không được để trống" }),

  notes: z.string().optional(),
  cancellationReason: z.string().optional(),

  status: BookingStatusSchemaEnum,

  ...auditFields
})

export type BookingType = z.infer<typeof bookingSchema>
