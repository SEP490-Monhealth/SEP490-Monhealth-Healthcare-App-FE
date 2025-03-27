import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { CreatePortionType, PortionType } from "@/schemas/portionSchema"

import {
  addPortion,
  fetchPortionById,
  fetchPortions
} from "@/services/portionService"

export const usePortions = (
  page: number,
  limit: number,
  search?: string,
  sort?: string,
  order?: string
) =>
  useQuery({
    queryKey: ["portions", page, limit, search, sort, order],
    queryFn: () => fetchPortions(page, limit, search, sort, order),
    staleTime: 1000 * 60 * 5
  })

export const usePortionById = (portionId: string) =>
  useQuery<PortionType, Error>({
    queryKey: ["portion", portionId],
    queryFn: () => fetchPortionById(portionId),
    enabled: !!portionId
  })

export const useAddPortion = () => {
  const queryClient = useQueryClient()

  return useMutation<string, Error, CreatePortionType>({
    mutationFn: addPortion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portions"] })
    }
  })
}
