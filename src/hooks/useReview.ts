import { useQuery } from "@tanstack/react-query"

import { ReviewType } from "@/schemas/reviewSchema"

import {
  fetchReviewByBookingId,
  fetchReviewById,
  fetchReviews
} from "@/services/reviewService"

interface ReviewsResponse {
  totalPages: number
  totalItems: number
  reviews: ReviewType[]
}

export const useReviews = (
  page: number,
  limit?: number,
  search?: string,
  rating?: number
) =>
  useQuery<ReviewsResponse, Error>({
    queryKey: ["reviews", page, limit, search, rating],
    queryFn: () => fetchReviews(page, limit, search, rating),
    staleTime: 1000 * 60 * 5
  })

export const useReviewById = (reviewId: string) =>
  useQuery<ReviewType, Error>({
    queryKey: ["review", reviewId],
    queryFn: () => fetchReviewById(reviewId),
    enabled: !!reviewId,
    staleTime: 1000 * 60 * 5
  })

export const useReviewByBookingId = (bookingId: string) =>
  useQuery<ReviewType[], Error>({
    queryKey: ["review-booking", bookingId],
    queryFn: () => fetchReviewByBookingId(bookingId),
    enabled: !!bookingId,
    staleTime: 1000 * 60 * 5
  })
