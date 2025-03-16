import monAPI from "@/lib/monAPI"

import { CreateUpdateUserType, UserType } from "@/schemas/userSchema"

interface UsersResponse {
  totalPages: number
  totalItems: number
  users: UserType[]
}

export const fetchUsers = async (
  page: number,
  limit?: number,
  search?: string,
  role?: string,
  status?: boolean
): Promise<UsersResponse> => {
  try {
    const response = await monAPI.get(`/users`, {
      params: { page, limit, search, role, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch users")
    }

    const { totalPages, totalItems, items: users } = data
    return { totalPages, totalItems, users }
  } catch (error) {
    console.error("Error fetching users:", error)
    throw new Error("Failed to fetch users")
  }
}

export const fetchUserById = async (userId: string): Promise<UserType> => {
  try {
    const { data } = await monAPI.get(`/users/${userId}`)
    return data
  } catch (error) {
    console.error("Error fetching user by ID:", error)
    throw new Error("Failed to fetch user")
  }
}

export const addUser = async (
  newUserData: CreateUpdateUserType
): Promise<UserType> => {
  try {
    const { data } = await monAPI.post("/users", newUserData)
    return data
  } catch (error) {
    console.error("Error adding user:", error)
    throw new Error("Failed to add user")
  }
}
