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
  consultantId: string | null
}

type AlertType = "verify" | "reject" | null

function ConsultantApplicationDetailDialog({
  isOpen,
  onClose,
  consultantId
}: ConsultantDetailDialogProps) {
  const [alertType, setAlertType] = useState<AlertType>(null)
  const [openAlert, setOpenAlert] = useState<boolean>(false)

  const { mutate: verifyConsultant, isPending: isVerifying } =
    useVerifyConsultant()
  const { mutate: rejectConsultant, isPending: isRejecting } =
    useRejectConsultant()

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

  const isProcessing = isVerifying || isRejecting

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

  const isLoading = isConsultantLoading || isCertificateLoading
  const hasError = consultantError || certificateError

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
                <ScrollArea className="h-[60vh] overflow-hidden">
                  <DetailTabDialog consultantData={consultantData} />
                </ScrollArea>
              </TabsContent>

              <TabsContent
                value="consultant-certificate"
                className="mt-2 w-full"
              >
                {currentCertificate && (
                  <ScrollArea className="h-[60vh] overflow-hidden">
                    <CertificateTabDialog
                      certificateData={currentCertificate}
                    />
                  </ScrollArea>
                )}
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <div className="flex w-full justify-between">
              <Button
                disabled={isProcessing}
                variant="outline"
                onClick={onClose}
              >
                Đóng
              </Button>

              {consultantData?.verificationStatus ===
                VerificationStatusEnum.Pending && (
                <div className="space-x-4">
                  <Button
                    disabled={isProcessing}
                    variant="destructive"
                    onClick={() => openConfirmDialog("reject")}
                  >
                    {isRejecting ? "Đang từ chối..." : "Từ chối"}
                  </Button>

                  <Button
                    disabled={isProcessing}
                    onClick={() => openConfirmDialog("verify")}
                  >
                    {isVerifying ? "Đang xác nhận..." : "Xác nhận"}
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
