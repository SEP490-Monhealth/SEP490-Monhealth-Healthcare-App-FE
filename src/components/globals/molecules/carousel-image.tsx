import React from "react"

import Image from "next/image"

import { Carousel, CarouselContent, CarouselItem } from "../atoms/carousel"

interface CarouselImageProps {
  images: string[]
}

function CarouselImage({ images }: CarouselImageProps) {
  return (
    <Carousel className={"h-full w-full"}>
      <CarouselContent>
        {images.map((imageUrl, index) => (
          <CarouselItem key={index} className="h-64 w-full">
            <div className="border-border flex h-full w-full items-center justify-center border">
              <Image
                src={imageUrl}
                alt={`certificate-${index}`}
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

export default CarouselImage
