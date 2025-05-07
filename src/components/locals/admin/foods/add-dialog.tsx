"use client"

import React, { useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useForm
} from "react-hook-form"
import { ZodType } from "zod"

import { Button } from "@/components/globals/atoms/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/globals/atoms/dialog"
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger
} from "@/components/globals/atoms/stepper"

import { useAddFood } from "@/hooks/useFood"

import {
  CreateFoodBasicInfoType,
  CreateFoodNutritionInfoType,
  CreateFoodPortionInfoType,
  CreateFoodType,
  createFoodBasicInfoSchema,
  createFoodNutritionInfoSchema,
  createFoodPortionInfoSchema
} from "@/schemas/foodSchema"

import { useAddFoodStore } from "@/stores/foodStore"

import FoodAddBasicTabDialog from "./add-basic-tab-dialog"
import FoodAddNutritionTabDialog from "./add-nutrition-tab-dialog"
import FoodAddPortionTabDialog from "./add-portion-tab-dialog"

interface FoodFormValues
  extends CreateFoodBasicInfoType,
    CreateFoodPortionInfoType,
    CreateFoodNutritionInfoType {}

interface FormComponentProps {
  register: UseFormRegister<FoodFormValues>
  setValue: UseFormSetValue<FoodFormValues>
  watch: UseFormWatch<FoodFormValues>
  errors: FieldErrors<FoodFormValues>
}

interface StepProps {
  step: number
  title: string
  description: string
  component: React.FC<FormComponentProps>
  fields: string[]
  schema: ZodType<unknown>
}

const steps: StepProps[] = [
  {
    step: 1,
    title: "Thêm thức ăn",
    description: "Thông tin cơ bản",
    component: FoodAddBasicTabDialog,
    fields: [
      "category",
      "mealType",
      "dishType",
      "name",
      "description",
      "referenceUrl"
    ],
    schema: createFoodBasicInfoSchema
  },
  {
    step: 2,
    title: "Khẩu phần ăn",
    description: "Kích thước & đơn vị",
    component: FoodAddPortionTabDialog,
    fields: ["portion"],
    schema: createFoodPortionInfoSchema
  },
  {
    step: 3,
    title: "Dinh dưỡng",
    description: "Giá trị dinh dưỡng",
    component: FoodAddNutritionTabDialog,
    fields: ["nutrition"],
    schema: createFoodNutritionInfoSchema
  }
]

interface AddFoodDialogProps {
  isOpen: boolean
  onClose: () => void
  userId: string
}

function AddFoodDialog({ isOpen, onClose, userId }: AddFoodDialogProps) {
  const {
    currentStep,
    isSubmitting,

    category,
    mealType,
    dishType,
    name,
    description,
    referenceUrl,
    portion,
    nutrition,

    updateFields,
    reset,
    nextStep,
    prevStep,
    setStep,
    markStepComplete,
    isStepComplete,
    setSubmitting
  } = useAddFoodStore()

  const { mutate: addFood } = useAddFood()

  const totalSteps = steps.length

  const currentStepData =
    steps.find((step) => step.step === currentStep) || steps[0]

  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors }
  } = useForm<FoodFormValues>({
    resolver: zodResolver(currentStepData.schema as ZodType<any>),
    defaultValues: {
      category: "",
      mealType: [],
      dishType: [],
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
  })

  useEffect(() => {
    const subscription = watch((value) => {
      if (Object.keys(value).length) {
        updateFields(value as any)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, updateFields])

  const handleNext = async () => {
    const isStepValid = await trigger()

    if (isStepValid) {
      markStepComplete(currentStep)

      if (currentStep === totalSteps) {
        onSubmit()
      } else {
        nextStep()
      }
    }
  }

  const onSubmit = async () => {
    setSubmitting(true)

    try {
      const finalData: CreateFoodType = {
        userId,
        category,
        mealType,
        dishType,
        name,
        description,
        referenceUrl,
        portion,
        nutrition
      }

      // console.log("Dữ liệu gửi đi:", JSON.stringify(finalData, null, 2))

      await addFood(finalData, {
        onSuccess: () => {
          reset()
        }
      })
    } catch (error) {
      console.error("Lỗi khi tạo thức ăn:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDialogClose = () => {
    onClose()
    reset()
  }

  const StepComponent = currentStepData.component

  // console.log(errors)

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Tạo thức ăn</DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin để tạo thức ăn mới.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          <Stepper value={currentStep} onValueChange={setStep}>
            {steps.map(({ step, title, description }) => (
              <StepperItem
                key={step}
                step={step}
                className="not-last:flex-1 max-md:items-start"
              >
                <StepperTrigger
                  className="rounded max-md:flex-col"
                  disabled={step > currentStep && !isStepComplete(currentStep)}
                >
                  <StepperIndicator />
                  <div className="text-center md:text-left">
                    <StepperTitle>{title}</StepperTitle>
                    <StepperDescription className="max-sm:hidden">
                      {description}
                    </StepperDescription>
                  </div>
                </StepperTrigger>
                {step < steps.length && (
                  <StepperSeparator className="max-md:mt-3.5 md:mx-4" />
                )}
              </StepperItem>
            ))}
          </Stepper>

          <StepComponent
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />
        </div>

        <DialogFooter className="space-x-4">
          {currentStep > 1 && (
            <Button variant="outline" onClick={prevStep}>
              Quay lại
            </Button>
          )}

          <Button disabled={isSubmitting} type="button" onClick={handleNext}>
            {currentStep === totalSteps
              ? isSubmitting
                ? "Đang tạo..."
                : "Tạo thức ăn"
              : "Tiếp theo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddFoodDialog
