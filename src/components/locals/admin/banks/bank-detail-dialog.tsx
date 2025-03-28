import React, { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/globals/atoms/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/globals/atoms/dialog"
import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"

import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import { useBankById, useUpdateBank } from "@/hooks/useBank"

import {
  CreateUpdateBankType,
  createUpdateBankSchema
} from "@/schemas/bankSchema"

import { formatDate } from "@/utils/formatters"

interface BankDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  bankId: string | null
}

function BankDetailDialog({ isOpen, onClose, bankId }: BankDetailDialogProps) {
  const { data: bankData, isLoading, error } = useBankById(bankId || "")

  const { mutate: updateBank } = useUpdateBank()

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false)

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUpdateBankType>({
    resolver: zodResolver(createUpdateBankSchema)
  })

  useEffect(() => {
    if (bankData) {
      setValue("code", bankData.code)
      setValue("name", bankData.name)
      setValue("shortName", bankData.shortName)
      setValue("logoUrl", bankData.logoUrl)
    }
  }, [bankData, setValue])

  const onSubmit = async (data: CreateUpdateBankType) => {
    setIsEdit(false)
    setIsLoadingSave(true)

    try {
      await updateBank(
        { bankId: bankId || "", updatedData: data },
        {
          onSuccess: () => {
            setIsEdit(false)
            setIsLoadingSave(false)
          },
          onError: () => {
            setIsLoadingSave(false)
          }
        }
      )
    } catch (error) {
      console.log(error)
      setIsLoadingSave(false)
    }
  }

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleCancelEdit = () => {
    setIsEdit(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-h-[400px] min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết ngân hàng</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của ngân hàng.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : error || !bankData ? (
          <ErrorDialog
            message={
              error
                ? (error as Error).message || "Không thể tải dữ liệu."
                : "Không có dữ liệu ngân hàng."
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-2 grid grid-cols-3 gap-x-6 gap-y-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="bankId">Mã ngân hàng</Label>
                <Input
                  id="bankId"
                  type="text"
                  value={bankData.bankId}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Input
                  id="status"
                  type="text"
                  value={bankData.status ? "Hoạt động" : "Ngừng hoạt động"}
                  readOnly
                />
              </div>
            </div>

            <div className="col-span-2 grid grid-cols-3 gap-x-6 gap-y-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="name">Tên ngân hàng</Label>

                {!isEdit ? (
                  <Input id="name" type="text" value={bankData.name} readOnly />
                ) : (
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nhập tên ngân hàng"
                    defaultValue={bankData.name}
                    {...register("name")}
                  />
                )}

                {errors.name && (
                  <p className="mt-1 ml-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortName">Viết tắt</Label>

                {!isEdit ? (
                  <Input
                    id="shortName"
                    type="text"
                    value={bankData.shortName}
                    readOnly
                  />
                ) : (
                  <Input
                    id="shortName"
                    type="text"
                    placeholder="Nhập tên viết tắt"
                    defaultValue={bankData.shortName}
                    {...register("shortName")}
                  />
                )}

                {errors.shortName && (
                  <p className="mt-1 ml-1 text-sm text-red-600">
                    {errors.shortName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-2 grid grid-cols-3 gap-x-6 gap-y-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="logoUrl">Logo URL ngân hàng</Label>

                {!isEdit ? (
                  <Input
                    id="logoUrl"
                    type="text"
                    value={bankData.logoUrl}
                    readOnly
                  />
                ) : (
                  <Input
                    id="logoUrl"
                    type="text"
                    placeholder="Nhập URL logo ngân hàng"
                    defaultValue={bankData.logoUrl}
                    {...register("logoUrl")}
                  />
                )}

                {errors.logoUrl && (
                  <p className="mt-1 ml-1 text-sm text-red-600">
                    {errors.logoUrl.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Code ngân hàng</Label>

                {!isEdit ? (
                  <Input id="code" type="text" value={bankData.code} readOnly />
                ) : (
                  <Input
                    id="code"
                    type="text"
                    placeholder="Nhập code ngân hàng"
                    defaultValue={bankData.code}
                    {...register("code")}
                  />
                )}

                {errors.code && (
                  <p className="mt-1 ml-1 text-sm text-red-600">
                    {errors.code.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdAt">Ngày tạo</Label>
              <Input
                id="createdAt"
                type="text"
                value={formatDate(bankData.createdAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedAt">Ngày cập nhật</Label>
              <Input
                id="updatedAt"
                type="text"
                value={formatDate(bankData.updatedAt)}
                readOnly
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <div className="flex w-full justify-between">
            {!isEdit ? (
              <Button variant={"outline"} onClick={handleEdit}>
                Chỉnh sửa
              </Button>
            ) : (
              <div className="space-x-4">
                <Button variant={"outline"} onClick={handleCancelEdit}>
                  Hủy
                </Button>

                <Button
                  type="submit"
                  disabled={isLoadingSave}
                  variant={"default"}
                  onClick={handleSubmit(onSubmit)}
                >
                  {isLoadingSave ? "Đang cập nhật..." : "Cập nhật"}
                </Button>
              </div>
            )}

            <Button onClick={onClose}>Đóng</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BankDetailDialog
