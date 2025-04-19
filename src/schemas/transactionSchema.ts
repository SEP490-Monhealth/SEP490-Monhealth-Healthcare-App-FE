import { z } from "zod"

import {
  TransactionStatusSchemaEnum,
  TransactionTypeSchemaEnum
} from "@/constants/enum/Transaction"

import { bankSchema } from "./bankSchema"
import { auditFields, uuidSchema } from "./baseSchema"
import { consultantBankSchema } from "./consultantBankSchema"
import { userInfoSchema } from "./userSchema"

const transactionSchema = z.object({
  transactionId: uuidSchema,
  consultantId: uuidSchema,
  walletId: uuidSchema,
  bookingId: uuidSchema,

  type: TransactionTypeSchemaEnum,

  member: userInfoSchema,
  consultant: userInfoSchema,

  description: z
    .string()
    .nonempty({ message: "Mô tả giao dịch không được để trống" })
    .min(10, { message: "Mô tả giao dịch phải có ít nhất 10 ký tự" }),
  amount: z
    .number({ message: "Số tiền giao dịch phải là một số" })
    .positive({ message: "Số tiền giao dịch phải lớn hơn 0" }),

  status: TransactionStatusSchemaEnum,

  ...auditFields
})

export const createTransactionSchema = transactionSchema.pick({
  consultantId: true,
  bookingId: true,

  type: true,

  description: true,
  amount: true
})

export const transactionQrCodeSchema = z.object({
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

export type TransactionType = z.infer<typeof transactionSchema>
export type CreateTransactionType = z.infer<typeof createTransactionSchema>

export type TransactionQrCodeType = z.infer<typeof transactionQrCodeSchema>
