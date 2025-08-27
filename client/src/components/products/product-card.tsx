import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { addToCart } = useCart();

  const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(Number(price));
  };

  const discountPercentage = product.originalPrice 
    ? Math.round((1 - parseFloat(product.price) / parseFloat(product.originalPrice)) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Card className="group card-hover overflow-hidden" data-testid={`product-card-${product.id}`}>
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div className="aspect-square relative bg-muted">
            {!isImageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-muted"></div>
            )}
            <img
              src={product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImageLoaded(true)}
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {discountPercentage > 0 && (
                <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                  {discountPercentage}% OFF
                </Badge>
              )}
              {parseFloat(product.rating) >= 4.8 && (
                <Badge variant="default" className="bg-accent text-accent-foreground">
                  Trending
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full shadow-lg"
                onClick={handleWishlistToggle}
                data-testid={`button-wishlist-${product.id}`}
              >
                <Heart 
                  className={`h-4 w-4 ${isWishlisted ? 'fill-current text-red-500' : ''}`} 
                />
              </Button>
            </div>

            {/* Quick View Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button 
                variant="secondary" 
                className="transform translate-y-4 group-hover:translate-y-0 transition-transform"
                data-testid={`button-quick-view-${product.id}`}
              >
                <Eye className="h-4 w-4 mr-2" />
                Quick View
              </Button>
            </div>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          {/* Category and Rating */}
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs">
              {product.tags?.[0] || 'Handmade'}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="h-3 w-3 fill-current text-accent mr-1" />
              <span>{product.rating}</span>
              <span className="ml-1">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Artisan Info */}
          <p className="text-sm text-muted-foreground mb-3">
            by Featured Artisan
          </p>
        </Link>

        {/* Price and Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className="bg-primary hover:bg-secondary transition-colors"
            onClick={handleAddToCart}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>

        {/* Stock Indicator */}
        {product.stock < 10 && product.stock > 0 && (
          <p className="text-xs text-orange-600 mt-2">
            Only {product.stock} left in stock
          </p>
        )}
        
        {product.stock === 0 && (
          <p className="text-xs text-destructive mt-2">
            Out of stock
          </p>
        )}
      </CardContent>
    </Card>
  );
}
