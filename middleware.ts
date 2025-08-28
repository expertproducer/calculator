import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ['en', 'de', 'fr'];
const defaultLocale = 'en';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Проверяем, есть ли уже локаль в пути
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Обработка корневого пути
  if (pathname === '/') {
    const cookie = req.cookies.get("NEXT_LOCALE")?.value;
    
    if (!cookie) {
      const acceptLang = req.headers.get("accept-language") || "";
      let locale = defaultLocale;
      
      if (acceptLang.startsWith("de")) {
        locale = 'de';
      } else if (acceptLang.startsWith("fr")) {
        locale = 'fr';
      }
      
      if (locale !== defaultLocale) {
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
    } else if (cookie && cookie !== defaultLocale) {
      return NextResponse.redirect(new URL(`/${cookie}`, req.url));
    }
  }

  // Редирект для старых путей без локали
  if (pathname === '/cookies' || pathname === '/privacy') {
    const cookie = req.cookies.get("NEXT_LOCALE")?.value || defaultLocale;
    return NextResponse.redirect(new URL(`/${cookie}${pathname}`, req.url));
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
