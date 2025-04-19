import { z } from "zod"

import { GoalStatusSchemaEnum, GoalTypeSchemaEnum } from "@/constants/enum/Goal"

import { timestampFields, uuidSchema } from "./baseSchema"

const caloriesRatios = [0.9, 0.8, 0.7, 1, 1.1, 1.2, 1.3]

export const goalSchema = z.object({
  goalId: uuidSchema,
  userId: uuidSchema,

  type: GoalTypeSchemaEnum,

  caloriesRatio: z.number().refine((val) => caloriesRatios.includes(val), {
    message: `Tỷ lệ calo không hợp lệ. Các giá trị hợp lệ: ${caloriesRatios.join(", ")}`
  }),

  weightGoal: z
    .number()
    .min(10, { message: "Mục tiêu cân nặng phải lớn hơn 10 kg" })
    .max(500, { message: "Mục tiêu cân nặng không thể lớn hơn 500 kg" }),

  caloriesGoal: z.number().default(0),
  proteinGoal: z.number().default(0),
  carbsGoal: z.number().default(0),
  fatGoal: z.number().default(0),
  fiberGoal: z.number().default(0),
  sugarGoal: z.number().default(0),

  waterIntakesGoal: z.number().default(0),

  caloriesBurnedGoal: z.number().default(0),
  workoutDurationGoal: z.number().default(0),

  status: GoalStatusSchemaEnum,

  ...timestampFields
})

export type GoalType = z.infer<typeof goalSchema>
