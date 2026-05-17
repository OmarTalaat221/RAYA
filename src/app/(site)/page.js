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


export default async function HomePage() {
  let homeData = EMPTY_HOME_DATA;

  try {
    const response = await getHomeData();
    homeData = adaptHomeResponse(response, "en");
  } catch (error) {
    console.error("[HomePage] failed to fetch home data:", error);
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <HeroBanner banners={homeData.banners} />
      <SpecialOffer />
      <FeaturedProducts products={homeData.products} />
      <Collections categories={homeData.categories} />
      <BlogSection blogs={homeData.blogs} />
    </div>
  );
}
