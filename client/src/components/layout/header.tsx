import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
    { name: "home", href: "/" },
    { name: "shop", href: "/products" },
    { name: "about", href: "/artisans" },
    { name: "blog", href: "/blog" },
  ];

  return (
    <>
      {/* Fixed header with rounded container */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4">
        <div className="bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-white/20">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" data-testid="link-home">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">🏺</span>
                  </div>
                  <h1 className="text-xl font-bold text-foreground">
                    Fankar
                  </h1>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  data-testid={`link-${item.name.toLowerCase().replace(" ", "-")}`}
                >
                  <span
                    className={`text-sm font-medium transition-colors ${
                      location === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* User ID/Account */}
              {user ? (
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {user.username}
                </span>
              ) : (
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  guest
                </span>
              )}

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2"
                data-testid="button-wishlist"
              >
                <Heart className="h-5 w-5" />
                <Badge
                  variant="secondary"
                  className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground"
                >
                  0
                </Badge>
              </Button>

              {/* Search */}
              <div className="hidden lg:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 w-64 rounded-full bg-muted/50 border-0"
                    data-testid="input-search"
                  />
                </div>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* Auth Button */}
              {!user && (
                <Button
                  onClick={openAuthModal}
                  className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
                  data-testid="button-sign-in"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="mt-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-4 md:hidden">
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
            {!user && (
              <Button
                onClick={openAuthModal}
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                data-testid="button-mobile-sign-in"
              >
                Sign In
              </Button>
            )}
          </div>
        )}
      </header>

      <CartDrawer />
      <LoginModal />
    </>
  );
}
