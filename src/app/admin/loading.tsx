"use client"

import React from "react"

import { ClipLoader } from "react-spinners"

function LoadingPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ClipLoader color="var(--primary)" size={70} />
    </div>
  )
}

export default LoadingPage
