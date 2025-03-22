import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import { ReviewType } from "@/schemas/reviewSchema"

interface RatingsResponse {
  totalPages: number
  totalItems: number
  reviews: ReviewType[]
}

export const fetchReviews = async (
  page: number,
  limit?: number,
  rating?: number
): Promise<RatingsResponse> => {
  try {
    const response = await monAPI.get(`/reviews`, {
      params: { page, limit, rating }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch reviews")
    }

    const { totalPages, totalItems, items: reviews } = data
    return { totalPages, totalItems, reviews }
  } catch (error) {
    console.error("Error fetching reviews:", error)
    throw new Error("Failed to fetch reviews")
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
  } catch (error) {
    console.error("Error fetching review by ID:", error)
    throw new Error("Failed to fetch review")
  }
}
