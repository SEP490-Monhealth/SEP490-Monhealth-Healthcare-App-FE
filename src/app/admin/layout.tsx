"use client"

import Sidebar from "@/components/globals/organisms/sidebar"

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen">
      <Sidebar />
      <div className="ml-72 flex flex-1 flex-col overflow-hidden p-6">
        {children}
      </div>
    </div>
  )
}

export default AdminLayout
