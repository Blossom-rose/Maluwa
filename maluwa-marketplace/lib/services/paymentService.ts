import api from "../api";

export interface BankAccount {
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  accountType: "savings" | "checking" | "airtel_money" | "tnm_mpamba";
  momoPhone?: string;
}

export interface PaymentStats {
  totalEarnings: number;
  totalPaid: number;
  pendingPayout: number;
}

export interface SellerPaymentInfo {
  fullName: string;
  email: string;
  phone: string;
  bankAccount: BankAccount;
  additionalPaymentMethods?: BankAccount[];
  paymentStats: PaymentStats;
}

export interface Transaction {
  _id?: string;
  id?: string;
  sellerId: string;
  orderId: string;
  type: "order_sale" | "payout" | "refund" | "adjustment";
  amount: number;
  commission: number;
  netEarnings: number;
  status: "pending" | "completed" | "cancelled" | "refunded";
  description: string;
  itemCount: number;
  paymentMethod: string;
  dateCreated: Date;
  dateUpdated: Date;
}

export interface TransactionHistory {
  transactions: Transaction[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export const paymentService = {
  // Get seller's payment information
  async getSellerPaymentInfo(sellerId: string): Promise<SellerPaymentInfo> {
    try {
      const response = await api.get(`/payments/seller/${sellerId}/info`);
      return response.data;
    } catch (error) {
      console.error("Error fetching seller payment info:", error);
      throw error;
    }
  },

  // Update bank account details
  async updateBankAccount(
    sellerId: string,
    bankAccount: BankAccount
  ): Promise<BankAccount> {
    try {
      const response = await api.put(
        `/payments/seller/${sellerId}/bank-account`,
        bankAccount
      );
      return response.data.bankAccount;
    } catch (error) {
      console.error("Error updating bank account:", error);
      throw error;
    }
  },

  // Request a payout
  async requestPayout(sellerId: string): Promise<{ message: string; amount: number }> {
    try {
      const response = await api.post(`/payments/seller/${sellerId}/request-payout`);
      return response.data;
    } catch (error) {
      console.error("Error requesting payout:", error);
      throw error;
    }
  },

  // Get seller transaction history
  async getTransactionHistory(
    sellerId: string,
    options?: {
      limit?: number;
      page?: number;
      status?: "pending" | "completed" | "cancelled" | "refunded";
    }
  ): Promise<TransactionHistory> {
    try {
      const params = new URLSearchParams();
      params.append("limit", String(options?.limit || 10));
      params.append("page", String(options?.page || 1));
      if (options?.status) {
        params.append("status", options.status);
      }

      const queryString = params.toString();
      const response = await api.get(`/payments/seller/${sellerId}?${queryString}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      throw error;
    }
  },

  // Add additional payment method
  async addPaymentMethod(
    sellerId: string,
    paymentMethod: BankAccount
  ): Promise<BankAccount[]> {
    try {
      const response = await api.post(
        `/payments/seller/${sellerId}/payment-methods`,
        paymentMethod
      );
      return response.data.paymentMethods;
    } catch (error) {
      console.error("Error adding payment method:", error);
      throw error;
    }
  },

  // Get all payment methods for a seller
  async getPaymentMethods(sellerId: string): Promise<{
    primaryPaymentMethod: BankAccount;
    additionalPaymentMethods: BankAccount[];
  }> {
    try {
      const response = await api.get(`/payments/seller/${sellerId}/payment-methods`);
      return response.data;
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      throw error;
    }
  },

  // Update additional payment method
  async updatePaymentMethod(
    sellerId: string,
    methodIndex: number,
    paymentMethod: BankAccount
  ): Promise<BankAccount[]> {
    try {
      const response = await api.put(
        `/payments/seller/${sellerId}/payment-methods/${methodIndex}`,
        paymentMethod
      );
      return response.data.paymentMethods;
    } catch (error) {
      console.error("Error updating payment method:", error);
      throw error;
    }
  },

  // Delete additional payment method
  async deletePaymentMethod(sellerId: string, methodIndex: number): Promise<BankAccount[]> {
    try {
      const response = await api.delete(
        `/payments/seller/${sellerId}/payment-methods/${methodIndex}`
      );
      return response.data.paymentMethods;
    } catch (error) {
      console.error("Error deleting payment method:", error);
      throw error;
    }
  },

  // Get payment methods for checkout (multiple sellers)
  async getCheckoutPaymentMethods(sellerIds: string[]): Promise<any> {
    try {
      const response = await api.post("/payments/checkout/payment-methods", {
        sellerIds,
      });
      return response.data.paymentMethods;
    } catch (error) {
      console.error("Error fetching checkout payment methods:", error);
      throw error;
    }
  },
};
