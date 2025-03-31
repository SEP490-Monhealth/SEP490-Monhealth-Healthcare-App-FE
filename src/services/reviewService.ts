import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import { ReviewType } from "@/schemas/reviewSchema"

interface ReviewsResponse {
  totalPages: number
  totalItems: number
  reviews: ReviewType[]
}

export const fetchReviews = async (
  page: number,
  limit?: number,
  search?: string,
  rating?: number
): Promise<ReviewsResponse> => {
  try {
    const response = await monAPI.get(`/reviews`, {
      params: { page, limit, search, rating }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch reviews")
    }

    const { totalPages, totalItems, items: reviews } = data
    return { totalPages, totalItems, reviews }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch reviews"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const fetchReviewById = async (
  reviewId: string
): Promise<ReviewType> => {
  try {
    const response = await monAPI.get(`/reviews/${reviewId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch review")
    }

    return data
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch review"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}
