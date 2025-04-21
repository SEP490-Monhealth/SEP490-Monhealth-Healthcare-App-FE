import { z } from "zod"

import { ReportStatusSchemaEnum } from "@/constants/enum/Report"

import { timestampFields, uuidSchema } from "./baseSchema"
import { bookingDetailSchema } from "./bookingSchema"
import { userInfoSchema } from "./userSchema"

export const reportSchema = z.object({
  reportId: uuidSchema,
  bookingId: uuidSchema,

  member: userInfoSchema,
  consultant: userInfoSchema,

  booking: bookingDetailSchema,

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
