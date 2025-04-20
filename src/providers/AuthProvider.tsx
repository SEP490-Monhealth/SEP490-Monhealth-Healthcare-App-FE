"use client"

import { ReactNode, useCallback, useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import axios from "axios"
import Cookies from "js-cookie"

import { AuthContext } from "@/contexts/AuthContext"

import monAPI from "@/lib/monAPI"

interface UserPayload {
  userId: string
  fullName: string
  email: string
  phoneNumber: string
  avatarUrl?: string
  role: string
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter()

  const [user, setUser] = useState<UserPayload | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const fetchUserData = useCallback(async () => {
    try {
      const response = await monAPI.get("/auth/me")
      setUser(response.data.user)
      setIsAuthenticated(true)
      return response.data.user
    } catch (error) {
      console.error("Failed to fetch user data:", error)
      throw error
    }
  }, [])

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const token = Cookies.get("accessToken")

        if (!token) {
          setLoading(false)
          return
        }

        monAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`
        await fetchUserData()
        setLoading(false)
      } catch (error) {
        console.error("Session check failed:", error)
        Cookies.remove("accessToken")
        delete monAPI.defaults.headers.common["Authorization"]
        setLoading(false)
      }
    }

    checkUserSession()
  }, [fetchUserData])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await monAPI.post("/auth/admin/login", {
        email,
        password
      })

      const { accessToken } = response.data.data

      Cookies.set("accessToken", accessToken, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
      })

      monAPI.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      await fetchUserData()

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Đăng nhập thất bại"
        setError(errorMessage)
        throw new Error(errorMessage)
      }

      setError("An unknown error occurred")
      throw new Error("An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    Cookies.remove("accessToken")
    delete monAPI.defaults.headers.common["Authorization"]
    setUser(null)
    setIsAuthenticated(false)
    router.push("/auth/sign-in")
  }

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
