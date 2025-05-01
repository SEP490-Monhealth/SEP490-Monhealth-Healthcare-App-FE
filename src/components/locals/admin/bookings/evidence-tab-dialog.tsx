"use client"

import React from "react"

import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/globals/atoms/carousel"

interface EvidenceTabDialogProps {
  evidenceUrls: string[]
}

function EvidenceDialogTab({ evidenceUrls }: EvidenceTabDialogProps) {
  return (
    <Carousel>
      <CarouselContent>
        {evidenceUrls.map((imageUrl, index) => (
          <CarouselItem key={index}>
            <div className="border-border flex items-center justify-center border">
              <Image
                src={imageUrl}
                alt={`evidence-${index}`}
                width={400}
                height={200}
                className="object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default EvidenceDialogTab
