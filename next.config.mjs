import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // output: "export",
  // distDir: "out",

  // images: {
  //   unoptimized: true,
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "res.cloudinary.com",
  //       pathname: "/dbvh5i83q/**",
  //     },

  //     {
  //       protocol: "https",
  //       hostname: "www.rdspharma.online",
  //       pathname: "/cdn/shop/**",
  //     },
  //   ],
  // },
};

export default withNextIntl(nextConfig);
