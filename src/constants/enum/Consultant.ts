import { z } from "zod"

import { EnumMeta } from "@/configs/enum"

export enum VerificationStatusEnum {
  Pending,
  Verified,
  Rejected
}

export const VerificationStatusSchemaEnum = z.nativeEnum(VerificationStatusEnum)

const verificationStatusMetaMapping: Record<VerificationStatusEnum, EnumMeta> =
  {
    [VerificationStatusEnum.Pending]: {
      label: "Chờ xác thực",
      color: "#ca8a04" // yellow 600
    },
    [VerificationStatusEnum.Verified]: {
      label: "Đã xác thực",
      color: "#16a34a" // green 600
    },
    [VerificationStatusEnum.Rejected]: {
      label: "Đã từ chối",
      color: "#ef4444" // red 500
    }
  }

export function getConsultantVerificationMeta(
  status: VerificationStatusEnum
): EnumMeta {
  return verificationStatusMetaMapping[status]
}
