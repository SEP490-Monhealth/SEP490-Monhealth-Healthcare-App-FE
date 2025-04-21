import { z } from "zod"

import { EnumMeta } from "@/configs/enum"

export enum ReportStatusEnum {
  Pending,
  Approved,
  Rejected
}

export const ReportStatusSchemaEnum = z.nativeEnum(ReportStatusEnum)

const ReportStatusMap: Record<ReportStatusEnum, EnumMeta> = {
  [ReportStatusEnum.Pending]: {
    label: "Chờ xác nhận",
    color: "#ca8a04" // yellow 600
  },
  [ReportStatusEnum.Approved]: {
    label: "Hoàn thành",
    color: "#16a34a" // green 600
  },
  [ReportStatusEnum.Rejected]: {
    label: "Đã hủy",
    color: "#ef4444" // red 500
  }
}

export function getReportStatusMeta(status: ReportStatusEnum): EnumMeta {
  return ReportStatusMap[status]
}
