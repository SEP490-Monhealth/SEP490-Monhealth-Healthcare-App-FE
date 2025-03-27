import { useQuery } from "@tanstack/react-query"

import { ReviewType } from "@/schemas/reviewSchema"

import { fetchReviewById, fetchReviews } from "@/services/reviewService"

export const useReviews = (
  page: number,
  limit: number,
  search?: string,
  rating?: number
) =>
  useQuery({
    queryKey: ["reviews", page, limit, search, rating],
    queryFn: () => fetchReviews(page, limit, search, rating),
    staleTime: 1000 * 60 * 5
  })

export const useReviewById = (reviewId: string) =>
  useQuery<ReviewType, Error>({
    queryKey: ["review", reviewId],
    queryFn: () => fetchReviewById(reviewId),
    enabled: !!reviewId
  })
