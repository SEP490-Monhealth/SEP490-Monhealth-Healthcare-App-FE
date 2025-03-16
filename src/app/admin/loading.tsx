"use client"

import React from "react"

import { ClipLoader } from "react-spinners"

function LoadingPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <ClipLoader color="#0f172a" size={70} />
    </div>
  )
}

export default LoadingPage
