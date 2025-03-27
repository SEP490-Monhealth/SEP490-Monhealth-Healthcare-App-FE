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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/globals/atoms/tabs"

import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import { useWorkoutById } from "@/hooks/useWorkout"

import WorkoutDetailTabDialog from "./workout-detail-tab-dialog"

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

  const isLoading = isWorkoutLoading
  const hasError = workoutError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết bài tập</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của bài tập.
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
                value="workout-exercise"
                className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Bài tập
              </TabsTrigger>
            </TabsList>
            <TabsContent value="workout-detail" className="w-full">
              <WorkoutDetailTabDialog workoutData={workoutData} />
            </TabsContent>

            <TabsContent
              value="workout-exercise"
              className="w-full"
            ></TabsContent>
          </Tabs>
        )}

        <DialogFooter>
          <Button onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default WorkoutDetailDialog
