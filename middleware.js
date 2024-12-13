import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";



export default async function middleware(req) {
  return withAuth(req);
}


export const config = {
  matcher: ["/Profile",
      "/movies/:path*",
      "/person/:path*",
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|_not-found|$).*)',

  ]
}