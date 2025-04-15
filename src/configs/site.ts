import {
  BarChart3,
  Bell,
  Calendar,
  CreditCard,
  Dumbbell,
  Ham,
  LayoutDashboard,
  MessageCircle,
  PieChart,
  ShoppingCart,
  Tag,
  UserCheck,
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
    title: "Bảng điều khiển",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
    children: []
  },
  // {
  //   title: "Nhắn tin",
  //   path: "#",
  //   icon: MessageCircle,
  //   children: [
  //     { title: "Chatbox", path: "/admin/chats" },
  //     { title: "Mon AI", path: "/admin/chats/mon-ai" }
  //   ]
  // },
  {
    title: "Thống kê & Báo cáo",
    path: "#",
    icon: BarChart3,
    children: [
      { title: "Tổng quan", path: "/admin/analytics/overview" },
      { title: "Người dùng", path: "/admin/analytics/users" },
      { title: "Gói đăng ký", path: "/admin/analytics/subscriptions" },
      { title: "Chuyên viên", path: "/admin/analytics/activities" }
    ]
  },
  {
    title: "Người dùng",
    path: "/admin/users",
    icon: Users,
    children: []
  },
  {
    title: "Chuyên viên",
    path: "#",
    icon: UserCheck,
    children: [
      { title: "Chuyên môn", path: "/admin/consultants/expertise" },
      { title: "Chuyên viên", path: "/admin/consultants" },
      { title: "Hồ sơ đăng ký", path: "/admin/consultants/applications" },
      { title: "Thông tin thanh toán", path: "/admin/consultants/banks" }
    ]
  },
  {
    title: "Lịch hẹn",
    path: "#",
    icon: Calendar,
    children: [
      { title: "Lịch hẹn", path: "/admin/bookings" },
      { title: "Lịch nghỉ", path: "/admin/schedules/exceptions" }
    ]
  },
  {
    title: "Thực phẩm",
    path: "/admin/foods",
    icon: Ham,
    children: []
  },
  {
    title: "Luyện tập thể chất",
    path: "#",
    icon: Dumbbell,
    children: [
      { title: "Bộ bài tập", path: "/admin/workouts" },
      { title: "Bài tập", path: "/admin/exercises" }
    ]
  },
  // {
  //   title: "Nước uống",
  //   path: "/admin/water-reminders",
  //   icon: Droplets,
  //   children: []
  // },
  {
    title: "Gói đăng ký",
    path: "#",
    icon: ShoppingCart,
    children: [
      { title: "Gói đăng ký", path: "/admin/subscriptions" },
      { title: "Lịch sử đăng ký gói", path: "/admin/user-subscriptions" }
    ]
  },
  {
    title: "Thanh toán",
    path: "#",
    icon: CreditCard,
    children: [
      { title: "Thanh toán", path: "/admin/payments" },
      { title: "Giao dịch", path: "/admin/transactions" },
      { title: "Yêu cầu rút tiền", path: "/admin/withdrawal-requests" }
    ]
  },
  {
    title: "Đánh giá",
    path: "/admin/reviews",
    icon: PieChart,
    children: []
  },
  {
    title: "Thông báo",
    path: "/admin/notifications",
    icon: Bell,
    children: []
  },
  {
    title: "Phân loại",
    path: "#",
    icon: Tag,
    children: [
      { title: "Danh mục", path: "/admin/categories" },
      { title: "Dị ứng", path: "/admin/allergies" }
    ]
  }
]
