"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { orderService, Order } from "@/lib/services/orderService";
import { authService } from "@/lib/services/authService";
import { notificationService } from "@/lib/services/notificationService";

export default function BuyerOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if not logged in
    const user = authService.getUser();
    if (!user) {
      router.replace("/sign-in?redirect=/buyer/orders");
      return;
    }

    const loadOrders = async () => {
      try {
        const userId = (user._id || user.id) as string;
        console.log("[BuyerOrders] Loading orders for userId:", userId);
        const data = await orderService.getUserOrders(userId);
        console.log("[BuyerOrders] Loaded orders:", data);
        setOrders(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load your orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [router]);

  const filteredOrders = statusFilter
    ? orders.filter(order => order.status === statusFilter)
    : orders;

  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm("Are you sure you want to cancel this order? This action cannot be undone.")) {
      return;
    }

    setCancellingOrderId(orderId);
    try {
      const result = await orderService.cancelOrder(orderId);
      setOrders(orders.map(o => o._id === orderId || o.id === orderId ? result : o));
      notificationService.success("Order cancelled successfully. Your refund will be processed shortly.");
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to cancel order";
      notificationService.error(errorMsg);
      console.error("Cancel error:", err);
    } finally {
      setCancellingOrderId(null);
    }
  };

  const handleConfirmDelivery = async (orderId: string) => {
    if (!window.confirm("Confirm that you have received this package?")) {
      return;
    }

    setCancellingOrderId(orderId);
    try {
      const result = await orderService.updateOrderStatus(orderId, "delivered");
      setOrders(orders.map(o => o._id === orderId || o.id === orderId ? result : o));
      notificationService.success("Thank you! Delivery confirmed. The seller has been notified.");
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to confirm delivery";
      notificationService.error(errorMsg);
      console.error("Delivery confirmation error:", err);
    } finally {
      setCancellingOrderId(null);
    }
  };

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
      <div className="min-h-screen bg-background pt-20 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 flex justify-center items-center min-h-[400px]">
            <p className="text-on-surface-variant">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface">
              My Orders
            </h1>
            <p className="text-on-surface-variant mt-2">Track and manage your orders</p>
          </div>
          <Link href="/flowers">
            <button className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all">
              Continue Shopping
            </button>
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error/10 border border-error rounded-lg">
            <p className="text-error font-semibold">{error}</p>
          </div>
        )}

        {/* Status Filter */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => setStatusFilter(null)}
            className={`px-4 py-2 rounded-lg font-bold transition-all text-sm ${
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
              className={`px-4 py-2 rounded-lg font-bold capitalize transition-all text-sm ${
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
          <div className="text-center py-12 bg-surface rounded-lg border border-outline-variant">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4 block">
              shopping_bag
            </span>
            <p className="text-on-surface-variant mb-4">
              {statusFilter ? `No ${statusFilter} orders` : "You haven't placed any orders yet"}
            </p>
            <Link href="/flowers">
              <button className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order._id || order.id} className="bg-surface rounded-lg shadow-md border border-outline-variant overflow-hidden hover:shadow-lg transition-all">
                {/* Order Header */}
                <div className="p-6 border-b border-outline-variant">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-on-surface mb-1 text-lg">
                        Order #{order._id?.toString().slice(-6) || order.id?.slice(-6)}
                      </h3>
                      <p className="text-on-surface-variant text-sm">
                        Placed on {new Date(order.dateCreated || "").toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Rejection / cancellation reason banner - visible right at the top of the order */}
                  {order.status === "cancelled" && order.cancellationReason && (
                    <div className="mt-4 p-4 bg-error/10 border border-error rounded-lg">
                      <p className="text-error font-semibold text-sm mb-1">
                        {order.cancelledBy === "seller" ? "This order was declined by the seller" : "This order was cancelled"}
                      </p>
                      <p className="text-on-surface text-sm">
                        <span className="font-semibold">Reason:</span> {order.cancellationReason}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <span className="text-on-surface-variant text-xs">Items</span>
                      <p className="font-bold text-on-surface">{order.items.length}</p>
                    </div>
                    <div>
                      <span className="text-on-surface-variant text-xs">Total Amount</span>
                      <p className="font-bold text-primary">K{order.total.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-on-surface-variant text-xs">Payment</span>
                      <p className="font-bold capitalize text-sm">{order.paymentStatus}</p>
                    </div>
                    <div>
                      <span className="text-on-surface-variant text-xs">Delivery To</span>
                      <p className="font-bold text-on-surface">{order.city}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 border-b border-outline-variant bg-surface-container-low">
                  <h4 className="font-semibold text-on-surface mb-4">Items Ordered</h4>
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-surface rounded-lg">
                        <div>
                          <p className="font-semibold text-on-surface">{item.photoName}</p>
                          <p className="text-sm text-on-surface-variant">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-primary">K{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery & Payment Info */}
                <div className="p-6 border-b border-outline-variant">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-on-surface mb-3">Delivery Address</h4>
                      <div className="text-on-surface-variant text-sm space-y-1">
                        <div>{order.customerName}</div>
                        <div>{order.deliveryAddress}</div>
                        <div>{order.city} {order.zipCode}</div>
                        <div className="mt-2 text-on-surface">{order.customerPhone}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface mb-3">Payment Information</h4>
                      <div className="text-on-surface-variant text-sm space-y-1">
                        <div>Method: <span className="capitalize font-semibold">{order.paymentMethod.replace("_", " ")}</span></div>
                        <div>Status: <span className="capitalize font-semibold text-primary">{order.paymentStatus}</span></div>
                        {order.paymentProof && (() => {
                          const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
                          const proofUrl = `${apiBase}${order.paymentProof}`;
                          const isImage = /\.(jpe?g|png)$/i.test(order.paymentProof);
                          return (
                            <div className="mt-3">
                              <p className="text-xs text-on-surface-variant font-semibold mb-2">Payment Proof:</p>
                              {isImage && (
                                <a href={proofUrl} target="_blank" rel="noopener noreferrer">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={proofUrl}
                                    alt="Payment proof thumbnail"
                                    className="w-32 h-32 object-cover rounded-lg border border-outline-variant mb-2 hover:opacity-90 transition-opacity cursor-pointer"
                                  />
                                </a>
                              )}
                              <a
                                href={proofUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-2 bg-primary text-white rounded text-xs font-semibold hover:opacity-90 transition-all"
                              >
                                <span className="material-symbols-outlined text-sm">open_in_new</span>
                                {isImage ? "Open Full Image" : "View Payment Proof"}
                              </a>
                            </div>
                          );
                        })()}
                        {order.notes && (
                          <div className="mt-3 p-3 bg-surface rounded">
                            <p className="text-xs text-on-surface-variant font-semibold">Notes:</p>
                            <p className="text-on-surface">{order.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="p-6 bg-surface-container-low">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Subtotal:</span>
                      <span className="font-semibold">K{order.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Tax (10%):</span>
                      <span className="font-semibold">K{order.tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-outline-variant pt-2 mt-2">
                      <span className="font-semibold text-on-surface">Total:</span>
                      <span className="font-bold text-primary text-lg">K{order.total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Cancel Button */}
                  {!["shipped", "delivered", "cancelled"].includes(order.status) && (
                    <button
                      onClick={() => handleCancelOrder(order._id || order.id || "")}
                      disabled={cancellingOrderId === (order._id || order.id)}
                      className="w-full px-4 py-3 mt-4 bg-error text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {cancellingOrderId === (order._id || order.id) ? "Cancelling..." : "Cancel Order"}
                    </button>
                  )}
                  {["shipped", "delivered"].includes(order.status) && (
                    <div className="mt-4 p-3 bg-error/10 border border-error rounded-lg">
                      <p className="text-error text-sm font-semibold">Cannot cancel: Order has been {order.status}</p>
                    </div>
                  )}
                  {order.status === "cancelled" && !order.cancellationReason && (
                    <div className="mt-4 p-3 bg-outline/10 border border-outline rounded-lg">
                      <p className="text-on-surface text-sm font-semibold">This order has been cancelled</p>
                    </div>
                  )}

                  {/* Delivery Confirmation Button */}
                  {order.status === "shipped" && (
                    <button
                      onClick={() => handleConfirmDelivery(order._id || order.id || "")}
                      disabled={cancellingOrderId === (order._id || order.id)}
                      className="w-full px-4 py-3 mt-4 bg-secondary text-on-secondary font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {cancellingOrderId === (order._id || order.id) ? "Confirming..." : "✓ Confirm I Received Package"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}