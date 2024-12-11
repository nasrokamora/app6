import {withAuth} from "@kinde-oss/kinde-auth-nextjs/middleware";
export default function middleware(req) {
  return withAuth(req);
}
export const config = {
  matcher: ["/",
    "/movies/:path*",
    "/tv/:path*",
    '/((?!not-found|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',

  ]
};