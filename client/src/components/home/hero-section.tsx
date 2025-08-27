import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Truck, Shield } from "lucide-react";

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Traditional Indian pottery and handicrafts display",
    title: "Featured Collection",
    subtitle: "Rajasthani Blue Pottery & Handwoven Textiles"
  },
  {
    src: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Beautiful handwoven Indian textiles",
    title: "Textile Collection",
    subtitle: "Authentic Handwoven Fabrics"
  },
  {
    src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Traditional Indian jewelry",
    title: "Jewelry Collection",
    subtitle: "Handcrafted Traditional Ornaments"
  }
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
          alt="Beautiful handcrafted pottery background"
          className="w-full h-full object-cover"
          data-testid="image-hero-background"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight">
                Welcome
                <br />
                <span className="text-white/80">to Fankar.</span>
                <br />
                Where
                <br />
                Culture
                <br />
                Meets Craft
              </h1>
              <p className="text-xl text-white/90 font-light">
                Explore Hidden Arts
              </p>
            </div>
            
            <div className="mt-8">
              <Button 
                className="bg-transparent border-2 border-white/70 text-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg px-8 py-3 text-lg font-medium"
                asChild
                data-testid="button-shop-now"
              >
                <Link href="/products">
                  shop now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
