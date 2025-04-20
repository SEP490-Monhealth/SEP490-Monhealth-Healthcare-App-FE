"use client"

import React from "react"

import { formatDate } from "@/utils/formatters"

interface DataTableDateProps {
  date: string
}

function DataTableDate({ date }: DataTableDateProps) {
  return <span>{formatDate(date)}</span>
}

export default DataTableDate
