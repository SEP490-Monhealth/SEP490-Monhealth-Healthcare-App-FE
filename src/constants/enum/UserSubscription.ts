import { z } from "zod"

import { EnumMeta } from "@/configs/enum"

export enum UserSubscriptionStatus {
  Active,
  Expired
}

export const UserSubscriptionSchemaEnum = z.nativeEnum(UserSubscriptionStatus)

const userSubscriptionStatusMap: Record<UserSubscriptionStatus, EnumMeta> = {
  [UserSubscriptionStatus.Active]: {
    label: "Hoạt động",
    color: "#16a34a" // green 600
  },
  [UserSubscriptionStatus.Expired]: {
    label: "Ngừng hoạt động",
    color: "#ef4444" // red 500
  }
}

export function getUserSubscriptionStatusMeta(
  status: UserSubscriptionStatus
): EnumMeta {
  return userSubscriptionStatusMap[status]
}
