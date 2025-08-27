import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertCartItemSchema, insertWishlistItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const { categoryId, search, page = "1", limit = "12" } = req.query;
      const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
      
      const products = await storage.getProducts({
        categoryId: categoryId as string,
        search: search as string,
        limit: parseInt(limit as string),
        offset: offset,
      });
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Artisans
  app.get("/api/artisans/featured", async (req, res) => {
    try {
      const artisans = await storage.getFeaturedArtisans();
      res.json(artisans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured artisans" });
    }
  });

  // Auth routes (simplified for demo)
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getUserByEmail(email);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // In real app, compare hashed passwords
      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Cart routes (require auth in real app)
  app.get("/api/cart/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const cartItems = await storage.getCartItems(userId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const cartData = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.addToCart(cartData);
      res.json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      await storage.updateCartItemQuantity(id, quantity);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.removeFromCart(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove from cart" });
    }
  });

  // Wishlist routes
  app.get("/api/wishlist/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const wishlistItems = await storage.getWishlistItems(userId);
      res.json(wishlistItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wishlist items" });
    }
  });

  app.post("/api/wishlist", async (req, res) => {
    try {
      const wishlistData = insertWishlistItemSchema.parse(req.body);
      const wishlistItem = await storage.addToWishlist(wishlistData);
      res.json(wishlistItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid wishlist data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add to wishlist" });
    }
  });

  app.delete("/api/wishlist/:userId/:productId", async (req, res) => {
    try {
      const { userId, productId } = req.params;
      await storage.removeFromWishlist(userId, productId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove from wishlist" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
