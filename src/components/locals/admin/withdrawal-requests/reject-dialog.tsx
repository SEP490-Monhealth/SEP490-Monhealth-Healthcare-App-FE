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
import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"

interface RejectDialogProps {
  isOpen: boolean
  onClose: () => void
  onReject: (reason: string) => void
  isSubmitting?: boolean
}

function RejectDialog({
  isOpen,
  onClose,
  onReject,
  isSubmitting = false
}: RejectDialogProps) {
  const [rejectReason, setRejectReason] = useState<string>("")

  const handleReject = () => {
    onReject(rejectReason)
    setRejectReason("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Từ chối yêu cầu</DialogTitle>
          <DialogDescription>
            Vui lòng cung cấp lý do từ chối yêu cầu.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rejectReason">Lý do từ chối</Label>
            <Input
              id="rejectReason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Nhập lý do từ chối yêu cầu"
            />
          </div>
        </div>

        <DialogFooter>
          <Button disabled={isSubmitting} variant="outline" onClick={onClose}>
            Huỷ
          </Button>

          <Button disabled={isSubmitting} onClick={handleReject}>
            {isSubmitting ? "Đang xác nhận..." : "Xác nhận"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RejectDialog
