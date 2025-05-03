"use client"

import React from "react"

import { Label } from "@/components/globals/atoms/label"

import ExerciseCard from "@/components/globals/molecules/exercise-card"

import { WorkoutExercisesType } from "@/schemas/exerciseSchema"

interface WorkoutExerciseTabDialogProps {
  exercisesData: WorkoutExercisesType
}

function WorkoutExerciseTabDialog({
  exercisesData
}: WorkoutExerciseTabDialogProps) {
  return (
    <div className="space-y-6 pr-4 pb-2 pl-1">
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

export default WorkoutExerciseTabDialog
