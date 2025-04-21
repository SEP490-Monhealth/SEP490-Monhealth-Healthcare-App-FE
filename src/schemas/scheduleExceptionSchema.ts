import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"
import { userInfoSchema } from "./userSchema"

export const scheduleExceptionSchema = z.object({
  scheduleExceptionId: uuidSchema,
  scheduleId: uuidSchema,
  consultantId: uuidSchema,

  consultant: userInfoSchema,

  date: z.string().nonempty({ message: "Ngày không được để trống" }),

  reason: z
    .string()
    .nonempty({ message: "Lý do không được để trống" })
    .min(10, {
      message: "Lý do phải có ít nhất 10 ký tự"
    }),

  status: z.boolean(),

  ...auditFields
})

export type ScheduleExceptionType = z.infer<typeof scheduleExceptionSchema>
