"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Cart, cartService } from "@/lib/services/cartService";
import { Flower } from "@/lib/services/flowerService";
import { authService } from "@/lib/services/authService";

interface CartContextType {
  cart: Cart;
  isLoggedIn: boolean;
  isLoading: boolean;
  addItem: (flower: Flower, quantity?: number) => Promise<void>;
  removeItem: (flowerId: string) => Promise<void>;
  updateQuantity: (flowerId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  getItemCount: () => number;
  getTotal: () => number;
  getSubtotal: () => number;
  getTax: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(cartService.getEmptyCart());
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // On mount: if the user is logged in, load their cart from the backend.
  // If not, the cart just stays empty until they sign in.
  const loadCartIfLoggedIn = async () => {
    const loggedIn = authService.isLoggedIn();
    console.log("[CartContext] Checking login status:", loggedIn);
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      setIsLoading(true);
      try {
        const loadedCart = await cartService.getCart();
        setCart(loadedCart);
      } catch (err) {
        console.error("Failed to load cart:", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCart(cartService.getEmptyCart());
    }
  };

  useEffect(() => {
    setIsHydrated(true);
    loadCartIfLoggedIn();
  }, []);

  // Listen for storage changes to detect login/logout
  useEffect(() => {
    const handleStorageChange = () => {
      console.log("[CartContext] Storage changed, reloading auth status");
      loadCartIfLoggedIn();
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Also check auth status periodically (every 1 second) to catch local storage changes
    const interval = setInterval(() => {
      const currentAuthStatus = authService.isLoggedIn();
      if (currentAuthStatus !== isLoggedIn) {
        console.log("[CartContext] Auth status changed from", isLoggedIn, "to", currentAuthStatus);
        loadCartIfLoggedIn();
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [isLoggedIn]);

  const refreshCart = async () => {
    await loadCartIfLoggedIn();
  };

  const addItem = async (flower: Flower, quantity: number = 1) => {
    const updatedCart = await cartService.addItem(flower, quantity);
    setCart(updatedCart);
  };

  const removeItem = async (flowerId: string) => {
    const updatedCart = await cartService.removeItem(flowerId);
    setCart(updatedCart);
  };

  const updateQuantity = async (flowerId: string, quantity: number) => {
    const updatedCart = await cartService.updateQuantity(flowerId, quantity);
    setCart(updatedCart);
  };

  const clearCart = async () => {
    // Optimistically clear local state first so the UI empties immediately,
    // even before the backend DELETE responds. This prevents the 1-second
    // polling interval from re-fetching stale cart data mid-flight.
    setCart(cartService.getEmptyCart());
    try {
      await cartService.clearCart();
    } catch (err) {
      console.error("[CartContext] clearCart backend call failed:", err);
      // Keep the local state empty even if the backend call failed;
      // the backend cart will be cleared on the next successful interaction.
    }
  };

  const getItemCount = () => (isHydrated ? cart.itemCount : 0);
  const getTotal = () => (isHydrated ? cart.total : 0);
  const getSubtotal = () => (isHydrated ? cart.total : 0);
  const getTax = () => (isHydrated ? cart.total * 0.1 : 0);

  const value: CartContextType = {
    cart,
    isLoggedIn,
    isLoading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    refreshCart,
    getItemCount,
    getTotal,
    getSubtotal,
    getTax,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
