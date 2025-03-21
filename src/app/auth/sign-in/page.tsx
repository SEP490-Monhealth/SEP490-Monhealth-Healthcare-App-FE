"use client"

import React, { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
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

import { LoginUserType, loginUserSchema } from "@/schemas/userSchema"

function SignInPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginUserType>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "asd@gmail.com",
      password: "123As@"
    }
  })

  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  const onSubmit = async (data: LoginUserType) => {
    setIsLoading(true)

    try {
      const finalData = data
      console.log("Dữ liệu gửi đi:", JSON.stringify(finalData, null, 2))

      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Đăng nhập thành công!")
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error)
    } finally {
      setIsLoading(false)
    }
  }

  console.log(errors)

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[400px] py-12">
        <CardHeader>
          <CardTitle>Chào mừng trở lại</CardTitle>
          <CardDescription>
            Đăng nhập vào tài khoản quản trị viên
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="w-full space-y-4">
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
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={isVisible ? "text" : "password"}
                    placeholder="nguyenvana@gmail.com"
                    {...register("password")}
                  />
                  <button
                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 cursor-pointer items-center justify-center rounded-e-md transition-all duration-300 outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    aria-pressed={isVisible}
                    aria-controls="password"
                  >
                    {isVisible ? (
                      <EyeOff size={16} aria-hidden="true" />
                    ) : (
                      <Eye size={16} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="mt-1 ml-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="mt-2 w-full"
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignInPage
