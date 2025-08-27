import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import type { Category } from "@shared/schema";

export default function CategoriesGrid() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["/api/categories"],
  });

  const categoryIcons: Record<string, string> = {
    pottery: "🏺",
    textiles: "🧵",
    jewelry: "💎",
    paintings: "🎨",
    "home-decor": "🏠",
    kitchenware: "🍳",
    handicrafts: "✋",
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-background rounded-xl p-6 text-center animate-pulse">
                <div className="w-12 h-12 bg-muted rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-5 bg-muted rounded w-16 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Our <span className="text-primary">Craft Categories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover authentic Indian handicrafts from master artisans across different regions
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category: Category) => (
            <Link 
              key={category.id} 
              href={`/products?category=${category.id}`}
              data-testid={`link-category-${category.slug}`}
            >
              <div className="bg-background rounded-xl p-6 text-center card-hover cursor-pointer group">
                <div className="mb-4 text-4xl">
                  {categoryIcons[category.slug] || "🎭"}
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {category.description}
                </p>
                <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                  {category.productCount} items
                </Badge>
              </div>
            </Link>
          ))}
          
          {/* View All Categories */}
          <Link href="/products" data-testid="link-view-all-categories">
            <div className="bg-background rounded-xl p-6 text-center card-hover cursor-pointer group">
              <div className="mb-4">
                <Plus className="h-10 w-10 text-muted-foreground mx-auto group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                View All
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore more categories
              </p>
              <Badge variant="outline" className="text-xs">
                15+ categories
              </Badge>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
