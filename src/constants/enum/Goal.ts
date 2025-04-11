import { z } from "zod"

import { EnumMeta } from "@/configs/enum"

export enum GoalTypeEnum {
  WeightLoss,
  Maintenance,
  WeightGain,
  MuscleGain
}

export enum GoalStatusEnum {
  Abandoned,
  Active,
  Completed
}

export const GoalTypeSchemaEnum = z.nativeEnum(GoalTypeEnum)
export const GoalStatusSchemaEnum = z.nativeEnum(GoalStatusEnum)

const goalTypeMetaMapping: Record<GoalTypeEnum, EnumMeta> = {
  [GoalTypeEnum.WeightLoss]: {
    label: "Giảm cân"
  },
  [GoalTypeEnum.Maintenance]: {
    label: "Duy trì cân nặng"
  },
  [GoalTypeEnum.WeightGain]: {
    label: "Tăng cân"
  },
  [GoalTypeEnum.MuscleGain]: {
    label: "Tăng cơ"
  }
}

export const goalStatusMetaMapping: Record<GoalStatusEnum, EnumMeta> = {
  [GoalStatusEnum.Abandoned]: {
    label: "Bỏ dở",
    color: "#ef4444" // red 500
  },
  [GoalStatusEnum.Active]: {
    label: "Đang thực hiện",
    color: "#16a34a" // green 600
  },
  [GoalStatusEnum.Completed]: {
    label: "Hoàn thành",
    color: "#3b82f6" // blue 500
  }
}

export function getGoalTypeMeta(type: GoalTypeEnum) {
  return goalTypeMetaMapping[type]
}

export function getGoalStatusMeta(status: GoalStatusEnum) {
  return goalStatusMetaMapping[status]
}
