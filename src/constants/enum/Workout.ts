import { z } from "zod"

import { EnumMeta } from "@/configs/enum"

export enum ExerciseTypeEnum {
  Time,
  Reps
}

export enum WorkoutTypeEnum {
  Warmup,
  Workout
}

export enum DifficultyLevelEnum {
  Easy,
  Medium,
  Hard
}

export const ExerciseTypeSchemaEnum = z.nativeEnum(ExerciseTypeEnum)

export const WorkoutTypeSchemaEnum = z.nativeEnum(WorkoutTypeEnum)
export const DifficultyLevelSchemaEnum = z.nativeEnum(DifficultyLevelEnum)

export const exerciseTypeMap: Record<ExerciseTypeEnum, EnumMeta> = {
  [ExerciseTypeEnum.Time]: {
    label: "Thời gian"
  },
  [ExerciseTypeEnum.Reps]: {
    label: "Số lần"
  }
}

const workoutTypeMap: Record<WorkoutTypeEnum, EnumMeta> = {
  [WorkoutTypeEnum.Warmup]: {
    label: "Khởi động"
  },
  [WorkoutTypeEnum.Workout]: {
    label: "Chính"
  }
}

const difficultyLevelMap: Record<DifficultyLevelEnum, EnumMeta> = {
  [DifficultyLevelEnum.Easy]: {
    label: "Dễ",
    color: "#3b82f6" // blue 500
  },
  [DifficultyLevelEnum.Medium]: {
    label: "Trung bình",
    color: "#ca8a04" // yellow 600
  },
  [DifficultyLevelEnum.Hard]: {
    label: "Khó",
    color: "#ef4444" // red 500
  }
}

export function getExerciseTypeMeta(type: ExerciseTypeEnum): EnumMeta {
  return exerciseTypeMap[type]
}

export function getWorkoutTypeMeta(type: WorkoutTypeEnum): EnumMeta {
  return workoutTypeMap[type]
}

export function getDifficultyLevelMeta(level: DifficultyLevelEnum): EnumMeta {
  return difficultyLevelMap[level]
}
