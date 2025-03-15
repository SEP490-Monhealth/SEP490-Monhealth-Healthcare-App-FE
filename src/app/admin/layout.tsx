"use client"

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen">
      <Sidebar />
      <div className="bg-background flex flex-col px-4 py-6">{children}</div>
    </div>
  )
}

export default AdminLayout
