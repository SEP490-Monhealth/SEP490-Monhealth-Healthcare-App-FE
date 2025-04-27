import React from "react"

import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/globals/atoms/carousel"

import { BookingType } from "@/schemas/bookingSchema"

interface EvidenceTabDialogProps {
  bookingData: BookingType
}

function EvidenceDialogTab({ bookingData }: EvidenceTabDialogProps) {
  return (
    <Carousel className="h-full w-full">
      <CarouselContent>
        {bookingData.evidenceUrls.map((imageUrl, index) => (
          <CarouselItem key={index} className="h-full w-full">
            <div className="border-border flex h-full w-full items-center justify-center border">
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
