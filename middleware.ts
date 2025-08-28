import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ['en', 'de', 'fr'];
const defaultLocale = 'en';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Пропускаем статические файлы, API и Next.js внутренние пути
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/__nextjs_original-stack-frame') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }
  
  // Проверяем, есть ли уже локаль в пути
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}`) && (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))
  );

  // Если локаль уже есть, продолжаем
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Для корневого пути и путей без локали - добавляем локаль
  let locale = defaultLocale;
  
  // Проверяем cookie
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    locale = cookieLocale;
  } else {
    // Определяем локаль по заголовку Accept-Language
    const acceptLanguage = req.headers.get("accept-language");
    if (acceptLanguage) {
      if (acceptLanguage.includes('de')) {
        locale = 'de';
      } else if (acceptLanguage.includes('fr')) {
        locale = 'fr';
      }
    }
  }
  
  // Создаем новый URL с локалью
  const newPathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
  const newUrl = new URL(newPathname, req.url);
  
  const response = NextResponse.redirect(newUrl);
  
  // Устанавливаем cookie с локалью
  response.cookies.set("NEXT_LOCALE", locale, { 
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });
  
  return response;
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
