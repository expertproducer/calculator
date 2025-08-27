import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // Проверяем только корневой путь
  if (url.pathname === "/") {
    const cookie = req.cookies.get("NEXT_LOCALE")?.value;
    
    // Если нет сохраненной локали, определяем по Accept-Language
    if (!cookie) {
      const lang = req.headers.get("accept-language") || "";
      let targetLocale = "/";
      
      if (lang.startsWith("de")) {
        targetLocale = "/de/";
      } else if (lang.startsWith("fr")) {
        targetLocale = "/fr/";
      }
      
      // Редиректим только если нужно изменить язык
      if (targetLocale !== "/") {
        const response = NextResponse.redirect(new URL(targetLocale, url));
        response.cookies.set("NEXT_LOCALE", targetLocale === "/de/" ? "de" : "fr", { 
          path: "/",
          maxAge: 60 * 60 * 24 * 365, // 1 год
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax"
        });
        return response;
      }
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
