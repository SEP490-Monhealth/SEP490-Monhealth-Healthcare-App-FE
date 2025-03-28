import { z } from "zod"

import { bankSchema } from "./bankSchema"
import { timestampFields, uuidSchema } from "./baseSchema"

const consultantBankSchema = z.object({
  consultantBankId: uuidSchema,
  consultantId: uuidSchema,
  bankId: uuidSchema,

  bank: z.object({
    shortName: bankSchema.shape.shortName,
    logoUrl: bankSchema.shape.logoUrl
  }),

  number: z.string().nonempty({ message: "Số tài khoản không được để trống" }),
  name: z
    .string()
    .nonempty({ message: "Tên tài khoản không được để trống" })
    .min(3, { message: "Tên tài khoản phải có ít nhất 3 ký tự" })
    .max(50, { message: "Tên tài khoản không được quá 50 ký tự" }),

  isDefault: z.boolean(),
  isVerified: z.boolean().default(false),
  status: z.string().optional(),

  ...timestampFields
})

export type ConsultantBankType = z.infer<typeof consultantBankSchema>
