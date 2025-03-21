import { z } from "zod"

import { UserSubscriptionSchemaEnum } from "@/constants/enum/UserSubscription"

import { auditFields, timestampFields, uuidSchema } from "./baseSchema"

const userSubscription = z.object({
  userSubscriptionId: uuidSchema,
  userId: uuidSchema,
  subscriptionId: uuidSchema,

  startedAt: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: "Định dạng thời gian bắt đầu không hợp lệ"
  }),
  expiresAt: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: "Định dạng thời gian kết thúc không hợp lệ"
  }),

  remainingBookings: z
    .number({ message: "Số lần đặt lịch phải là số" })
    .int({ message: "Số lần đặt lịch phải là số nguyên" })
    .nonnegative({ message: "Số lần đặt lịch phải là số nguyên không âm" }),

  status: UserSubscriptionSchemaEnum,

  ...timestampFields
})

export const subscriptionSchema = z.object({
  subscriptionId: uuidSchema,

  name: z
    .string()
    .min(3, { message: "Tên gói đăng ký phải có ít nhất 3 ký tự" })
    .max(255, { message: "Tên gói đăng ký không được quá 255 ký tự" }),
  description: z
    .string()
    .min(10, { message: "Mô tả phải có ít nhất 10 ký tự" }),

  price: z
    .number({ message: "Giá phải là số" })
    .int({ message: "Giá phải là số nguyên" })
    .nonnegative({ message: "Giá phải lớn hơn hoặc bằng 0" }),
  durationDays: z
    .number({ message: "Thời gian hiệu lực phải là số" })
    .int({ message: "Thời gian hiệu lực phải là số nguyên" })
    .min(1, { message: "Thời gian hiệu lực phải là số ngày lớn hơn 0" }),
  features: z.array(
    z.string().nonempty({ message: "Tính năng không được để trống" })
  ),

  bookingAllowance: z
    .number({ message: "Số lần đặt lịch phải là số" })
    .int({ message: "Số lần đặt lịch phải là số nguyên" })
    .nonnegative({ message: "Số lần đặt lịch phải là số nguyên không âm" })
    .default(0),

  status: z.boolean(),

  ...auditFields
})

export const createUpdateSubscriptionSchema = subscriptionSchema.pick({
  name: true,
  description: true,
  price: true,
  durationDays: true,
  features: true,
  bookingAllowance: true,
  status: true
})

export type UserSubscriptionType = z.infer<typeof userSubscription>

export type SubscriptionType = z.infer<typeof subscriptionSchema>
export type CreateUpdateSubscriptionType = z.infer<
  typeof createUpdateSubscriptionSchema
>
