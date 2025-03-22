import { z } from "zod"

import { auditFields, uuidSchema } from "./baseSchema"
import { foodSchema } from "./foodSchema"

const portionSchema = z.object({
  portionId: uuidSchema,

  size: z.string().nonempty({ message: "Kích thước phần ăn không được trống" }),
  weight: z
    .number()
    .min(1, { message: "Khối lượng phần ăn phải lớn hơn 0" })
    .max(10000, {
      message: "Khối lượng phần ăn không được lớn hơn 10,000 gram"
    }),
  unit: z.string().nonempty({ message: "Đơn vị đo lường không được trống" }),

  ...auditFields
})

export const createPortionSchema = portionSchema
  .pick({
    size: true,
    weight: true,
    unit: true
  })
  .extend({
    foodId: foodSchema.shape.foodId
  })

export type PortionType = z.infer<typeof portionSchema>
export type CreatePortionType = z.infer<typeof createPortionSchema>
