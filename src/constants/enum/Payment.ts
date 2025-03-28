import { z } from "zod"

import { EnumMeta } from "@/configs/enum"

export enum PaymentStatusEnum {
  Pending,
  Completed,
  Failed,
  Refunded
}

export const PaymentStatusSchemaEnum = z.nativeEnum(PaymentStatusEnum)

const paymentStatusMap: Record<PaymentStatusEnum, EnumMeta> = {
  [PaymentStatusEnum.Pending]: {
    label: "Chờ xác nhận",
    color: "#FFA500" // orange
  },
  [PaymentStatusEnum.Completed]: {
    label: "Đã xác nhận",
    color: "#28A745" // green
  },
  [PaymentStatusEnum.Failed]: {
    label: "Thất bại",
    color: "#DC3545" // red
  },
  [PaymentStatusEnum.Refunded]: {
    label: "Hoàn trả",
    color: "#17A2B8" // cyan
  }
}

export function getPaymentStatusMeta(status: PaymentStatusEnum): EnumMeta {
  return paymentStatusMap[status]
}
