"use client"

import React from "react"

import { ClipLoader } from "react-spinners"

function LoadingDialog() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ClipLoader color="var(--primary)" size={50} />
    </div>
  )
}

export default LoadingDialog
