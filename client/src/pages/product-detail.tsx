import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import ProductGrid from "@/components/products/product-grid";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:id");
  const productId = params?.id;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["/api/products", productId],
    enabled: !!productId,
  });

  const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(Number(price));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image skeleton */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg animate-pulse"></div>
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-muted rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
            {/* Content skeleton */}
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
              <div className="h-6 bg-muted rounded w-1/4 animate-pulse"></div>
              <div className="h-20 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const discountPercentage = product.originalPrice 
    ? Math.round((1 - parseFloat(product.price) / parseFloat(product.originalPrice)) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="image-product-main"
              />
              {discountPercentage > 0 && (
                <Badge 
                  variant="secondary" 
                  className="absolute top-4 left-4 bg-secondary text-secondary-foreground"
                >
                  {discountPercentage}% OFF
                </Badge>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index ? 'border-primary' : 'border-border'
                  }`}
                  data-testid={`button-image-${index}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.tags?.[0] || 'Handmade'}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-current text-accent mr-1" />
                  <span>{product.rating}</span>
                  <span className="ml-1">({product.reviewCount} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2" data-testid="text-product-name">
                {product.name}
              </h1>
              <p className="text-muted-foreground">by Featured Artisan</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary" data-testid="text-price">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed" data-testid="text-description">
              {product.description}
            </p>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium">Quantity:</label>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    data-testid="button-decrease-quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium" data-testid="text-quantity">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stock}
                    data-testid="button-increase-quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.stock} available)
                </span>
              </div>

              <div className="flex gap-4">
                <Button
                  className="flex-1 gradient-button"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  data-testid="button-add-to-cart"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={toggleWishlist}
                  data-testid="button-add-to-wishlist"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free shipping over ₹999</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span>Authenticity guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>30-day returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-16">
          <CardContent className="p-6">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description" data-testid="tab-description">Description</TabsTrigger>
                <TabsTrigger value="artisan" data-testid="tab-artisan">Artisan Info</TabsTrigger>
                <TabsTrigger value="reviews" data-testid="tab-reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <div className="prose prose-gray max-w-none">
                  <h3 className="text-lg font-semibold mb-4">About this Product</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <h4 className="text-md font-semibold mt-6 mb-3">Materials & Craftsmanship</h4>
                  <p className="text-muted-foreground">
                    This beautiful piece is handcrafted using traditional techniques passed down through generations. 
                    Made with premium materials and attention to detail that reflects India's rich cultural heritage.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="artisan" className="mt-6">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                    FA
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Featured Artisan</h3>
                    <p className="text-muted-foreground mb-4">
                      Master craftsperson specializing in traditional techniques with over 20 years of experience.
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-current text-accent mr-1" />
                        <span>4.9 rating</span>
                      </div>
                      <span>•</span>
                      <span>67 products</span>
                      <span>•</span>
                      <span>Rajasthan, India</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                    <Button variant="outline" data-testid="button-write-review">
                      Write a Review
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Sample reviews */}
                    {[1, 2, 3].map((i) => (
                      <Card key={i}>
                        <CardContent className="p-4">
                          <div className="flex items-center mb-2">
                            <div className="flex text-accent mr-2">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} className="h-3 w-3 fill-current" />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">5.0</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            "Beautiful craftsmanship and excellent quality. Exceeded my expectations!"
                          </p>
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-medium">
                              A{i}
                            </div>
                            <div className="ml-2">
                              <p className="text-sm font-medium">Anonymous Customer</p>
                              <p className="text-xs text-muted-foreground">Verified Purchase</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          <ProductGrid categoryId={product.categoryId} />
        </div>
      </div>
    </div>
  );
}
