import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("accessToken")?.value

    if (!token) {
      const signInUrl = req.nextUrl.clone()
      signInUrl.pathname = "/auth/sign-in"
      return NextResponse.redirect(signInUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"]
}
