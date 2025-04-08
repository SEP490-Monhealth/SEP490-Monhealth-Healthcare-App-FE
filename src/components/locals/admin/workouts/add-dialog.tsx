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
          <DialogTitle>Tạo bộ bài tập</DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin để tạo bộ bài tập mới.
          </DialogDescription>
        </DialogHeader>

        <div>ahihihaihia</div>

        <DialogFooter className="space-x-4">
          <Button variant="secondary" size="lg" onClick={onClose}>
            Hủy
          </Button>

          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading ? "Đang tạo..." : "Tạo bộ bài tập"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddWorkoutDialog
