import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { CategoryTypeEnum } from "@/constants/enum/Category"

import {
  CategoryType,
  CreateUpdateCategoryType
} from "@/schemas/categorySchema"

import {
  addCategory,
  fetchCategories,
  fetchCategoryById,
  updateCategory
} from "@/services/categoryService"

export const useCategories = (
  page: number,
  limit: number,
  type?: CategoryTypeEnum,
  search?: string
) =>
  useQuery({
    queryKey: ["categories", page, limit, type, search],
    queryFn: () => fetchCategories(page, limit, type, search),
    staleTime: 1000 * 60 * 5
  })

export const useCategoryById = (categoryId: string) =>
  useQuery<CategoryType, Error>({
    queryKey: ["category", categoryId],
    queryFn: () => fetchCategoryById(categoryId),
    enabled: !!categoryId
  })

export const useAddCategory = () => {
  const queryClient = useQueryClient()

  return useMutation<string, Error, CreateUpdateCategoryType>({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add category")
    }
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation<
    string,
    Error,
    { categoryId: string; updatedData: CreateUpdateCategoryType }
  >({
    mutationFn: ({ categoryId, updatedData }) =>
      updateCategory(categoryId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      queryClient.invalidateQueries({ queryKey: ["category"] })
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update category")
    }
  })
}
