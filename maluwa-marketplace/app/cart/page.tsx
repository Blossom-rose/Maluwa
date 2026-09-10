"use client";

import { useCart } from "@/lib/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeItem, updateQuantity, clearCart, getSubtotal, getTax } = useCart();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const subtotal = getSubtotal();
  const tax = getTax();
  const total = subtotal + tax;

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-20 max-w-7xl mx-auto px-4">
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-[100px] text-on-surface-variant">
            shopping_cart
          </span>
          <h1 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface mt-4">
            Your cart is empty
          </h1>
          <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant mt-2">
            Browse our flowers and add some to your cart!
          </p>
          <Link
            href="/flowers"
            className="inline-block mt-8 px-8 py-3 bg-primary text-on-primary font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface">
          Shopping Cart
        </h1>
        <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] text-on-surface-variant">
          {cart.itemCount} item{cart.itemCount !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item._id || item.id}
                className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant flex gap-4"
              >
                {/* Image */}
                <div className="w-24 h-24 flex-shrink-0 bg-surface-container rounded-lg overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.photoName}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant">
                        local_florist
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-source-serif)] text-[18px] leading-[28px] font-semibold text-on-surface">
                    {item.photoName}
                  </h3>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-primary font-semibold">
                    K{item.price.toLocaleString()}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => {
                        setIsUpdating(item._id || item.id || "");
                        updateQuantity(item._id || item.id || "", Math.max(1, item.quantity - 1));
                        setTimeout(() => setIsUpdating(null), 300);
                      }}
                      disabled={isUpdating === (item._id || item.id)}
                      className="p-1 hover:bg-surface-container rounded transition-colors disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => {
                        setIsUpdating(item._id || item.id || "");
                        updateQuantity(item._id || item.id || "", item.quantity + 1);
                        setTimeout(() => setIsUpdating(null), 300);
                      }}
                      disabled={isUpdating === (item._id || item.id)}
                      className="p-1 hover:bg-surface-container rounded transition-colors disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>

                {/* Price & Remove */}
                <div className="text-right">
                  <p className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
                    K{(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeItem(item._id || item.id || "")}
                    className="mt-4 text-error hover:text-error/80 transition-colors font-semibold text-[14px]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Clear Cart Button */}
          <button
            onClick={clearCart}
            className="mt-6 text-error hover:text-error/80 transition-colors font-semibold"
          >
            Clear entire cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant h-fit sticky top-24">
          <h2 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 border-b border-outline-variant pb-6 mb-6">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Subtotal</span>
              <span className="font-semibold text-on-surface">K{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Tax (10%)</span>
              <span className="font-semibold text-on-surface">K{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Delivery</span>
              <span className="font-semibold text-secondary">FREE</span>
            </div>
          </div>

          <div className="flex justify-between mb-8">
            <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
              Total
            </span>
            <span className="font-[family-name:var(--font-source-serif)] text-[24px] leading-[32px] font-semibold text-primary">
              K{total.toLocaleString()}
            </span>
          </div>

          <Link
            href="/checkout"
            className="block w-full text-center py-4 bg-primary text-on-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Proceed to Checkout
          </Link>

          <Link
            href="/flowers"
            className="block w-full text-center py-3 mt-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
