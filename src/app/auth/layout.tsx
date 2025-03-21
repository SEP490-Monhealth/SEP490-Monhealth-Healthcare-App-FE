"use client"

import React from "react"

function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-background">{children}</div>
}

export default AuthLayout
