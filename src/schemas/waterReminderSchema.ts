import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"

const waterReminderSchema = z.object({
  waterReminderId: uuidSchema,
  userId: uuidSchema,

  name: z
    .string()
    .min(3, { message: "Tên nhắc nhở phải có ít nhất 3 ký tự" })
    .max(255, { message: "Tên nhắc nhở không được quá 255 ký tự" }),
  volume: z
    .number()
    .min(100, { message: "Dung tích phải lớn hơn hoặc bằng 100 ml" })
    .max(2000, { message: "Dung tích không được vượt quá 2000 ml" }),

  isRecurring: z.boolean().default(false),
  isDrunk: z.boolean().default(false),

  status: z.boolean().default(true),

  ...auditFields
})

export type WaterReminderType = z.infer<typeof waterReminderSchema>
