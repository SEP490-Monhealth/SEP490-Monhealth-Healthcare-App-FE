"use client"

import React, { useState } from "react"

import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/atoms/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/atoms/card"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { Switch } from "@/components/atoms/switch"
import Breadcrumbs from "@/components/molecules/breadcrumb"

import {
  CreateUpdateUserType,
  createUpdateUserSchema
} from "@/schemas/userSchema"

function UserCreatePage() {
  const router = useRouter()

  const [isActive, setIsActive] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUpdateUserType>({
    resolver: zodResolver(createUpdateUserSchema)
    // defaultValues: {
    //   fullName: "Van Huu Toan",
    //   email: "vanhuutoan27@gmail.com",
    //   phoneNumber: "0792766979",
    //   avatarUrl: "",
    //   status: isActive
    // }
  })

  const breadcrumbItems = [
    { label: "Bảng điều khiển", href: "#" },
    { label: "Người dùng", href: "#" },
    { label: "Tạo người dùng", isCurrentPage: true }
  ]

  const onSubmit = (data: CreateUpdateUserType) => {
    const finalData = { ...data, status: isActive }

    console.log(finalData)
  }

  console.log(errors)

  return (
    <div className="space-y-10">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-center justify-center">
        <Card className="w-4xl space-y-4">
          <CardHeader>
            <CardTitle>Tạo tài khoản người dùng</CardTitle>
            <CardDescription>
              Vui lòng điền đầy đủ thông tin để tạo tài khoản người dùng mới.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Họ tên</Label>
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
              </div>

              <Card className="gap-0">
                <CardHeader>
                  <CardTitle>Trạng thái</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">
                    Người dùng có thể đăng nhập nếu được kích hoạt
                  </p>

                  <Switch
                    id="isActive"
                    checked={isActive}
                    onCheckedChange={(checked) => setIsActive(checked)}
                  />
                </CardContent>
              </Card>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="secondary" size="lg">
                Hủy
              </Button>

              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? "Đang tạo..." : "Tạo tài khoản"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default UserCreatePage
