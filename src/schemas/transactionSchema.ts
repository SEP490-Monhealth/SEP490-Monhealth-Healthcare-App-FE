import { z } from "zod"

import {
  TransactionStatusSchemaEnum,
  TransactionTypeSchemaEnum
} from "@/constants/enum/Transaction"

import { auditFields, uuidSchema } from "./baseSchema"
import { userSchema } from "./userSchema"

const transactionSchema = z.object({
  transactionId: uuidSchema,
  walletId: uuidSchema,
  bookingId: uuidSchema,
  consultantId: uuidSchema,

  type: TransactionTypeSchemaEnum,

  consultant: z.object({
    fullName: userSchema.shape.fullName,
    email: userSchema.shape.email,
    phoneNumber: userSchema.shape.phoneNumber,
    avatarUrl: userSchema.shape.avatarUrl
  }),

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
  transactionId: true,
  walletId: true,
  bookingId: true,

  type: true,

  description: true,
  amount: true,

  status: true
})

export const updateTransactionSchema = createTransactionSchema.omit({
  transactionId: true
})

export type TransactionType = z.infer<typeof transactionSchema>
export type CreateTransactionType = z.infer<typeof createTransactionSchema>
export type UpdateTransactionType = z.infer<typeof updateTransactionSchema>
