"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { orderService, Order } from "@/lib/services/orderService";
import { useCart } from "@/lib/context/CartContext";
import Link from "next/link";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const urlOrderId = searchParams.get("orderId");
  const [orderId, setOrderId] = useState<string | null>(urlOrderId);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { refreshCart } = useCart();

  // On mount, check sessionStorage for orderId if not in URL.
  // Also refresh the cart so the badge correctly shows 0 after checkout.
  useEffect(() => {
    // Sync cart with backend — clears any stale local state
    refreshCart();

    if (!urlOrderId) {
      const storedOrderId = sessionStorage.getItem("orderId");
      if (storedOrderId) {
        setOrderId(storedOrderId);
        // Clean up sessionStorage after reading
        sessionStorage.removeItem("orderId");
      } else {
        setError("No order found");
        setLoading(false);
      }
    }
  }, [urlOrderId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!orderId) {
      return;
    }

    const fetchOrder = async () => {
      try {
        const orderData = await orderService.getOrderById(orderId);
        setOrder(orderData);
      } catch (err) {
        setError("Failed to load order details");
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-20 max-w-3xl mx-auto px-4 flex items-center justify-center">
        <p className="text-on-surface-variant">Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen pt-20 pb-20 max-w-3xl mx-auto px-4">
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-[64px] text-error">error</span>
          <h1 className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] font-semibold text-on-surface mt-4">
            {error || "Order not found"}
          </h1>
          <Link
            href="/flowers"
            className="inline-block mt-8 px-8 py-3 bg-primary text-on-primary font-semibold rounded-full hover:opacity-90"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20 max-w-3xl mx-auto px-4">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="mb-6">
          <span className="material-symbols-outlined text-[80px] text-secondary">
            check_circle
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface mb-2">
          Order Confirmed!
        </h1>
        <p className="text-on-surface-variant text-[16px]">
          Thank you for your order. We&apos;ll process it shortly.
        </p>
      </div>

      {/* Order Details */}
      <div className="bg-surface-container-low p-8 rounded-lg border border-outline-variant mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          {/* Order Number */}
          <div>
            <p className="text-on-surface-variant text-[12px] font-semibold mb-2">ORDER NUMBER</p>
            <p className="font-[family-name:var(--font-source-serif)] text-[20px] font-semibold text-on-surface">
              {order.id}
            </p>
          </div>

          {/* Date */}
          <div>
            <p className="text-on-surface-variant text-[12px] font-semibold mb-2">ORDER DATE</p>
            <p className="font-[family-name:var(--font-source-serif)] text-[20px] font-semibold text-on-surface">
              {new Date(order.dateCreated || "").toLocaleDateString()}
            </p>
          </div>

          {/* Status */}
          <div>
            <p className="text-on-surface-variant text-[12px] font-semibold mb-2">STATUS</p>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-[12px] font-semibold capitalize ${
                  order.status === "pending"
                    ? "bg-tertiary-fixed text-on-tertiary-fixed"
                    : order.status === "confirmed"
                      ? "bg-secondary-container text-on-secondary-container"
                      : "bg-secondary-fixed text-on-secondary-fixed"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>

          {/* Payment Status */}
          <div>
            <p className="text-on-surface-variant text-[12px] font-semibold mb-2">PAYMENT STATUS</p>
            <span
              className={`px-3 py-1 rounded-full text-[12px] font-semibold capitalize ${
                order.paymentStatus === "pending"
                  ? "bg-tertiary-fixed text-on-tertiary-fixed"
                  : order.paymentStatus === "completed"
                    ? "bg-secondary-container text-on-secondary-container"
                    : "bg-error/20 text-error"
              }`}
            >
              {order.paymentStatus}
            </span>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-outline-variant my-8" />

        {/* Items */}
        <div className="mb-8">
          <h3 className="font-semibold text-on-surface mb-4">Items Ordered</h3>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between py-2 border-b border-outline-variant/50">
                <div>
                  <p className="text-on-surface font-semibold">{item.photoName}</p>
                  <p className="text-on-surface-variant text-[12px]">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-on-surface">K{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-outline-variant my-8" />

        {/* Pricing */}
        <div className="space-y-2 mb-8">
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Subtotal</span>
            <span className="font-semibold text-on-surface">K{order.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Tax</span>
            <span className="font-semibold text-on-surface">K{order.tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[18px]">
            <span className="font-semibold text-on-surface">Total</span>
            <span className="font-semibold text-primary">K{order.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-outline-variant my-8" />

        {/* Shipping & Payment Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Shipping */}
          <div>
            <h4 className="font-semibold text-on-surface mb-4">Shipping Address</h4>
            <div className="text-on-surface-variant text-[14px] space-y-1">
              <div>{order.customerName}</div>
              <div>{order.deliveryAddress}</div>
              <div>
                {order.city} {order.zipCode}
              </div>
              <div className="mt-2">{order.customerPhone}</div>
              <div>{order.customerEmail}</div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h4 className="font-semibold text-on-surface mb-4">Payment Information</h4>
            <div className="text-on-surface-variant text-[14px] space-y-2">
              <div>Method: {order.paymentMethod.replace("_", " ").toUpperCase()}</div>
              <div>Status: {order.paymentStatus.toUpperCase()}</div>
              {order.notes && (
                <div className="mt-4">
                  <p className="text-[12px] text-on-surface-variant">Notes:</p>
                  <p>{order.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/flowers"
          className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 text-center"
        >
          Continue Shopping
        </Link>
        <button
          onClick={() => window.print()}
          className="px-8 py-3 bg-surface-container text-on-surface font-semibold rounded-lg hover:bg-surface-container-high"
        >
          Print Order
        </button>
      </div>

      {/* Email Notice */}
      <div className="mt-12 p-6 bg-secondary-container rounded-lg text-center">
        <p className="text-on-secondary-container font-semibold">
          A confirmation email has been sent to <span className="font-bold">{order.customerEmail}</span>
        </p>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-20 pb-20 max-w-3xl mx-auto px-4 flex items-center justify-center">
        <p className="text-on-surface-variant">Loading order details...</p>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
