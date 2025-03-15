/**
 * Định dạng số theo chuẩn Việt Nam với số chữ số thập phân tùy chọn.
 * @param value - Giá trị số cần định dạng.
 * @param decimalPlaces - Số chữ số thập phân (mặc định là 0).
 * @returns Chuỗi số đã được định dạng.
 *
 * @example
 * formatNumber(1234567.89) => "1.234.568"
 * formatNumber(1234567.89, 2) => "1.234.567,89"
 */
export function formatNumber(value: number, decimalPlaces = 0): string {
  return new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  }).format(value)
}

/**
 * Định dạng số tiền theo chuẩn Việt Nam nhưng không có ký hiệu "₫".
 * @param value - Số tiền cần định dạng.
 * @returns Chuỗi số tiền đã được định dạng.
 *
 * @example
 * formatCurrency(1000000) => "1.000.000"
 * formatCurrency(12345678) => "12.345.678"
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

/**
 * Định dạng ngày theo định dạng "dd/mm/yyyy".
 * @param date - Ngày cần định dạng (có thể là đối tượng Date hoặc chuỗi ngày).
 * @returns Chuỗi ngày đã được định dạng.
 *
 * @example
 * formatDate("2024-03-15") => "15/03/2024"
 * formatDate(new Date(2024, 2, 15)) => "15/03/2024"
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0") // Tháng tính từ 0
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

/**
 * Định dạng số điện thoại Việt Nam theo chuẩn "XXXX XXX XXX".
 * @param phone - Chuỗi số điện thoại (có thể chứa ký tự không phải số).
 * @returns Chuỗi số điện thoại đã được định dạng.
 *
 * @example
 * formatPhoneNumber("0987654321") => "0987 654 321"
 * formatPhoneNumber("+84 907123456") => "0907 123 456"
 */
export function formatPhoneNumber(phone: string): string {
  phone = phone.replace(/\D/g, "") // Loại bỏ tất cả ký tự không phải số
  if (phone.length === 10) {
    return `${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}`
  } else if (phone.length === 11) {
    return `${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}`
  }
  return phone
}

/**
 * Chuyển đổi chuỗi thành dạng viết hoa chữ cái đầu mỗi từ (Title Case).
 * @param str - Chuỗi cần chuyển đổi.
 * @returns Chuỗi với mỗi từ có chữ cái đầu viết hoa.
 *
 * @example
 * toTitleCase("nguyễn văn a") => "Nguyễn Văn A"
 * toTitleCase("hà nội thủ đô") => "Hà Nội Thủ Đô"
 */
export function toTitleCase(str: string): string {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
}
