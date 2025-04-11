import React from "react"

import ImageSlider from "@/components/globals/atoms/image-slider"
import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"

import { CertificateType } from "@/schemas/certificateSchema"

import { formatDate } from "@/utils/formatters"

interface ConsultantCertificateTabDialogProps {
  certificateData: CertificateType
}

function CertificateTabDialog({
  certificateData
}: ConsultantCertificateTabDialogProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-x-6 gap-y-4">
        <div className="col-span-1">
          <div className="rounded-xl">
            <ImageSlider images={certificateData.imageUrls} />
          </div>
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-2">
            <Label htmlFor="number">Mã chứng chỉ</Label>
            <Input
              id="number"
              type="text"
              value={certificateData.number}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="isVerified">Trạng thái</Label>
            <Input
              id="isVerified"
              type="text"
              value={certificateData.isVerified ? "Xác thực" : "Chưa xác thực"}
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
          <Label htmlFor="updatedAt">Ngày cập nhật</Label>
          <Input
            id="updatedAt"
            type="text"
            value={formatDate(certificateData.updatedAt || "--")}
            readOnly
          />
        </div>
      </div>
    </div>
  )
}

export default CertificateTabDialog
