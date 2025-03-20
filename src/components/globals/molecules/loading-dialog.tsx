"use client"

import React from "react"

import { ClipLoader } from "react-spinners"

function LoadingDialog() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ClipLoader color="#0f172a" size={50} />
    </div>
  )
}

export default LoadingDialog
