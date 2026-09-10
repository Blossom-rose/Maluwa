"use client";

import { useCart } from "@/lib/context/CartContext";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/services/authService";
import { inventoryService } from "@/lib/services/inventoryService";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();
  const [user, setUser] = useState(authService.getUser());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryAddress: string;
    city: string;
    zipCode: string;
    paymentMethod: "credit_card" | "mobile_money" | "bank_transfer" | "cash";
    notes: string;
  }>({
    customerName: user?.fullName || "",
    customerEmail: user?.email || "",
    customerPhone: user?.phone || "",
    deliveryAddress: "",
    city: "",
    zipCode: "",
    paymentMethod: "mobile_money",
    notes: "",
  });

  // Redirect if not logged in or empty cart
  useEffect(() => {
    if (!user) {
      router.replace("/sign-in?redirect=/checkout");
      return;
    }
    if (user.isVendor) {
      router.replace("/seller");
      return;
    }
    if (cart.items.length === 0) {
      router.replace("/cart");
    }
  }, [user, cart.items.length, router]);

  const subtotal = cart.total;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields with proper lengths
    const validationErrors: string[] = [];

    if (formData.customerName.length < 3 || formData.customerName.length > 100) {
      validationErrors.push("Name must be between 3 and 100 characters");
    }
    if (!formData.customerEmail || !formData.customerEmail.includes("@")) {
      validationErrors.push("Valid email is required");
    }
    if (formData.customerPhone.length < 6 || formData.customerPhone.length > 20) {
      validationErrors.push("Phone must be between 6 and 20 characters");
    }
    if (formData.deliveryAddress.length < 5 || formData.deliveryAddress.length > 255) {
      validationErrors.push("Address must be between 5 and 255 characters");
    }
    if (formData.city.length < 2 || formData.city.length > 50) {
      validationErrors.push("City must be between 2 and 50 characters");
    }

    if (validationErrors.length > 0) {
      setError(validationErrors.join("\n"));
      return;
    }

    // Validate stock for all items - fetch fresh data from backend
    setError(null);
    setLoading(true);

    try {
      const outOfStockItems: string[] = [];
      
      // Fetch fresh inventory data to check current stock
      for (const item of cart.items) {
        try {
          const freshItem = await inventoryService.getItemById(item._id || item.id || "");
          console.log(`[Checkout] Fresh stock for ${item.photoName}: ${freshItem.countInStock}`);
          
          if (!freshItem.countInStock || freshItem.countInStock < item.quantity) {
            outOfStockItems.push(
              `${item.photoName} (only ${freshItem.countInStock || 0} available, you need ${item.quantity})`
            );
          }
        } catch (err) {
          console.error(`Failed to fetch fresh stock for ${item.photoName}:`, err);
          // If we can't verify, check the cached version
          if (!item.countInStock || item.countInStock < item.quantity) {
            outOfStockItems.push(
              `${item.photoName} (only ${item.countInStock || 0} available, you need ${item.quantity})`
            );
          }
        }
      }

      if (outOfStockItems.length > 0) {
        setError(
          `The following items are no longer in stock:\n\n${outOfStockItems.join("\n")}\n\nPlease update your cart.`
        );
        setLoading(false);
        return;
      }

      // Save checkout data to sessionStorage for payment page
      sessionStorage.setItem("checkoutData", JSON.stringify(formData));

      // Redirect to payment page
      router.push("/checkout/payment");
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user || cart.items.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden flex justify-between items-center px-[20px] py-[12px] bg-surface shadow-sm border-b border-outline-variant">
        <button
          onClick={() => router.push("/")}
          className="text-primary hover:text-primary/80 transition-colors"
          aria-label="Go back"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
          Malawi Bloom
        </span>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-[24px]">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="fixed top-[60px] left-0 right-0 z-40 md:hidden bg-surface border-b border-outline-variant shadow-md">
          <div className="flex flex-col p-4 space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 text-primary font-semibold hover:bg-primary/10 rounded transition-colors"
            >
              Home
            </Link>
            <Link
              href="/flowers"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 text-on-surface-variant font-semibold hover:bg-surface-container-high rounded transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 text-on-surface-variant font-semibold hover:bg-surface-container-high rounded transition-colors"
            >
              Cart
            </Link>
          </div>
        </nav>
      )}

      <div className="flex-1 pt-20 pb-20 md:pt-0 max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Step Indicator */}
            <div className="flex gap-8 mb-12">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-primary text-on-primary">
                  1
                </div>
                <p className="mt-2 font-semibold text-[12px]">Shipping</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-surface-container text-on-surface-variant">
                  2
                </div>
                <p className="mt-2 font-semibold text-[12px]">Payment</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-surface-container text-on-surface-variant">
                  ✓
                </div>
                <p className="mt-2 font-semibold text-[12px]">Confirm</p>
              </div>
            </div>

            {/* Shipping Form */}
            <form onSubmit={handleShippingSubmit} className="space-y-6">
              <div>
                <h2 className="font-[family-name:var(--font-source-serif)] text-[24px] leading-[32px] font-semibold text-on-surface mb-6">
                  Shipping Address
                </h2>

                {error && (
                  <div className="p-4 bg-error/10 border border-error rounded-lg mb-6">
                    <p className="text-error font-semibold whitespace-pre-wrap">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({ ...formData, customerName: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, customerEmail: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={formData.customerPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, customerPhone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-2">
                      Delivery Address * (minimum 5 characters)
                    </label>
                    <input
                      type="text"
                      value={formData.deliveryAddress}
                      onChange={(e) =>
                        setFormData({ ...formData, deliveryAddress: e.target.value })
                      }
                      placeholder="e.g., 123 Main Street, Apartment 5"
                      className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                      minLength={5}
                      maxLength={255}
                      required
                    />
                    {formData.deliveryAddress.length < 5 && formData.deliveryAddress.length > 0 && (
                      <p className="text-error text-[12px] mt-1">Address must be at least 5 characters</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-2">
                      City * (minimum 2 characters)
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g., Lilongwe"
                      className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                      minLength={2}
                      maxLength={50}
                      required
                    />
                    {formData.city.length < 2 && formData.city.length > 0 && (
                      <p className="text-error text-[12px] mt-1">City must be at least 2 characters</p>
                    )}
                  </div>

                  {/* Zip Code */}
                  <div>
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Notes */}
                  <div className="sm:col-span-2">
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-2">
                      Delivery Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any special instructions for delivery"
                      rows={3}
                      className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/cart"
                  className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10"
                >
                  Back to Cart
                </Link>
                <button
                  type="submit"
                  disabled={
                    loading ||
                    formData.customerName.length < 3 ||
                    !formData.customerEmail.includes("@") ||
                    formData.customerPhone.length < 6 ||
                    formData.deliveryAddress.length < 5 ||
                    formData.city.length < 2
                  }
                  className="flex-1 px-8 py-3 bg-primary text-on-primary font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  {loading ? "Validating..." : "Continue to Payment"}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant h-fit sticky top-24">
            <h3 className="font-[family-name:var(--font-source-serif)] text-[18px] leading-[28px] font-semibold text-on-surface mb-4">
              Order Summary
            </h3>

            {/* Items */}
            <div className="space-y-2 mb-6 pb-6 border-b border-outline-variant">
              {cart.items.map((item) => (
                <div key={item._id || item.id} className="flex justify-between text-[14px]">
                  <span className="text-on-surface-variant">
                    {item.photoName} x {item.quantity}
                  </span>
                  <span className="font-semibold text-on-surface">
                    K{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 text-[14px] mb-6">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="font-semibold">K{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Tax (10%)</span>
                <span className="font-semibold">K{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Delivery</span>
                <span className="font-semibold text-secondary">FREE</span>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant flex justify-between">
              <span className="font-[family-name:var(--font-source-serif)] text-[18px] font-semibold text-on-surface">
                Total
              </span>
              <span className="font-[family-name:var(--font-source-serif)] text-[20px] font-semibold text-primary">
                K{total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
