import { z } from "zod"

import { EnumMeta } from "@/configs/enum"

export enum TransactionTypeEnum {
  Earning,
  Withdrawal,
  Fee,
  Bonus,
  Refund
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
    color: "#16a34a" // green 600
  },
  [TransactionTypeEnum.Withdrawal]: {
    label: "Rút tiền",
    color: "#f97316" // orange 500
  },
  [TransactionTypeEnum.Fee]: {
    label: "Thanh toán",
    color: "#ef4444" // red 500
  },
  [TransactionTypeEnum.Bonus]: {
    label: "Tiền thưởng",
    color: "#ca8a04" // yellow 600
  },
  [TransactionTypeEnum.Refund]: {
    label: "Hoàn tiền",
    color: "#3b82f6" // blue 500
  }
}

const transactionStatusMap: Record<TransactionStatusEnum, EnumMeta> = {
  [TransactionStatusEnum.Pending]: {
    label: "Đang xử lý",
    color: "#f97316" // orange 500
  },
  [TransactionStatusEnum.Completed]: {
    label: "Đã hoàn thành",
    color: "#3b82f6" // blue 500
  },
  [TransactionStatusEnum.Failed]: {
    label: "Thất bại",
    color: "#ef4444" // red 500
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
