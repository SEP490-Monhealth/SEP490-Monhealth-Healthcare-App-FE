import { z } from "zod"

import { PaymentStatusSchemaEnum } from "@/constants/enum/Payment"

import { timestampFields, uuidSchema } from "./baseSchema"
import { userSchema } from "./userSchema"

export const paymentSchema = z.object({
  paymentId: uuidSchema,
  subscriptionId: uuidSchema,
  userId: uuidSchema,

  subscriptionName: z
    .string()
    .nonempty({ message: "Gói đăng ký không được để trống" }),

  member: z.object({
    fullName: userSchema.shape.fullName,
    email: userSchema.shape.email,
    phoneNumber: userSchema.shape.phoneNumber,
    avatarUrl: userSchema.shape.avatarUrl
  }),

  amount: z
    .number({ message: "Số tiền giao dịch phải là một số" })
    .positive({ message: "Số tiền giao dịch phải lớn hơn 0" }),

  status: PaymentStatusSchemaEnum,

  ...timestampFields
})

export type PaymentType = z.infer<typeof paymentSchema>
