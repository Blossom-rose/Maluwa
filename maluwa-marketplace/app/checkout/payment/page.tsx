"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/context/CartContext";
import { orderService } from "@/lib/services/orderService";
import { authService } from "@/lib/services/authService";

interface CheckoutData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  city: string;
  zipCode: string;
  notes: string;
}

export default function Payment() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

  // Get checkout data from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("checkoutData");
    if (stored) {
      setCheckoutData(JSON.parse(stored));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        setError("Only JPEG, PNG, and PDF files are allowed");
        return;
      }

      setSelectedFile(file);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      // Validate file size
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        setError("Only JPEG, PNG, and PDF files are allowed");
        return;
      }

      setSelectedFile(file);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("Please select a file");
      return;
    }

    if (!checkoutData) {
      setError("Checkout data not found");
      return;
    }

    if (cart.items.length === 0) {
      setError("Cart is empty");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Upload payment proof
      setUploadProgress(25);
      const uploadResponse = await orderService.uploadPaymentProof(selectedFile);
      const proofUrl = uploadResponse.proofUrl;
      
      setUploadProgress(50);

      // Get user ID from auth service
      const user = authService.getUser();
      if (!user || (!user.id && !user._id)) {
        throw new Error("User not authenticated");
      }

      // Prepare order items from cart
      const orderItems = cart.items.map((item) => ({
        flowerId: item._id || item.id || "",
        quantity: item.quantity,
      }));

      // Create order with payment proof
      setUploadProgress(75);
      const order = await orderService.createOrder({
        items: orderItems,
        userId: user._id || user.id || "",
        customerName: checkoutData.customerName,
        customerEmail: checkoutData.customerEmail,
        customerPhone: checkoutData.customerPhone,
        deliveryAddress: checkoutData.deliveryAddress,
        city: checkoutData.city,
        zipCode: checkoutData.zipCode,
        paymentMethod: "mobile_money",
        paymentProof: proofUrl,
        notes: checkoutData.notes,
      });

      setUploadProgress(100);

      // Store order ID for confirmation page
      sessionStorage.setItem("orderId", order._id || order.id || "");
      
      // Clear checkout data from session
      sessionStorage.removeItem("checkoutData");
      router.push(`/checkout/confirmation?orderId=${order._id || order.id}`);

      // Clear the cart — wrap in its own try/catch so a network hiccup
      // here doesn't block the buyer reaching the confirmation page.
      try {
        await clearCart();
        console.log("[Payment] Cart cleared successfully after order creation.");
      } catch (cartErr) {
        console.error("[Payment] Warning: cart clear failed (non-blocking):", cartErr);
      }
      
      // Redirect to confirmation page
      setTimeout(() => {
        router.push("/checkout/confirmation");
      }, 500);
    } catch (err) {
      console.error("Error submitting payment proof:", err);
      let errorMsg = "Failed to submit payment proof";
      
      if (err instanceof Error) {
        errorMsg = err.message;
      } else if (typeof err === 'object' && err !== null) {
        const axiosErr = err as any;
        if (axiosErr.response?.data?.errors) {
          // Multiple validation errors from backend
          const errors = axiosErr.response.data.errors;
          errorMsg = errors.map((e: any) => `${e.field}: ${e.message}`).join('\n');
        } else if (axiosErr.response?.data?.message) {
          // Single error message from backend
          errorMsg = axiosErr.response.data.message;
        } else if (axiosErr.message) {
          errorMsg = axiosErr.message;
        }
      }
      
      setError(errorMsg);
      setUploadProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [orderNumber, setOrderNumber] = useState<string>("");

  useEffect(() => {
    // Generate order number only on client to avoid hydration mismatch
    setOrderNumber(`#MB-${Date.now().toString().slice(-4)}`);
  }, []);

  const orderTotal = checkoutData ? cart.total : 0;

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-[20px] py-[16px] max-w-7xl mx-auto bg-surface shadow-sm">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => router.back()} 
            className="material-symbols-outlined text-primary text-2xl hover:opacity-75 transition-opacity"
          >
            arrow_back
          </button>
          <h1 className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] font-semibold text-primary">
            Malawi Bloom
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-on-surface-variant">account_circle</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-[32px] px-[20px] max-w-3xl mx-auto w-full">
        {/* Header Section */}
        <section className="text-center mb-[32px]">
          <h2 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-primary mb-2">
            Complete Your Payment
          </h2>
          <p className="text-on-surface-variant font-[family-name:var(--font-be-vietnam)]">
            Your bouquet is reserved. Please follow the instructions below to finalize your order.
          </p>
        </section>

        {/* Order Summary Card */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm p-6 mb-[16px] border border-outline-variant">
          <div className="flex justify-between items-center border-b border-outline-variant pb-4 mb-4">
            <div>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase tracking-wider">
                Order Number
              </p>
              <p className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
                {orderNumber}
              </p>
            </div>
            <div className="text-right">
              <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase tracking-wider">
                Total Amount
              </p>
              <p className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-secondary">
                MK {orderTotal.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-tertiary">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
              Awaiting payment verification
            </span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-[16px] p-4 bg-error-container text-on-error-container rounded-xl flex items-start gap-3">
            <span className="material-symbols-outlined flex-shrink-0">error</span>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px]">{error}</p>
          </div>
        )}

        {/* Instructions Section (Bento Grid) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[32px]">
          {/* Airtel Money */}
          <div className="bg-white p-5 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-red-600">smartphone</span>
              </div>
              <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold">
                Airtel Money
              </h3>
            </div>
            <div className="space-y-1">
              <p className="font-[family-name:var(--font-be-vietnam)] font-bold text-on-surface">088 123 456</p>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                Malawi Bloom Ltd
              </p>
            </div>
          </div>

          {/* TNM Mpamba */}
          <div className="bg-white p-5 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600">payments</span>
              </div>
              <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold">
                TNM Mpamba
              </h3>
            </div>
            <div className="space-y-1">
              <p className="font-[family-name:var(--font-be-vietnam)] font-bold text-on-surface">099 123 456</p>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                Malawi Bloom Ltd
              </p>
            </div>
          </div>

          {/* Bank Transfer */}
          <div className="md:col-span-2 bg-white p-5 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600">account_balance</span>
              </div>
              <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold">
                Bank Transfer
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                  Bank Name
                </p>
                <p className="font-[family-name:var(--font-be-vietnam)] font-bold">National Bank</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                  Account Number
                </p>
                <p className="font-[family-name:var(--font-be-vietnam)] font-bold">1002345678</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                  Branch
                </p>
                <p className="font-[family-name:var(--font-be-vietnam)]">Victoria Avenue</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                  Account Holder
                </p>
                <p className="font-[family-name:var(--font-be-vietnam)]">Malawi Bloom Ltd</p>
              </div>
            </div>
          </div>
        </section>

        {/* Proof of Payment Upload */}
        <section className="mb-[32px]">
          <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary mb-4">
            Proof of Payment
          </h3>
          <div 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-outline-variant rounded-xl p-10 flex flex-col items-center justify-center bg-surface-container-low transition-all cursor-pointer hover:bg-surface-container text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
            </div>
            <p className="font-[family-name:var(--font-be-vietnam)] font-bold text-on-surface">
              Upload Receipt / Screenshot
            </p>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mt-1">
              Drag and drop your file here or click to browse
            </p>
            <input 
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/jpg,.pdf"
              className="hidden" 
              type="file" 
              onChange={handleFileChange}
            />
            {selectedFile && (
              <div className="mt-4 p-3 bg-secondary-container text-on-secondary-container rounded-lg flex items-center gap-2">
                <span className="material-symbols-outlined">check_circle</span>
                <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
                  {selectedFile.name} selected ({(selectedFile.size / 1024).toFixed(2)} KB)
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Progress Bar */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mb-[32px]">
            <div className="w-full h-2 bg-outline-variant rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-center font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] text-on-surface-variant mt-2">
              {uploadProgress}% Complete
            </p>
          </div>
        )}

        {/* Submit Action */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleSubmit}
            disabled={!selectedFile || isSubmitting}
            className="w-full py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary-container transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Proof of Payment"
            )}
          </button>
          <p className="text-center text-on-surface-variant font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold italic">
            By submitting, you confirm that the payment of MK {orderTotal.toLocaleString()} has been made to the accounts listed above.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-surface-container-highest border-t border-outline-variant py-[32px] px-[20px]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-[16px]">
          <div className="flex flex-col gap-2">
            <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
              Malawi Bloom
            </span>
            <p className="font-[family-name:var(--font-be-vietnam)] text-on-surface-variant">
              © 2024 Malawi Bloom. The Warm Heart of Africa in Every Petal.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-secondary">
              <span className="material-symbols-outlined">verified_user</span>
              <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold font-bold uppercase">
                Verification Promise
              </span>
            </div>
            <p className="font-[family-name:var(--font-be-vietnam)] text-on-surface-variant">
              Our admin will verify your payment and update your order status within <strong>1 hour</strong>.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold font-bold text-on-surface-variant uppercase">
              Need help?
            </span>
            <Link className="font-[family-name:var(--font-be-vietnam)] text-primary hover:underline flex items-center gap-1" href="/contact">
              <span className="material-symbols-outlined text-sm">chat</span>
              WhatsApp Support
            </Link>
            <Link className="font-[family-name:var(--font-be-vietnam)] text-primary hover:underline flex items-center gap-1" href="/contact">
              <span className="material-symbols-outlined text-sm">call</span>
              +265 88 123 456
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
