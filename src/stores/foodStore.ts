import { create } from "zustand"
import { devtools } from "zustand/middleware"

import { DishTypeEnum, MealTypeEnum } from "@/constants/enum/Food"

interface AddFoodState {
  currentStep: number
  completedSteps: number[]
  isSubmitting: boolean

  category: string
  mealType: MealTypeEnum[]
  dishType: DishTypeEnum[]
  name: string
  description: string
  referenceUrl?: string

  portion: {
    size: string
    weight: number
    unit: string
  }

  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sugar: number
    saturatedFat: number
    unsaturatedFat: number
    cholesterol: number
    sodium: number
    potassium: number
    calcium: number
    iron: number
    vitaminA: number
    vitaminB1: number
    vitaminB2: number
    vitaminB3: number
    vitaminC: number
    vitaminD: number
    vitaminE: number
  }

  updateFields: (
    fields: Partial<
      Omit<
        AddFoodState,
        | "updateFields"
        | "reset"
        | "nextStep"
        | "prevStep"
        | "setStep"
        | "markStepComplete"
        | "isStepComplete"
        | "setSubmitting"
      >
    >
  ) => void
  reset: () => void
  nextStep: () => void
  prevStep: () => void
  setStep: (step: number) => void
  markStepComplete: (step: number) => void
  isStepComplete: (step: number) => boolean
  setSubmitting: (isSubmitting: boolean) => void
}

const defaultState = {
  currentStep: 1,
  completedSteps: [],
  isSubmitting: false,

  category: "",
  mealType: [] as MealTypeEnum[],
  dishType: [] as DishTypeEnum[],
  name: "",
  description: "",
  referenceUrl: "",

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
}

export const useAddFoodStore = create<AddFoodState>()(
  devtools((set, get) => ({
    ...defaultState,

    updateFields: (fields) => set((state) => ({ ...state, ...fields })),

    reset: () => set(() => ({ ...defaultState })),

    nextStep: () =>
      set((state) => ({
        currentStep: Math.min(state.currentStep + 1, 3)
      })),

    prevStep: () =>
      set((state) => ({
        currentStep: Math.max(state.currentStep - 1, 1)
      })),

    setStep: (step) => set(() => ({ currentStep: step })),

    markStepComplete: (step) =>
      set((state) => ({
        completedSteps: state.completedSteps.includes(step)
          ? state.completedSteps
          : [...state.completedSteps, step]
      })),

    isStepComplete: (step) => {
      const state = get()
      return state.completedSteps.includes(step)
    },

    setSubmitting: (isSubmitting) => set(() => ({ isSubmitting }))
  }))
)
