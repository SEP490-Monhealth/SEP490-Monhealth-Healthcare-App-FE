import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { CreateUserType, UserType } from "@/schemas/userSchema"

import {
  addUser,
  fetchUserById,
  fetchUsers,
  updateUserStatus
} from "@/services/userService"

interface UsersResponse {
  totalPages: number
  totalItems: number
  users: UserType[]
}

export const useUsers = (
  page: number,
  limit?: number,
  search?: string,
  role?: string,
  sort?: string,
  order?: string,
  status?: boolean
) =>
  useQuery<UsersResponse, Error>({
    queryKey: ["users", page, limit, search, role, sort, order, status],
    queryFn: () => fetchUsers(page, limit, search, role, sort, order, status),
    staleTime: 1000 * 60 * 5
  })

export const useUserById = (userId: string) =>
  useQuery<UserType, Error>({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })

export const useAddUser = () => {
  const queryClient = useQueryClient()

  return useMutation<string, Error, CreateUserType>({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    }
  })
}

export const useUserStatus = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { userId: string }>({
    mutationFn: ({ userId }) => updateUserStatus(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    }
  })
}
