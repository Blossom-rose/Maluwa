"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { orderService, Order } from "@/lib/services/orderService";
import { authService } from "@/lib/services/authService";
import { notificationService } from "@/lib/services/notificationService";

export default function SellerOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const user = authService.getUser();
        console.log("[SellerOrders] Current user:", user);

        if (!user?._id && !user?.id) {
          setError("You must be logged in as a seller");
          setLoading(false);
          return;
        }

        const userId = (user._id || user.id) as string;
        console.log("[SellerOrders] Loading orders for sellerId:", userId);

        // Get orders where this seller sold items
        const data = await orderService.getSellerOrders(userId);
        console.log("[SellerOrders] Loaded orders:", data);
        setOrders(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const filteredOrders = statusFilter
    ? orders.filter(order => order.status === statusFilter)
    : orders;

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-cyan-100 text-cyan-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const getStatusColor = (status: string) => statusColors[status] || "bg-gray-100 text-gray-800";

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[400px]">
        <p className="text-on-surface-variant">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="p-6 pb-20 md:pb-6">
      <h1 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface mb-8">
        Orders
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-error-container text-on-error rounded-lg">
          {error}
        </div>
      )}

      {/* Status Filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <button
          onClick={() => setStatusFilter(null)}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            statusFilter === null
              ? "bg-primary text-on-primary"
              : "bg-surface-container text-on-surface hover:bg-surface-container-high"
          }`}
        >
          All Orders
        </button>
        {["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg font-bold capitalize transition-all ${
              statusFilter === status
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-on-surface hover:bg-surface-container-high"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-surface-container rounded-lg">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4 block">
            receipt_long
          </span>
          <p className="text-on-surface-variant">
            {statusFilter ? `No ${statusFilter} orders` : "No orders yet"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Link key={order._id || order.id} href={`/seller/orders/${order._id || order.id}`}>
              <div className="bg-surface rounded-lg shadow-md p-6 border border-outline-variant hover:shadow-lg transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-on-surface mb-1">
                      Order #{order._id?.toString().slice(-6) || order.id?.slice(-6)}
                    </h3>
                    <p className="text-on-surface-variant text-sm">
                      {order.customerName} • {order.customerEmail}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-on-surface-variant text-xs">Items</span>
                    <p className="font-bold text-on-surface">{order.items.length}</p>
                  </div>
                  <div>
                    <span className="text-on-surface-variant text-xs">Total</span>
                    <p className="font-bold text-primary">K{order.total.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-on-surface-variant text-xs">Payment</span>
                    <p className="font-bold capitalize">{order.paymentStatus}</p>
                  </div>
                  <div>
                    <span className="text-on-surface-variant text-xs">Delivery</span>
                    <p className="font-bold text-on-surface">{order.city}</p>
                  </div>
                </div>

                {order.status === "cancelled" && order.cancellationReason && (
                  <div className="mb-2 text-sm text-on-error">
                    <span className="font-semibold">Rejection reason:</span> {order.cancellationReason}
                  </div>
                )}

                <div className="text-sm text-on-surface-variant">
                  Order placed: {new Date(order.dateCreated || "").toLocaleDateString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}