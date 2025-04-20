import React from "react"

import { Label } from "@/components/globals/atoms/label"

import ExerciseCard from "@/components/globals/molecules/exercise-card"

import { WorkoutExercisesType } from "@/schemas/exerciseSchema"

interface WorkoutExercisesTabDialogProps {
  exercisesData: WorkoutExercisesType
}

function WorkoutExercisesTabDialog({
  exercisesData
}: WorkoutExercisesTabDialogProps) {
  console.log(JSON.stringify(exercisesData, null, 2))

  return (
    <div className="mb-1 space-y-6">
      <div className="space-y-4">
        <Label>Bài tập khởi động</Label>
        {exercisesData.warmup && exercisesData.warmup.length > 0 ? (
          exercisesData.warmup.map((exercise) => (
            <ExerciseCard key={exercise.exerciseId} exerciseData={exercise} />
          ))
        ) : (
          <Label>Không có bài tập khởi động nào</Label>
        )}
      </div>

      <div className="space-y-4">
        <Label>Bài tập chính</Label>
        {exercisesData.workout.map((exercise) => (
          <ExerciseCard key={exercise.exerciseId} exerciseData={exercise} />
        ))}
      </div>
    </div>
  )
}

export default WorkoutExercisesTabDialog
