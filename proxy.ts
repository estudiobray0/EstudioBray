import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname.length > 1 && url.pathname.endsWith(".")) {
    url.pathname = url.pathname.replace(/\.+$/, "");
    return NextResponse.redirect(url);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/", "/((?!_next|_vercel|.*\\..*).*)", "/es.", "/en."],
};
