import { z } from "zod"

import { PaymentStatusSchemaEnum } from "@/constants/enum/Payment"

import { auditFields, uuidSchema } from "./baseSchema"
import { subscriptionSchema } from "./subscriptionSchema"
import { userSchema } from "./userSchema"

const paymentSchema = z.object({
  paymentId: uuidSchema,
  userSubscriptionId: uuidSchema,

  member: z.object({
    fullName: userSchema.shape.fullName,
    email: userSchema.shape.email,
    phoneNumber: userSchema.shape.phoneNumber,
    avatarUrl: userSchema.shape.avatarUrl
  }),

  subscription: subscriptionSchema.shape.name,

  description: z
    .string()
    .nonempty({ message: "Mô tả thanh toán không được để trống" })
    .min(10, { message: "Mô tả thanh toán phải có ít nhất 10 ký tự" }),
  amount: z
    .number({ message: "Số tiền thanh toán phải là một số" })
    .positive({ message: "Số tiền thanh toán phải lớn hơn 0" }),

  status: PaymentStatusSchemaEnum,

  ...auditFields
})

export type PaymentType = z.infer<typeof paymentSchema>
