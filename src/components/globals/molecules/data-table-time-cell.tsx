"use client"

import React from "react"

import { formatTime } from "@/utils/formatters"

interface DataTableTimeProps {
  time: string
}

function DataTableTime({ time }: DataTableTimeProps) {
  return <span>{formatTime(time)}</span>
}

export default DataTableTime
