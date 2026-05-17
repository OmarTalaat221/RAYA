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
import { getClientGeoHeaders } from "../../utils/serverHeaders";

export default async function HomePage() {
  let homeData = EMPTY_HOME_DATA;

  try {
    const geoHeaders = await getClientGeoHeaders({ debug: true });

    const response = await getHomeData(geoHeaders);
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
