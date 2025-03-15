import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("auth_token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"]
}
