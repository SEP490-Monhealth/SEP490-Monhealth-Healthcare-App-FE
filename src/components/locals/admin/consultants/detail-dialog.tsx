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

import { useCertificateByConsultantId } from "@/hooks/useCertificate"
import { useConsultantById } from "@/hooks/useConsultant"

import CertificateTabDialog from "./certificate-tab-dialog"
import ConsultantDetailTabDialog from "./detail-tab-dialog"

interface ConsultantDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  consultantId: string | null
}

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

  return (
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
              <ScrollArea className="h-[60vh] overflow-hidden pr-4">
                <ConsultantDetailTabDialog consultantData={userData} />
              </ScrollArea>
            </TabsContent>

            <TabsContent value="consultant-certificate" className="mt-2 w-full">
              {currentCertificate && (
                <CertificateTabDialog certificateData={currentCertificate} />
              )}
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
