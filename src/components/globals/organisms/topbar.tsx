import React from "react"

import { Bell } from "lucide-react"

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

function Topbar() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between bg-white px-6 py-2 shadow-sm">
      <h3 className="text-primary text-lg font-semibold select-none">SEP490</h3>

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
                src={"../../../../public/images/sep490-monhealth-logo.png"}
                alt={getInitials("Monhealth")}
              />
              <AvatarFallback>{getInitials("Monhealth")}</AvatarFallback>
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
