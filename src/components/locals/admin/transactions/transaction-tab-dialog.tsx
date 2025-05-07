"use client"

import React from "react"

import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"

import UserInformationCard from "@/components/globals/molecules/user-information-card"

import {
  TransactionStatusEnum,
  TransactionTypeEnum,
  getTransactionStatusMeta,
  getTransactionTypeMeta
} from "@/constants/enum/Transaction"

import { TransactionType } from "@/schemas/transactionSchema"

import { formatCurrency, formatDateTime } from "@/utils/formatters"

interface TransactionTabDialogProps {
  transactionData: TransactionType
}

function TransactionTabDialog({ transactionData }: TransactionTabDialogProps) {
  const { label: transactionTypeLabel } = getTransactionTypeMeta(
    transactionData?.type || TransactionTypeEnum.Earning
  )
  const { label: transactionStatusLabel } = getTransactionStatusMeta(
    transactionData?.status || TransactionStatusEnum.Pending
  )

  const userInfo =
    transactionData?.type === TransactionTypeEnum.Fee
      ? { role: "Member", user: transactionData?.member }
      : { role: "Consultant", user: transactionData?.consultant }

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="transactionId">Mã giao dịch</Label>
        <Input
          disabled
          id="transactionId"
          type="text"
          value={transactionData.transactionId}
        />
      </div>

      {userInfo?.user && (
        <div className="space-y-2">
          <Label htmlFor="">
            {userInfo.role === "Member" ? "Người dùng" : "Chuyên viên"}
          </Label>
          <UserInformationCard role={userInfo.role} userData={userInfo.user} />
        </div>
      )}

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="description">Mô tả</Label>
          <Input
            id="description"
            type="text"
            value={transactionData.description}
            readOnly
          />
        </div>

        <div className="col-span-2 grid grid-cols-3 gap-x-6 gap-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Loại giao dịch</Label>
            <Input
              id="type"
              type="text"
              value={transactionTypeLabel}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Số tiền</Label>

            <div className="relative">
              <Input
                id="price"
                type="text"
                value={formatCurrency(transactionData.amount)}
                readOnly
              />
              <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                VND
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái</Label>
            <Input
              id="status"
              type="text"
              value={transactionStatusLabel}
              readOnly
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="createdAt">Ngày tạo</Label>
          <Input
            id="createdAt"
            type="text"
            value={formatDateTime(transactionData.createdAt)}
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="updatedAt">Ngày cập nhật</Label>
          <Input
            id="updatedAt"
            type="text"
            value={formatDateTime(transactionData.updatedAt)}
            readOnly
          />
        </div>
      </div>
    </div>
  )
}

export default TransactionTabDialog
