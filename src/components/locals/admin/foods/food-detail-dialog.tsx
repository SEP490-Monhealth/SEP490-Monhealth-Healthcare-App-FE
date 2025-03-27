"use client"

import React from "react"

import { Button } from "@/components/globals/atoms/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/globals/atoms/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/globals/atoms/tabs"

import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import { useFoodById } from "@/hooks/useFood"
import { useNutritionByFoodId } from "@/hooks/useNutrition"
import { usePortionsByFoodId } from "@/hooks/usePortion"

import FoodDetailTabDialog from "./food-detail-tab-dialog"
import FoodNutritionTabDialog from "./food-nutrition-tab-dialog"
import FoodPortionTabDialog from "./food-portion-tab-dialog"

interface FoodDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  foodId: string | null
}

function FoodDetailDialog({ isOpen, onClose, foodId }: FoodDetailDialogProps) {
  const {
    data: foodData,
    isLoading: isFoodLoading,
    error: foodError
  } = useFoodById(foodId || "")

  const {
    data: nutritionData,
    isLoading: isNutritionLoading,
    error: nutritionError
  } = useNutritionByFoodId(foodId || "")

  const {
    data: portionsData,
    isLoading: isPortionsLoading,
    error: portionsError
  } = usePortionsByFoodId(foodId || "")

  const isLoading = isFoodLoading || isNutritionLoading || isPortionsLoading
  const hasError = foodError || nutritionError || portionsError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết món ăn</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của món ăn.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !foodData ? (
          <ErrorDialog
            message={
              (foodError || nutritionError)?.message || "Không thể tải dữ liệu."
            }
          />
        ) : (
          <Tabs defaultValue="food-detail">
            <TabsList className="h-auto w-full rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="food-detail"
                className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Thông tin
              </TabsTrigger>
              <TabsTrigger
                value="food-nutrition"
                className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Dinh dưỡng
              </TabsTrigger>
              <TabsTrigger
                value="food-portions"
                className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Khẩu phần
              </TabsTrigger>
            </TabsList>

            <TabsContent value="food-detail" className="w-full">
              <FoodDetailTabDialog foodData={foodData} />
            </TabsContent>

            <TabsContent value="food-nutrition" className="w-full">
              {nutritionData && (
                <FoodNutritionTabDialog nutritionData={nutritionData} />
              )}
            </TabsContent>

            <TabsContent value="food-portions" className="w-full">
              <FoodPortionTabDialog portionsData={portionsData || []} />
            </TabsContent>
          </Tabs>
        )}

        <DialogFooter>
          <Button onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FoodDetailDialog
