import { z } from "zod"

export const uuidSchema = z.string().uuid({ message: "ID không hợp lệ" })

export const timestampFields = {
  createdAt: z.string(),
  updatedAt: z.string()
}

export const auditFields = {
  ...timestampFields,
  createdBy: z.string(),
  updatedBy: z.string()
}
