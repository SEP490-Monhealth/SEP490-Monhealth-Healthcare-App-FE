"use client"

import React, { useState } from "react"

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
import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"
import { Textarea } from "@/components/globals/atoms/textarea"

import { useAddExercise } from "@/hooks/useExercise"

import {
  CreateExerciseType,
  createExerciseSchema
} from "@/schemas/exerciseSchema"

interface AddExerciseDialogProps {
  isOpen: boolean
  onClose: () => void
}

function AddExerciseDialog({ isOpen, onClose }: AddExerciseDialogProps) {
  const { mutate: addExercise } = useAddExercise()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateExerciseType>({
    resolver: zodResolver(createExerciseSchema),
    defaultValues: {
      userId: "f4888792-8802-4c6c-ac50-6eb2d0474853",
      name: "",
      instructions: "",
      caloriesPerMinute: 0
    }
  })

  const onSubmit = async (data: CreateExerciseType) => {
    setIsLoading(true)

    const finalData = data
    console.log("Dữ liệu gửi đi:", JSON.stringify(finalData, null, 2))

    try {
      await addExercise(finalData, {
        onSuccess: () => {
          onClose()
          reset()
        }
      })
    } catch (error) {
      console.error("Lỗi khi tạo bài tập:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // console.log(errors)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Tạo bài tập</DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin để tạo bài tập mới.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4">
          <div>
            <div className="space-y-2">
              <Label htmlFor="name">Tên bài tập</Label>
              <Input
                id="name"
                type="text"
                placeholder="Nhập tên bài tập"
                {...register("name")}
              />
            </div>

            {errors.name && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <div className="space-y-2">
              <Label htmlFor="instructions">Hướng dẫn</Label>
              <Textarea
                id="instructions"
                rows={6}
                placeholder="Nhập hướng dẫn bài tập"
                {...register("instructions")}
              />
            </div>

            {errors.instructions && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.instructions.message}
              </p>
            )}
          </div>

          <div>
            <div className="space-y-2">
              <Label htmlFor="caloriesPerMinute">
                Năng lượng mỗi phút (kcal)
              </Label>
              <Input
                id="caloriesPerMinute"
                type="number"
                placeholder="Nhập nặng lượng"
                {...register("caloriesPerMinute", {
                  valueAsNumber: true
                })}
              />
            </div>

            {errors.caloriesPerMinute && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.caloriesPerMinute.message}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="space-x-4">
          <Button variant="secondary" size="lg" onClick={onClose}>
            Hủy
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? "Đang tạo..." : "Tạo bài tập"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddExerciseDialog
