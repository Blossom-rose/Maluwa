import api from "../api";

export interface OrderItem {
  flowerId: string;
  photoName: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id?: string;
  id?: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  city: string;
  zipCode?: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  cancellationReason?: string;
  cancelletionReason?: string;
  cancelledBy?: "buyer" | "seller" | "admin";
  paymentMethod: "credit_card" | "mobile_money" | "bank_transfer" | "cash";
  paymentStatus: "pending" | "completed" | "failed";
  paymentProof?: string; // URL or file path to uploaded payment proof
  notes?: string;
  dateCreated?: Date;
  dateUpdated?: Date;
}

export interface CreateOrderRequest {
  items: {
    flowerId: string;
    quantity: number;
  }[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  city: string;
  zipCode?: string;
  paymentMethod?: "credit_card" | "mobile_money" | "bank_transfer" | "cash";
  paymentProof?: string; // URL from file upload
  notes?: string;
  userId: string;
}

export const orderService = {
  // Create a new order
  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    try {
      console.log("[OrderService] Creating order with data:", JSON.stringify(orderData, null, 2));
      const response = await api.post("/orders", orderData);
      console.log("[OrderService] Order created successfully:", response.data);
      return response.data.order;
    } catch (error: any) {
      console.error("[OrderService] Error creating order:", error);
      if (error.response?.data) {
        console.error("[OrderService] Backend validation errors:", JSON.stringify(error.response.data, null, 2));
      }
      throw error;
    }
  },

  // Get all orders for user (buyer)
  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const response = await api.get(`/orders?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  },

  // Get all orders for seller (where they sold items)
  async getSellerOrders(sellerId: string): Promise<Order[]> {
    try {
      const response = await api.get(`/orders?sellerId=${sellerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching seller orders:", error);
      throw error;
    }
  },

  // Get all orders (admin)
  async getAllOrders(): Promise<Order[]> {
    try {
      const response = await api.get("/orders");
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  // Get a single order by ID
  async getOrderById(id: string): Promise<Order> {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  },

  // Update order status
  async updateOrderStatus(id: string, status: Order["status"]): Promise<Order> {
    try {
      const response = await api.put(`/orders/${id}`, { status });
      return response.data.order;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  },

  // Update payment status
  async updatePaymentStatus(id: string, paymentStatus: Order["paymentStatus"]): Promise<Order> {
    try {
      const response = await api.patch(`/orders/${id}/payment`, { paymentStatus });
      return response.data.order;
    } catch (error) {
      console.error("Error updating payment status:", error);
      throw error;
    }
  },

  // Cancel order
  async cancelOrder(id: string): Promise<Order> {
    try {
      const response = await api.delete(`/orders/${id}`);
      return response.data.order;
    } catch (error) {
      console.error("Error cancelling order:", error);
      throw error;
    }
  },

  // Reject order
  async rejectOrder(orderId: string, reason: string): Promise<Order> {
    try {
      const response = await api.put(`/orders/${orderId}`, {
        status: "cancelled",
        cancellationReason: reason,
        cancelledBy: "seller",
      });
      return response.data.order || response.data;
    } catch (error) {
      console.error("Error rejecting order:", error);
      throw error;
    }
  },

  // Upload payment proof
  async uploadPaymentProof(file: File): Promise<{ proofUrl: string; fileName: string }> {
    try {
      const formData = new FormData();
      formData.append("paymentProof", file);
      const response = await api.post("/orders/upload-proof", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return {
        proofUrl: response.data.proofUrl,
        fileName: response.data.fileName,
      };
    } catch (error) {
      console.error("Error uploading payment proof:", error);
      throw error;
    }
  },
};

