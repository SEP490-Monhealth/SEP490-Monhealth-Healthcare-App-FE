import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"

const portionSchema = z.object({
  portionId: uuidSchema,

  size: z.string().nonempty({ message: "Kích thước phần ăn không được trống" }),
  weight: z.number().min(1, { message: "Khối lượng phần ăn phải lớn hơn 0" }),
  unit: z.string().nonempty({ message: "Đơn vị đo lường không được trống" }),

  ...auditFields
})

export type PortionType = z.infer<typeof portionSchema>
