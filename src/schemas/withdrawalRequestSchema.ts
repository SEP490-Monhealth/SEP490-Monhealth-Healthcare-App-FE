import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"

const withdrawalRequestSchema = z.object({
  withdrawalRequestId: uuidSchema,
  consultantId: uuidSchema,

  description: z
    .string()
    .nonempty({ message: "Mô tả yêu cầu không được để trống" })
    .min(10, { message: "Mô tả yêu cầu phải có ít nhất 10 ký tự" }),
  amount: z
    .number({ message: "Số tiền yêu cầu phải là một số" })
    .positive({ message: "Số tiền yêu cầu phải lớn hơn 0" }),

  status: z.string().optional(),

  ...auditFields
})

export type WithdrawalRequestType = z.infer<typeof withdrawalRequestSchema>
