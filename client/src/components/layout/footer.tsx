import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "All Categories", href: "/products" },
        { name: "Pottery", href: "/products?category=pottery" },
        { name: "Textiles", href: "/products?category=textiles" },
        { name: "Jewelry", href: "/products?category=jewelry" },
        { name: "Home Decor", href: "/products?category=home-decor" },
        { name: "Gift Ideas", href: "/products?category=gifts" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Shipping Info", href: "/shipping" },
        { name: "Returns", href: "/returns" },
        { name: "Size Guide", href: "/size-guide" },
        { name: "Track Order", href: "/track" },
        { name: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Artisans", href: "/artisans" },
        { name: "Become a Seller", href: "/sell" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Blog", href: "/blog" },
      ],
    },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" data-testid="link-footer-home">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                Desi Etsy
              </h3>
            </Link>
            <p className="text-muted-foreground mb-6">
              Celebrating India's rich heritage through authentic handmade crafts and connecting
              skilled artisans with appreciative customers worldwide.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" data-testid="button-facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" data-testid="button-instagram">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" data-testid="button-twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" data-testid="button-youtube">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-lg mb-4">{section.title}</h4>
              <ul className="space-y-3 text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      data-testid={`link-footer-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <span className="hover:text-primary transition-colors">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-2">Stay Connected</h4>
            <p className="text-muted-foreground mb-4">
              Get updates on new collections and exclusive offers
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button className="gradient-button" data-testid="button-newsletter-subscribe">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 Desi Etsy. All rights reserved. Made with ❤️ for Indian craftspeople.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" data-testid="link-privacy">
                <span className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms" data-testid="link-terms">
                <span className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </span>
              </Link>
              <Link href="/cookies" data-testid="link-cookies">
                <span className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
