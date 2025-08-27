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
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Discover
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {" "}Authentic{" "}
                </span>
                Indian Crafts
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect with skilled artisans and bring home the beauty of traditional Indian handicrafts, 
                handwoven textiles, and timeless pottery.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="gradient-button" 
                size="lg"
                asChild
                data-testid="button-explore-crafts"
              >
                <Link href="/products">
                  Explore Crafts
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                asChild
                data-testid="button-become-artisan"
              >
                <Link href="/artisans">
                  Become an Artisan
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free shipping over ₹999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Authentic guarantee</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImages[currentImageIndex].src}
                alt={heroImages[currentImageIndex].alt}
                className="w-full h-96 object-cover transition-opacity duration-1000"
                data-testid="image-hero-main"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {heroImages[currentImageIndex].title}
                </h3>
                <p className="text-white/90">
                  {heroImages[currentImageIndex].subtitle}
                </p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
            
            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  data-testid={`button-hero-indicator-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
