import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"

const bookingSchema = z.object({
  bookingId: uuidSchema,
  userId: uuidSchema,
  consultantId: uuidSchema,
  scheduleId: uuidSchema,
  timeSlotId: uuidSchema,

  notes: z.string().nullable(),
  cancellationReason: z.string().nullable(),

  ...auditFields
})

export type BookingType = z.infer<typeof bookingSchema>
