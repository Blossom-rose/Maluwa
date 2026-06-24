"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Payment() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Payment proof submitted successfully! Our team will verify it shortly.");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-[20px] py-[16px] max-w-7xl mx-auto bg-surface shadow-sm">
        <div className="flex items-center gap-2">
          <button onClick={() => window.history.back()} className="material-symbols-outlined text-primary text-2xl">
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
                #MB-4032
              </p>
            </div>
            <div className="text-right">
              <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase tracking-wider">
                Total Amount
              </p>
              <p className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-secondary">
                MK 25,000
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
          <div className="border-2 border-dashed border-outline-variant rounded-xl p-10 flex flex-col items-center justify-center bg-surface-container-low transition-all cursor-pointer hover:bg-surface-container text-center">
            <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
            </div>
            <p className="font-[family-name:var(--font-be-vietnam)] font-bold text-on-surface">
              Upload Receipt / Screenshot
            </p>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mt-1">
              Drag and drop your file here or click to browse
            </p>
            <input accept="image/*,.pdf" className="hidden" type="file" onChange={handleFileChange} />
            {selectedFile && (
              <div className="mt-4 p-3 bg-secondary-container text-on-secondary-container rounded-lg flex items-center gap-2">
                <span className="material-symbols-outlined">check_circle</span>
                <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
                  {selectedFile.name} selected
                </span>
              </div>
            )}
          </div>
        </section>

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
            By submitting, you confirm that the payment of MK 25,000 has been made to the accounts listed above.
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
            <Link className="font-[family-name:var(--font-be-vietnam)] text-primary hover:underline flex items-center gap-1" href="#">
              <span className="material-symbols-outlined text-sm">chat</span>
              WhatsApp Support
            </Link>
            <Link className="font-[family-name:var(--font-be-vietnam)] text-primary hover:underline flex items-center gap-1" href="#">
              <span className="material-symbols-outlined text-sm">call</span>
              +265 88 123 456
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
