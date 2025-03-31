import { z } from "zod"

import { UserSubscriptionSchemaEnum } from "@/constants/enum/UserSubscription"

import { auditFields, timestampFields, uuidSchema } from "./baseSchema"
import { userSchema } from "./userSchema"

export const subscriptionSchema = z.object({
  subscriptionId: uuidSchema,

  name: z
    .string()
    .min(3, { message: "Tên gói đăng ký phải có ít nhất 3 ký tự" })
    .max(50, { message: "Tên gói đăng ký không được quá 50 ký tự" }),
  description: z
    .string()
    .nonempty({ message: "Mô tả gói đăng ký không được để trống" })
    .min(10, { message: "Mô tả gói đăng ký phải có ít nhất 10 ký tự" }),

  price: z
    .number({ message: "Giá phải là số" })
    .int({ message: "Giá phải là số nguyên" })
    .nonnegative({ message: "Giá phải lớn hơn hoặc bằng 0" }),
  durationDays: z
    .number({ message: "Thời gian hiệu lực phải là số" })
    .int({ message: "Thời gian hiệu lực phải là số nguyên" })
    .nonnegative({
      message: "Thời gian hiệu lực phải lớn hơn hoặc bằng 0"
    }),
  features: z
    .string()
    .transform((value) =>
      value
        .split("\n")
        .map((feature) => feature.trim())
        .filter((feature) => feature !== "")
    )
    .refine((features) => features.length > 0, {
      message: "Gói đăng ký phải có ít nhất một tính năng"
    }),

  bookingAllowance: z
    .number({ message: "Số lần đặt lịch phải là số" })
    .int({ message: "Số lần đặt lịch phải là số nguyên" })
    .nonnegative({ message: "Số lần đặt lịch phải là số nguyên không âm" })
    .default(0),

  status: z.boolean(),

  ...auditFields
})

const userSubscription = z.object({
  userSubscriptionId: uuidSchema,
  userId: uuidSchema,
  subscriptionId: uuidSchema,

  member: z.object({
    fullName: userSchema.shape.fullName,
    email: userSchema.shape.email,
    phoneNumber: userSchema.shape.phoneNumber,
    avatarUrl: userSchema.shape.avatarUrl
  }),

  subscription: subscriptionSchema.shape.name,

  startedAt: z.string().nonempty({
    message: "Ngày bắt đầu không được để trống"
  }),
  expiresAt: z.string().nonempty({
    message: "Ngày hết hạn không được để trống"
  }),
  remainingBookings: z
    .number({ message: "Số lần đặt lịch còn lại phải là số" })
    .int({ message: "Số lần đặt lịch còn lại phải là số nguyên" })
    .nonnegative({
      message: "Số lần đặt lịch còn lại phải là số nguyên không âm"
    }),

  status: UserSubscriptionSchemaEnum,

  ...timestampFields
})

export const createUpdateSubscriptionSchema = subscriptionSchema.pick({
  name: true,
  description: true,
  price: true,
  durationDays: true,
  features: true,
  bookingAllowance: true
})

export type SubscriptionType = z.infer<typeof subscriptionSchema>
export type CreateUpdateSubscriptionType = z.infer<
  typeof createUpdateSubscriptionSchema
>

export type UserSubscriptionType = z.infer<typeof userSubscription>
