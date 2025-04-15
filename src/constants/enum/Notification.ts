import { z } from "zod"

export enum NotificationTypeEnum {
  System,
  Reminder,
  Goal,
  Transaction,
  Booking,
  Message
}

export const NotificationTypeSchemaEnum = z.nativeEnum(NotificationTypeEnum)
