import "~/public/main-assets/css/fontawesome.min.css";
import "~/public/main-assets/css/nice-select.min.css";
import "~/public/main-assets/css/remixicon.css";
import "~/public/main-assets/css/slick.min.css";
import "~/public/main-assets/css/style.css";
import "~/public/main-assets/css/react-adjustment.css";
import "./globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Poppins, EB_Garamond, Oswald, Cairo, Almarai } from "next/font/google";

import ReduxProvider from "../store/ReduxProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-garamond",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-oswald",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cairo",
});

const almarai = Almarai({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "700", "800"],
  display: "swap",
  variable: "--font-almarai",
});

export const metadata = {
  title: "Raya Pharmacy",
  description: "Raya Pharmacy",
  icons: {
    icon: [
      { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon.png" },
    ],
    apple: [{ rel: "apple-touch-icon", sizes: "180x180", url: "/favicon.png" }],
    shortcut: [{ rel: "shortcut icon", url: "/favicon.png" }],
  },
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${poppins.variable} ${ebGaramond.variable} ${oswald.variable} ${cairo.variable} ${almarai.variable}`}
    >
      <body>
        <ReduxProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}