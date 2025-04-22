"use client"

import React from "react"

import Image from "next/image"

import { ConsultantBankType } from "@/schemas/consultantBankSchema"

import { Badge } from "../atoms/badge"
import { Card } from "../atoms/card"

interface BankInformationCardProps {
  consultantBankData: ConsultantBankType
}

function BankInformationCard({ consultantBankData }: BankInformationCardProps) {
  return (
    <Card className="px-6 py-4">
      <div className="flex items-center gap-4">
        <Image
          src={consultantBankData.bank.logoUrl}
          alt={consultantBankData.bank.shortName}
          width={60}
          height={60}
        />

        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between gap-4">
            <span className="font-medium capitalize">
              {consultantBankData.bank.shortName}
            </span>

            {consultantBankData.isDefault && (
              <Badge variant="outline">Mặc định</Badge>
            )}
          </div>

          <span className="text-muted-foreground text-sm">
            {consultantBankData.name}
          </span>
          <span className="text-muted-foreground text-sm">
            {consultantBankData.number}
          </span>
        </div>
      </div>
    </Card>
  )
}

export default BankInformationCard
