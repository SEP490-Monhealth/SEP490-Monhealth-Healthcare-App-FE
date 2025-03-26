import { z } from "zod"

import { uuidSchema } from "./baseSchema"

const transactionSchema = z.object({
  transactionId: uuidSchema,
  walletId: uuidSchema
})
