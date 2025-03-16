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
    path: "#",
    icon: Users,
    children: [
      { title: "Danh sách người dùng", path: "/admin/users" },
      { title: "Thêm người dùng", path: "/admin/users/add" }
    ]
  },
  {
    title: "Chuyên viên",
    path: "#",
    icon: UserCheck,
    children: [
      { title: "Danh sách chuyên viên", path: "/admin/consultants" },
      { title: "Hồ sơ đăng ký", path: "/admin/consultants/applications" },
      { title: "Danh sách chuyên môn", path: "/admin/consultants/expertise" },
      { title: "Xét duyệt chứng chỉ", path: "/admin/consultants/certificates" }
    ]
  },
  {
    title: "Lịch hẹn",
    path: "#",
    icon: Calendar,
    children: [
      { title: "Danh sách lịch hẹn", path: "/admin/bookings" },
      { title: "Lịch làm việc", path: "/admin/schedules" },
      { title: "Khung giờ", path: "/admin/time-slots" },
      { title: "Ngoại lệ lịch", path: "/admin/schedules/exceptions" }
    ]
  },
  {
    title: "Dinh dưỡng",
    path: "#",
    icon: Utensils,
    children: [
      { title: "Danh sách thực phẩm", path: "/admin/foods" },
      { title: "Thêm thực phẩm", path: "/admin/foods/add" },
      { title: "Giá trị dinh dưỡng", path: "/admin/foods/nutrition" },
      { title: "Khẩu phần ăn", path: "/admin/foods/portions" }
    ]
  },
  {
    title: "Luyện tập thể chất",
    path: "#",
    icon: Dumbbell,
    children: [
      { title: "Danh sách bộ bài tập", path: "/admin/workouts" },
      { title: "Thêm bộ bài tập", path: "/admin/workouts/add" },
      { title: "Danh sách bài tập", path: "/admin/exercises" },
      { title: "Thêm bài tập", path: "/admin/exercises/add" }
    ]
  },
  {
    title: "Nước uống",
    path: "#",
    icon: Droplets,
    children: [
      { title: "Nhắc nhở uống nước", path: "/admin/water-reminders" },
      { title: "Thêm nhắc nhở", path: "/admin/water-reminders/add" }
    ]
  },
  {
    title: "Gói đăng ký",
    path: "#",
    icon: ShoppingCart,
    children: [
      { title: "Danh sách gói đăng ký", path: "/admin/subscriptions" },
      { title: "Thêm gói đăng ký", path: "/admin/subscriptions/add" },
      { title: "Thống kê đăng ký", path: "/admin/subscriptions/statistics" }
    ]
  },
  {
    title: "Thanh toán",
    path: "#",
    icon: CreditCard,
    children: [
      { title: "Danh sách giao dịch", path: "/admin/payments" },
      { title: "Ví chuyên viên", path: "/admin/wallets" },
      { title: "Lịch sử giao dịch", path: "/admin/transactions" },
      { title: "Thống kê doanh thu", path: "/admin/payments/statistics" }
    ]
  },
  {
    title: "Đánh giá & Phản hồi",
    path: "/admin/reviews",
    icon: PieChart,
    children: []
  },
  {
    title: "Thông báo",
    path: "#",
    icon: Bell,
    children: [
      { title: "Danh sách thông báo", path: "/admin/notifications" },
      { title: "Tạo thông báo", path: "/admin/notifications/create" }
    ]
  },
  {
    title: "Danh mục & Tiêu chí",
    path: "#",
    icon: Tag,
    children: [
      { title: "Danh sách danh mục", path: "/admin/categories" },
      { title: "Danh sách dị ứng", path: "/admin/allergies" }
    ]
  }
]
