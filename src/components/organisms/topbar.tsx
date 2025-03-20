import React from "react"

import { LogOut, MoreHorizontal, Settings, User } from "lucide-react"

import { getInitials } from "@/utils/helpers"

import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar"
import { Button } from "../atoms/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "../atoms/dropdown-menu"
import { Separator } from "../atoms/separator"

function Topbar() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-end bg-white px-6 py-2 shadow-sm">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar className="size-10">
            <AvatarImage
              src={
                "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Monhealth%2Ftests%2Fangrycat.jpg?alt=media&token=542becf5-173f-47c2-951b-b9f79578fa60"
              }
              alt={getInitials("Van Huu Toan")}
            />
            <AvatarFallback>{getInitials("Van Huu Toan")}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>

          <DropdownMenuItem>
            <User className="h-4 w-4" />
            Xem hồ sơ
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="h-4 w-4" />
            Cài đặt
          </DropdownMenuItem>

          <Separator />

          <DropdownMenuItem
            variant="destructive"
            onClick={() => console.log("Đăng xuất")}
          >
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Topbar
