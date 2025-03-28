import { toast } from "sonner"

import { PaymentStatusEnum } from "@/constants/enum/Payment"

import monAPI from "@/lib/monAPI"

import { PaymentType } from "@/schemas/paymentSchema"

interface PaymentsResponse {
  totalPages: number
  totalItems: number
  payments: PaymentType[]
}

export const fetchPayments = async (
  page: number,
  limit: number,
  search?: string,
  status?: PaymentStatusEnum
): Promise<PaymentsResponse> => {
  try {
    const response = await monAPI.get(`/payments`, {
      params: { page, limit, search, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch payments")
    }

    const { totalPages, totalItems, items: payments } = data
    return { totalPages, totalItems, payments }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch payments"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const fetchPaymentById = async (
  paymentId: string
): Promise<PaymentType> => {
  try {
    const response = await monAPI.get(`/payments/${paymentId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch payment")
    }

    return data
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch payment"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}
