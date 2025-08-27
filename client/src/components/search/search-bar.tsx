import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const recentSearches = ["Handwoven sarees", "Pottery items", "Brass jewelry", "Traditional art"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setLocation(`/products?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
    setLocation(`/products?search=${encodeURIComponent(search)}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={inputRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for handmade treasures..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="pl-10 pr-4"
            data-testid="input-search"
          />
        </div>
      </form>

      {/* Search Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-lg mt-1 shadow-lg z-50">
          <div className="p-4">
            <div className="text-sm text-muted-foreground mb-2">Recent searches</div>
            <div className="space-y-1">
              {recentSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto p-2"
                  onClick={() => handleRecentSearchClick(search)}
                  data-testid={`button-recent-search-${index}`}
                >
                  <Search className="h-3 w-3 mr-2" />
                  {search}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
