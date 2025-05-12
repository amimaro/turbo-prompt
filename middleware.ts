import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthenticated = !!token

  // Paths that require authentication
  const authRoutes = ["/dashboard", "/templates"]

  // Check if the path requires authentication
  const requiresAuth = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  // If the path requires auth and the user is not authenticated, redirect to signin
  if (requiresAuth && !isAuthenticated) {
    const signInUrl = new URL("/auth/signin", request.url)
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  // If the user is authenticated and trying to access signin page, redirect to dashboard
  if (isAuthenticated && request.nextUrl.pathname === "/auth/signin") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/templates/:path*", "/auth/signin"],
}
