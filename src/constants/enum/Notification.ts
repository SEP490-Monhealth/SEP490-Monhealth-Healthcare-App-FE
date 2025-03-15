import { z } from "zod"

export enum NotificationTypeEnum {
  System,
  Reminder,
  Goal,
  Payment,
  Booking,
  Message
}

export const NotificationTypeSchemaEnum = z.nativeEnum(NotificationTypeEnum)
