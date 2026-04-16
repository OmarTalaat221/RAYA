import Header from "../sections/Common/Header/Header";
import PageBanner from "../components/PagesBanner";
import HeroContent from "~/sections/HeroContent";
import AboutSection from "~/sections/Home/About";
import LegalitySection from "~/sections/Home/LegalitySection";
import ServicesSection from "~/sections/Home/Services";
import GallerySection from "~/sections/Home/GallerySection";
import PackagesSection from "~/sections/Home/PackagesSection";
import AppDownloadSection from "~/sections/Home/AppDownloadSection";
import ReviewsSection from "~/sections/Home/ReviewsSection";
import FAQSection from "~/sections/Home/FAQSection";
import NewsSection from "~/sections/Home/NewsSection";
import HeroBanner from "../components/HeroBanner";
import SpecialOffer from "../sections/Home/SpecialOffer";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Collections from "../components/Collections/Collections.jsx";
import BlogSection from "../components/Blog/BlogSection.jsx";
// import "./globals.css";

export default function HomePage() {
  return (
    <div style={{ overflow: "hidden" }}>
      {/* <PageBanner
        mediaSrc="https://res.cloudinary.com/dp7jfs375/video/upload/v1773140082/set-elsham_isx9my.mp4"
        gradientColor="#023048"
        height="lg"
        align="center"
        overlayStrength={70}
        parallax={false}
      >
        <HeroContent />
      </PageBanner> */}

      <HeroBanner />
      <SpecialOffer />
      <FeaturedProducts />
      <Collections />
      <BlogSection />
    </div>
  );
}
