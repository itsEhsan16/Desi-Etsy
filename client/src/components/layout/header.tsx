import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, User, Search, Menu } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import CartDrawer from "@/components/cart/cart-drawer";
import SearchBar from "@/components/search/search-bar";
import LoginModal from "@/components/auth/login-modal";

export default function Header() {
  const [location] = useLocation();
  const { itemCount, openCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Categories", href: "/products" },
    { name: "Artisans", href: "/artisans" },
    { name: "New Arrivals", href: "/products?sort=newest" },
    { name: "Gift Ideas", href: "/products?category=gifts" },
  ];

  return (
    <>
      <header className="bg-card shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              <Link href="/" data-testid="link-home">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Desi Etsy
                </h1>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    data-testid={`link-${item.name.toLowerCase().replace(" ", "-")}`}
                  >
                    <span
                      className={`text-muted-foreground hover:text-primary transition-colors ${
                        location === item.href ? "text-primary font-medium" : ""
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8 hidden lg:block">
              <SearchBar />
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* Search for mobile */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                data-testid="button-search-mobile"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                data-testid="button-wishlist"
              >
                <Heart className="h-5 w-5" />
                <Badge
                  variant="secondary"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  3
                </Badge>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                onClick={openCart}
                data-testid="button-cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>

              {/* User Account */}
              {user ? (
                <Button variant="ghost" size="sm" data-testid="button-user-menu">
                  <User className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">{user.firstName}</span>
                </Button>
              ) : (
                <Button
                  onClick={openAuthModal}
                  className="gradient-button"
                  data-testid="button-sign-in"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border py-4">
              <nav className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    data-testid={`link-mobile-${item.name.toLowerCase().replace(" ", "-")}`}
                  >
                    <span className="block text-muted-foreground hover:text-primary transition-colors">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </nav>
              <div className="mt-4">
                <SearchBar />
              </div>
            </div>
          )}
        </div>
      </header>

      <CartDrawer />
      <LoginModal />
    </>
  );
}
