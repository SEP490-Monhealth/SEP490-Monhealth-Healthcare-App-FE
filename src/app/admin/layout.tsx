"use client"

import { useEffect, useState } from "react"

import Sidebar from "@/components/globals/organisms/sidebar"

function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

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
        className={`flex flex-1 flex-col overflow-hidden p-6 transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-72"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default AdminLayout
