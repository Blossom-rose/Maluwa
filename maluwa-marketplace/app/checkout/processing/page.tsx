"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Processing() {
  const [status, setStatus] = useState("Securely Redirecting");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("Connecting to Gateway...");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes subtle-pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(0.98);
          }
        }
        .spinner-ring {
          border-top-color: transparent;
          border-right-color: transparent;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-[20px] py-[4px] max-w-7xl mx-auto bg-surface shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] font-semibold text-primary">
            Malawi Bloom
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-on-surface-variant font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <span>SECURE CHECKOUT</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center pt-24 pb-[32px] px-[20px] min-h-screen">
        <div className="max-w-md w-full flex flex-col items-center text-center">
          {/* Loading Animation */}
          <div className="mb-[32px] relative">
            {/* Outer Ring */}
            <div className="absolute -inset-8 border-2 border-primary/10 rounded-full animate-spin" style={{ animationDuration: "8s" }}></div>
            {/* Main Loading Orb */}
            <div className="relative w-32 h-32 rounded-full bg-surface-container-lowest shadow-lg flex items-center justify-center p-6 border border-outline-variant">
              <div className="absolute inset-0 border-4 border-secondary rounded-full spinner-ring animate-spin"></div>
              <div className="relative w-16 h-16">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8-zGu1UQD-69i0vDfw-GUzYZb5do1fT2srjCaJmOLFosX9QK_yEqG_VGx0Dzv-XGLWnE7Q1JAPdEU_MEhb7G1NWssJfvGV-SgghRNCATABhMMb64_sxU8mLlVuKLngT4FsdsXlkeOphOhcFT2rYW7cQdKEOr4rhZx5-4_e9byIYRLIo9w1sOMoS6I4_C0wUMODHpNswG5OQHxSWJC5B1C_-BsCitYj2Ozd0k7I1btqTqgLtDhUwPA1T6XnbwFZGAdh8bhUHcOfu4"
                  alt="Pay Changu Logo"
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-[8px] mb-[32px]">
            <h1 className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] font-semibold text-on-surface">
              {status}
            </h1>
            <p className="font-[family-name:var(--font-be-vietnam)] text-on-surface-variant max-w-xs mx-auto">
              Please wait while we connect you to <span className="font-bold text-primary">Pay Changu</span> to complete your purchase.
            </p>
          </div>

          {/* Payment Summary Card */}
          <div className="w-full bg-surface-container-low rounded-xl p-[16px] border border-outline-variant shadow-sm mb-[32px]">
            <div className="flex justify-between items-center mb-[8px]">
              <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                TOTAL AMOUNT
              </span>
              <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold px-2 py-1 bg-secondary-container text-on-secondary-container rounded-full uppercase">
                Pending
              </span>
            </div>
            <div className="font-[family-name:var(--font-source-serif)] text-[48px] leading-[56px] tracking-[-0.02em] font-bold text-primary mb-[4px]">
              MK 25,000
            </div>
            <div className="border-t border-outline-variant mt-[8px] pt-[8px] flex items-center justify-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
                Payment protected by 256-bit encryption
              </span>
            </div>
          </div>

          {/* Warning & Actions */}
          <div className="flex flex-col gap-[16px] w-full">
            <div className="flex items-center justify-center gap-2 p-3 bg-tertiary-container/10 rounded-lg text-tertiary border border-tertiary/20">
              <span className="material-symbols-outlined animate-pulse">info</span>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-left">
                Do not refresh this page or click the back button until the process is complete.
              </p>
            </div>
            <Link
              className="inline-flex items-center justify-center gap-2 text-secondary font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:underline transition-all"
              href="/checkout"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back to Checkout
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-[32px] px-[20px] grid grid-cols-1 md:grid-cols-3 gap-[16px] max-w-7xl mx-auto border-t border-outline-variant">
        <div className="flex flex-col gap-[4px]">
          <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
            Malawi Bloom
          </span>
          <p className="font-[family-name:var(--font-be-vietnam)] text-on-surface-variant">
            The Warm Heart of Africa in Every Petal.
          </p>
        </div>
        <div className="flex flex-col gap-[8px]">
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold font-bold uppercase tracking-wider text-on-surface">
            Support
          </span>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link
              className="text-on-surface-variant font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:text-secondary underline transition-colors"
              href="#"
            >
              WhatsApp Support
            </Link>
            <Link
              className="text-on-surface-variant font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:text-secondary underline transition-colors"
              href="#"
            >
              Chichewa Guide
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-end items-start md:items-end">
          <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
            © 2024 Malawi Bloom. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Decorative Background */}
      <div className="fixed top-0 left-0 -z-10 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px]"></div>
      </div>
    </>
  );
}
