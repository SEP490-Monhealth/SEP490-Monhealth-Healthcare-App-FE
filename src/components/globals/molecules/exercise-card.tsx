import React from "react"

import { WorkoutExerciseType } from "@/schemas/exerciseSchema"

import { Card, CardDescription, CardHeader, CardTitle } from "../atoms/card"

interface ExerciseCardProps {
  exerciseData: WorkoutExerciseType
}

function ExerciseCard({ exerciseData }: ExerciseCardProps) {
  return (
    <Card className="py-4">
      <CardHeader>
        <CardTitle className="font-medium">
          {exerciseData.name} -{" "}
          {exerciseData.duration
            ? `${exerciseData.duration} giây`
            : `${exerciseData.reps} lần`}{" "}
          - {exerciseData.caloriesPerMinute} kcal
        </CardTitle>
        <CardDescription>{exerciseData.instructions}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export default ExerciseCard
