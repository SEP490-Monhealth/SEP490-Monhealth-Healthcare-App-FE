import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import {
  CategoryType,
  CreateUpdateCategoryType
} from "@/schemas/categorySchema"

interface CategoriesResponse {
  totalPages: number
  totalItems: number
  categories: CategoryType[]
}

export const fetchCategories = async (
  page: number,
  limit: number,
  type?: number,
  search?: string
): Promise<CategoriesResponse> => {
  try {
    const response = await monAPI.get(`/categories`, {
      params: { page, limit, type, search }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch categories")
    }

    const { totalPages, totalItems, items: categories } = data
    return { totalPages, totalItems, categories }
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw new Error("Failed to fetch categories")
  }
}

export const fetchCategoryById = async (
  categoryId: string
): Promise<CategoryType> => {
  try {
    const response = await monAPI.get(`/categories/${categoryId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch category")
    }

    return data
  } catch (error) {
    console.error("Error fetching category by ID:", error)
    throw new Error("Failed to fetch category")
  }
}

export const addCategory = async (
  newData: CreateUpdateCategoryType
): Promise<string> => {
  try {
    const response = await monAPI.post("/categories", newData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to add category")
    }

    toast.success(message)
    return message
  } catch (error) {
    console.error("Error adding category:", error)
    throw new Error("Failed to add category")
  }
}

export const updateCategory = async (
  categoryId: string,
  updatedData: CreateUpdateCategoryType
): Promise<string> => {
  try {
    const response = await monAPI.put(`/categories/${categoryId}`, updatedData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update category")
    }

    toast.success(message)
    return message
  } catch (error) {
    console.error("Error updating category:", error)
    throw new Error("Failed to update category")
  }
}
