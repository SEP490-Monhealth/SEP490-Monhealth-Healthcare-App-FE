import { useQuery } from "@tanstack/react-query"

import { BookingStatusEnum } from "@/constants/enum/Booking"

import { BookingType } from "@/schemas/bookingSchema"

import { fetchBookingById, fetchBookings } from "@/services/bookingService"

interface BookingsResponse {
  totalPages: number
  totalItems: number
  bookings: BookingType[]
}

export const useBookings = (
  page: number,
  limit: number,
  search?: string,
  status?: BookingStatusEnum
) =>
  useQuery<BookingsResponse, Error>({
    queryKey: ["bookings", page, limit, search, status],
    queryFn: () => fetchBookings(page, limit, search, status),
    staleTime: 1000 * 60 * 5
  })

export const useBookingById = (bookingId: string) =>
  useQuery<BookingType, Error>({
    queryKey: ["booking", bookingId],
    queryFn: () => fetchBookingById(bookingId),
    enabled: !!bookingId
  })
