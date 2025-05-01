"use client"

import React from "react"

import { formatPhoneNumber } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar"
import { Badge } from "../atoms/badge"
import { Card } from "../atoms/card"
import { Input } from "../atoms/input"

interface UserInformationCardProps {
  role: string
  userData: {
    email: string
    phoneNumber: string
    fullName: string
    avatarUrl?: string
  }
}

function UserInformationCard({ role, userData }: UserInformationCardProps) {
  return (
    <Card className="px-6 py-4 shadow-xs">
      <div className="flex items-center gap-6">
        <div className="relative">
          <Avatar className="h-40 w-36 rounded-lg">
            <AvatarImage
              src={userData.avatarUrl}
              alt={getInitials(userData.fullName)}
            />
            <AvatarFallback className="h-full rounded-lg">
              {getInitials(userData.fullName)}
            </AvatarFallback>
          </Avatar>

          <div className="absolute right-2 bottom-2">
            <Badge variant="secondary">{role}</Badge>
          </div>
        </div>

        <div className="w-full space-y-4">
          <Input
            id="fullName"
            type="text"
            value={userData.fullName}
            readOnly
            className="uppercase"
          />

          <Input id="email" type="text" value={userData.email} readOnly />

          <Input
            id="phoneNumber"
            type="text"
            value={formatPhoneNumber(userData.phoneNumber)}
            readOnly
          />
        </div>
      </div>
    </Card>
  )
}

export default UserInformationCard
