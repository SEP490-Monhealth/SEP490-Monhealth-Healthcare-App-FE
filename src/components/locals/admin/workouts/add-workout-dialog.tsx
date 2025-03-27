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

interface AddWorkoutDialogProps {
  isOpen: boolean
  onClose: () => void
}

function AddWorkoutDialog({ isOpen, onClose }: AddWorkoutDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Tạo bài tập</DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin để tạo bài tập mới.
          </DialogDescription>
        </DialogHeader>

        <div>ahihi</div>

        <DialogFooter className="mt-6 gap-4">
          <Button variant="secondary" size="lg" onClick={onClose}>
            Hủy
          </Button>

          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading ? "Đang tạo..." : "Tạo bài tập"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddWorkoutDialog
