"use client"

import React, { useState } from "react"

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

import ConfirmAlertDialog from "@/components/globals/molecules/confirm-alert-dialog"
import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import { ReportStatusEnum } from "@/constants/enum/Report"

import {
  useApproveReport,
  useRejectReport,
  useReportById
} from "@/hooks/useReport"

import BookingTabDialog from "./booking-tab-dialog"
import MemberTabDialog from "./member-tab-dialog"

interface ReportDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  reportId: string | null
}

function ReportDetailDialog({
  isOpen,
  onClose,
  reportId
}: ReportDetailDialogProps) {
  const {
    data: reportData,
    isLoading: isReportLoading,
    error: reportError
  } = useReportById(reportId || "")

  const { mutate: approveReport } = useApproveReport()
  const { mutate: rejectReport } = useRejectReport()

  const [openAlert, setOpenAlert] = useState<boolean>(false)

  const [typeAction, setTypeAction] = useState<"approve" | "reject">()

  const isLoading = isReportLoading
  const hasError = reportError

  const handleActionReport = (type: "approve" | "reject") => {
    setTypeAction(type)
    setOpenAlert(true)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const handleConfirm = async () => {
    if (typeAction === "approve") {
      await approveReport({
        reportId: reportData?.reportId || ""
      })
    } else {
      await rejectReport({
        reportId: reportData?.reportId || ""
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết báo cáo</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của báo cáo.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !reportData ? (
          <ErrorDialog
            message={reportError?.message || "Không thể tải dữ liệu."}
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
                value="booking-information"
                className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Lịch hẹn
              </TabsTrigger>
            </TabsList>

            <TabsContent value="user-information" className="mt-2 w-full">
              <ScrollArea className="h-[60vh] overflow-hidden pr-4">
                <MemberTabDialog reportData={reportData} />
              </ScrollArea>
            </TabsContent>

            <TabsContent value="booking-information" className="mt-2 w-full">
              <BookingTabDialog reportData={reportData} />
            </TabsContent>
          </Tabs>
        )}

        <DialogFooter>
          <div className="flex w-full items-end justify-between">
            <Button variant="outline" onClick={onClose}>
              Đóng
            </Button>

            {reportData?.status === ReportStatusEnum.Pending && (
              <div className="space-x-4">
                <Button
                  variant="destructive"
                  onClick={() => handleActionReport("reject")}
                >
                  Từ chối
                </Button>

                <Button
                  variant="default"
                  onClick={() => handleActionReport("approve")}
                >
                  Xác nhận
                </Button>
              </div>
            )}
          </div>
        </DialogFooter>
      </DialogContent>

      <ConfirmAlertDialog
        open={openAlert}
        onOpenChange={handleCloseAlert}
        onConfirm={handleConfirm}
        title={`${typeAction === "approve" ? "Xác nhận" : "Từ chối"} báo cáo`}
        description={`Bạn có chắc chắn muốn ${typeAction === "approve" ? "xác nhận" : "từ chối"}  báo cáo này?`}
      />
    </Dialog>
  )
}

export default ReportDetailDialog
