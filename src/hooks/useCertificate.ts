import { useQuery } from "@tanstack/react-query"

import { CertificateType } from "@/schemas/certificateSchema"

import {
  fetchCertificateByConsultantId,
  fetchCertificateById,
  fetchCertificates
} from "@/services/certificateService"

interface CertificatesResponse {
  totalPages: number
  totalItems: number
  certificates: CertificateType[]
}

export const useCertificates = (
  page: number,
  limit?: number,
  search?: string,
  verified?: boolean
) =>
  useQuery<CertificatesResponse, Error>({
    queryKey: ["certificates", page, limit, search, verified],
    queryFn: () => fetchCertificates(page, limit, search, verified),
    staleTime: 1000 * 60 * 5
  })

export const useCertificateById = (certificateId: string) =>
  useQuery<CertificateType, Error>({
    queryKey: ["certificate", certificateId],
    queryFn: () => fetchCertificateById(certificateId),
    enabled: !!certificateId,
    staleTime: 1000 * 60 * 5
  })

export const useCertificateByConsultantId = (consultantId: string) =>
  useQuery<CertificateType[], Error>({
    queryKey: ["certificate-consultant", consultantId],
    queryFn: () => fetchCertificateByConsultantId(consultantId),
    enabled: !!consultantId,
    staleTime: 1000 * 60 * 5
  })
