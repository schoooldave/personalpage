import { NextRequest, NextResponse } from "next/server";

const localePattern = /^\/(en|ja)(?=\/|$)/;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const match = pathname.match(localePattern);
  if (!match) return NextResponse.next();

  const locale = match[1];
  const rewritten = request.nextUrl.clone();
  rewritten.pathname = pathname.replace(localePattern, "") || "/";

  const response = NextResponse.rewrite(rewritten);
  response.headers.set("x-site-locale", locale);
  return response;
}

export const config = {
  matcher: ["/en/:path*", "/ja/:path*"],
};
