import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, X } from "lucide-react";
import type { Category } from "@shared/schema";

interface FilterSidebarProps {
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

interface FilterState {
  priceRange: [number, number];
  categories: string[];
  rating: number;
  inStock: boolean;
}

export default function FilterSidebar({ onFiltersChange, className }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 20000],
    categories: [],
    rating: 0,
    inStock: false,
  });

  const [openSections, setOpenSections] = useState({
    price: true,
    categories: true,
    rating: true,
    availability: true,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(id => id !== categoryId);
    
    updateFilters({ categories: newCategories });
  };

  const clearAllFilters = () => {
    const defaultFilters: FilterState = {
      priceRange: [0, 20000],
      categories: [],
      rating: 0,
      inStock: false,
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 20000 ||
    filters.rating > 0 ||
    filters.inStock;

  return (
    <div className={`bg-card rounded-xl p-6 space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            data-testid="button-clear-filters"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Price Range */}
      <Collapsible open={openSections.price} onOpenChange={() => toggleSection('price')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2" data-testid="button-toggle-price">
          <h4 className="font-medium">Price Range</h4>
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.price ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-2">
          <div className="px-3">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
              max={20000}
              min={0}
              step={100}
              className="w-full"
              data-testid="slider-price-range"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
              <span>₹{filters.priceRange[0].toLocaleString()}</span>
              <span>₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="min-price" className="text-xs">Min</Label>
              <Input
                id="min-price"
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  updateFilters({ priceRange: [value, filters.priceRange[1]] });
                }}
                className="h-8"
                data-testid="input-min-price"
              />
            </div>
            <div>
              <Label htmlFor="max-price" className="text-xs">Max</Label>
              <Input
                id="max-price"
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 20000;
                  updateFilters({ priceRange: [filters.priceRange[0], value] });
                }}
                className="h-8"
                data-testid="input-max-price"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Categories */}
      <Collapsible open={openSections.categories} onOpenChange={() => toggleSection('categories')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2" data-testid="button-toggle-categories">
          <h4 className="font-medium">Categories</h4>
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.categories ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-2">
          {categories.map((category: Category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={(checked) => 
                  handleCategoryChange(category.id, checked as boolean)
                }
                data-testid={`checkbox-category-${category.slug}`}
              />
              <Label 
                htmlFor={`category-${category.id}`} 
                className="text-sm cursor-pointer flex-1"
              >
                {category.name} ({category.productCount})
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Rating */}
      <Collapsible open={openSections.rating} onOpenChange={() => toggleSection('rating')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2" data-testid="button-toggle-rating">
          <h4 className="font-medium">Minimum Rating</h4>
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.rating ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.rating === rating}
                onCheckedChange={(checked) => 
                  updateFilters({ rating: checked ? rating : 0 })
                }
                data-testid={`checkbox-rating-${rating}`}
              />
              <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${i < rating ? 'text-accent' : 'text-muted-foreground'}`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-1">& up</span>
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Availability */}
      <Collapsible open={openSections.availability} onOpenChange={() => toggleSection('availability')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2" data-testid="button-toggle-availability">
          <h4 className="font-medium">Availability</h4>
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.availability ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock}
              onCheckedChange={(checked) => 
                updateFilters({ inStock: checked as boolean })
              }
              data-testid="checkbox-in-stock"
            />
            <Label htmlFor="in-stock" className="text-sm cursor-pointer">
              In Stock Only
            </Label>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
