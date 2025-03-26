import React, { useState } from "react"

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

import { CATEGORY_TYPE, CategoryTypeEnum } from "@/constants/enum/Category"

import { useAddCategory } from "@/hooks/useCategory"

import {
  CreateUpdateCategoryType,
  createUpdateCategorySchema
} from "@/schemas/categorySchema"

interface AddCategoryDialogProps {
  isOpen: boolean
  onClose: () => void
}

function AddCategoryDialog({ isOpen, onClose }: AddCategoryDialogProps) {
  const { mutate: addCategory } = useAddCategory()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateUpdateCategoryType>({
    resolver: zodResolver(createUpdateCategorySchema),
    defaultValues: {
      type: CategoryTypeEnum.Food,
      name: "",
      description: ""
    }
  })

  const onSubmit = async (data: CreateUpdateCategoryType) => {
    setIsLoading(true)

    const finalData = data

    addCategory(finalData, {
      onSuccess: () => {
        onClose()
        reset()
        setIsLoading(false)
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Tạo danh mục</DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin để tạo danh mục mới.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <div className="space-y-2">
              <Label htmlFor="name">Nhập tên danh mục</Label>
              <Input
                id="name"
                type="text"
                placeholder="Nhập tên danh mục"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <div className="space-y-2">
              <Label htmlFor="type">Loại danh mục</Label>
              <Select
                onValueChange={(value) => {
                  const enumValue = Number(value) as CategoryTypeEnum
                  setValue("type", enumValue)
                }}
                defaultValue={CategoryTypeEnum.Food.toString()}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn loại danh mục" />
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
            </div>
            {errors.type && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.type.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              rows={2}
              placeholder="Nhập mô tả danh mục"
              {...register("description")}
            />
            {errors.description && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="mt-6 gap-4">
          <Button variant="secondary" size="lg" onClick={onClose}>
            Hủy
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? "Đang tạo..." : "Tạo danh mục"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoryDialog
