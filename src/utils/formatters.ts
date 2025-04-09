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
  if (!date) return ""

  const d = typeof date === "string" ? new Date(date) : date
  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

/**
 * Định dạng thời gian theo định dạng "XhY".
 * @param time - Chuỗi thời gian cần định dạng (định dạng "HH:mm:ss").
 * @returns Chuỗi thời gian đã được định dạng.
 *
 * @example
 * formatTime("08:30:00") => "8h30"
 * formatTime("08:00:00") => "8h00"
 */
export function formatTime(time: string): string {
  if (!time) return ""

  const [hours, minutes] = time.split(":")
  return `${parseInt(hours, 10)}h${minutes}`
}

/**
 * Định dạng ngày giờ theo định dạng "dd/mm/yyyy HH:mm:ss".
 * @param dateTime - Ngày giờ cần định dạng (có thể là đối tượng Date hoặc chuỗi ngày).
 * @returns Chuỗi ngày giờ đã được định dạng.
 *
 * @example
 * formatDateTime("2024-03-15T14:30:00") => "15/03/2024 14:30:00"
 * formatDateTime(new Date(2024, 2, 15, 14, 30, 0)) => "15/03/2024 14:30:00"
 */
export function formatDateTime(dateTime: Date | string): string {
  if (!dateTime) return ""

  const d = typeof dateTime === "string" ? new Date(dateTime) : dateTime
  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year = d.getFullYear()
  const hours = String(d.getHours()).padStart(2, "0")
  const minutes = String(d.getMinutes()).padStart(2, "0")
  const seconds = String(d.getSeconds()).padStart(2, "0")

  return `${hours}:${minutes}:${seconds}, ${day}/${month}/${year}`
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
  if (!phone) return ""

  phone = phone.replace(/\D/g, "")
  if (phone.length === 10) {
    return `${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}`
  } else if (phone.length === 11) {
    return `${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}`
  }
  return phone
}

/**
 * Định dạng ngày giờ theo định dạng "HH:mm dd/mm/yyyy".
 * @param dateTime - Ngày giờ cần định dạng (có thể là đối tượng Date hoặc chuỗi ngày).
 * @returns Chuỗi ngày giờ đã được định dạng.
 *
 * @example
 * formatDatetime("2024-03-15T14:30:00") => "14:30, 15/03/2024"
 * formatDatetime(new Date(2024, 2, 15, 14, 30, 0)) => "14:30, 15/03/2024"
 */
export function formatDatetime(dateTime: Date | string): string {
  if (!dateTime) return ""

  const d = typeof dateTime === "string" ? new Date(dateTime) : dateTime
  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year = d.getFullYear()
  const hours = String(d.getHours()).padStart(2, "0")
  const minutes = String(d.getMinutes()).padStart(2, "0")

  return `${hours}:${minutes}, ${day}/${month}/${year}`
}
