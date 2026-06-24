"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Confirmation() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `0${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  const isExpired = timeLeft === 0;

  return (
    <>
      <style jsx>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(0.33);
            opacity: 1;
          }
          80%,
          100% {
            opacity: 0;
          }
        }
        @keyframes pulse-dot {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1);
          }
          100% {
            transform: scale(0.8);
          }
        }
        .pulse-animation {
          position: relative;
          width: 80px;
          height: 80px;
        }
        .pulse-animation::before {
          content: "";
          position: absolute;
          display: block;
          width: 300%;
          height: 300%;
          box-sizing: border-box;
          margin-left: -100%;
          margin-top: -100%;
          border-radius: 45px;
          background-color: #a0f399;
          animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        .pulse-animation::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          width: 100%;
          height: 100%;
          background-color: #217128;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
          animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-[20px] py-[8px] bg-surface shadow-sm transition-all duration-300">
        <div className="flex items-center gap-[8px]">
          <span className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] font-bold text-primary">
            Maluwa Market
          </span>
        </div>
        <div className="flex items-center gap-[16px]">
          <button className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container-low rounded-full transition-colors active:scale-95 duration-150">
            shopping_cart
          </button>
          <button className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container-low rounded-full transition-colors active:scale-95 duration-150">
            account_circle
          </button>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-32 px-[20px] max-w-2xl mx-auto w-full">
        {/* Payment Status Card */}
        <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30 text-center p-[32px] flex flex-col items-center">
          {/* Animated Pulse */}
          <div className="pulse-animation mb-[32px]"></div>

          <h1 className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] font-semibold text-on-surface mb-[8px]">
            Confirm Payment on Your Phone
          </h1>
          <p className="font-[family-name:var(--font-be-vietnam)] text-on-surface-variant max-w-md mx-auto mb-[32px]">
            We&apos;ve sent a secure payment request to your mobile device. Please enter your PIN to complete the transaction.
          </p>

          {/* Amount Display */}
          <div className="bg-surface-container-low rounded-lg p-[16px] w-full mb-[32px] flex flex-col items-center">
            <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-[4px]">
              TOTAL AMOUNT
            </span>
            <span className="font-[family-name:var(--font-source-serif)] text-[48px] leading-[56px] tracking-[-0.02em] font-bold text-primary">
              MK 25,000
            </span>
          </div>

          {/* Countdown Timer */}
          <div className="flex flex-col items-center gap-[4px] mb-[32px]">
            <div className={`flex items-center gap-[8px] ${isExpired ? "text-error" : "text-secondary"}`}>
              <span className="material-symbols-outlined">schedule</span>
              <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-bold">
                {isExpired ? "Expired" : formattedTime}
              </span>
            </div>
            <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
              {isExpired ? "Session expired" : "Waiting for confirmation..."}
            </span>
          </div>

          {/* Instructions */}
          <div className="text-left w-full space-y-[16px] mb-[32px]">
            <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
              How to confirm:
            </h3>
            <ol className="space-y-[8px] font-[family-name:var(--font-be-vietnam)] text-on-surface-variant">
              {[
                "Unlock your phone and check for the payment prompt.",
                "Enter your Airtel Money or TNM Mpamba PIN.",
                "Once confirmed, click 'Check Payment Status' below.",
              ].map((step, i) => (
                <li key={i} className="flex gap-[16px]">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Main Actions */}
          <div className="w-full flex flex-col gap-[8px]">
            <button className="w-full bg-primary text-on-primary font-bold py-[16px] rounded-lg shadow-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-[8px]">
              Check Payment Status
              <span className="material-symbols-outlined">sync</span>
            </button>
            <button className="w-full bg-surface-container text-on-surface-variant font-medium py-[16px] rounded-lg hover:bg-surface-container-high transition-colors active:scale-[0.98]">
              Cancel Transaction
            </button>
          </div>
        </section>

        {/* Help Section */}
        <section className="mt-[32px] bg-surface-container-low rounded-xl p-[32px] border border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-[16px]">
          <div className="flex items-center gap-[16px] text-left">
            <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                support_agent
              </span>
            </div>
            <div>
              <h4 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
                Need Help?
              </h4>
              <p className="font-[family-name:var(--font-be-vietnam)] text-on-surface-variant">
                Our Lilongwe team is available via WhatsApp.
              </p>
            </div>
          </div>
          <Link
            className="flex items-center gap-[8px] text-secondary font-bold hover:underline transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">chat</span>
            Message Support
          </Link>
        </section>

        {/* Product Visual */}
        <div className="mt-[32px] relative rounded-xl overflow-hidden h-40 shadow-sm">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTPfmhhI4nb7EEWy7h43FTifFb_pWTv3Fb1fxgJ9dVb8Dg3vyExHqoZGKGFEy5QBoDaBsyQQ-WYOe3SW3O3wwZFb8ydqH-XoLV7esknh-YkZZywPN37UiSYFGvcVsDWzXmXGxd74uow0fCORLhMfxXYGwY_uGxu3l1Ok_BNM_X7Jw3bCp_Fep9SOVgs2fJpC46DRadhXLZ8sqGAQFSBoHObrc-N3yOVXcfHGsLcOBR3Vtjje8CO7bTuuVystPg6tCO1IErNjFbF2g"
            alt="Premium Zomba Bouquet"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-[16px]">
            <p className="text-white font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold">
              Premium Zomba Bouquet
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar (Mobile only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 pb-safe bg-surface shadow-[0px_-4px_20px_rgba(0,0,0,0.05)] rounded-t-xl">
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          href="/"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            Home
          </span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          href="/flowers"
        >
          <span className="material-symbols-outlined">search</span>
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            Browse
          </span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1"
          href="/cart"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            shopping_basket
          </span>
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            Cart
          </span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            Profile
          </span>
        </Link>
      </nav>
    </>
  );
}
