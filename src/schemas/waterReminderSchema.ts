import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"

export const waterReminderSchema = z.object({
  waterReminderId: uuidSchema,
  userId: uuidSchema,

  name: z
    .string()
    .nonempty({ message: "Tên nhắc nhở không được để trống" })
    .min(3, { message: "Tên nhắc nhở phải có ít nhất 3 ký tự" })
    .max(255, { message: "Tên nhắc nhở không được quá 255 ký tự" }),
  time: z
    .string()
    .nonempty({
      message: "Thời gian không được để trống"
    })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Thời gian phải có định dạng HH:mm"
    }),
  volume: z
    .number()
    .min(100, { message: "Dung tích phải lớn hơn hoặc bằng 100 ml" })
    .max(2000, { message: "Dung tích không được vượt quá 2000 ml" }),

  isRecurring: z.boolean().default(false),
  isDrunk: z.boolean().default(false),

  status: z.boolean(),

  ...auditFields
})

export const createUpdateWaterReminderSchema = waterReminderSchema.pick({
  name: true,
  time: true,
  volume: true,
  isRecurring: true
})

export type WaterReminderType = z.infer<typeof waterReminderSchema>
export type CreateUpdateWaterReminderType = z.infer<
  typeof createUpdateWaterReminderSchema
>
