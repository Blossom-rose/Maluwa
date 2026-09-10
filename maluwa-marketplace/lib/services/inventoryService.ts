import api from "../api";

export interface InventoryItem {
  _id?: string;
  id?: string;
  sellerId: string;
  photoName: string;
  description?: string;
  category: "valentines" | "weddings" | "birthdays" | "anniversaries" | "memorials" | "custom";
  price: number;
  countInStock: number;
  image?: string;
  minOrderQuantity?: number;
  maxOrderQuantity?: number;
  status: "active" | "inactive" | "out_of_stock";
  rating?: number;
  reviewCount?: number;
  dateCreated?: Date;
  dateUpdated?: Date;
}

export interface CreateInventoryRequest {
  sellerId: string;
  photoName: string;
  description?: string;
  category?: string;
  price: number;
  countInStock: number;
  image?: string;
  minOrderQuantity?: number;
  maxOrderQuantity?: number;
}

export interface UpdateInventoryRequest {
  photoName?: string;
  description?: string;
  category?: string;
  price?: number;
  countInStock?: number;
  image?: string;
  minOrderQuantity?: number;
  maxOrderQuantity?: number;
  status?: "active" | "inactive" | "out_of_stock";
}

export const inventoryService = {
  // Create new inventory item (seller)
  async createItem(data: CreateInventoryRequest): Promise<InventoryItem> {
    try {
      const response = await api.post("/inventory", data);
      return response.data.item;
    } catch (error: any) {
      console.error("Error creating inventory item:", error);
      if (error.response?.data?.errors) {
        console.error("Validation errors:", error.response.data.errors);
      }
      throw error;
    }
  },

  // Get all items (public view - active only)
  async getAllItems(filters?: {
    sellerId?: string;
    category?: string;
  }): Promise<InventoryItem[]> {
    try {
      const query = new URLSearchParams();
      if (filters?.sellerId) query.append("sellerId", filters.sellerId);
      if (filters?.category) query.append("category", filters.category);

      const response = await api.get(`/inventory?${query.toString()}`);
      const raw = response.data;
      if (Array.isArray(raw)) return raw;
      if (Array.isArray(raw?.items)) return raw.items;
      if (Array.isArray(raw?.inventory)) return raw.inventory;
      if (Array.isArray(raw?.flowers)) return raw.flowers;
      if (Array.isArray(raw?.data)) return raw.data;
      return [];
    } catch (error) {
      console.error("Error fetching inventory items:", error);
      throw error;
    }
  },

  // Get seller's inventory (seller dashboard)
  async getSellerInventory(sellerId: string): Promise<InventoryItem[]> {
    try {
      const response = await api.get(`/inventory/seller/${sellerId}`);
      const raw = response.data;
      if (Array.isArray(raw)) return raw;
      if (Array.isArray(raw?.items)) return raw.items;
      if (Array.isArray(raw?.inventory)) return raw.inventory;
      if (Array.isArray(raw?.flowers)) return raw.flowers;
      if (Array.isArray(raw?.data)) return raw.data;
      return [];
    } catch (error) {
      console.error("Error fetching seller inventory:", error);
      throw error;
    }
  },

  // Get single item
  async getItemById(id: string): Promise<InventoryItem> {
    try {
      const response = await api.get(`/inventory/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory item:", error);
      throw error;
    }
  },

  // Update inventory item
  async updateItem(id: string, data: UpdateInventoryRequest): Promise<InventoryItem> {
    try {
      const response = await api.put(`/inventory/${id}`, data);
      return response.data.item;
    } catch (error) {
      console.error("Error updating inventory item:", error);
      throw error;
    }
  },

  // Update stock
  async updateStock(id: string, quantity: number, operation: "add" | "reduce"): Promise<InventoryItem> {
    try {
      const response = await api.patch(`/inventory/${id}/stock`, {
        quantity,
        operation,
      });
      return response.data.item;
    } catch (error) {
      console.error("Error updating stock:", error);
      throw error;
    }
  },

  // Delete inventory item
  async deleteItem(id: string): Promise<void> {
    try {
      await api.delete(`/inventory/${id}`);
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      throw error;
    }
  },
};
