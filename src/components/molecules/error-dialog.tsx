"use client"

import React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/atoms/dialog"

import { Button } from "../atoms/button"

interface ErrorDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
}

function ErrorDialog({
  isOpen,
  onClose,
  title,
  description
}: ErrorDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ErrorDialog
