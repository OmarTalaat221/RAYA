"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSProvider = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
      delay: 0,
      mirror: false,
    });
  }, []);

  useEffect(() => {
    // A slight delay ensures Next.js has painted the new layout before we trigger the smooth scroll to top
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
};

export default AOSProvider;
