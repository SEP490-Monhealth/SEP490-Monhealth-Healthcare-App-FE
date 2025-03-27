import { z } from "zod"

import { EnumMeta } from "@/configs/enum"

export enum MealTypeEnum {
  Breakfast,
  Lunch,
  Dinner,
  Snack
}

export enum DishTypeEnum {
  MainDish,
  SideDish,
  Soup,
  Dessert,
  Snack,
  Drink
}

export const MealTypeSchemaEnum = z.nativeEnum(MealTypeEnum)
export const DishTypeSchemaEnum = z.nativeEnum(DishTypeEnum)

export const mealTypeMap: Record<MealTypeEnum, EnumMeta> = {
  [MealTypeEnum.Breakfast]: {
    label: "Bữa sáng"
  },
  [MealTypeEnum.Lunch]: {
    label: "Bữa trưa"
  },
  [MealTypeEnum.Dinner]: {
    label: "Bữa tối"
  },
  [MealTypeEnum.Snack]: {
    label: "Bữa phụ"
  }
}

export const dishTypeMap: Record<DishTypeEnum, EnumMeta> = {
  [DishTypeEnum.MainDish]: {
    label: "Món chính"
  },
  [DishTypeEnum.SideDish]: {
    label: "Món phụ"
  },
  [DishTypeEnum.Soup]: {
    label: "Món canh"
  },
  [DishTypeEnum.Dessert]: {
    label: "Tráng miệng"
  },
  [DishTypeEnum.Snack]: {
    label: "Ăn vặt"
  },
  [DishTypeEnum.Drink]: {
    label: "Nước uống"
  }
}

export function getMealTypeLabels(mealTypes: MealTypeEnum[]): string[] {
  return mealTypes.map((mealType) => mealTypeMap[mealType]?.label || "Unknown")
}

export function getDishTypeLabels(dishTypes: DishTypeEnum[]): string[] {
  return dishTypes.map((dishType) => dishTypeMap[dishType]?.label || "Unknown")
}
