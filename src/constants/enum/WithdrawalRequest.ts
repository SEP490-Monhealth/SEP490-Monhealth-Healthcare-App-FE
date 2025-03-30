import { z } from "zod"

import { EnumMeta } from "@/configs/enum"

export enum WithdrawalRequestStatusEnum {
  Pending,
  Approved,
  Completed,
  Rejected
}

export const WithdrawalRequestStatusSchemaEnum = z.nativeEnum(
  WithdrawalRequestStatusEnum
)

const withdrawalRequestStatusMap: Record<
  WithdrawalRequestStatusEnum,
  EnumMeta
> = {
  [WithdrawalRequestStatusEnum.Pending]: {
    label: "Chờ xử lý",
    color: "#f97316" // orange 500
  },
  [WithdrawalRequestStatusEnum.Approved]: {
    label: "Đã chấp nhận",
    color: "#3b82f6" // blue 500
  },
  [WithdrawalRequestStatusEnum.Completed]: {
    label: "Hoàn thành",
    color: "#ef4444" // red 500
  },
  [WithdrawalRequestStatusEnum.Rejected]: {
    label: "Hoàn trả",
    color: "#ca8a04" // yellow 600
  }
}

export function getWithdrawalRequestStatusMeta(
  status: WithdrawalRequestStatusEnum
): EnumMeta {
  return withdrawalRequestStatusMap[status]
}
