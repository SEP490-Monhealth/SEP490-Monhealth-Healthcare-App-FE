import { z } from "zod"

import { BookingStatusSchemaEnum } from "@/constants/enum/Booking"

import { auditFields, uuidSchema } from "./baseSchema"

const bookingSchema = z.object({
  bookingId: uuidSchema,
  userId: uuidSchema,
  consultantId: uuidSchema,

  memberName: z.string(),
  memberAvatar: z.string(),
  consultantName: z.string(),
  consultantAvatar: z.string(),

  date: z.string().nonempty({ message: "Ngày không được để trống" }),

  notes: z.string().optional(),
  cancellationReason: z.string().optional(),

  status: BookingStatusSchemaEnum,

  ...auditFields
})

export type BookingType = z.infer<typeof bookingSchema>
