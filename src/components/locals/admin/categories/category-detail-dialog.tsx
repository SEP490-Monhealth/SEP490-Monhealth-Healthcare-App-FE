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

import {
  CATEGORY_TYPE,
  CategoryTypeEnum,
  getCategoryMeta
} from "@/constants/enum/Category"

import { useCategoryById, useUpdateCategory } from "@/hooks/useCategory"

import {
  CreateUpdateCategoryType,
  createUpdateCategorySchema
} from "@/schemas/categorySchema"

import { formatDate } from "@/utils/formatters"

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
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUpdateCategoryType>({
    resolver: zodResolver(createUpdateCategorySchema)
  })

  useEffect(() => {
    if (categoryData) {
      setValue("name", categoryData.name || "")
      setValue("description", categoryData.description || "")
      setValue("type", categoryData.type)
    }
  }, [categoryData, setValue])

  const labelType = categoryData
    ? getCategoryMeta(categoryData.type)
    : undefined

  const isLoading = isCategoryLoading
  const hasError = categoryError

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleCancelEdit = () => {
    setIsEdit(false)
  }

  const onSubmit = (data: CreateUpdateCategoryType) => {
    setIsEdit(false)
    setIsLoadingSave(true)

    console.log(errors)

    updateCategory(
      { categoryId: categoryId || "", updatedData: data },
      {
        onSuccess: () => {
          setIsEdit(false)
          setIsLoadingSave(false)
        }
      }
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-h-[520px] min-w-[700px]">
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
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoryId">Mã danh mục</Label>
              <Input
                id="categoryId"
                type="text"
                value={categoryId || ""}
                disabled
              />
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên danh mục</Label>

                  {!isEdit ? (
                    <Input
                      id="name"
                      type="text"
                      value={categoryData.name}
                      disabled
                    />
                  ) : (
                    <div>
                      <Input
                        id="name"
                        defaultValue={categoryData.name}
                        type="text"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="mt-1 ml-1 text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Loại danh mục</Label>

                {!isEdit ? (
                  <Input
                    id="type"
                    type="text"
                    value={labelType?.label}
                    disabled
                  />
                ) : (
                  <div>
                    <Select
                      onValueChange={(value) => {
                        const enumValue = Number(value) as CategoryTypeEnum
                        setValue("type", enumValue)
                      }}
                      defaultValue={categoryData?.type?.toString()}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn vai trò" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Loại danh mục</SelectLabel>
                          {CATEGORY_TYPE.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value.toString()}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {errors.type && (
                      <p className="mt-1 ml-1 text-sm text-red-600">
                        {errors.type.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Mô tả</Label>

              {!isEdit ? (
                <Textarea
                  id="description"
                  rows={2}
                  value={categoryData.description}
                  disabled
                />
              ) : (
                <div>
                  <Textarea
                    id="description"
                    rows={2}
                    defaultValue={categoryData.description}
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="mt-1 ml-1 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-2">
                <Label htmlFor="createdAt">Ngày tạo</Label>
                <Input
                  id="createdAt"
                  type="text"
                  value={formatDate(categoryData.createdAt)}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="updatedAt">Ngày cập nhật</Label>
                <Input
                  id="updatedAt"
                  type="text"
                  value={formatDate(categoryData.updatedAt)}
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-2">
                <Label htmlFor="createdBy">Người tạo</Label>
                <Input
                  id="createdBy"
                  type="text"
                  value={categoryData.createdBy}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="updatedBy">Người cập nhật</Label>
                <Input
                  id="updatedBy"
                  type="text"
                  value={categoryData.updatedBy}
                  disabled
                />
              </div>
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
