import { NextResponse } from "next/server";

const LOCALE_PREFIX_RE = /^\/(ar|en)(?=\/|$)/;

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const hostname = request.nextUrl.hostname;

  const url = request.nextUrl.clone();


  if (pathname.startsWith("/https:/") || pathname.startsWith("/http:/")) {
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url, 301);
  }


  if (hostname === "www.rdspharmaco.com") {
    url.hostname = "rdspharmaco.com";
    return NextResponse.redirect(url, 301);
  }

  /*
   * Existing locale cleanup:
   * /ar/products/example -> /products/example
   * /en/products/example -> /products/example
   * And save locale in cookie.
   */
  const match = pathname.match(LOCALE_PREFIX_RE);

  if (!match) {
    return NextResponse.next();
  }

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