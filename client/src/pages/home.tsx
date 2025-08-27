import HeroSection from "@/components/home/hero-section";
import CategoriesGrid from "@/components/home/categories-grid";
import FeaturedArtisans from "@/components/home/featured-artisans";
import Testimonials from "@/components/home/testimonials";
import Newsletter from "@/components/home/newsletter";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesGrid />
      <FeaturedArtisans />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
