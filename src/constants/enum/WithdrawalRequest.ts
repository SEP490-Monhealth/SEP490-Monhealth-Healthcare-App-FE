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
    label: "Đang xử lý",
    color: "#f97316" // orange 500
  },
  [WithdrawalRequestStatusEnum.Approved]: {
    label: "Đã chấp nhận",
    color: "#16a34a" // green 600
  },
  [WithdrawalRequestStatusEnum.Completed]: {
    label: "Hoàn thành",
    color: "#3b82f6" // blue 500
  },
  [WithdrawalRequestStatusEnum.Rejected]: {
    label: "Hoàn trả",
    color: "#f97316" // orange 500
  }
}

export function getWithdrawalRequestStatusMeta(
  status: WithdrawalRequestStatusEnum
): EnumMeta {
  return withdrawalRequestStatusMap[status]
}
