import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { CartItemWithProduct } from "@/lib/types";
import { useAuth } from "./auth-context";
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  items: CartItemWithProduct[];
  itemCount: number;
  totalAmount: number;
  isLoading: boolean;
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["/api/cart", user?.id],
    enabled: !!user?.id,
  });

  const itemCount = items.reduce((sum: number, item: CartItemWithProduct) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum: number, item: CartItemWithProduct) => 
    sum + (parseFloat(item.product.price) * item.quantity), 0
  );

  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
      if (!user?.id) throw new Error("User not authenticated");
      
      const response = await apiRequest("POST", "/api/cart", {
        userId: user.id,
        productId,
        quantity,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", user?.id] });
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      await apiRequest("PUT", `/api/cart/${itemId}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", user?.id] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      await apiRequest("DELETE", `/api/cart/${itemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", user?.id] });
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart",
      });
    },
  });

  const addToCart = (productId: string, quantity = 1) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to cart",
        variant: "destructive",
      });
      return;
    }
    addToCartMutation.mutate({ productId, quantity });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    updateQuantityMutation.mutate({ itemId, quantity });
  };

  const removeItem = (itemId: string) => {
    removeItemMutation.mutate(itemId);
  };

  const clearCart = () => {
    // Implementation for clearing cart
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalAmount,
        isLoading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
