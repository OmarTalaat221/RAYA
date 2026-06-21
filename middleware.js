import { NextResponse } from "next/server";

const LOCALE_PREFIX_RE = /^\/(ar|en)(?=\/|$)/;

const LEGACY_PRODUCT_REDIRECTS = {
  "/products/ivita-shower-filter-cherry-blossom":
    "/products/i-vita-vitamin-shower-filter-cherry-blossom",
  "/product/3-omniflex-flexvital-syrup-500ml":
    "/products/3-omniflex-flexvital-syrup-500ml-",
};

const NOINDEX_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/profile",
  "/account",
  "/orders",
  "/addresses",
  "/wishlist",
  "/change-password",
  "/cart",
  "/checkout",
  "/search",
];

function isNoIndexPath(pathname) {
  return NOINDEX_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function addNoIndexHeader(response) {
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export function middleware(request) {
  const url = request.nextUrl.clone();
  const { pathname } = request.nextUrl;
  const hostname = request.nextUrl.hostname;

  if (hostname === "www.rdspharmaco.com") {
    url.hostname = "rdspharmaco.com";
    return NextResponse.redirect(url, 301);
  }

  if (
    pathname.startsWith("/https:/") ||
    pathname.startsWith("/http:/") ||
    pathname.startsWith("/-https:/") ||
    pathname.startsWith("/-http:/")
  ) {
    const cleanedPath = pathname.replace(/^\/-?https?:\/+[^/]+/i, "").trim();

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

  if (LEGACY_PRODUCT_REDIRECTS[pathname]) {
    url.pathname = LEGACY_PRODUCT_REDIRECTS[pathname];
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith("/product/")) {
    url.pathname = pathname.replace(/^\/product\//, "/products/");
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  const match = pathname.match(LOCALE_PREFIX_RE);

  if (match) {
    const normalizedPathname = pathname.replace(LOCALE_PREFIX_RE, "") || "/";
    url.pathname = normalizedPathname;

    const response = NextResponse.redirect(url, 301);

    response.cookies.set("NEXT_LOCALE", match[1], {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return isNoIndexPath(normalizedPathname)
      ? addNoIndexHeader(response)
      : response;
  }

  const response = NextResponse.next();

  if (isNoIndexPath(pathname)) {
    return addNoIndexHeader(response);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
