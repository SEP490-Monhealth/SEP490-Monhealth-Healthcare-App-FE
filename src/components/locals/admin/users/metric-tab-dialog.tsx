"use client"

import React from "react"

import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"

import { MetricType } from "@/schemas/metricSchema"

import { formatDate, roundIfDecimal } from "@/utils/formatters"

interface UserMetricTabDialogProps {
  metricData: MetricType
}

function UserMetricTabDialog({ metricData }: UserMetricTabDialogProps) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      <div className="space-y-2">
        <Label htmlFor="height">Chiều cao</Label>
        <Input id="height" type="number" value={metricData.height} readOnly />
      </div>

      <div className="space-y-2">
        <Label htmlFor="weight">Cân nặng</Label>
        <Input id="weight" type="number" value={metricData.weight} readOnly />
      </div>

      <div className="space-y-2">
        <Label htmlFor="activityLevel">Mức độ vận động</Label>
        <Input
          id="activityLevel"
          type="text"
          value={metricData.activityLevel}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bmi">BMI (Chỉ số khối cơ thể)</Label>
        <Input
          id="bmi"
          type="number"
          value={roundIfDecimal(metricData.bmi)}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bmr">BMR (Chỉ số trao đổi chất cơ bản)</Label>
        <Input
          id="bmr"
          type="number"
          value={roundIfDecimal(metricData.bmr)}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tdee">TDEE (Năng lượng tiêu thụ hàng ngày)</Label>
        <Input
          id="tdee"
          type="number"
          value={roundIfDecimal(metricData.tdee)}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ibw">IBW (Cân nặng lý tưởng)</Label>
        <Input
          id="ibw"
          type="number"
          value={roundIfDecimal(metricData.ibw)}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="updatedAt">Ngày cập nhật</Label>
        <Input
          id="updatedAt"
          type="text"
          value={formatDate(metricData.updatedAt)}
          readOnly
        />
      </div>
    </div>
  )
}

export default UserMetricTabDialog
