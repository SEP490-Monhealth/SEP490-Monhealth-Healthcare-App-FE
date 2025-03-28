import { z } from "zod"

import { PaymentStatusSchemaEnum } from "@/constants/enum/Payment"

import { auditFields, uuidSchema } from "./baseSchema"
import { subscriptionSchema } from "./subscriptionSchema"
import { userSchema } from "./userSchema"

const paymentSchema = z.object({
  paymentId: uuidSchema,
  userId: uuidSchema,
  subscriptionId: uuidSchema,

  member: z.object({
    fullName: userSchema.shape.fullName,
    email: userSchema.shape.email,
    phoneNumber: userSchema.shape.phoneNumber,
    avatarUrl: userSchema.shape.avatarUrl
  }),

  subscriptionName: subscriptionSchema.shape.name,

  amount: z.number(),

  status: PaymentStatusSchemaEnum,

  ...auditFields
})

export type PaymentType = z.infer<typeof paymentSchema>
