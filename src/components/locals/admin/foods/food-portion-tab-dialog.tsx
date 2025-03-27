"use client"

import React from "react"

import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"

import { PortionType } from "@/schemas/portionSchema"

interface FoodPortionTabDialogProps {
  portionsData: PortionType[]
}

function FoodPortionTabDialog({ portionsData }: FoodPortionTabDialogProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-x-6">
        <Label>Kích thước</Label>
        <Label>Trọng lượng</Label>
        <Label>Đơn vị</Label>
      </div>

      <div className="flex flex-col gap-4">
        {portionsData.map((portion, index) => (
          <div key={index} className="grid grid-cols-3 gap-x-6 gap-y-4">
            <Input
              id={`size-${index}`}
              type="text"
              value={portion.size}
              readOnly
            />

            <Input
              id={`weight-${index}`}
              type="text"
              value={portion.weight}
              readOnly
            />

            <Input
              id={`unit-${index}`}
              type="text"
              value={portion.unit}
              readOnly
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FoodPortionTabDialog
