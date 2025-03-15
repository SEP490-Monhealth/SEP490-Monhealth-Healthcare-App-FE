"use client"

import React from "react"

import { ClipLoader } from "react-spinners"

function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ClipLoader color="#0d53bb" size={70} />
    </div>
  )
}

export default LoadingPage
