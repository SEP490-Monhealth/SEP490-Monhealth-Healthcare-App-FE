import {
  Dot,
  LayoutDashboard,
  MessageCircle,
  Package,
  Settings,
  ShoppingCart,
  Users
} from "lucide-react"

interface SidebarItem {
  title: string
  path: string
  icon?: React.ElementType
  children?: SidebarItem[]
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
    children: []
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: Users,
    children: []
  },
  {
    title: "Consultants",
    path: "/admin/consultants",
    icon: Users,
    children: []
  }
]
