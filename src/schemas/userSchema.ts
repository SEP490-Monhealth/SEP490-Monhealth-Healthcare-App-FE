import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"

export const roles = ["Member", "Subscription Member", "Consultant", "Admin"]

export const userSchema = z.object({
  userId: uuidSchema,

  fullName: z
    .string()
    .nonempty({ message: "Tên không được để trống" })
    .min(3, { message: "Tên phải có ít nhất 3 ký tự" })
    .max(255, { message: "Tên không được quá 255 ký tự" })
    .regex(/^[\p{L} ]+$/u, {
      message: "Tên chỉ được chứa chữ cái và khoảng trắng"
    }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  phoneNumber: z.string().regex(/^(0\d{9}|(\+84)\d{9})$/, {
    message: "Số điện thoại phải có 10 số và bắt đầu bằng 0 hoặc +84"
  }),
  password: z
    .string()
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
    .max(128, { message: "Mật khẩu không được quá 128 ký tự" })
    .regex(/[A-Z]/, { message: "Mật khẩu phải chứa ít nhất một chữ in hoa" })
    .regex(/[a-z]/, { message: "Mật khẩu phải chứa ít nhất một chữ thường" })
    .regex(/\d/, { message: "Mật khẩu phải chứa ít nhất một số" })
    .regex(/[\W_]/, {
      message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"
    }),
  avatarUrl: z.string().optional(),

  role: z.string().refine((val) => roles.includes(val), {
    message: `Vai trò không hợp lệ. Chỉ chấp nhận: ${roles.join(", ")}`
  }),

  status: z.boolean(),

  ...auditFields
})

export const createUpdateUserSchema = userSchema.pick({
  fullName: true,
  email: true,
  phoneNumber: true,
  avatarUrl: true,
  role: true,
  status: true
})

export const loginUserSchema = userSchema.pick({
  email: true,
  password: true
})

export type UserType = z.infer<typeof userSchema>
export type CreateUpdateUserType = z.infer<typeof createUpdateUserSchema>

export type LoginUserType = z.infer<typeof loginUserSchema>
