"use client"

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
import { Switch } from "@/components/globals/atoms/switch"

import { useAddUser } from "@/hooks/useUser"

import {
  CreateUpdateUserType,
  createUpdateUserSchema,
  roles
} from "@/schemas/userSchema"

interface AddUserDialogProps {
  isOpen: boolean
  onClose: () => void
}

function AddUserDialog({ isOpen, onClose }: AddUserDialogProps) {
  const { mutate: addUser } = useAddUser()

  const [isActive, setIsActive] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateUpdateUserType>({
    resolver: zodResolver(createUpdateUserSchema),
    defaultValues: {
      fullName: "Van Huu Toan",
      email: "vanhuutoan27@gmail.com",
      phoneNumber: "0792766979",
      avatarUrl: "",
      role: roles[0],
      status: isActive
    }
  })

  const onSubmit = async (data: CreateUpdateUserType) => {
    setIsLoading(true)

    try {
      const finalData = data
      console.log("Dữ liệu gửi đi:", JSON.stringify(finalData, null, 2))

      await addUser(finalData, {
        onSuccess: () => {
          onClose()
          reset()
        }
      })
    } catch (error) {
      console.error("Lỗi khi tạo tài khoản:", error)
    } finally {
      setIsLoading(false)
    }
  }

  console.log(errors)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Tạo người dùng</DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin để tạo người dùng mới.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4">
          <div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ và tên</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Nhập họ và tên"
                {...register("fullName")}
              />
            </div>

            {errors.fullName && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Nhập email"
                {...register("email")}
              />
            </div>

            {errors.email && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Số điện thoại</Label>
              <Input
                id="phoneNumber"
                type="text"
                placeholder="Nhập số điện thoại"
                {...register("phoneNumber")}
              />
            </div>

            {errors.phoneNumber && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Ảnh đại diện (Tùy chọn)</Label>
              <Input
                id="avatarUrl"
                type="text"
                placeholder="Nhập đường dẫn ảnh đại diện"
                {...register("avatarUrl")}
              />
            </div>

            {errors.avatarUrl && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.avatarUrl.message}
              </p>
            )}
          </div>

          <div>
            <div className="space-y-2">
              <Label htmlFor="role">Vai trò</Label>
              <Select
                onValueChange={(value) => setValue("role", value)}
                defaultValue={roles[0]}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Vai trò</SelectLabel>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {errors.role && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.role.message}
              </p>
            )}
          </div>

          <div className="pt-4">
            <div className="space-y-2">
              <div className="border-input has-data-[state=checked]:border-ring relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                <div className="grid grow gap-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <p className="text-muted-foreground text-sm">
                    Người dùng có thể đăng nhập sau khi tạo tài khoản thành
                    công.
                  </p>
                </div>

                <Switch
                  id="status"
                  checked={isActive}
                  onCheckedChange={(checked) => setIsActive(checked)}
                  className="after:absolute after:inset-0"
                />
              </div>
            </div>

            {errors.status && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.status.message}
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
            {isLoading ? "Đang tạo..." : "Tạo tài khoản"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddUserDialog
