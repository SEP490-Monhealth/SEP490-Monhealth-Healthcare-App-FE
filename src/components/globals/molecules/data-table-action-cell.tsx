"use client"

import { useState } from "react"

import { Ban, Circle, Copy, Eye, MoreHorizontal, Utensils } from "lucide-react"

import { Button } from "@/components/globals/atoms/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/globals/atoms/dropdown-menu"
import { Separator } from "@/components/globals/atoms/separator"

import ConfirmAlertDialog from "@/components/globals/molecules/confirm-alert-dialog"

interface DataTableActionsCellProps {
  id: string
  isActive: boolean
  onViewDetail: (id: string) => void
  onViewPortion?: (id: string) => void
  onUpdateStatus: (id: string) => void
  copyLabel?: string
  viewLabel?: string
  activateLabel?: string
  deactivateLabel?: string
  confirmTitle?: string
  getConfirmDescription?: (isActive: boolean) => string
}

const DataTableActionsCell = ({
  id,
  isActive,
  onViewDetail,
  onViewPortion,
  onUpdateStatus,
  copyLabel = "Sao chép mã",
  viewLabel = "Xem chi tiết",
  activateLabel = "Kích hoạt",
  deactivateLabel = "Ngừng hoạt động",
  confirmTitle = "Xác nhận thay đổi trạng thái",
  getConfirmDescription = (isActive) =>
    `Bạn có chắc muốn ${isActive ? "ngừng hoạt động" : "kích hoạt"} này?`
}: DataTableActionsCellProps) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false)

  const handleOpenAlert = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenAlert(true)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const handleConfirm = () => {
    onUpdateStatus(id)
    setOpenAlert(false)
  }

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
            <Copy className="h-4 w-4" />
            {copyLabel}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onViewDetail(id)}>
            <Eye className="h-4 w-4" />
            {viewLabel}
          </DropdownMenuItem>
          {onViewPortion && (
            <DropdownMenuItem onClick={() => onViewPortion(id)}>
              <Utensils className="h-4 w-4" />
              Xem khẩu phần
            </DropdownMenuItem>
          )}
          <Separator />
          <DropdownMenuItem
            variant={isActive ? "destructive" : "default"}
            onClick={handleOpenAlert}
          >
            {isActive ? (
              <>
                <Ban className="h-4 w-4" />
                {deactivateLabel}
              </>
            ) : (
              <>
                <Circle className="h-4 w-4" />
                {activateLabel}
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmAlertDialog
        open={openAlert}
        onOpenChange={handleCloseAlert}
        onConfirm={handleConfirm}
        title={confirmTitle}
        description={getConfirmDescription(isActive)}
      />
    </div>
  )
}

export default DataTableActionsCell
