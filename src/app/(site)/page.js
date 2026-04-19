import HeroBanner from "../../components/HeroBanner";
import SpecialOffer from "../../sections/Home/SpecialOffer";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Collections from "../../components/Collections/Collections.jsx";
import BlogSection from "../../components/Blog/BlogSection.jsx";

export default function HomePage() {
  return (
    <div style={{ overflow: "hidden" }}>
      <HeroBanner />
      <SpecialOffer />
      <FeaturedProducts />
      <Collections />
      <BlogSection />
    </div>
  );
}
