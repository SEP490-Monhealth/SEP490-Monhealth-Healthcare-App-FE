"use client"

import React, { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/atoms/dialog"

import { useAddUser } from "@/hooks/useUser"

import {
  CreateUpdateUserType,
  createUpdateUserSchema,
  roles
} from "@/schemas/userSchema"

import { Button } from "../atoms/button"
import { Input } from "../atoms/input"
import { Label } from "../atoms/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "../atoms/select"
import { Switch } from "../atoms/switch"

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
      const finalData = { ...data, status: isActive }
      console.log("Dữ liệu gửi đi:", JSON.stringify(finalData, null, 2))

      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Tạo tài khoản thành công!")
      onClose()
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
          <DialogTitle>Tạo tài khoản người dùng</DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin để tạo tài khoản người dùng mới.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Nguyễn Văn A"
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
                  placeholder="nguyenvana@gmail.com"
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
                  placeholder="0123456789"
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
                <Label htmlFor="avatarUrl">Avatar (Tùy chọn)</Label>
                <Input
                  id="avatarUrl"
                  type="text"
                  placeholder="https://example.com/avatar.png"
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

            <Button type="submit" disabled={isLoading} size="lg">
              {isLoading ? "Đang tạo..." : "Tạo tài khoản"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddUserDialog
