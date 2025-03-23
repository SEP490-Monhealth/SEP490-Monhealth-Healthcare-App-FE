import {
  BarChart3,
  Bell,
  Calendar,
  CreditCard,
  Droplets,
  Dumbbell,
  LayoutDashboard,
  PieChart,
  ShoppingCart,
  Tag,
  UserCheck,
  Users,
  Utensils
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
  {
    title: "Thống kê & Báo cáo",
    path: "#",
    icon: BarChart3,
    children: [
      { title: "Tổng quan hệ thống", path: "/admin/analytics/overview" },
      { title: "Báo cáo doanh thu", path: "/admin/analytics/revenue" },
      { title: "Báo cáo người dùng", path: "/admin/analytics/users" },
      { title: "Báo cáo chuyên viên", path: "/admin/analytics/consultants" }
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
      { title: "Danh sách chuyên viên", path: "/admin/consultants" },
      { title: "Hồ sơ đăng ký", path: "/admin/consultants/applications" },
      { title: "Danh sách chuyên môn", path: "/admin/consultants/expertise" }
    ]
  },
  {
    title: "Lịch hẹn",
    path: "#",
    icon: Calendar,
    children: [
      { title: "Danh sách lịch hẹn", path: "/admin/bookings" }, // khi
      { title: "Lịch làm việc", path: "/admin/schedules" }, // khi
      { title: "Ngoại lệ lịch", path: "/admin/schedules/exceptions" } // khi
    ]
  },
  {
    title: "Dinh dưỡng",
    path: "#",
    icon: Utensils,
    children: [
      { title: "Danh sách món ăn", path: "/admin/foods" },
      { title: "Khẩu phần ăn", path: "/admin/foods/portions" }
    ]
  },
  {
    title: "Luyện tập thể chất",
    path: "#",
    icon: Dumbbell,
    children: [
      { title: "Danh sách bộ bài tập", path: "/admin/workouts" }, // khi
      { title: "Danh sách bài tập", path: "/admin/exercises" } // khi
    ]
  },
  {
    title: "Nước uống",
    path: "/admin/water-reminders",
    icon: Droplets,
    children: []
  },
  {
    title: "Gói đăng ký",
    path: "#",
    icon: ShoppingCart,
    children: [
      { title: "Danh sách gói đăng ký", path: "/admin/subscriptions" },
      { title: "Thống kê đăng ký", path: "/admin/subscriptions/statistics" }
    ]
  },
  {
    title: "Thanh toán",
    path: "#",
    icon: CreditCard,
    children: [
      { title: "Danh sách giao dịch", path: "/admin/payments" }, // khi
      { title: "Ví chuyên viên", path: "/admin/wallets" }, // khi
      { title: "Lịch sử giao dịch", path: "/admin/transactions" }, // khi
      { title: "Thống kê doanh thu", path: "/admin/payments/statistics" }
    ]
  },
  {
    title: "Đánh giá", // khi
    path: "/admin/reviews",
    icon: PieChart,
    children: []
  },
  {
    title: "Thông báo", // khi
    path: "/admin/notifications",
    icon: Bell,
    children: []
  },
  {
    title: "Danh mục & Tiêu chí",
    path: "#",
    icon: Tag,
    children: [
      { title: "Danh sách danh mục", path: "/admin/categories" }, // khi
      { title: "Danh sách dị ứng", path: "/admin/allergies" } // khi
    ]
  }
]
