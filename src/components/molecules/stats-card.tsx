"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "../atoms/card"

interface StatsCardProps {
  title: string
  icon: React.ReactNode
  value: string | number
  description: string
}

function StatsCard({ title, icon, value, description }: StatsCardProps) {
  return (
    <Card className="gap-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground h-4 w-4">{icon}</div>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

export default StatsCard
