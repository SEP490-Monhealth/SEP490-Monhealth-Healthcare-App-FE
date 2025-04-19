import { z } from "zod"

import { GenderSchemaEnum } from "@/constants/enum/Metric"

import { timestampFields, uuidSchema } from "@/schemas/baseSchema"

const activityLevels = [1.2, 1.375, 1.55, 1.725, 1.9]

export const metricSchema = z.object({
  metricId: uuidSchema,
  userId: uuidSchema,

  dateOfBirth: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: "Ngày sinh không hợp lệ"
  }),
  gender: GenderSchemaEnum,
  height: z
    .number()
    .min(50, { message: "Chiều cao phải lớn hơn 50 cm" })
    .max(300, { message: "Chiều cao không được lớn hơn 300 cm" }),
  weight: z
    .number()
    .min(10, { message: "Cân nặng phải lớn hơn 10 kg" })
    .max(500, { message: "Cân nặng không được lớn hơn 500 kg" }),
  activityLevel: z.number().refine((val) => activityLevels.includes(val), {
    message: `Hệ số hoạt động không hợp lệ. Các giá trị hợp lệ: ${activityLevels.join(", ")}`
  }),

  bmi: z.number().default(0),
  bmr: z.number().default(0),
  tdee: z.number().default(0),
  ibw: z.number().default(0),

  ...timestampFields
})

export type MetricType = z.infer<typeof metricSchema>
