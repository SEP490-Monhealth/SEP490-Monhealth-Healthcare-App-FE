"use client"

import React from "react"

import Image from "next/image"

import { getInitials } from "@/utils/helpers"

import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar"
import { Badge } from "../atoms/badge"
import { Card } from "../atoms/card"
import { Input } from "../atoms/input"
import { formatPhoneNumber } from "@/utils/formatters"

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
    <Card className="px-6 py-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-44 w-40 rounded-lg">
          <AvatarImage src={userData.avatarUrl} />
          <AvatarFallback className="rounded-lg">
            {getInitials(userData.fullName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex w-full flex-col gap-4">
          <Badge variant="outline">{role}</Badge>

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
