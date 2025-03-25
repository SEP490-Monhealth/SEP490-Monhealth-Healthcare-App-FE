import { z } from "zod"

import {
  RecurringDaySchemaEnum,
  ScheduleTimeSlotStatusSchemaEnum,
  ScheduleTypeSchemaEnum
} from "@/constants/enum/Schedule"

import { timestampFields, uuidSchema } from "./baseSchema"
import { waterReminderSchema } from "./waterReminderSchema"

const timeSlotSchema = z.object({
  startTime: waterReminderSchema.shape.time,
  status: ScheduleTimeSlotStatusSchemaEnum
})

const scheduleSchema = z.object({
  scheduleId: uuidSchema,
  consultantId: uuidSchema,

  type: ScheduleTypeSchemaEnum,

  recurringDay: RecurringDaySchemaEnum.optional(),
  specificDate: z.string().optional(),

  timeSlots: z.array(timeSlotSchema),

  ...timestampFields
})

export type ScheduleType = z.infer<typeof scheduleSchema>
