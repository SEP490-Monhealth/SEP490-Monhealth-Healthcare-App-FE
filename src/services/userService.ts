import { toast } from "sonner"

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
    const response = await monAPI.get(`/users/${userId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch user")
    }

    return data
  } catch (error) {
    console.error("Error fetching user by ID:", error)
    throw new Error("Failed to fetch user")
  }
}

export const addUser = async (
  newUserData: CreateUpdateUserType
): Promise<string> => {
  try {
    const response = await monAPI.post("/users", newUserData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to add user")
    }

    toast.success(message)
    return message
  } catch (error) {
    console.error("Error adding user:", error)
    throw new Error("Failed to add user")
  }
}

export const updateUserStatus = async (userId: string): Promise<void> => {
  try {
    const response = await monAPI.patch(`/users/${userId}/status`)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update user status")
    }

    toast.success(message)
    return message
  } catch (error) {
    console.error("Error updating user status:", error)
    throw new Error("Failed to update user status")
  }
}
