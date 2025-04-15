import { z } from "zod"

const userStatSchema = z.object({
  totalUsers: z.object({
    count: z.number(),
    growthRate: z.number()
  }),
  newUsers: z.object({
    count: z.number(),
    growthRate: z.number()
  }),
  totalVisits: z.object({
    count: z.number(),
    growthRate: z.number()
  }),
  conversionRate: z.object({
    count: z.number(),
    growthRate: z.number()
  })
})

const userGrowthSchema = z.object({
  month: z.string(),
  count: z.number()
})

const subscriptionUpgradedSchema = z.object({
  subscription: z.string(),
  visitors: z.number()
})

const analysisOverviewSchema = z.object({
  totalUsers: z.object({
    count: z.number(),
    growthRate: z.number()
  }),
  totalSubscriptions: z.object({
    count: z.number(),
    growthRate: z.number()
  }),
  totalRevenue: z.object({
    count: z.number(),
    growthRate: z.number()
  }),
  totalConsultants: z.object({
    count: z.number(),
    growthRate: z.number()
  })
})

export type UserStatType = z.infer<typeof userStatSchema>
export type UserGrowthType = z.infer<typeof userGrowthSchema>
export type SubscriptionUpgradedType = z.infer<
  typeof subscriptionUpgradedSchema
>
export type AnalysisOverviewType = z.infer<typeof analysisOverviewSchema>
