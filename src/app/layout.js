// import "~/public/main-assets/css/bootstrap.min.css";
// import "~/public/main-assets/css/bootstrap.rtl.min.css";
import "~/public/main-assets/css/fontawesome.min.css";
import "~/public/main-assets/css/nice-select.min.css";
import "~/public/main-assets/css/remixicon.css";
import "~/public/main-assets/css/slick.min.css";
import "~/public/main-assets/css/style.css";
import "~/public/main-assets/css/react-adjustment.css";
import "~/public/main-assets/css/fonts.css";
import "./globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import AOSProvider from "../components/AOSProvider";
import Header from "../sections/Common/Header/Header";
import StoreProvider from "../features/StoreProvider";
import Footer from "../components/Footer/Footer";

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
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StoreProvider>
            <AOSProvider>
              {/* <Header /> */}

              {children}

              {/* <Footer
                logoSrc="https://res.cloudinary.com/dbvh5i83q/image/upload/v1776082859/rds_logo_xpmbfn.webp"
                store={{
                  name: "RDS Pharma",
                  address: {
                    en: "Nasr City, Cairo, Egypt",
                    ar: "مدينة نصر، القاهرة، مصر",
                  },
                  phone: "+20 101 234 5678",
                  email: "care@rdspharma.com",
                }}
              /> */}

              {/* <FloatingSocialButton /> */}
            </AOSProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
