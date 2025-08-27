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
      {/* Full background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
          alt="Beautiful handcrafted pottery"
          className="w-full h-full object-cover"
          data-testid="image-hero-background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              shine on
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
              beauty that reflects your spirit
            </p>
            
            <Button 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg px-8 py-3 text-lg"
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}
