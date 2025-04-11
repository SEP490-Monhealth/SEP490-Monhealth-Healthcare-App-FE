import React from "react"

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
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={bank.logoUrl} alt={bank.shortName} />
      </Avatar>
      <div className="flex flex-col">
        <span className="capitalize">{bank.shortName}</span>
        <span className="text-muted-foreground text-sm">{bank.name}</span>
      </div>
    </div>
  )
}

export default DataTableCellBank
