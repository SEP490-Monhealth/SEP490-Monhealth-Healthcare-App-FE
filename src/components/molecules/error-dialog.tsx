"use client"

import React from "react"

interface ErrorDialogProps {
  message: string
}

function ErrorDialog({ message }: ErrorDialogProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-sm text-red-600">{message}</p>
    </div>
  )
}

export default ErrorDialog
