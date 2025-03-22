import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"

const exerciseSchema = z.object({
  exerciseId: uuidSchema,
  userId: uuidSchema,

  name: z
    .string()
    .nonempty({ message: "Tên bài tập không được để trống" })
    .max(50, { message: "Tên bài tập không được dài hơn 50 ký tự" }),
  instructions: z
    .string()
    .nonempty({ message: "Hướng dẫn không được để trống" }),
  caloriesPerMinute: z
    .number()
    .min(1, { message: "Số lượng bài tập phải lớn hơn hoặc bằng 1" }),

  status: z.boolean(),

  ...auditFields
})

export const createExerciseSchema = exerciseSchema.pick({
  userId: true,
  name: true,
  instructions: true,
  caloriesPerMinute: true
})

export type ExerciseType = z.infer<typeof exerciseSchema>
export type CreateExerciseType = z.infer<typeof createExerciseSchema>
