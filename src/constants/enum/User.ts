import { z } from "zod"

import { EnumMeta } from "@/configs/enum"

export enum RoleEnum {
  Member,
  SubscriptionMember,
  Consultant,
  Admin
}

export const BookingStatusSchemaEnum = z.nativeEnum(RoleEnum)

export type RoleType = "Member" | "Subscription Member" | "Consultant" | "Admin"

const roleMetaMapping: Record<RoleType, EnumMeta> = {
  Member: {
    label: "Thành viên",
    color: "#3b82f6" // blue 500
  },
  "Subscription Member": {
    label: "Thành viên trả phí",
    color: "#16a34a" // green 600
  },
  Consultant: {
    label: "Tư vấn viên",
    color: "#f97316" // orange 500
  },
  Admin: {
    label: "Quản trị viên",
    color: "#ef4444" // red 500
  }
}

export function getRoleMeta(role: RoleType): EnumMeta {
  return roleMetaMapping[role]
}
