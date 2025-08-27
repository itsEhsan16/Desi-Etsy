export interface ProductWithArtisan extends Product {
  artisan: Artisan & { user: User };
  category: Category;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface WishlistItemWithProduct extends WishlistItem {
  product: Product;
}

import type { Product, Artisan, User, Category, CartItem, WishlistItem } from "@shared/schema";
