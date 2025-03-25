import { z } from "zod"

import { EnumMeta } from "@/configs/enum"

export enum GenderEnum {
  Male,
  Female
}

export const GenderSchemaEnum = z.nativeEnum(GenderEnum)

const genderStatusMap: Record<GenderEnum, EnumMeta> = {
  [GenderEnum.Male]: {
    label: "Nam"
  },
  [GenderEnum.Female]: {
    label: "Nữ"
  }
}

export function getGenderMeta(status: GenderEnum): EnumMeta {
  return genderStatusMap[status]
}
