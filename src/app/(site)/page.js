import HeroBanner from "../../components/HeroBanner";
import SpecialOffer from "../../sections/Home/SpecialOffer";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Collections from "../../components/Collections/Collections.jsx";
import BlogSection from "../../components/Blog/BlogSection.jsx";
import { getHomeData } from "../../services/home.service";
import {
  adaptHomeResponse,
  EMPTY_HOME_DATA,
} from "../../sections/Home/home.adapter";
import { headers } from "next/headers";

export default async function HomePage() {
  let homeData = EMPTY_HOME_DATA;

  try {
    const headersList = headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    
    const extraHeaders = {};
    if (forwardedFor) extraHeaders["x-forwarded-for"] = forwardedFor;
    if (realIp) extraHeaders["x-real-ip"] = realIp;

    const response = await getHomeData(extraHeaders);
    homeData = adaptHomeResponse(response, "en");
  } catch (error) {
    console.error("[HomePage] failed to fetch home data:", error);
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <HeroBanner banners={homeData.banners} />
      <SpecialOffer />
      <FeaturedProducts products={homeData.products} />
      <Collections />
      <BlogSection blogs={homeData.blogs} />
    </div>
  );
}
