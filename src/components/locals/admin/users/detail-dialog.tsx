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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/globals/atoms/tabs"

import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import { useGoalsByUserId } from "@/hooks/useGoal"
import { useMetricsByUserId } from "@/hooks/useMetric"
import { useUserById } from "@/hooks/useUser"

import UserDetailTabDialog from "./detail-tab-dialog"
import UserGoalTabDialog from "./goal-tab-dialog"
import UserMetricTabDialog from "./metric-tab-dialog"

interface UserDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  userId: string | null
}

function UserDetailDialog({ isOpen, onClose, userId }: UserDetailDialogProps) {
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError
  } = useUserById(userId || "")

  const {
    data: metricsData,
    isLoading: isMetricLoading,
    error: metricError
  } = useMetricsByUserId(userId || "")

  const {
    data: goalsData,
    isLoading: isGoalsLoading,
    error: goalsError
  } = useGoalsByUserId(userId || "")

  const currentMetric = metricsData?.[0]
  const currentGoal = goalsData?.[0]

  const isLoading = isUserLoading || isMetricLoading || isGoalsLoading
  const hasError = userError || metricError || goalsError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết người dùng</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của người dùng.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !userData ? (
          <ErrorDialog
            message={
              (userError || metricError || goalsError)?.message ||
              "Không thể tải dữ liệu."
            }
          />
        ) : (
          <Tabs defaultValue="user-detail">
            <TabsList className="h-auto w-full rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="user-detail"
                className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Thông tin
              </TabsTrigger>
              <TabsTrigger
                value="user-metric"
                className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Sức khỏe
              </TabsTrigger>
              <TabsTrigger
                value="user-goal"
                className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Mục tiêu
              </TabsTrigger>
            </TabsList>
            <TabsContent value="user-detail" className="w-full">
              <UserDetailTabDialog userData={userData} />
            </TabsContent>

            <TabsContent value="user-metric" className="w-full">
              {currentMetric && (
                <UserMetricTabDialog metricData={currentMetric} />
              )}
            </TabsContent>

            <TabsContent value="user-goal" className="w-full">
              {currentGoal && <UserGoalTabDialog goalData={currentGoal} />}
            </TabsContent>
          </Tabs>
        )}

        <DialogFooter>
          <Button onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UserDetailDialog
