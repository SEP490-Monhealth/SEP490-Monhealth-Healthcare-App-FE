import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"

const certificateSchema = z.object({
  certificateId: uuidSchema,
  consultantId: uuidSchema,

  number: z.string().nonempty({ message: "Số chứng chỉ không được để trống" }),
  name: z
    .string()
    .nonempty({ message: "Tên chứng chỉ không được để trống" })
    .min(3, { message: "Tên chứng chỉ phải có ít nhất 3 ký tự" })
    .max(255, { message: "Tên chứng chỉ không được quá 255 ký tự" }),

  issueDate: z.string().nonempty({ message: "Ngày cấp không được để trống" }),
  expiryDate: z.string().optional(),
  issuedBy: z.string().nonempty({ message: "Nơi cấp không được để trống" }),

  imageUrls: z
    .array(
      z
        .string()
        .url({ message: "Đường dẫn ảnh không hợp lệ" })
        .nonempty("Đường dẫn ảnh không được để trống")
    )
    .min(1, { message: "Cần ít nhất một hình ảnh" }),

  isVerified: z.boolean().default(false),

  ...timestampFields
})
