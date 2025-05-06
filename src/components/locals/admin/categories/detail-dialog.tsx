"use client"

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/globals/atoms/select"
import { Textarea } from "@/components/globals/atoms/textarea"

import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import { CategoryTypeEnum, getCategoryMeta } from "@/constants/enum/Category"

import { useCategoryById, useUpdateCategory } from "@/hooks/useCategory"

import {
  CreateUpdateCategoryType,
  createUpdateCategorySchema
} from "@/schemas/categorySchema"

import { formatDate } from "@/utils/formatters"

import { categoryOptions } from "./add-dialog"

interface CategoryDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  categoryId: string | null
}

function CategoryDetailDialog({
  isOpen,
  onClose,
  categoryId
}: CategoryDetailDialogProps) {
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    error: categoryError
  } = useCategoryById(categoryId || "")

  const { mutate: updateCategory } = useUpdateCategory()

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false)

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUpdateCategoryType>({
    resolver: zodResolver(createUpdateCategorySchema)
  })

  useEffect(() => {
    if (categoryData) {
      setValue("type", categoryData.type)
      setValue("name", categoryData.name || "")
      setValue("description", categoryData.description || "")
    }
  }, [categoryData, setValue])

  const { label: categoryTypeLabel } = getCategoryMeta(
    categoryData?.type || CategoryTypeEnum.Food
  )

  const onSubmit = async (data: CreateUpdateCategoryType) => {
    setIsEdit(false)
    setIsLoadingSave(true)

    const finalData = data
    console.log("Dữ liệu gửi đi:", JSON.stringify(finalData, null, 2))

    try {
      await updateCategory(
        { categoryId: categoryId || "", updatedData: data },
        {
          onSuccess: () => {
            setIsEdit(false)
            setIsLoadingSave(false)
          }
        }
      )
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error)
      setIsLoadingSave(false)
    }
  }

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleCancelEdit = () => {
    setIsEdit(false)
  }

  const isLoading = isCategoryLoading
  const hasError = categoryError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết danh mục</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của danh mục.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !categoryData ? (
          <ErrorDialog
            message={categoryError?.message || "Không thể tải dữ liệu."}
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="categoryId">Mã danh mục</Label>
              <Input
                disabled
                id="categoryId"
                type="text"
                value={categoryData.categoryId}
              />
            </div>

            <div>
              <div className="space-y-2">
                <Label htmlFor="type">Loại danh mục</Label>

                {!isEdit ? (
                  <Input
                    id="type"
                    type="text"
                    value={categoryTypeLabel}
                    readOnly
                  />
                ) : (
                  <Select
                    onValueChange={(value) => setValue("type", Number(value))}
                    value={
                      watch("type") !== undefined ? String(watch("type")) : ""
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn loại danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Loại danh mục</SelectLabel>
                        {categoryOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={String(option.value)}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </div>

              {errors.type && (
                <p className="mt-1 ml-1 text-sm text-red-600">
                  {errors.type.message}
                </p>
              )}
            </div>

            <div>
              <div className="space-y-2">
                <Label htmlFor="name">Tên danh mục</Label>
                {!isEdit ? (
                  <Input
                    id="name"
                    type="text"
                    value={categoryData.name}
                    readOnly
                  />
                ) : (
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nhập tên danh mục"
                    defaultValue={categoryData.name}
                    {...register("name")}
                  />
                )}
              </div>

              {errors.name && (
                <p className="mt-1 ml-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                {!isEdit ? (
                  <Textarea
                    id="description"
                    rows={4}
                    value={categoryData.description}
                    readOnly
                  />
                ) : (
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder="Nhập mô tả danh mục"
                    defaultValue={categoryData.description}
                    {...register("description")}
                  />
                )}
              </div>

              {errors.description && (
                <p className="mt-1 ml-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdAt">Ngày tạo</Label>
              <Input
                id="createdAt"
                type="text"
                value={formatDate(categoryData.createdAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdBy">Người tạo</Label>
              <Input
                id="createdBy"
                type="text"
                value={categoryData.createdBy || "--"}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedAt">Ngày cập nhật</Label>
              <Input
                id="updatedAt"
                type="text"
                value={formatDate(categoryData.updatedAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedBy">Người cập nhật</Label>
              <Input
                id="updatedBy"
                type="text"
                value={categoryData.updatedBy || "--"}
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

export default CategoryDetailDialog
