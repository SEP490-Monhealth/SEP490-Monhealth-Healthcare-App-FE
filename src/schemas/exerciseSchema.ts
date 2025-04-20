import { z } from "zod"

import { ExerciseTypeSchemaEnum } from "@/constants/enum/Workout"

import { auditFields, uuidSchema } from "./baseSchema"

export const workoutExerciseSchema = z.object({
  exerciseId: uuidSchema,
  name: z
    .string()
    .nonempty({ message: "Tên bài tập không được để trống" })
    .min(3, { message: "Tên bài tập phải có ít nhất 3 ký tự" })
    .max(50, { message: "Tên bài tập không được quá 50 ký tự" }),

  instructions: z
    .string()
    .nonempty({ message: "Hướng dẫn món ăn không được để trống" })
    .min(10, { message: "Hướng dẫn món ăn phải có ít nhất 10 ký tự" }),

  duration: z.number().optional(),
  reps: z.number().optional(),

  caloriesPerMinute: z
    .number()
    .min(1, { message: "Số calories đốt phải lớn hơn hoặc bằng 1" })
})

export const workoutExercisesSchema = z.object({
  warmupDuration: z.number(),
  workoutDuration: z.number(),

  warmup: z.array(workoutExerciseSchema),
  workout: z.array(workoutExerciseSchema)
})

const exerciseSchema = z.object({
  exerciseId: uuidSchema,
  userId: uuidSchema,

  type: ExerciseTypeSchemaEnum,

  name: z
    .string()
    .nonempty({ message: "Tên bài tập không được để trống" })
    .min(3, { message: "Tên bài tập phải có ít nhất 3 ký tự" })
    .max(50, { message: "Tên bài tập không được quá 50 ký tự" }),
  instructions: z
    .string()
    .nonempty({ message: "Hướng dẫn món ăn không được để trống" })
    .min(10, { message: "Hướng dẫn món ăn phải có ít nhất 10 ký tự" }),
  caloriesPerMinute: z
    .number()
    .min(1, { message: "Số calories đốt phải lớn hơn hoặc bằng 1" }),

  status: z.boolean(),

  ...auditFields
})

export const createExerciseSchema = exerciseSchema.pick({
  userId: true,
  name: true,
  instructions: true,
  caloriesPerMinute: true
})

export const updateExerciseSchema = createExerciseSchema.omit({
  userId: true
})

export type ExerciseType = z.infer<typeof exerciseSchema>
export type CreateExerciseType = z.infer<typeof createExerciseSchema>
export type UpdateExerciseType = z.infer<typeof updateExerciseSchema>

export type WorkoutExerciseType = z.infer<typeof workoutExerciseSchema>
export type WorkoutExercisesType = z.infer<typeof workoutExercisesSchema>
