import React, { useState } from "react"

import { ChevronLeft, ChevronRight } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/globals/atoms/dialog"

interface ImageProps {
  images: string[]
}

function ImageSlider({ images }: ImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const handleImageClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="relative h-full w-full rounded-xl border">
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="h-full w-full cursor-pointer rounded-xl object-cover"
        onClick={handleImageClick}
      />

      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-1 flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full opacity-40"
      >
        <ChevronLeft color="#000" size={20} />
      </button>

      <button
        onClick={handleNext}
        className="absolute top-1/2 right-1 flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full opacity-40"
      >
        <ChevronRight color="#000" size={20} />
      </button>

      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="min-h-[700px] min-w-[700px]">
          <DialogHeader>
            <DialogTitle>Chi tiết hình ảnh</DialogTitle>
          </DialogHeader>
          <div className="relative flex items-center justify-center">
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className="h-full w-full cursor-pointer rounded-xl object-cover"
              onClick={handleImageClick}
            />

            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full opacity-40"
            >
              <ChevronLeft color="#000" size={22} />
            </button>

            <button
              onClick={handleNext}
              className="absolute top-1/2 right-2 flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full opacity-40"
            >
              <ChevronRight color="#000" size={22} />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ImageSlider
