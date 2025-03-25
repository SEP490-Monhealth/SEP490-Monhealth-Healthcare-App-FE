"use client"

import React from "react"

import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"

import { getGenderMeta } from "@/constants/enum/Metric"

import { MetricType } from "@/schemas/metricSchema"

import { formatDate } from "@/utils/formatters"

interface UserMetricTabDialogProps {
  metricData: MetricType
}

function UserMetricTabDialog({ metricData }: UserMetricTabDialogProps) {
  const { label } = getGenderMeta(metricData.gender)

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Ngày sinh</Label>
        <Input
          id="dateOfBirth"
          type="text"
          value={formatDate(metricData?.dateOfBirth || "")}
          disabled
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">Giới tính</Label>
        <Input id="gender" type="text" value={label} disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="height">Chiều cao</Label>
        <Input id="height" type="number" value={metricData.height} disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="weight">Cân nặng</Label>
        <Input id="weight" type="number" value={metricData.weight} disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="activityLevel">Mức độ vận động</Label>
        <Input
          id="activityLevel"
          type="text"
          value={metricData.activityLevel}
          disabled
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bmi">BMI (Chỉ số khối cơ thể)</Label>
        <Input id="bmi" type="number" value={metricData.bmi} disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bmr">BMR (Chỉ số trao đổi chất cơ bản)</Label>
        <Input id="bmr" type="number" value={metricData.bmr} disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tdee">TDEE (Tổng năng lượng tiêu thụ hàng ngày)</Label>
        <Input id="tdee" type="number" value={metricData.tdee} disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ibw">IBW (Cân nặng lý tưởng)</Label>
        <Input id="ibw" type="number" value={metricData.ibw} disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="updatedAt">Ngày cập nhật</Label>
        <Input
          id="updatedAt"
          type="text"
          value={formatDate(metricData.updatedAt)}
          disabled
        />
      </div>
    </div>
  )
}

export default UserMetricTabDialog
