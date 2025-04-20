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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/globals/atoms/tabs"

import ConfirmAlertDialog from "@/components/globals/molecules/confirm-alert-dialog"
import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import { useCertificateByConsultantId } from "@/hooks/useCertificate"
import {
  useConsultantById,
  useRejectConsultant,
  useVerifyConsultant
} from "@/hooks/useConsultant"

import CertificateTabDialog from "./certificate-tab-dialog"
import DetailTabDialog from "./detail-tab-dialog"

interface ConsultantDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  consultantId: string | null
}

type AlertType = "verify" | "reject" | null

function UserDetailDialog({
  isOpen,
  onClose,
  consultantId
}: ConsultantDetailDialogProps) {
  const {
    data: userData,
    isLoading: isConsultantLoading,
    error: userError
  } = useConsultantById(consultantId || "")

  const {
    data: certificateData,
    isLoading: isCertificateLoading,
    error: certificateError
  } = useCertificateByConsultantId(consultantId || "")

  const currentCertificate = certificateData?.[0]

  const isLoading = isConsultantLoading || isCertificateLoading
  const hasError = userError || certificateError

  const { mutate: verifyConsultant } = useVerifyConsultant()
  const { mutate: rejectConsultant } = useRejectConsultant()

  const [alertType, setAlertType] = useState<AlertType>(null)
  const [openAlert, setOpenAlert] = useState<boolean>(false)

  const openConfirmDialog = (type: AlertType) => {
    setAlertType(type)
    setOpenAlert(true)
  }

  const handleCloseAlert = () => {
    setAlertType(null)
    setOpenAlert(false)
  }

  const handleConfirm = () => {
    if (!consultantId || !alertType) return
    if (alertType === "verify") {
      verifyConsultant(
        { consultantId },
        {
          onSuccess: () => {
            onClose()
          },
          onError: (error) => {
            console.error("Error verifying consultant:", error)
          }
        }
      )
    } else if (alertType === "reject") {
      rejectConsultant(
        { consultantId },
        {
          onSuccess: () => {
            onClose()
          },
          onError: (error) => {
            console.error("Error rejecting consultant:", error)
          }
        }
      )
    }
    handleCloseAlert()
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="min-w-[700px]">
          <DialogHeader>
            <DialogTitle>Chi tiết chuyên viên</DialogTitle>
            <DialogDescription>
              Xem thông tin chi tiết của chuyên viên.
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <LoadingDialog />
          ) : hasError || !userData ? (
            <ErrorDialog
              message={
                (userError || certificateError)?.message ||
                "Không thể tải dữ liệu."
              }
            />
          ) : (
            <Tabs defaultValue="consultant-detail">
              <TabsList className="h-auto w-full rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="consultant-detail"
                  className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Thông tin
                </TabsTrigger>
                <TabsTrigger
                  value="consultant-certificate"
                  className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Chứng chỉ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="consultant-detail" className="mt-2 w-full">
                <DetailTabDialog consultantData={userData} />
              </TabsContent>

              <TabsContent
                value="consultant-certificate"
                className="mt-2 w-full"
              >
                {currentCertificate && (
                  <CertificateTabDialog certificateData={currentCertificate} />
                )}
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <div className="flex w-full justify-between">
              <Button variant="outline" onClick={onClose}>
                Đóng
              </Button>

              <div className="space-x-4">
                <Button
                  variant="destructive"
                  onClick={() => openConfirmDialog("reject")}
                >
                  Từ chối
                </Button>

                <Button onClick={() => openConfirmDialog("verify")}>
                  Xác nhận
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ConfirmAlertDialog
        open={openAlert}
        onOpenChange={handleCloseAlert}
        onConfirm={handleConfirm}
        title={
          alertType === "verify"
            ? "Xác nhận chấp nhận chuyên viên"
            : "Xác nhận từ chối chuyên viên"
        }
        description={
          alertType === "verify"
            ? "Bạn có chắc chắn muốn xác nhận chuyên viên này không?"
            : "Bạn có chắc chắn muốn từ chối chuyên viên này không?"
        }
      />
    </>
  )
}

export default UserDetailDialog
