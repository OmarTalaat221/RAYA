// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

import Footer from "../../components/Footer";
import Header from "../../sections/Common/Header/Header";

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer logoSrc="https://res.cloudinary.com/dbvh5i83q/image/upload/v1776082859/rds_logo_xpmbfn.webp" />
    </>
  );
}
