import { useState } from "react";
import { useLocation } from "wouter";
import ProductGrid from "@/components/products/product-grid";
import FilterSidebar from "@/components/products/filter-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Products() {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Parse URL parameters
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const categoryId = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  const handleFiltersChange = (filters: any) => {
    // Handle filter changes - could update URL params
    console.log('Filters changed:', filters);
  };

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          {!isMobile && (
            <div className="w-1/4 min-w-[280px]">
              <div className="sticky top-24">
                <FilterSidebar onFiltersChange={handleFiltersChange} />
              </div>
            </div>
          )}

          {/* Mobile Filter Button */}
          {isMobile && (
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="fixed bottom-4 right-4 z-40 shadow-lg"
                  data-testid="button-mobile-filters"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="p-6">
                  <FilterSidebar onFiltersChange={handleFiltersChange} />
                </div>
              </SheetContent>
            </Sheet>
          )}

          {/* Products Grid */}
          <div className={isMobile ? "w-full" : "w-3/4"}>
            <ProductGrid categoryId={categoryId || undefined} searchQuery={searchQuery || undefined} />
          </div>
        </div>
      </div>
    </div>
  );
}
