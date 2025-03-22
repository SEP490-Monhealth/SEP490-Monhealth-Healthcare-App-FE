import { useQuery } from "@tanstack/react-query"

import { BookingType } from "@/schemas/bookingSchema"

import { fetchBookingById, fetchBookings } from "@/services/bookingService"

export const useUsers = (page: number, limit?: number, search?: string) =>
  useQuery({
    queryKey: ["bookings", page, limit, search],
    queryFn: () => fetchBookings(page, limit, search),
    staleTime: 1000 * 60 * 5
  })

export const useUserById = (bookingId: string) =>
  useQuery<BookingType, Error>({
    queryKey: ["booking", bookingId],
    queryFn: () => fetchBookingById(bookingId),
    enabled: !!bookingId
  })
