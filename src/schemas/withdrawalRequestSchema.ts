import { z } from "zod"

import { WithdrawalRequestStatusSchemaEnum } from "@/constants/enum/WithdrawalRequest"

import { bankInfoSchema } from "./bankSchema"
import { timestampFields, uuidSchema } from "./baseSchema"
import { consultantBankInfoSchema } from "./consultantBankSchema"
import { userInfoSchema } from "./userSchema"

export const withdrawalRequestSchema = z.object({
  withdrawalRequestId: uuidSchema,
  consultantId: uuidSchema,

  consultant: userInfoSchema,
  consultantBank: consultantBankInfoSchema,
  bank: bankInfoSchema,

  description: z
    .string()
    .nonempty({ message: "Mô tả yêu cầu không được để trống" })
    .min(10, { message: "Mô tả yêu cầu phải có ít nhất 10 ký tự" }),
  amount: z
    .number({ message: "Số tiền yêu cầu phải là một số" })
    .positive({ message: "Số tiền yêu cầu phải lớn hơn 0" }),

  status: WithdrawalRequestStatusSchemaEnum,

  ...timestampFields
})

export type WithdrawalRequestType = z.infer<typeof withdrawalRequestSchema>
