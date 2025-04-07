import React, { useState } from "react"

import { log } from "console"
import { Beef, Cat, Dog, FileText } from "lucide-react"

import { Button } from "@/components/globals/atoms/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/globals/atoms/dialog"

import StepCreateFood from "@/components/globals/molecules/step-create-food"

interface AddFoodDialogProps {
  isOpen: boolean
  onClose: () => void
}

function AddFoodDialog({ isOpen, onClose }: AddFoodDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [currentStep, setCurrentStep] = useState<number>(0)

  const stepData = {
    process: [
      { icon: <FileText size={25} />, label: "Thông tin" },
      { icon: <Beef size={25} />, label: "Dinh dưỡng" }
    ]
  }

  console.log(currentStep)

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1)
    }
  }

  const handleNextStep = () => {
    if (currentStep < 1) {
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

        <div className="justify-center px-20">
          <StepCreateFood />
        </div>

        <DialogFooter className="mt-6 gap-4">
          <Button variant="secondary" size="lg" onClick={handlePreviousStep}>
            Quay lại
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            onClick={handleNextStep}
          >
            Tiếp tục
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddFoodDialog
