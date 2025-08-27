import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Award, Package } from "lucide-react";
import { Link } from "wouter";

export default function Artisans() {
  const { data: artisans = [], isLoading } = useQuery({
    queryKey: ["/api/artisans/featured"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-64 bg-muted animate-pulse"></div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-muted rounded w-1/2 animate-pulse"></div>
                    <div className="h-3 bg-muted rounded w-2/3 animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Our <span className="text-primary">Master Artisans</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover the talented craftspeople behind our beautiful handmade products. 
            Each artisan brings generations of traditional knowledge and skill to create unique pieces.
          </p>
          <Button className="gradient-button" size="lg" data-testid="button-become-artisan">
            Become an Artisan
          </Button>
        </div>
      </section>

      {/* Artisans Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artisans.map((artisan: any) => (
              <Card key={artisan.id} className="group card-hover overflow-hidden" data-testid={`artisan-card-${artisan.id}`}>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt={`${artisan.user.firstName} ${artisan.user.lastName} - ${artisan.specialization}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-accent text-accent-foreground">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {artisan.rating}
                    </Badge>
                  </div>

                  {/* Verified Badge */}
                  {artisan.isVerified && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="default" className="bg-primary text-primary-foreground">
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  )}

                  {/* Artisan Name and Location */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-1">
                      {artisan.user.firstName} {artisan.user.lastName}
                    </h3>
                    <p className="text-white/90 text-sm flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {artisan.location}
                    </p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-lg text-primary mb-2">
                      {artisan.specialization}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {artisan.bio}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center justify-center text-primary mb-1">
                        <Package className="h-4 w-4 mr-1" />
                      </div>
                      <p className="text-lg font-bold">{artisan.totalSales}</p>
                      <p className="text-xs text-muted-foreground">Products Sold</p>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center justify-center text-primary mb-1">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                      </div>
                      <p className="text-lg font-bold">{artisan.rating}</p>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1" 
                      asChild
                      data-testid={`button-view-profile-${artisan.id}`}
                    >
                      <Link href={`/artisans/${artisan.id}`}>
                        View Profile
                      </Link>
                    </Button>
                    <Button 
                      className="flex-1 gradient-button"
                      asChild
                      data-testid={`button-view-products-${artisan.id}`}
                    >
                      <Link href={`/products?artisan=${artisan.id}`}>
                        View Products
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" data-testid="button-load-more-artisans">
              Load More Artisans
            </Button>
          </div>
        </div>
      </section>

      {/* Become an Artisan CTA */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Join Our Artisan Community
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Share your craft with the world and connect with customers who appreciate authentic, 
              handmade products. Start your journey with us today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                data-testid="button-apply-now"
              >
                Apply Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary"
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
