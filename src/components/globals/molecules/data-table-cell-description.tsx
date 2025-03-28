import React from "react"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "../atoms/hover-card"

interface DataTableCellDescriptionProps {
  description: string | string[]
}

function DataTableCellDescription({
  description
}: DataTableCellDescriptionProps) {
  return (
    <HoverCard>
      <HoverCardTrigger className="block max-w-[320px] cursor-pointer truncate hover:underline">
        {description}
      </HoverCardTrigger>
      <HoverCardContent className="w-96">{description}</HoverCardContent>
    </HoverCard>
  )
}

export default DataTableCellDescription
