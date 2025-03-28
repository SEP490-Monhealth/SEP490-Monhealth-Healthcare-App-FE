import { z } from "zod"

import { EnumMeta } from "@/configs/enum"

export enum TransactionTypeEnum {
  Earning,
  Withdrawal,
  Refund,
  Fee,
  Bonus
}

export enum TransactionStatusEnum {
  Pending,
  Completed,
  Failed
}

export const TransactionTypeSchemaEnum = z.nativeEnum(TransactionTypeEnum)
export const TransactionStatusSchemaEnum = z.nativeEnum(TransactionStatusEnum)

const transactionTypeMap: Record<TransactionTypeEnum, EnumMeta> = {
  [TransactionTypeEnum.Earning]: {
    label: "Thu nhập",
    color: "#28A745" // Xanh lá
  },
  [TransactionTypeEnum.Withdrawal]: {
    label: "Rút tiền",
    color: "#DC3545" // Đỏ
  },
  [TransactionTypeEnum.Refund]: {
    label: "Hoàn tiền",
    color: "#17A2B8" // Xanh dương nhạt
  },
  [TransactionTypeEnum.Fee]: {
    label: "Phí giao dịch",
    color: "#6C757D" // Xám
  },
  [TransactionTypeEnum.Bonus]: {
    label: "Tiền thưởng",
    color: "#FFC107" // Vàng
  }
}

const transactionStatusMap: Record<TransactionStatusEnum, EnumMeta> = {
  [TransactionStatusEnum.Pending]: {
    label: "Chờ thanh toán",
    color: "#FFA500" // Màu cam
  },
  [TransactionStatusEnum.Completed]: {
    label: "Đã thanh toán",
    color: "#28A745" // Màu xanh lá
  },
  [TransactionStatusEnum.Failed]: {
    label: "Thất bại",
    color: "#DC3545" // Màu đỏ
  }
}

export function getTransactionStatusMeta(
  status: TransactionStatusEnum
): EnumMeta {
  return transactionStatusMap[status]
}

export function getTransactionTypeMeta(type: TransactionTypeEnum): EnumMeta {
  return transactionTypeMap[type]
}
