import React from "react"

import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"
import { Textarea } from "@/components/globals/atoms/textarea"

import {
  DifficultyLevelEnum,
  WorkoutTypeEnum,
  getDifficultyLevelMeta,
  getWorkoutTypeMeta
} from "@/constants/enum/Workout"

import { WorkoutType } from "@/schemas/workoutSchema"

import { formatDate } from "@/utils/formatters"

interface WorkoutDetailTabDialogProps {
  workoutData: WorkoutType
}

function WorkoutDetailTabDialog({ workoutData }: WorkoutDetailTabDialogProps) {
  const { label: workoutTypeLabel } = getWorkoutTypeMeta(
    workoutData?.type || WorkoutTypeEnum.Warmup
  )
  const { label: difficultyTypeLabel } = getDifficultyLevelMeta(
    workoutData?.difficultyLevel || DifficultyLevelEnum.Easy
  )

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      <div className="space-y-2">
        <Label htmlFor="workoutId">Mã bộ bài tập</Label>
        <Input
          id="workoutId"
          type="text"
          value={workoutData.workoutId}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Tên bộ bài tập</Label>
        <Input id="name" type="text" value={workoutData.name} readOnly />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Loại bộ bài tập</Label>
        <Input id="type" type="text" value={workoutTypeLabel} readOnly />
      </div>

      <div className="space-y-2">
        <Label htmlFor="difficultyLevel">Độ khó</Label>
        <Input
          id="difficultyLevel"
          type="text"
          value={difficultyTypeLabel}
          readOnly
        />
      </div>

      <div className="col-span-2 grid grid-cols-3 gap-x-6 gap-y-4">
        <div className="space-y-2">
          <Label htmlFor="exercises">Số lượng bài tập</Label>
          <Input
            id="exercises"
            type="text"
            value={workoutData.exercises}
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="durationMinutes">Thời gian</Label>
          <div className="relative">
            <Input
              id="durationMinutes"
              type="number"
              value={workoutData.durationMinutes}
              readOnly
            />
            <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
              phút
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="caloriesBurned">Năng lượng đốt</Label>
          <div className="relative">
            <Input
              id="caloriesBurned"
              type="number"
              value={workoutData.caloriesBurned}
              readOnly
            />
            <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
              kcal
            </span>
          </div>
        </div>
      </div>

      <div className="col-span-2 space-y-2">
        <Label htmlFor="description">Mô tả</Label>
        <Textarea
          id="description"
          rows={3}
          value={workoutData.description}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="isPublic">Áp dụng</Label>
        <Input
          id="isPublic"
          type="text"
          value={workoutData.isPublic ? "Công khai" : "Riêng tư"}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Trạng thái</Label>
        <Input
          id="status"
          type="text"
          value={workoutData.status ? "Hoạt động" : "Ngừng hoạt động"}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="createdAt">Ngày tạo</Label>
        <Input
          id="createdAt"
          type="text"
          value={formatDate(workoutData.createdAt)}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="createdBy">Người tạo</Label>
        <Input
          id="createdBy"
          type="text"
          value={workoutData.createdBy || "--"}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="updatedAt">Ngày cập nhật</Label>
        <Input
          id="updatedAt"
          type="text"
          value={formatDate(workoutData.updatedAt)}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="updatedBy">Người cập nhật</Label>
        <Input
          id="updatedBy"
          type="text"
          value={workoutData.updatedBy || "--"}
          readOnly
        />
      </div>
    </div>
  )
}

export default WorkoutDetailTabDialog
