import { BookingStatusEnum } from "../enum/Booking"

export const DATA = {
  BOOKINGS: [
    {
      label: "Chờ xác nhận",
      value: BookingStatusEnum.Pending,
      color: "#ca8a04"
    },
    {
      label: "Đã xác nhận",
      value: BookingStatusEnum.Confirmed,
      color: "#16a34a"
    },
    {
      label: "Hoàn thành",
      value: BookingStatusEnum.Completed,
      color: "#3b82f6"
    },
    {
      label: "Đã hủy",
      value: BookingStatusEnum.Cancelled,
      color: "#ef4444"
    }
  ]
}
