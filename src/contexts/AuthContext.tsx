"use client"

import { createContext, useContext } from "react"

interface UserPayload {
  userId: string
  fullName: string
  email: string
  phoneNumber: string
  avatarUrl?: string
  role: string
}

interface AuthContextType {
  user: UserPayload | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
