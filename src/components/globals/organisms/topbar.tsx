import React from "react"

import { Bell, LogOut, Settings, User } from "lucide-react"

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
    <div className="sticky top-0 z-50 flex items-center justify-between bg-white px-6 py-2 shadow-sm">
      <h3 className="text-primary text-lg font-semibold select-none">Admin</h3>

      <div className="flex items-center gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Thông báo</DropdownMenuLabel>

            <DropdownMenuItem>
              Notifications will be displayed here.
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Avatar className="size-9">
              <AvatarImage
                src={
                  "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Monhealth%2Ftests%2Fangrycat.jpg?alt=media&token=542becf5-173f-47c2-951b-b9f79578fa60"
                }
                alt={getInitials("Van Huu Toan")}
              />
              <AvatarFallback>{getInitials("Van Huu Toan")}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          {/* <DropdownMenuContent align="end">
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
          </DropdownMenuContent> */}
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Topbar
