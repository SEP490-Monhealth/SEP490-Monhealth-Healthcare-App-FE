import React from "react"

import { formatDateTime } from "@/utils/formatters"

interface DataTableDateTimeProps {
  datetime: string
}

function DataTableDateTime({ datetime }: DataTableDateTimeProps) {
  return <span>{formatDateTime(datetime)}</span>
}

export default DataTableDateTime
