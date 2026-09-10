import api from "../api";
import { Flower } from "./flowerService";

export interface CartItem extends Flower {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Cart now lives on the backend, keyed to the logged-in user, so it
// survives logout/login. All calls require an auth token (added
// automatically by the axios interceptor in lib/api.ts).

interface BackendCartItem {
  flowerId: string;
  photoName: string;
  price: number;
  image?: string;
  quantity: number;
}

interface BackendCart {
  _id: string;
  userId: string;
  items: BackendCartItem[];
}

// Adapt the backend shape to what the existing UI (CartPage, etc.)
// expects — it reads item._id / item.id as the per-item key.
function toClientCart(backendCart: BackendCart): Cart {
  const items: CartItem[] = backendCart.items.map((item) => ({
    _id: item.flowerId,
    id: item.flowerId,
    photoName: item.photoName,
    price: item.price,
    image: item.image,
    quantity: item.quantity,
  })) as CartItem[];

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { items, total, itemCount };
}

const EMPTY_CART: Cart = { items: [], total: 0, itemCount: 0 };

export const cartService = {
  async getCart(): Promise<Cart> {
    const response = await api.get<BackendCart>("/cart");
    return toClientCart(response.data);
  },

  async addItem(flower: Flower, quantity: number = 1): Promise<Cart> {
    const flowerId = flower._id || flower.id || "";
    const response = await api.post<BackendCart>("/cart/items", {
      flowerId,
      quantity,
    });
    return toClientCart(response.data);
  },

  async removeItem(flowerId: string): Promise<Cart> {
    const response = await api.delete<BackendCart>(`/cart/items/${flowerId}`);
    return toClientCart(response.data);
  },

  async updateQuantity(flowerId: string, quantity: number): Promise<Cart> {
    if (quantity <= 0) {
      return this.removeItem(flowerId);
    }
    const response = await api.put<BackendCart>(`/cart/items/${flowerId}`, {
      quantity,
    });
    return toClientCart(response.data);
  },

  async clearCart(): Promise<Cart> {
    await api.delete("/cart");
    return EMPTY_CART;
  },

  getEmptyCart(): Cart {
    return EMPTY_CART;
  },
};
