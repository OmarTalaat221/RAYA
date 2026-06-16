import { NextResponse } from "next/server";

const LOCALE_PREFIX_RE = /^\/(ar|en)(?=\/|$)/;

const LEGACY_PRODUCT_REDIRECTS = {
  "/products/ivita-shower-filter-cherry-blossom":
    "/products/i-vita-vitamin-shower-filter-cherry-blossom",

  "/product/3-omniflex-flexvital-syrup-500ml":
    "/products/3-omniflex-flexvital-syrup-500ml-",
};

export function middleware(request) {
  const url = request.nextUrl.clone();
  const { pathname } = request.nextUrl;
  const hostname = request.nextUrl.hostname;

  /*
   * Canonical domain:
   * Force www.rdspharmaco.com to rdspharmaco.com
   */
  if (hostname === "www.rdspharmaco.com") {
    url.hostname = "rdspharmaco.com";
    return NextResponse.redirect(url, 301);
  }

  /*
   * Fix malformed inspected URLs like:
   * /https://rdspharmaco.com
   * /-https://rdspharmaco.com/product/example
   * /http://example.com
   */
  if (
    pathname.startsWith("/https:/") ||
    pathname.startsWith("/http:/") ||
    pathname.startsWith("/-https:/") ||
    pathname.startsWith("/-http:/")
  ) {
    const cleanedPath = pathname
      .replace(/^\/-?https?:\/+[^/]+/i, "")
      .trim();

    const targetPath = cleanedPath || "/";

    if (LEGACY_PRODUCT_REDIRECTS[targetPath]) {
      url.pathname = LEGACY_PRODUCT_REDIRECTS[targetPath];
    } else if (targetPath.startsWith("/product/")) {
      url.pathname = targetPath.replace(/^\/product\//, "/products/");
    } else {
      url.pathname = targetPath;
    }

    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  /*
   * Direct legacy URL redirects.
   */
  if (LEGACY_PRODUCT_REDIRECTS[pathname]) {
    url.pathname = LEGACY_PRODUCT_REDIRECTS[pathname];
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  /*
   * Generic old route:
   * /product/slug -> /products/slug
   */
  if (pathname.startsWith("/product/")) {
    url.pathname = pathname.replace(/^\/product\//, "/products/");
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  /*
   * Existing locale cleanup:
   * /ar/products/example -> /products/example
   * /en/products/example -> /products/example
   */
  const match = pathname.match(LOCALE_PREFIX_RE);

  if (!match) {
    return NextResponse.next();
  }

  url.pathname = pathname.replace(LOCALE_PREFIX_RE, "") || "/";

  const response = NextResponse.redirect(url, 301);

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