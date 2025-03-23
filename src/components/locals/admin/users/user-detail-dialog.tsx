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
import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"
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

import { formatDate, formatPhoneNumber } from "@/utils/formatters"

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

  console.log("metricsData", JSON.stringify(metricsData, null, 2))
  console.log("goalsData", JSON.stringify(goalsData, null, 2))

  const currentMetric = metricsData?.[0]
  const currentGoal = goalsData?.[0]

  console.log("currentMetric", JSON.stringify(currentMetric, null, 2))
  console.log("currentGoal", JSON.stringify(currentMetric, null, 2))

  const isLoading = isUserLoading || isMetricLoading || isGoalsLoading
  const hasError = userError || metricError || goalsError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-h-[520px] min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết người dùng</DialogTitle>
          <DialogDescription>
            Xem và quản lý thông tin chi tiết của người dùng.
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
          <Tabs defaultValue="user-information">
            <TabsList className="h-auto w-full rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="user-information"
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
            <TabsContent value="user-information" className="w-full">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userId">Mã người dùng</Label>
                  <Input
                    id="userId"
                    type="text"
                    value={userData.userId}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={userData.fullName}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Số điện thoại</Label>
                  <Input
                    id="phoneNumber"
                    type="text"
                    value={formatPhoneNumber(userData.phoneNumber)}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Vai trò</Label>
                  <Input id="role" type="text" value={userData.role} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Input
                    id="status"
                    type="text"
                    value={userData.status ? "Hoạt động" : "Ngừng hoạt động"}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="createdAt">Ngày tạo</Label>
                  <Input
                    id="createdAt"
                    type="text"
                    value={formatDate(userData.createdAt)}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="createdBy">Người tạo</Label>
                  <Input
                    id="createdBy"
                    type="text"
                    value={userData.createdBy}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="updatedAt">Ngày cập nhật</Label>
                  <Input
                    id="updatedAt"
                    type="text"
                    value={formatDate(userData.updatedAt)}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="updatedBy">Người cập nhật</Label>
                  <Input
                    id="updatedBy"
                    type="text"
                    value={userData.updatedBy}
                    disabled
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="user-metric" className="w-full">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metricId">Mã sức khỏe</Label>
                  <Input
                    id="metricId"
                    type="text"
                    value={currentMetric?.metricId}
                    disabled
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="user-goal" className="w-full">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goalId">Mã mục tiêu</Label>
                  <Input
                    id="goalId"
                    type="text"
                    value={currentGoal?.goalId}
                    disabled
                  />
                </div>
              </div>
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
