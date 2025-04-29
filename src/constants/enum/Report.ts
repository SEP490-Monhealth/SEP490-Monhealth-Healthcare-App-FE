import { z } from "zod"

import { EnumMeta } from "@/configs/enum"

export enum ReportStatusEnum {
  Pending,
  Approved,
  Rejected
}

export const ReportStatusSchemaEnum = z.nativeEnum(ReportStatusEnum)

const reportStatusMap: Record<ReportStatusEnum, EnumMeta> = {
  [ReportStatusEnum.Pending]: {
    label: "Chờ duyệt",
    color: "#ca8a04" // yellow 600
  },
  [ReportStatusEnum.Approved]: {
    label: "Đã duyệt",
    color: "#16a34a" // green 600
  },
  [ReportStatusEnum.Rejected]: {
    label: "Đã từ chối",
    color: "#ef4444" // red 500
  }
}

export function getReportStatusMeta(status: ReportStatusEnum): EnumMeta {
  return reportStatusMap[status]
}
