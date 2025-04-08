import { z } from "zod"

import { WithdrawalRequestStatusSchemaEnum } from "@/constants/enum/WithdrawalRequest"

import { bankSchema } from "./bankSchema"
import { auditFields, uuidSchema } from "./baseSchema"
import { consultantBankSchema } from "./consultantBankSchema"
import { userSchema } from "./userSchema"

const withdrawalRequestSchema = z.object({
  withdrawalRequestId: uuidSchema,
  consultantId: uuidSchema,

  consultant: z.object({
    fullName: userSchema.shape.fullName,
    email: userSchema.shape.email,
    phoneNumber: userSchema.shape.phoneNumber,
    avatarUrl: userSchema.shape.avatarUrl
  }),

  description: z
    .string()
    .nonempty({ message: "Mô tả yêu cầu không được để trống" })
    .min(10, { message: "Mô tả yêu cầu phải có ít nhất 10 ký tự" }),
  amount: z
    .number({ message: "Số tiền yêu cầu phải là một số" })
    .positive({ message: "Số tiền yêu cầu phải lớn hơn 0" }),

  status: WithdrawalRequestStatusSchemaEnum,

  ...auditFields
})

const withdrawalRequestQrCodeSchema = z.object({
  qrCodeUrl: z.string().nonempty({ message: "Mã QR không được để trống" }),
  bankName: bankSchema.shape.name,
  accountName: consultantBankSchema.shape.name,
  description: z
    .string()
    .nonempty({ message: "Mô tả yêu cầu không được để trống" })
    .min(10, { message: "Mô tả yêu cầu phải có ít nhất 10 ký tự" }),
  amount: z
    .number({ message: "Số tiền yêu cầu phải là một số" })
    .positive({ message: "Số tiền yêu cầu phải lớn hơn 0" })
})

export type WithdrawalRequestType = z.infer<typeof withdrawalRequestSchema>

export type WithdrawalRequestQrCodeType = z.infer<
  typeof withdrawalRequestQrCodeSchema
>
