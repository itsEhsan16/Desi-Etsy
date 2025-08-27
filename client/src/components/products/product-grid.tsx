import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./product-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid, List, Loader2 } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductGridProps {
  categoryId?: string;
  searchQuery?: string;
}

export default function ProductGrid({ categoryId, searchQuery }: ProductGridProps) {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const limit = 12;

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["/api/products", { categoryId, search: searchQuery, page, sortBy }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(categoryId && { categoryId }),
        ...(searchQuery && { search: searchQuery }),
      });
      
      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    },
  });

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "rating", label: "Highest Rated" },
  ];

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load products. Please try again.</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {searchQuery ? `Search results for "${searchQuery}"` : "Products"}
          </h2>
          <p className="text-muted-foreground">
            {isLoading ? "Loading..." : `Showing ${products.length} products`}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48" data-testid="select-sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View Mode Toggle */}
          <div className="flex border border-border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="rounded-r-none"
              onClick={() => setViewMode("grid")}
              data-testid="button-grid-view"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="rounded-l-none"
              onClick={() => setViewMode("list")}
              data-testid="button-list-view"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-muted rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && products.length > 0 && (
        <div 
          className={
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery 
              ? `No products match your search for "${searchQuery}"`
              : "No products available in this category"
            }
          </p>
          <Button variant="outline" onClick={() => window.location.href = "/products"}>
            Browse All Products
          </Button>
        </div>
      )}

      {/* Load More / Pagination */}
      {products.length >= limit && (
        <div className="text-center py-8">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => setPage(page + 1)}
            disabled={isLoading}
            data-testid="button-load-more"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading...
              </>
            ) : (
              "Load More Products"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
