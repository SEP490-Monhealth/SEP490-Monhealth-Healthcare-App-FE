"use client"

import React from "react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/globals/atoms/card"

interface StatsCardProps {
  title: string
  icon: React.ReactNode
  value: string | number
  description: string
}

function StatsCard({ title, icon, value, description }: StatsCardProps) {
  return (
    <Card className="gap-0">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <span className="text-muted-foreground h-4 w-4">{icon}</span>
      </CardHeader>
      <CardContent className="space-y-1">
        <h4 className="text-2xl font-bold">{value}</h4>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

export default StatsCard
