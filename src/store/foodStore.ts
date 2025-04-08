import { create } from "zustand"

import { DishTypeEnum, MealTypeEnum } from "@/constants/enum/Food"

import { FoodNutritionType } from "@/schemas/nutritionSchema"
import { FoodPortionType } from "@/schemas/portionSchema"

interface CreateFoodState {
  mealType: MealTypeEnum[]
  dishType: DishTypeEnum[]
  category: string
  name: string
  description: string
  portion: FoodPortionType
  nutrition: FoodNutritionType

  updateField: (field: string, value: any) => void
  reset: () => void
}

export const useFoodStore = create<CreateFoodState>((set) => ({
  mealType: [],
  dishType: [],
  category: "",
  name: "",
  description: "",
  portion: {
    size: "",
    weight: 0,
    unit: ""
  },
  nutrition: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,

    saturatedFat: 0,
    unsaturatedFat: 0,
    cholesterol: 0,
    sodium: 0,
    potassium: 0,
    calcium: 0,
    iron: 0,
    vitaminA: 0,
    vitaminB1: 0,
    vitaminB2: 0,
    vitaminB3: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0
  },

  updateField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value
    })),

  reset: () =>
    set(() => ({
      mealType: [],
      dishType: [],
      category: "",
      name: "",
      description: "",
      portion: {
        size: "",
        weight: 0,
        unit: ""
      },
      nutrition: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,

        saturatedFat: 0,
        unsaturatedFat: 0,
        cholesterol: 0,
        sodium: 0,
        potassium: 0,
        calcium: 0,
        iron: 0,
        vitaminA: 0,
        vitaminB1: 0,
        vitaminB2: 0,
        vitaminB3: 0,
        vitaminC: 0,
        vitaminD: 0,
        vitaminE: 0
      }
    }))
}))
