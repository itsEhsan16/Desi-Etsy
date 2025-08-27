import { 
  type User, type InsertUser, type Artisan, type InsertArtisan,
  type Category, type InsertCategory, type Product, type InsertProduct,
  type CartItem, type InsertCartItem, type WishlistItem, type InsertWishlistItem,
  type Order, type InsertOrder, type OrderItem, type Review, type InsertReview
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Artisans
  getArtisan(id: string): Promise<Artisan | undefined>;
  getArtisanByUserId(userId: string): Promise<Artisan | undefined>;
  createArtisan(artisan: InsertArtisan): Promise<Artisan>;
  getFeaturedArtisans(): Promise<(Artisan & { user: User })[]>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Products
  getProducts(filters?: { categoryId?: string; search?: string; limit?: number; offset?: number }): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByArtisan(artisanId: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart
  getCartItems(userId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: string, quantity: number): Promise<void>;
  removeFromCart(id: string): Promise<void>;
  clearCart(userId: string): Promise<void>;
  
  // Wishlist
  getWishlistItems(userId: string): Promise<(WishlistItem & { product: Product })[]>;
  addToWishlist(wishlistItem: InsertWishlistItem): Promise<WishlistItem>;
  removeFromWishlist(userId: string, productId: string): Promise<void>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getUserOrders(userId: string): Promise<Order[]>;
  
  // Reviews
  getProductReviews(productId: string): Promise<(Review & { user: User })[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private artisans: Map<string, Artisan> = new Map();
  private categories: Map<string, Category> = new Map();
  private products: Map<string, Product> = new Map();
  private cartItems: Map<string, CartItem> = new Map();
  private wishlistItems: Map<string, WishlistItem> = new Map();
  private orders: Map<string, Order> = new Map();
  private orderItems: Map<string, OrderItem> = new Map();
  private reviews: Map<string, Review> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categories = [
      { name: "Pottery", description: "Traditional clay crafts", icon: "fas fa-vase", slug: "pottery" },
      { name: "Textiles", description: "Handwoven fabrics", icon: "fas fa-tshirt", slug: "textiles" },
      { name: "Jewelry", description: "Traditional ornaments", icon: "fas fa-gem", slug: "jewelry" },
      { name: "Paintings", description: "Traditional art", icon: "fas fa-paint-brush", slug: "paintings" },
      { name: "Home Decor", description: "Decorative items", icon: "fas fa-home", slug: "home-decor" },
      { name: "Kitchenware", description: "Copper & brass items", icon: "fas fa-utensils", slug: "kitchenware" },
      { name: "Handicrafts", description: "Miscellaneous crafts", icon: "fas fa-scroll", slug: "handicrafts" },
    ];

    categories.forEach(cat => {
      const category: Category = {
        id: randomUUID(),
        ...cat,
        productCount: Math.floor(Math.random() * 200) + 50,
      };
      this.categories.set(category.id, category);
    });

    // Seed users and artisans
    const artisanData = [
      { name: "Ramesh Kumar", specialization: "Master Potter", location: "Rajasthan", rating: "4.9" },
      { name: "Priya Devi", specialization: "Textile Weaver", location: "Gujarat", rating: "4.8" },
      { name: "Arjun Sharma", specialization: "Jewelry Artisan", location: "Jaipur", rating: "5.0" },
      { name: "Sunita Kumari", specialization: "Folk Artist", location: "Bihar", rating: "4.9" },
      { name: "Vikram Singh", specialization: "Metal Craftsman", location: "Rajasthan", rating: "4.7" },
    ];

    artisanData.forEach((data, index) => {
      const user: User = {
        id: randomUUID(),
        username: data.name.toLowerCase().replace(" ", "_"),
        email: `${data.name.toLowerCase().replace(" ", ".")}@example.com`,
        password: "hashedpassword",
        firstName: data.name.split(" ")[0],
        lastName: data.name.split(" ")[1],
        role: "artisan",
        createdAt: new Date(),
      };
      this.users.set(user.id, user);

      const artisan: Artisan = {
        id: randomUUID(),
        userId: user.id,
        bio: `${data.specialization} with years of experience in traditional techniques.`,
        specialization: data.specialization,
        location: data.location,
        rating: data.rating,
        totalSales: Math.floor(Math.random() * 1000) + 100,
        isVerified: true,
        createdAt: new Date(),
      };
      this.artisans.set(artisan.id, artisan);
    });

    // Seed products
    const productData = [
      { name: "Traditional Blue Pottery Vase", price: "2499", originalPrice: "3199", categorySlug: "pottery" },
      { name: "Handwoven Banarasi Silk Saree", price: "12999", originalPrice: "15999", categorySlug: "textiles" },
      { name: "Rajasthani Kundan Necklace Set", price: "8499", originalPrice: "9999", categorySlug: "jewelry" },
      { name: "Madhubani Folk Art Painting", price: "3799", originalPrice: "4299", categorySlug: "paintings" },
      { name: "Brass Decorative Diya Set", price: "1899", originalPrice: "2399", categorySlug: "home-decor" },
      { name: "Copper Water Bottle Set", price: "1299", originalPrice: "1699", categorySlug: "kitchenware" },
    ];

    productData.forEach((data, index) => {
      const category = Array.from(this.categories.values()).find(c => c.slug === data.categorySlug);
      const artisan = Array.from(this.artisans.values())[index % artisanData.length];
      
      if (category && artisan) {
        const product: Product = {
          id: randomUUID(),
          name: data.name,
          description: `Beautiful handcrafted ${data.name.toLowerCase()} made with traditional techniques and premium materials.`,
          price: data.price,
          originalPrice: data.originalPrice,
          images: [
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
          ],
          categoryId: category.id,
          artisanId: artisan.id,
          stock: Math.floor(Math.random() * 50) + 10,
          rating: (4.5 + Math.random() * 0.5).toFixed(1),
          reviewCount: Math.floor(Math.random() * 100) + 10,
          isActive: true,
          tags: ["handmade", "traditional", "authentic"],
          createdAt: new Date(),
        };
        this.products.set(product.id, product);
      }
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: randomUUID(),
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  // Artisan methods
  async getArtisan(id: string): Promise<Artisan | undefined> {
    return this.artisans.get(id);
  }

  async getArtisanByUserId(userId: string): Promise<Artisan | undefined> {
    return Array.from(this.artisans.values()).find(artisan => artisan.userId === userId);
  }

  async createArtisan(insertArtisan: InsertArtisan): Promise<Artisan> {
    const artisan: Artisan = {
      ...insertArtisan,
      id: randomUUID(),
      rating: "0",
      totalSales: 0,
      isVerified: false,
      createdAt: new Date(),
    };
    this.artisans.set(artisan.id, artisan);
    return artisan;
  }

  async getFeaturedArtisans(): Promise<(Artisan & { user: User })[]> {
    const artisans = Array.from(this.artisans.values()).slice(0, 6);
    return artisans.map(artisan => ({
      ...artisan,
      user: this.users.get(artisan.userId)!,
    }));
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const category: Category = {
      ...insertCategory,
      id: randomUUID(),
      productCount: 0,
    };
    this.categories.set(category.id, category);
    return category;
  }

  // Product methods
  async getProducts(filters?: { categoryId?: string; search?: string; limit?: number; offset?: number }): Promise<Product[]> {
    let products = Array.from(this.products.values()).filter(p => p.isActive);
    
    if (filters?.categoryId) {
      products = products.filter(p => p.categoryId === filters.categoryId);
    }
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    const offset = filters?.offset || 0;
    const limit = filters?.limit || 12;
    
    return products.slice(offset, offset + limit);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByArtisan(artisanId: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.artisanId === artisanId);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).slice(0, 12);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const product: Product = {
      ...insertProduct,
      id: randomUUID(),
      rating: "0",
      reviewCount: 0,
      createdAt: new Date(),
    };
    this.products.set(product.id, product);
    return product;
  }

  // Cart methods
  async getCartItems(userId: string): Promise<(CartItem & { product: Product })[]> {
    const items = Array.from(this.cartItems.values()).filter(item => item.userId === userId);
    return items.map(item => ({
      ...item,
      product: this.products.get(item.productId)!,
    }));
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.userId === insertCartItem.userId && item.productId === insertCartItem.productId
    );

    if (existingItem) {
      existingItem.quantity += insertCartItem.quantity;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }

    const cartItem: CartItem = {
      ...insertCartItem,
      id: randomUUID(),
      createdAt: new Date(),
    };
    this.cartItems.set(cartItem.id, cartItem);
    return cartItem;
  }

  async updateCartItemQuantity(id: string, quantity: number): Promise<void> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
    }
  }

  async removeFromCart(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(userId: string): Promise<void> {
    const userItems = Array.from(this.cartItems.entries()).filter(([_, item]) => item.userId === userId);
    userItems.forEach(([id]) => this.cartItems.delete(id));
  }

  // Wishlist methods
  async getWishlistItems(userId: string): Promise<(WishlistItem & { product: Product })[]> {
    const items = Array.from(this.wishlistItems.values()).filter(item => item.userId === userId);
    return items.map(item => ({
      ...item,
      product: this.products.get(item.productId)!,
    }));
  }

  async addToWishlist(insertWishlistItem: InsertWishlistItem): Promise<WishlistItem> {
    const wishlistItem: WishlistItem = {
      ...insertWishlistItem,
      id: randomUUID(),
      createdAt: new Date(),
    };
    this.wishlistItems.set(wishlistItem.id, wishlistItem);
    return wishlistItem;
  }

  async removeFromWishlist(userId: string, productId: string): Promise<void> {
    const item = Array.from(this.wishlistItems.entries()).find(
      ([_, item]) => item.userId === userId && item.productId === productId
    );
    if (item) {
      this.wishlistItems.delete(item[0]);
    }
  }

  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const order: Order = {
      ...insertOrder,
      id: randomUUID(),
      createdAt: new Date(),
    };
    this.orders.set(order.id, order);
    return order;
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.userId === userId);
  }

  // Review methods
  async getProductReviews(productId: string): Promise<(Review & { user: User })[]> {
    const reviews = Array.from(this.reviews.values()).filter(review => review.productId === productId);
    return reviews.map(review => ({
      ...review,
      user: this.users.get(review.userId)!,
    }));
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const review: Review = {
      ...insertReview,
      id: randomUUID(),
      createdAt: new Date(),
    };
    this.reviews.set(review.id, review);
    return review;
  }
}

export const storage = new MemStorage();
