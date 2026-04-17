import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  const locale = cookieLocale === "ar" ? "ar" : "en";

  return {
    locale,
    messages: (await import(`./src/locales/${locale}.json`)).default,
  };
});
