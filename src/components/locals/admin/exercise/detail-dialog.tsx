import React, { useEffect, useState } from "react"

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

import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import { useExerciseById, useUpdateExercise } from "@/hooks/useExercise"

import {
  UpdateExerciseType,
  updateExerciseSchema
} from "@/schemas/exerciseSchema"

import { formatDate } from "@/utils/formatters"

interface ExerciseDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  exerciseId: string | null
}

function ExerciseDetailDialog({
  isOpen,
  onClose,
  exerciseId
}: ExerciseDetailDialogProps) {
  const {
    data: exerciseData,
    isLoading: isExerciseLoading,
    error: exerciseError
  } = useExerciseById(exerciseId || "")

  const { mutate: updateExercise } = useUpdateExercise()

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false)

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateExerciseType>({
    resolver: zodResolver(updateExerciseSchema)
  })

  useEffect(() => {
    if (exerciseData) {
      setValue("name", exerciseData.name)
      setValue("instructions", exerciseData.instructions || "")
      setValue("caloriesPerMinute", exerciseData.caloriesPerMinute || 0)
    }
  }, [exerciseData, setValue])

  const onSubmit = async (data: UpdateExerciseType) => {
    setIsEdit(false)
    setIsLoadingSave(true)

    try {
      await updateExercise(
        { exerciseId: exerciseId || "", updatedData: data },
        {
          onSuccess: () => {
            setIsEdit(false)
            setIsLoadingSave(false)
          },
          onError: () => {
            setIsLoadingSave(false)
          }
        }
      )
    } catch (error) {
      console.log(error)
      setIsLoadingSave(false)
    }
  }

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleCancelEdit = () => {
    setIsEdit(false)
  }

  const isLoading = isExerciseLoading
  const hasError = exerciseError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-h-[400px] min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết bài tập</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của bài tập.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !exerciseData ? (
          <ErrorDialog
            message={exerciseError?.message || "Không thể tải dữ liệu."}
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2">
              <Label htmlFor="exerciseId">Mã bài tập</Label>
              <Input
                id="exerciseId"
                type="text"
                value={exerciseData.exerciseId}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Tên bài tập</Label>

              {!isEdit ? (
                <Input
                  id="name"
                  type="text"
                  value={exerciseData.name}
                  readOnly
                />
              ) : (
                <Input
                  id="name"
                  type="text"
                  placeholder="Nhập tên bài tập"
                  defaultValue={exerciseData.name}
                  {...register("name")}
                />
              )}

              {errors.name && (
                <p className="mt-1 ml-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <div className="space-y-2">
                <Label htmlFor="instructions">Hướng dẫn</Label>

                {!isEdit ? (
                  <Textarea
                    id="instructions"
                    rows={6}
                    value={exerciseData.instructions}
                    readOnly
                  />
                ) : (
                  <Textarea
                    id="instructions"
                    rows={6}
                    placeholder="Nhập hướng dẫn"
                    defaultValue={exerciseData.instructions}
                    {...register("instructions")}
                  />
                )}
              </div>

              {errors.instructions && (
                <p className="mt-1 ml-1 text-sm text-red-600">
                  {errors.instructions.message}
                </p>
              )}
            </div>

            <div>
              <div className="space-y-2">
                <Label htmlFor="caloriesPerMinute">Năng lượng mỗi phút</Label>
                <div className="relative">
                  {!isEdit ? (
                    <Input
                      id="caloriesPerMinute"
                      type="text"
                      value={exerciseData.caloriesPerMinute}
                      readOnly
                    />
                  ) : (
                    <Input
                      id="caloriesPerMinute"
                      type="number"
                      placeholder="Nhập năng lượng"
                      defaultValue={exerciseData.caloriesPerMinute}
                      {...register("caloriesPerMinute", {
                        valueAsNumber: true
                      })}
                    />
                  )}
                  <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                    kcal
                  </span>
                </div>
              </div>

              {errors.caloriesPerMinute && (
                <p className="mt-1 ml-1 text-sm text-red-600">
                  {errors.caloriesPerMinute.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Input
                id="status"
                type="text"
                value={exerciseData.status ? "Hoạt động" : "Ngừng hoạt động"}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdAt">Ngày tạo</Label>
              <Input
                id="createdAt"
                type="text"
                value={formatDate(exerciseData.createdAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdBy">Người tạo</Label>
              <Input
                id="createdBy"
                type="text"
                value={exerciseData.createdBy || "--"}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedAt">Ngày cập nhật</Label>
              <Input
                id="updatedAt"
                type="text"
                value={formatDate(exerciseData.updatedAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedBy">Người cập nhật</Label>
              <Input
                id="updatedBy"
                type="text"
                value={exerciseData.updatedBy || "--"}
                readOnly
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <div className="flex w-full justify-between">
            {!isEdit ? (
              <Button variant={"outline"} onClick={handleEdit}>
                Chỉnh sửa
              </Button>
            ) : (
              <div className="space-x-4">
                <Button variant={"outline"} onClick={handleCancelEdit}>
                  Hủy
                </Button>

                <Button
                  type="submit"
                  disabled={isLoadingSave}
                  variant={"default"}
                  onClick={handleSubmit(onSubmit)}
                >
                  {isLoadingSave ? "Đang cập nhật..." : "Cập nhật"}
                </Button>
              </div>
            )}

            <Button onClick={onClose}>Đóng</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ExerciseDetailDialog
