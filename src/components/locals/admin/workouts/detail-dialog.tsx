"use client"

import React from "react"

import { Button } from "@/components/globals/atoms/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/globals/atoms/dialog"
import { ScrollArea } from "@/components/globals/atoms/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/globals/atoms/tabs"

import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import { useExercisesByWorkoutId } from "@/hooks/useExercise"
import { useWorkoutById } from "@/hooks/useWorkout"

import WorkoutDetailTabDialog from "./detail-tab-dialog"
import WorkoutExerciseTabDialog from "./exercise-tab-dialog"

interface WorkoutDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  workoutId: string | null
}

function WorkoutDetailDialog({
  isOpen,
  onClose,
  workoutId
}: WorkoutDetailDialogProps) {
  const {
    data: workoutData,
    isLoading: isWorkoutLoading,
    error: workoutError
  } = useWorkoutById(workoutId || "")

  const {
    data: exercisesData,
    isLoading: isExercisesLoading,
    error: exercisesError
  } = useExercisesByWorkoutId(workoutId || "")

  // console.log(JSON.stringify(exercisesData, null, 2));

  const isLoading = isWorkoutLoading || isExercisesLoading
  const hasError = workoutError || exercisesError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết bộ bài tập</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của bộ bài tập.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !workoutData ? (
          <ErrorDialog
            message={workoutError?.message || "Không thể tải dữ liệu."}
          />
        ) : (
          <Tabs defaultValue="workout-detail">
            <TabsList className="h-auto w-full rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="workout-detail"
                className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Thông tin
              </TabsTrigger>
              <TabsTrigger
                value="workout-exercises"
                className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Bài tập
              </TabsTrigger>
            </TabsList>

            <TabsContent value="workout-detail" className="mt-2 w-full">
              <WorkoutDetailTabDialog workoutData={workoutData} />
            </TabsContent>

            <TabsContent value="workout-exercises" className="mt-2 w-full">
              <ScrollArea className="h-[60vh] overflow-hidden">
                {exercisesData && (
                  <WorkoutExerciseTabDialog exercisesData={exercisesData} />
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default WorkoutDetailDialog
