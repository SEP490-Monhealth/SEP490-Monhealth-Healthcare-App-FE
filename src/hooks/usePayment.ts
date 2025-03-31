import { useQuery } from "@tanstack/react-query"

import { PaymentStatusEnum } from "@/constants/enum/Payment"

import { PaymentType } from "@/schemas/paymentSchema"

import { fetchPaymentById, fetchPayments } from "@/services/paymentService"

interface PaymentsResponse {
  totalPages: number
  totalItems: number
  payments: PaymentType[]
}

export const usePayments = (
  page: number,
  limit?: number,
  search?: string,
  status?: PaymentStatusEnum
) =>
  useQuery<PaymentsResponse, Error>({
    queryKey: ["payments", page, limit, search, status],
    queryFn: () => fetchPayments(page, limit, search, status),
    staleTime: 1000 * 60 * 5
  })

export const usePaymentById = (paymentId: string) =>
  useQuery<PaymentType, Error>({
    queryKey: ["payment", paymentId],
    queryFn: () => fetchPaymentById(paymentId),
    enabled: !!paymentId
  })
