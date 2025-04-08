import React, { useMemo, useState } from "react"

import { useFoodStore } from "@/store/foodStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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

import {
  CreateFoodType,
  combinedFoodSchema,
  informationFoodSchema,
  nutritionFoodSchema
} from "@/schemas/foodSchema"

import InformationFood from "./information-food"
import NutritionFood from "./nutrition-food"

interface AddFoodDialogProps {
  isOpen: boolean
  onClose: () => void
}

function AddFoodDialog({ isOpen, onClose }: AddFoodDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [currentStep, setCurrentStep] = useState(1)

  const userId = "Khaitoideptrai"

  const {
    mealType,
    dishType,
    category,
    name,
    description,
    portion,
    nutrition,
    updateField
  } = useFoodStore()

  const formData: CreateFoodType = {
    userId,
    mealType,
    dishType,
    category,
    name,
    description,
    portion,
    nutrition
  }

  const steps = [
    {
      step: 1,
      title: "Thêm món ăn",
      description: "Nhập thông tin món ăn",
      component: InformationFood,
      fields: [
        "mealType",
        "dishType",
        "category",
        "name",
        "description",
        "portion"
      ],
      schema: informationFoodSchema
    },
    {
      step: 2,
      title: "Dinh dưỡng",
      description: "Nhập dinh dưỡng món ăn",
      component: NutritionFood,
      fields: ["nutrition"],
      schema: nutritionFoodSchema
    }
  ]

  const currentStepData = steps.find((step) => step.step === currentStep)

  const currentSchema = useMemo(() => {
    return (
      steps.find((step) => step.step === currentStep)?.schema ||
      combinedFoodSchema
    )
  }, [currentStep])

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(combinedFoodSchema),
    defaultValues: formData
  })

  const onSubmitStep = (data: Record<string, any>) => {
    console.log("Current Step:", currentStep)
    console.log("Data Step:", JSON.stringify(data, null, 2))
    console.log("Form Data:", JSON.stringify(formData, null, 2))
    console.log(
      "Food Store State:",
      JSON.stringify(useFoodStore.getState(), null, 2)
    )

    console.log(errors)

    Object.keys(data).forEach((key) => {
      if (key in formData) {
        formData[key as keyof typeof formData] = data[key]
      }
    })

    Object.keys(data).forEach((key) => {
      const keys = key.split(".")
      if (keys.length > 1) {
        const [parent, child] = keys

        if (
          parent in formData &&
          typeof formData[parent as keyof typeof formData] === "object"
        ) {
          updateField(parent, {
            ...(formData[parent as keyof typeof formData] as object),
            [child]: data[key]
          })
        }
      } else if (key in formData) {
        updateField(key, data[key])
      }
    })

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      const finalData = {
        ...useFoodStore.getState(),
        userId: formData.userId
      }

      console.log("Final Form Data:", JSON.stringify(finalData, null, 2))
    }
  }

  const StepComponent = currentStepData?.component

  if (!currentStepData || !StepComponent) {
    return null
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1)
    }
  }

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep((prevStep) => prevStep + 1)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Tạo món ăn</DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin để tạo món ăn mới.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 px-20 text-center">
          <Stepper value={currentStep}>
            {steps.map(({ step, title, description }) => (
              <StepperItem
                key={step}
                step={step}
                className="not-last:flex-1 max-md:items-start"
              >
                <StepperTrigger className="rounded max-md:flex-col">
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
        </div>

        <div>
          <StepComponent
            control={control}
            errors={errors}
            setValue={setValue}
          />
        </div>

        <DialogFooter className="mt-6 gap-4">
          <Button variant="secondary" size="lg" onClick={handlePreviousStep}>
            Quay lại
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            onClick={handleSubmit((data) => {
              onSubmitStep(data)
              handleNextStep()
            })}
          >
            Tiếp tục
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddFoodDialog
