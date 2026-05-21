import { NextResponse } from "next/server";

const LOCALE_PREFIX_RE = /^\/(ar|en)(?=\/|$)/;

export function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const match = pathname.match(LOCALE_PREFIX_RE);

  if (!match) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname.replace(LOCALE_PREFIX_RE, "") || "/";

  const response = NextResponse.redirect(url);
  response.cookies.set("NEXT_LOCALE", match[1], {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
