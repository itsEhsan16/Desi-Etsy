import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";

export default function FeaturedArtisans() {
  const { data: artisans = [], isLoading } = useQuery({
    queryKey: ["/api/artisans/featured"],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-lg">
                <div className="h-64 bg-muted animate-pulse"></div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-muted rounded w-1/2 animate-pulse"></div>
                    <div className="h-3 bg-muted rounded w-2/3 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our <span className="text-secondary">Master Artisans</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with skilled craftspeople preserving India's rich cultural heritage
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisans.slice(0, 3).map((artisan: any) => (
            <div 
              key={artisan.id} 
              className="bg-card rounded-2xl overflow-hidden shadow-lg card-hover"
              data-testid={`featured-artisan-${artisan.id}`}
            >
              <div className="relative h-64">
                <img
                  src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                  alt={`${artisan.user.firstName} ${artisan.user.lastName} - ${artisan.specialization}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                <div className="absolute top-4 right-4">
                  <Badge className="bg-accent text-accent-foreground">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    {artisan.rating}
                  </Badge>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold mb-1">
                    {artisan.user.firstName} {artisan.user.lastName}
                  </h3>
                  <p className="text-white/90 text-sm flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {artisan.specialization} • {artisan.location}
                  </p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  {artisan.bio}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span>{artisan.totalSales} products</span> • <span>{artisan.rating} rating</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    asChild
                    data-testid={`button-view-profile-${artisan.id}`}
                  >
                    <Link href={`/artisans/${artisan.id}`}>
                      View Profile →
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            className="gradient-button" 
            size="lg"
            asChild
            data-testid="button-discover-more-artisans"
          >
            <Link href="/artisans">
              Discover More Artisans
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
