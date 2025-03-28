import React from "react"

import { formatDate } from "@/utils/formatters"

interface DataTableTimeProps {
  time: string
}

function DataTableTime({ time }: DataTableTimeProps) {
  return <span>{formatDate(time)}</span>
}

export default DataTableTime
