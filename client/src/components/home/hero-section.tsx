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
    <section className="relative min-h-screen overflow-hidden pt-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                shine on
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light">
                beauty that reflects your spirit
              </p>
            </div>
            
            <Button 
              className="bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 rounded-lg px-8 py-3 text-lg"
              asChild
              data-testid="button-shop-now"
            >
              <Link href="/products">
                shop now
              </Link>
            </Button>
          </div>

          {/* Rounded square image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
                alt="Beautiful handcrafted pottery"
                className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-3xl shadow-2xl"
                data-testid="image-hero-main"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}
