"use client"

import React from "react"

import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/globals/atoms/carousel"
import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"

import { CertificateType } from "@/schemas/certificateSchema"

import { formatDate } from "@/utils/formatters"

interface CertificateTabDialogProps {
  certificateData: CertificateType
}

function CertificateTabDialog({ certificateData }: CertificateTabDialogProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-7 gap-x-6 gap-y-4">
        <div className="col-span-4">
          <Carousel>
            <CarouselContent>
              {certificateData.imageUrls.map((imageUrl, index) => (
                <CarouselItem key={index} className="h-64 w-full">
                  <div className="h-full w-full">
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
        </div>

        <div className="col-span-3 grid grid-cols-2 gap-x-6 gap-y-4">
          <div className="col-span-2 space-y-2">
            <Label htmlFor="number">Số chứng chỉ</Label>
            <Input
              id="number"
              type="text"
              value={certificateData.number}
              readOnly
            />
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="name">Tên chứng chỉ</Label>
            <Input
              id="name"
              type="text"
              value={certificateData.name}
              readOnly
            />
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="issuedBy">Nơi cấp</Label>
            <Input
              id="issuedBy"
              type="text"
              value={certificateData.issuedBy}
              readOnly
            />
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="isVerified">Trạng thái</Label>
            <Input
              id="isVerified"
              type="text"
              value={certificateData.isVerified ? "Xác thực" : "Chưa xác thực"}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div className="space-y-2">
          <Label htmlFor="issueDate">Ngày cấp</Label>
          <Input
            id="issueDate"
            type="text"
            value={formatDate(certificateData.issueDate)}
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiryDate">Ngày hết hạn</Label>
          <Input
            id="expiryDate"
            type="text"
            value={formatDate(certificateData.expiryDate || "--")}
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="createdAt">Ngày tạo</Label>
          <Input
            id="createdAt"
            type="text"
            value={formatDate(certificateData.createdAt)}
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="createdAt">Ngày cập nhật</Label>
          <Input
            id="updatedAt"
            type="text"
            value={formatDate(certificateData.updatedAt)}
            readOnly
          />
        </div>
      </div>
    </div>
  )
}

export default CertificateTabDialog
