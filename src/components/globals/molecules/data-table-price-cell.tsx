"use client"

import React from "react"

import { formatCurrency } from "@/utils/formatters"

interface DataTableCellPriceProps {
  amount: number
}

function DataTableCellPrice({ amount }: DataTableCellPriceProps) {
  return (
    <span className="flex justify-center pr-4">{formatCurrency(amount)}</span>
  )
}

export default DataTableCellPrice
