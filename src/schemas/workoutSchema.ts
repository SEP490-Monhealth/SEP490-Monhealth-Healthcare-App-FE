import { z } from "zod"

import {
  DifficultyLevelSchemaEnum,
  WorkoutTypeSchemaEnum
} from "@/constants/enum/Workout"

import { auditFields, uuidSchema } from "./baseSchema"
import { categorySchema } from "./categorySchema"

const workoutExerciseSchema = z.object({
  exerciseId: uuidSchema,
  duration: z.number(),
  reps: z.number()
})

const workoutSchema = z.object({
  workoutId: uuidSchema,
  userId: uuidSchema,
  categoryId: uuidSchema,

  category: categorySchema.shape.name,

  type: WorkoutTypeSchemaEnum,

  name: z
    .string()
    .nonempty({ message: "Tên bộ bài tập không được để trống" })
    .min(3, { message: "Tên bộ bài tập phải có ít nhất 3 ký tự" })
    .max(50, { message: "Tên bộ bài tập không được dài hơn 50 ký tự" })
    .regex(/^[\p{L} ]+$/u, {
      message: "Tên bộ bài tập chỉ được chứa chữ cái và khoảng trắng"
    }),
  description: z
    .string()
    .nonempty({ message: "Mô tả bộ bài tập không được để trống" })
    .min(10, { message: "Mô tả bộ bài tập phải có ít nhất 10 ký tự" }),
  difficultyLevel: DifficultyLevelSchemaEnum,

  exercises: z
    .number()
    .min(1, { message: "Số lượng bộ bài tập phải lớn hơn hoặc bằng 1" })
    .max(100, { message: "Số lượng bộ bài tập không được lớn hơn 100" }),

  durationMinutes: z
    .number()
    .min(1, { message: "Thời gian tập luyện phải lớn hơn 0" }),
  caloriesBurned: z.number().min(1, {
    message: "Số calories đốt phải lớn hơn hoặc bằng 1"
  }),

  views: z.number().default(0),

  isPublic: z.boolean(),

  status: z.boolean(),

  ...auditFields
})

export const createWorkoutSchema = workoutSchema
  .pick({
    userId: true,
    categoryId: true,
    name: true,
    description: true,
    difficultyLevel: true
  })
  .extend({
    items: z
      .array(workoutExerciseSchema)
      .nonempty({
        message: "Danh sách bộ bài tập không được để trống"
      })
      .min(1, { message: "Danh sách bộ bài tập phải có ít nhất 1 bộ bài tập" })
  })

export const updateWorkoutSchema = createWorkoutSchema.omit({
  userId: true
})

export type WorkoutExerciseType = z.infer<typeof workoutExerciseSchema>

export type WorkoutType = z.infer<typeof workoutSchema>
export type CreateWorkoutType = z.infer<typeof createWorkoutSchema>
export type UpdateWorkoutType = z.infer<typeof updateWorkoutSchema>
