import { z } from "zod"

import { EnumMeta } from "@/configs/enum"

export enum CategoryTypeEnum {
  Food,
  Workout
}

export const CATEGORY_TYPE = [
  { label: "Thực phẩm", value: CategoryTypeEnum.Food },
  { label: "Tập luyện", value: CategoryTypeEnum.Workout }
]

export const CategoryTypeSchemaEnum = z.nativeEnum(CategoryTypeEnum)

const categoryMetaMapping: Record<CategoryTypeEnum, EnumMeta> = {
  [CategoryTypeEnum.Food]: {
    label: "Thực phẩm"
  },
  [CategoryTypeEnum.Workout]: {
    label: "Tập luyện"
  }
}

export function getCategoryMeta(type: CategoryTypeEnum): EnumMeta {
  return categoryMetaMapping[type]
}
