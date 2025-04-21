import { z } from "zod"

import { EnumMeta } from "@/configs/enum"

export enum VerificationStatusEnum {
  Pending,
  Verified,
  Rejected
}

export const VerificationStatusSchemaEnum = z.nativeEnum(VerificationStatusEnum)

const ConsultantVerificationMap: Record<VerificationStatusEnum, EnumMeta> = {
  [VerificationStatusEnum.Pending]: {
    label: "Chờ xác nhận",
    color: "#ca8a04" // yellow 600
  },
  [VerificationStatusEnum.Verified]: {
    label: "Xác nhận",
    color: "#16a34a" // green 600
  },
  [VerificationStatusEnum.Rejected]: {
    label: "Từ chối",
    color: "#ef4444" // red 500
  }
}

export function getConsultantVerificationMeta(
  status: VerificationStatusEnum
): EnumMeta {
  return ConsultantVerificationMap[status]
}
