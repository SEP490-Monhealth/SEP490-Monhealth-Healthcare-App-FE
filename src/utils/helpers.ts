/**
 * Lấy ra các ký tự đầu tiên từ một chuỗi tên.
 * @param name - Chuỗi tên cần lấy ký tự đầu tiên.
 * @returns Chuỗi ký tự đầu tiên (viết hoa).
 *
 * @example
 * getInitials("Nguyen Van A") => "NA"
 * getInitials("John") => "J"
 * getInitials("") => ""
 */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/)
  const initials = words.slice(0, 2).map((word) => word.charAt(0).toUpperCase())

  return initials.join("")
}

/**
 * Làm tròn một số đến một số chữ số thập phân xác định.
 * @param value - Số cần làm tròn.
 * @param decimals - Số chữ số thập phân muốn làm tròn (mặc định là 0).
 * @returns Số đã được làm tròn.
 *
 * @example
 * roundNumber(3.14159, 2) => 3.14
 * roundNumber(3.14159) => 3
 * roundNumber(123.456, 0) => 123
 */
export function roundNumber(value: number, decimals = 0): number {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/**
 *
 * @param param
 * @returns
 */
export function parseBooleanParam(param: string): boolean | undefined {
  if (param === "") return undefined
  return param === "true"
}

/**
 * Hàm trả về chuỗi các tháng liên tiếp tính từ 5 tháng trước đến tháng hiện tại.
 *
 * Ví dụ:
 * Nếu hiện tại là tháng 4 năm 2025 => Kết quả: "Tháng 11 - Tháng 4 năm 2025"
 * Nếu hiện tại là tháng 7 năm 2025 => Kết quả: "Tháng 2 - Tháng 7 năm 2025"
 */

export const getRangeOfLastSixMonths = () => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() // 0-based (0 = Jan)
  const currentYear = currentDate.getFullYear()

  const startDate = new Date(currentYear, currentMonth - 5)
  const startMonth = startDate.getMonth() // 0-based
  const startYear = startDate.getFullYear()

  const startLabel = `Tháng ${startMonth + 1}`
  const endLabel = `Tháng ${currentMonth + 1} năm ${currentYear}`

  if (startYear !== currentYear) {
    return `${startLabel} năm ${startYear} - ${endLabel}`
  }

  return `${startLabel} - ${endLabel}`
}

/**
 * Tính tỷ lệ tăng trưởng của tháng hiện tại dựa trên dữ liệu người dùng.
 * @param data - Mảng dữ liệu người dùng theo tháng.
 * @returns Chuỗi hiển thị tỷ lệ tăng trưởng của tháng hiện tại.
 *
 * @example
 * // Nếu tháng hiện tại là Tháng 4:
 * calculateGrowthRate(countUsers) => "Tăng trưởng -69.2% trong tháng này"
 */
export const calculateGrowthRate = (
  data: { month: string; count: number }[]
): string => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1

  const currentMonthData = data.find(
    (item) => item.month === `Tháng ${currentMonth}`
  )
  const previousMonthData = data.find(
    (item) => item.month === `Tháng ${currentMonth - 1}`
  )

  if (!currentMonthData || !previousMonthData) {
    return "Không có dữ liệu để tính tỷ lệ tăng trưởng"
  }

  const growthRate =
    ((currentMonthData.count - previousMonthData.count) /
      previousMonthData.count) *
    100

  const formattedGrowthRate = growthRate.toFixed(1)

  return `Tăng trưởng ${formattedGrowthRate}% trong tháng này`
}

// Định nghĩa kiểu dữ liệu cho từng phần tử trong mảng
interface UserCount {
  month: string // Chuỗi tháng (ví dụ: "2024-11")
  count: number // Số lượng người dùng
}

// Định nghĩa kiểu dữ liệu cho kết quả sau khi chuyển đổi
interface TransformedUserCount {
  month: string // Chuỗi tháng sau khi chuyển đổi (ví dụ: "Tháng 11")
  count: number // Số lượng người dùng
}

// Hàm chuyển đổi dữ liệu
export const transformUserData = (
  data: UserCount[]
): TransformedUserCount[] => {
  return data.map((item) => {
    const monthNumber = item.month.split("-")[1]
    return {
      month: `Tháng ${parseInt(monthNumber, 10)}`,
      count: item.count
    }
  })
}

// Kiểu dữ liệu cho phần tử đầu vào
interface InputData {
  subscription: string // Tên gói
  visitors: number // Số lượng khách truy cập
}

// Kiểu dữ liệu cho phần tử đầu ra
interface OutputData extends InputData {
  fill: string // Màu sắc (thêm thuộc tính fill)
}

export const transformSubscriptionData = (data: InputData[]): OutputData[] => {
  // Định nghĩa màu sắc tương ứng cho từng loại subscription
  const colorMapping: Record<string, string> = {
    "Gói cơ bản": "var(--secondary)",
    "Gói nâng cao": "var(--sidebar-ring)",
    "Gói cao cấp": "var(--primary)"
  }

  // Sử dụng map để thêm thuộc tính fill vào từng phần tử
  return data.map((item) => ({
    ...item, // Giữ nguyên các thuộc tính cũ
    fill: colorMapping[item.subscription] // Thêm thuộc tính fill dựa trên subscription
  }))
}

/**
 * Hàm định dạng tỷ lệ tăng trưởng để hiển thị dấu "+" nếu giá trị là số dương.
 *
 * Ví dụ:
 *  - rate = 10   => "+10% so với tháng trước"
 *  - rate = -5   => "-5% so với tháng trước"
 *  - rate = 0    => "0% so với tháng trước"
 *
 * @param rate - Tỷ lệ tăng trưởng (số âm hoặc dương)
 * @returns Chuỗi đã định dạng kèm phần trăm và nội dung mô tả
 */
export const formatGrowthRate = (rate: number) => {
  const formattedRate = rate.toFixed(2) // Format to 2 decimal places
  return `${rate > 0 ? "+" : ""}${formattedRate}% so với tháng trước`
}

/**
 * Hàm định dạng số từ dạng nguyên (number) thành chuỗi có dấu phân cách hàng nghìn.
 * Ví dụ: 50000 -> "50.000"
 *
 * @param value - Số cần định dạng (kiểu number).
 * @returns Chuỗi số đã được định dạng (kiểu string).
 */
export const formatNumberCustom = (value: number): string => {
  // Chuyển số thành chuỗi và sử dụng regex để thêm dấu phân cách hàng nghìn
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
