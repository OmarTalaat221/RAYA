import { NextResponse } from "next/server";

const SUPPORTED_LOCALES = new Set(["ar", "en"]);

export async function POST(request) {
  let body = {};

  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const locale = SUPPORTED_LOCALES.has(body.locale) ? body.locale : "en";
  const response = NextResponse.json({ locale });

  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}
