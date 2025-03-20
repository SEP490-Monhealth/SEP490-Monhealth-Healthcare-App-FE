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
