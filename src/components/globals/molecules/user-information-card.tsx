"use client"

import React from "react"

import Image from "next/image"

import { Card } from "../atoms/card"

interface UserInformationCardProps {
  userData: {
    email: string
    phoneNumber: string
    fullName: string
    avatarUrl?: string
  }
}

function UserInformationCard({ userData }: UserInformationCardProps) {
  return (
    <Card className="px-6 py-4">
      <div className="flex items-center gap-4">
        <Image
          src={userData.avatarUrl || ""}
          alt={userData.fullName}
          width={60}
          height={60}
        />

        <div className="flex w-full flex-col">
          <span className="font-medium capitalize">{userData.fullName}</span>

          <span className="text-muted-foreground text-sm">
            {userData.email}
          </span>
          <span className="text-muted-foreground text-sm">
            {userData.phoneNumber}
          </span>
        </div>
      </div>
    </Card>
  )
}

export default UserInformationCard
