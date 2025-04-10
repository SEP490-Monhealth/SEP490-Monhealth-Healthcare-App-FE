import { z } from "zod"

const userStatSchema = z.object({
  totalUsers: z.object({
    count: z.number().min(1, { message: "Tổng số người dùng phải lớn hơn 1" }),
    growthRate: z.number()
  }),
  newUsers: z.object({
    count: z.number().min(0, { message: "Số người dùng mới phải là số dương" }),
    growthRate: z.number()
  }),
  totalVisits: z.object({
    count: z.number().min(0, { message: "Lượt truy cập phải là số dương" }),
    growthRate: z.number()
  }),
  conversionRate: z.object({
    count: z.number(),
    growthRate: z.number()
  })
})

const userGrowthSchema = z.object({
  month: z
    .string()
    .nonempty({ message: "Tháng không được để trống không được để trống" }),
  count: z.number().min(1, { message: "Số người dùng phải lớn hơn 1" })
})

const subscriptionUpgradedSchema = z.object({
  subscription: z.string().nonempty({
    message: "Gói đăng ký không được để trống không được để trống"
  }),
  visitors: z.number().min(0, { message: "Số lượt nâng cấp phải là số dương" })
})

export type UserStatType = z.infer<typeof userStatSchema>

export type UserGrowthType = z.infer<typeof userGrowthSchema>

export type SubscriptionUpgradedType = z.infer<
  typeof subscriptionUpgradedSchema
>
