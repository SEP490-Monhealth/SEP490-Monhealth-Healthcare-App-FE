import { useCallback } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const useUpdateParams = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateParams = useCallback(
    (key: string, value: string | number | boolean | undefined | null) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value !== null && value !== undefined && value !== "") {
        params.set(key, String(value))
      } else {
        params.delete(key)
      }

      if (key !== "page") {
        params.set("page", "1")
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname, searchParams]
  )

  const clearAllFilters = useCallback(
    (paramsToClear: string[] = []) => {
      const params = new URLSearchParams(searchParams.toString())

      paramsToClear.forEach((param) => params.delete(param))

      params.set("page", "1")

      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname, searchParams]
  )

  return { updateParams, clearAllFilters }
}
