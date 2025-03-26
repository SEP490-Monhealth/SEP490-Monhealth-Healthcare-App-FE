"use client"

import React from "react"

import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"

import { getGoalStatusMeta, getGoalTypeMeta } from "@/constants/enum/Goal"

import { GoalType } from "@/schemas/goalSchema"

import { formatDate } from "@/utils/formatters"

interface UserGoalTabDialogProps {
  goalData: GoalType
}

function UserGoalTabDialog({ goalData }: UserGoalTabDialogProps) {
  const { label: goalTypeLabel } = getGoalTypeMeta(goalData.type)
  const { label: goalStatusLabel } = getGoalStatusMeta(goalData.status)

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      <div className="space-y-2">
        <Label htmlFor="type">Loại mục tiêu</Label>
        <Input id="type" type="text" value={goalTypeLabel} readOnly />
      </div>

      <div className="space-y-2">
        <Label htmlFor="caloriesRatio">Tốc độ tăng cân</Label>
        <Input
          id="caloriesRatio"
          type="text"
          value={goalData.caloriesRatio}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="weightGoal">Cân nặng</Label>
        <Input
          id="weightGoal"
          type="number"
          value={goalData.weightGoal}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="caloriesGoal">Calories</Label>
        <Input
          id="caloriesGoal"
          type="number"
          value={goalData.caloriesGoal}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="proteinGoal">Protein</Label>
        <Input
          id="proteinGoal"
          type="number"
          value={goalData.proteinGoal}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="carbsGoal">Carbohydrate</Label>
        <Input
          id="carbsGoal"
          type="number"
          value={goalData.carbsGoal}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fatGoal">Chất béo</Label>
        <Input id="fatGoal" type="number" value={goalData.fatGoal} readOnly />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fiberGoal">Chất xơ</Label>
        <Input
          id="fiberGoal"
          type="number"
          value={goalData.fiberGoal}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sugarGoal">Đường</Label>
        <Input
          id="sugarGoal"
          type="number"
          value={goalData.sugarGoal}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="waterIntakesGoal">Lượng nước</Label>
        <Input
          id="waterIntakesGoal"
          type="number"
          value={goalData.waterIntakesGoal}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="workoutDurationGoal">Thời gian tập</Label>
        <Input
          id="workoutDurationGoal"
          type="number"
          value={goalData.workoutDurationGoal}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="caloriesBurnedGoal">Calories đốt</Label>
        <Input
          id="caloriesBurnedGoal"
          type="number"
          value={goalData.caloriesBurnedGoal}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Trạng thái</Label>
        <Input id="status" type="text" value={goalStatusLabel} readOnly />
      </div>

      <div className="space-y-2">
        <Label htmlFor="updatedAt">Ngày cập nhật</Label>
        <Input
          id="updatedAt"
          type="text"
          value={formatDate(goalData.updatedAt)}
          readOnly
        />
      </div>
    </div>
  )
}

export default UserGoalTabDialog
