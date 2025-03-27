import { toast } from "sonner"

import { BookingStatusEnum } from "@/constants/enum/Booking"

import monAPI from "@/lib/monAPI"

import { BookingType } from "@/schemas/bookingSchema"

interface BookingsResponse {
  totalPages: number
  totalItems: number
  bookings: BookingType[]
}

export const fetchBookings = async (
  page: number,
  limit: number,
  search?: string,
  status?: BookingStatusEnum
): Promise<BookingsResponse> => {
  try {
    const response = await monAPI.get(`/bookings`, {
      params: { page, limit, search, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch bookings")
    }

    const { totalPages, totalItems, items: bookings } = data
    return { totalPages, totalItems, bookings }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch bookings"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const fetchBookingById = async (
  bookingId: string
): Promise<BookingType> => {
  try {
    const response = await monAPI.get(`/bookings/${bookingId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch booking")
    }

    return data
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch booking"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}
