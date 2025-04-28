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

import { VerificationStatusEnum } from "@/constants/enum/Consultant"

import { useCertificateByConsultantId } from "@/hooks/useCertificate"
import {
  useConsultantById,
  useRejectConsultant,
  useVerifyConsultant
} from "@/hooks/useConsultant"

import CertificateTabDialog from "../certificate-tab-dialog"
import DetailTabDialog from "./detail-tab-dialog"

interface ConsultantDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  consultantId: string | undefined
}

type AlertType = "verify" | "reject" | null

function ConsultantApplicationDetailDialog({
  isOpen,
  onClose,
  consultantId
}: ConsultantDetailDialogProps) {
  const {
    data: consultantData,
    isLoading: isConsultantLoading,
    error: consultantError
  } = useConsultantById(consultantId || "")

  const {
    data: certificateData,
    isLoading: isCertificateLoading,
    error: certificateError
  } = useCertificateByConsultantId(consultantId || "")

  const currentCertificate = certificateData?.[0]

  const isLoading = isConsultantLoading || isCertificateLoading
  const hasError = consultantError || certificateError

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
          }
        }
      )
    } else if (alertType === "reject") {
      rejectConsultant(
        { consultantId },
        {
          onSuccess: () => {
            onClose()
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
          ) : hasError || !consultantData ? (
            <ErrorDialog
              message={
                (consultantError || certificateError)?.message ||
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
                <ScrollArea className="h-[60vh] overflow-hidden pr-4">
                  <DetailTabDialog consultantData={consultantData} />
                </ScrollArea>
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

              {consultantData?.verificationStatus ===
                VerificationStatusEnum.Pending && (
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
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmAlertDialog
        open={openAlert}
        onOpenChange={handleCloseAlert}
        onConfirm={handleConfirm}
        title={`${alertType === "verify" ? "Xác nhận" : "Từ chối"} chuyên viên`}
        description={`Bạn có chắc chắn muốn ${alertType === "verify" ? "Xác nhận" : "Từ chối"} chuyên viên này?`}
      />
    </>
  )
}

export default ConsultantApplicationDetailDialog
