import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Проверяем, есть ли уже локаль в пути
  const pathnameHasLocale = ['/en', '/de', '/fr'].some(
    (locale) => pathname.startsWith(locale + '/') || pathname === locale
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Редирект с корня на локализованную версию
  if (pathname === '/') {
    const cookie = req.cookies.get("NEXT_LOCALE")?.value;
    
    if (!cookie) {
      const acceptLang = req.headers.get("accept-language") || "";
      let locale = 'en'; // по умолчанию английский
      
      if (acceptLang.startsWith("de")) {
        locale = 'de';
      } else if (acceptLang.startsWith("fr")) {
        locale = 'fr';
      }
      
      if (locale !== 'en') {
        const response = NextResponse.redirect(new URL(`/${locale}`, req.url));
        response.cookies.set("NEXT_LOCALE", locale, { 
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax"
        });
        return response;
      }
    } else if (cookie && cookie !== 'en') {
      return NextResponse.redirect(new URL(`/${cookie}`, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
