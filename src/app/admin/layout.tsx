"use client"

import { useEffect, useState } from "react"

import Sidebar from "@/components/organisms/sidebar"
import Topbar from "@/components/organisms/topbar"

function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const handleSidebarToggle = (e: CustomEvent) => {
      setIsCollapsed(e.detail.isCollapsed)
    }

    window.addEventListener(
      "sidebarToggle" as any,
      handleSidebarToggle as EventListener
    )

    return () => {
      window.removeEventListener(
        "sidebarToggle" as any,
        handleSidebarToggle as EventListener
      )
    }
  }, [])

  return (
    <div className="relative flex min-h-screen">
      <Sidebar onToggleCollapse={setIsCollapsed} />

      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-72"
        }`}
      >
        <Topbar />

        <div className="min-h-[calc(100%-64px)] flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
