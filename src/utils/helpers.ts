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
