import React from "react"

import { Control, FieldValues } from "react-hook-form"

interface NutritionInformationProps {
  control: Control<FieldValues>
  errors: any
  setValue: any
}

function NutritionFood({
  control,
  errors,
  setValue
}: NutritionInformationProps) {
  return <div>NutritionFood</div>
}

export default NutritionFood
