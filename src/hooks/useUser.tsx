import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { CreateUpdateUserType, UserType } from "@/schemas/userSchema"

import { addUser, fetchUserById, fetchUsers } from "@/services/userService"

interface UsersResponse {
  totalPages: number
  totalItems: number
  users: UserType[]
}

export const useUsers = (
  page: number,
  limit: number = 10,
  search?: string,
  role?: string,
  status?: boolean
) =>
  useQuery({
    queryKey: ["users", page, limit, search, role, status],
    queryFn: () => fetchUsers(page, limit, search, role, status),
    staleTime: 1000 * 60 * 5
  })

export const useUserById = (userId: string) =>
  useQuery<UserType, Error>({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
    enabled: !!userId
  })

export const useAddUser = () => {
  const queryClient = useQueryClient()

  return useMutation<UserType, Error, CreateUpdateUserType>({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    }
  })
}
