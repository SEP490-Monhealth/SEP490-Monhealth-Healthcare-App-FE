import axios from "axios"

const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION || ""

const monAPI = axios.create({
  baseURL: `${apiUrl}/${apiVersion}`,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json"
  }
})

monAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

monAPI.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized, refreshing token...")
    }
    return Promise.reject(error)
  }
)

export default monAPI
