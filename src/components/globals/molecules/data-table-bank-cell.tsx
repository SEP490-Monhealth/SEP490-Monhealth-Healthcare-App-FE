"use client"

import React from "react"

import { AvatarFallback } from "@radix-ui/react-avatar"

import { getInitials } from "@/utils/helpers"

import { Avatar, AvatarImage } from "../atoms/avatar"

interface DataTableCellBankProps {
  bank: {
    shortName: string
    name: string
    logoUrl: string
  }
}

function DataTableCellBank({ bank }: DataTableCellBankProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={bank.logoUrl} alt={bank.shortName} />
        <AvatarFallback>{getInitials(bank.name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="capitalize">{bank.shortName}</span>
        <span className="text-muted-foreground text-sm">{bank.name}</span>
      </div>
    </div>
  )
}

export default DataTableCellBank
