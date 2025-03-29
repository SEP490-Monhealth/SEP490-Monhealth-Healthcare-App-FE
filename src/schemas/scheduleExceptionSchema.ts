import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"
import { userSchema } from "./userSchema"

const scheduleExceptionSchema = z.object({
  exceptionId: uuidSchema,
  scheduleId: uuidSchema,
  consultantId: uuidSchema,

  consultant: z.object({
    fullName: userSchema.shape.fullName,
    email: userSchema.shape.email,
    phoneNumber: userSchema.shape.phoneNumber,
    avatarUrl: userSchema.shape.avatarUrl
  }),

  date: z.string().nonempty({ message: "Ngày không được để trống" }),

  reason: z.string().nonempty({ message: "Lý do không được để trống" }),

  ...timestampFields
})

export type ScheduleExceptionType = z.infer<typeof scheduleExceptionSchema>
