import { BookingStatusEnum } from "../enum/Booking"
import { DifficultyLevelEnum, WorkoutTypeEnum } from "../enum/Workout"

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
  ],
  DIFFICULTY_LEVELS: [
    { label: "Mức dễ", value: DifficultyLevelEnum.Easy, color: "#A8E6CF" },
    {
      label: "Mức trung bình",
      value: DifficultyLevelEnum.Medium,
      color: "#FFD54F"
    },
    { label: "Mức khó", value: DifficultyLevelEnum.Hard, color: "#FFD54F" }
  ],
  WORKOUT_TYPE: [
    { label: "Khởi động", value: WorkoutTypeEnum.Warmup },
    { label: "Bài tập", value: WorkoutTypeEnum.Workout }
  ]
}
