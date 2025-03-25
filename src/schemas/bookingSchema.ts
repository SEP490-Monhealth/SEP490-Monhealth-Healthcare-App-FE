import { z } from "zod"

import { BookingStatusSchemaEnum } from "@/constants/enum/Booking"

import { auditFields, uuidSchema } from "./baseSchema"
import { consultantSchema } from "./consultantSchema"
import { userSchema } from "./userSchema"

const memberBooking = z.object({
  memberName: userSchema.shape.fullName,
  memberAvatar: userSchema.shape.avatarUrl,
  phoneNumber: userSchema.shape.phoneNumber,
  email: userSchema.shape.email
})

const consultantBooking = z.object({
  consultantName: consultantSchema.shape.fullName,
  consultantAvatar: consultantSchema.shape.avatarUrl,
  phoneNumber: consultantSchema.shape.phoneNumber,
  email: consultantSchema.shape.email
})

const bookingSchema = z.object({
  bookingId: uuidSchema,
  userId: uuidSchema,
  consultantId: uuidSchema,

  member: memberBooking,
  consultant: consultantBooking,

  date: z.string().nonempty({ message: "Ngày không được để trống" }),

  notes: z.string().optional(),
  cancellationReason: z.string().optional(),

  status: BookingStatusSchemaEnum,

  ...auditFields
})

export type BookingType = z.infer<typeof bookingSchema>
