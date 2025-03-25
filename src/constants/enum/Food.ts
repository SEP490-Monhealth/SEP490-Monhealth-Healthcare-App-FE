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
    label: "Bữa sáng",
    color: "#fbbf24" // Amber 400
  },
  [MealTypeEnum.Lunch]: {
    label: "Bữa trưa",
    color: "#22c55e" // Green 500
  },
  [MealTypeEnum.Dinner]: {
    label: "Bữa tối",
    color: "#2563eb" // Blue 600
  },
  [MealTypeEnum.Snack]: {
    label: "Bữa phụ",
    color: "#f43f5e" // Rose 500
  }
}

export const dishTypeMap: Record<DishTypeEnum, EnumMeta> = {
  [DishTypeEnum.MainDish]: {
    label: "Món chính",
    color: "#FF6F61" // Màu đỏ cam đậm
  },
  [DishTypeEnum.SideDish]: {
    label: "Món phụ",
    color: "#FFB74D" // Màu vàng cam
  },
  [DishTypeEnum.Soup]: {
    label: "Món canh",
    color: "#64B5F6" // Màu xanh dương
  },
  [DishTypeEnum.Dessert]: {
    label: "Tráng miệng",
    color: "#F48FB1" // Màu hồng nhạt
  },
  [DishTypeEnum.Snack]: {
    label: "Ăn vặt",
    color: "#81C784" // Màu xanh lá
  },
  [DishTypeEnum.Drink]: {
    label: "Nước uống",
    color: "#4DB6AC" // Màu xanh ngọc
  }
}

export function getMealTypeMeta(status: MealTypeEnum): EnumMeta {
  return mealTypeMap[status]
}

export function getDishTypeMeta(status: DishTypeEnum): EnumMeta {
  return dishTypeMap[status]
}
