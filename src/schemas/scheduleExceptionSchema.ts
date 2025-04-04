import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"
import { userSchema } from "./userSchema"

const scheduleExceptionSchema = z.object({
  scheduleExceptionId: uuidSchema,
  scheduleId: uuidSchema,
  consultantId: uuidSchema,

  consultant: z.object({
    fullName: userSchema.shape.fullName,
    email: userSchema.shape.email,
    phoneNumber: userSchema.shape.phoneNumber,
    avatarUrl: userSchema.shape.avatarUrl
  }),

  date: z.string().nonempty({ message: "Ngày không được để trống" }),

  reason: z
    .string()
    .nonempty({ message: "Lý do không được để trống" })
    .min(10, {
      message: "Lý do phải có ít nhất 10 ký tự"
    }),

  ...auditFields
})

export type ScheduleExceptionType = z.infer<typeof scheduleExceptionSchema>
