import { z } from "zod"

import { EnumMeta } from "@/configs/enum"

export enum ScheduleTypeEnum {
  OneTime,
  Recurring
}

export enum RecurringDayEnum {
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
  Sun
}

export enum ScheduleTimeSlotStatusEnum {
  Available,
  Unavailable,
  Booked
}

export enum ScheduleExceptionStatusEnum {
  Pending,
  Approved,
  Rejected
}

export const ScheduleTypeSchemaEnum = z.nativeEnum(ScheduleTypeEnum)
export const RecurringDaySchemaEnum = z.nativeEnum(RecurringDayEnum)

export const ScheduleTimeSlotStatusSchemaEnum = z.nativeEnum(
  ScheduleTimeSlotStatusEnum
)
export const ScheduleExceptionStatusSchemaEnum = z.nativeEnum(
  ScheduleExceptionStatusEnum
)

const scheduleExceptionStatusMap: Record<
  ScheduleExceptionStatusEnum,
  EnumMeta
> = {
  [ScheduleExceptionStatusEnum.Pending]: {
    label: "Chờ duyệt",
    color: "#ca8a04" // yellow 600
  },
  [ScheduleExceptionStatusEnum.Approved]: {
    label: "Đã duyệt",
    color: "#16a34a" // green 600
  },
  [ScheduleExceptionStatusEnum.Rejected]: {
    label: "Đã từ chối",
    color: "#ef4444" // red 500
  }
}

export function getScheduleExceptionStatusMeta(
  status: ScheduleExceptionStatusEnum
): EnumMeta {
  return scheduleExceptionStatusMap[status]
}
