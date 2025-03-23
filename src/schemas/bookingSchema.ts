import { z } from "zod"

import { BookingStatusSchemaEnum } from "@/constants/enum/Booking"

import { auditFields, uuidSchema } from "./baseSchema"

const bookingSchema = z.object({
  bookingId: uuidSchema,
  userId: uuidSchema,
  consultantId: uuidSchema,

  date: z.string().nonempty({ message: "Ngày không được để trống" }),

  notes: z.string().optional(),
  cancellationReason: z.string().optional(),

  status: BookingStatusSchemaEnum,

  ...auditFields
})

export type BookingType = z.infer<typeof bookingSchema>
