"use client"

import React, { useEffect, useState } from "react"

import Sidebar from "@/components/globals/organisms/sidebar"
import Topbar from "@/components/globals/organisms/topbar"

function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const handleSidebarToggle = (e: CustomEvent) => {
      setIsCollapsed(e.detail.isCollapsed)
    }

    window.addEventListener(
      "sidebarToggle",
      handleSidebarToggle as EventListener
    )

    return () => {
      window.removeEventListener(
        "sidebarToggle",
        handleSidebarToggle as EventListener
      )
    }
  }, [])

  return (
    <div className="relative flex min-h-screen">
      <Sidebar onToggleCollapse={setIsCollapsed} />

      <div
        className={`w-full overflow-hidden transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-72"
        }`}
      >
        <Topbar />

        <div className="bg-background min-h-[calc(100%-64px)] p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
