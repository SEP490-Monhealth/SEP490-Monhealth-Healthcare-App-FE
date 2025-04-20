"use client"

import React from "react"

import { getInitials } from "@/utils/helpers"

import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar"

interface DataTableCellUserProps {
  user: {
    fullName: string
    email: string
    avatarUrl?: string
  }
}

function DataTableCellUser({ user }: DataTableCellUserProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage
          src={user.avatarUrl || ""}
          alt={getInitials(user.fullName)}
        />
        <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="capitalize">{user.fullName}</span>
        <span className="text-muted-foreground text-sm">{user.email}</span>
      </div>
    </div>
  )
}

export default DataTableCellUser
