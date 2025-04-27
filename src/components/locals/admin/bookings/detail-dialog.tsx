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

import { BookingStatusEnum } from "@/constants/enum/Booking"

import { useBookingById } from "@/hooks/useBooking"

import BookingTabDialog from "./booking-tab-dialog"
import EvidenceDialogTab from "./evidence-tab-dialog"

interface BookingDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  bookingId: string | null
}

function BookingDetailDialog({
  isOpen,
  onClose,
  bookingId
}: BookingDetailDialogProps) {
  const {
    data: bookingData,
    isLoading: isBookingLoading,
    error: bookingError
  } = useBookingById(bookingId || "")

  const isLoading = isBookingLoading
  const hasError = bookingError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết lịch hẹn</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của lịch hẹn.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !bookingData ? (
          <ErrorDialog
            message={bookingError?.message || "Không thể tải dữ liệu."}
          />
        ) : (
          <Tabs defaultValue="booking-information">
            <TabsList className="h-auto w-full rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="booking-information"
                className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Thông tin
              </TabsTrigger>

              {bookingData.status === BookingStatusEnum.Completed && (
                <TabsTrigger
                  value="evidence-information"
                  className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Hình ảnh
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="booking-information" className="mt-2 w-full">
              <ScrollArea className="h-[60vh] overflow-hidden pr-4">
                <BookingTabDialog bookingData={bookingData} />
              </ScrollArea>
            </TabsContent>
            {bookingData.status === BookingStatusEnum.Completed && (
              <TabsContent value="evidence-information" className="mt-2 w-full">
                <ScrollArea className="h-[60vh] overflow-hidden pr-4">
                  <EvidenceDialogTab bookingData={bookingData} />
                </ScrollArea>
              </TabsContent>
            )}
          </Tabs>
        )}

        <DialogFooter>
          <Button onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookingDetailDialog
