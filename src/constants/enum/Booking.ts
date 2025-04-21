import { z } from "zod"

import { EnumMeta } from "@/configs/enum"

export enum BookingStatusEnum {
  Pending,
  Completed,
  Cancelled
}

export const BookingStatusSchemaEnum = z.nativeEnum(BookingStatusEnum)

const bookingStatusMap: Record<BookingStatusEnum, EnumMeta> = {
  [BookingStatusEnum.Pending]: {
    label: "Đã đặt",
    color: "#ca8a04" // yellow 600
  },
  [BookingStatusEnum.Completed]: {
    label: "Hoàn thành",
    color: "#3b82f6" // blue 500
  },
  [BookingStatusEnum.Cancelled]: {
    label: "Đã hủy",
    color: "#ef4444" // red 500
  }
}

export function getBookingStatusMeta(status: BookingStatusEnum): EnumMeta {
  return bookingStatusMap[status]
}
