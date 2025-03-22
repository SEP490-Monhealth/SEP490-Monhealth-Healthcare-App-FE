import { z } from "zod"

import { BookingStatusSchemaEnum } from "@/constants/enum/Booking"

import { auditFields, uuidSchema } from "./baseSchema"

const bookingSchema = z.object({
  bookingId: uuidSchema,
  userId: uuidSchema,
  consultantId: uuidSchema,
  scheduleId: uuidSchema,
  timeSlotId: uuidSchema,

  consultantName: z.string(),
  consultantAvatar: z.string(),
  memberName: z.string(),
  memberAvatar: z.string(),

  date: z.string(),

  notes: z.string().nullable(),
  cancellationReason: z.string().nullable(),

  status: BookingStatusSchemaEnum,

  ...auditFields
})

export type BookingType = z.infer<typeof bookingSchema>
