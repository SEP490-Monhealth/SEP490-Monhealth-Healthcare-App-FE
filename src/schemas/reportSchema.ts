import { z } from "zod"

import { ReportStatusSchemaEnum } from "@/constants/enum/Report"

import { timestampFields, uuidSchema } from "./baseSchema"
import { userInfoSchema } from "./userSchema"

export const reportSchema = z.object({
  reportId: uuidSchema,
  bookingId: uuidSchema,

  member: userInfoSchema,
  consultant: userInfoSchema,

  booking: z.object({
    date: z.string().nonempty({ message: "Ngày không được để trống" }),
    startTime: z
      .string()
      .nonempty({ message: "Thời gian bắt đầu không được để trống" }),
    endTime: z
      .string()
      .nonempty({ message: "Thời gian kết thúc không được để trống" }),

    notes: z.string().optional()
  }),

  reason: z
    .string()
    .nonempty({ message: "Lý do không được để trống" })
    .min(10, {
      message: "Lý do phải có ít nhất 10 ký tự"
    }),
  imageUrls: z
    .array(
      z
        .string()
        .url({ message: "Đường dẫn ảnh không hợp lệ" })
        .nonempty("Đường dẫn ảnh không được để trống")
    )
    .min(1, { message: "Cần ít nhất một hình ảnh" }),

  status: ReportStatusSchemaEnum,

  ...timestampFields
})

export type ReportType = z.infer<typeof reportSchema>
