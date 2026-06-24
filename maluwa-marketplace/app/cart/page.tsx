"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Cart() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Luminous Lilies",
      badge: "Local Growth",
      badgeType: "secondary",
      quantity: 1,
      price: 25000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbozD8g1vrExMrmjoMLdZdmzNfDgb98uronwqshlSTSnbeEebIzbhVe-4vK9fpplXKJQtnR3Yfb3nrxRfPRyKw3Os4y2ceA_aZDb77HFlF0Y21tNg62gKt6oqp9ixSfBsFJtHcR0hax1xDlVGOkcXhflJmnT-Bg0VBo_b3JRl5aQlmGGwQzwqxxFl3XKpqg3RMijHA8PVvvTTwdwkR9RQ9CZYw2udFchuhiPMp21cfn5IdGPuWOtmp5woQUXm1Aejes5bQuTFqg5k",
    },
    {
      id: 2,
      name: "Flame Tree Bloom",
      badge: "In Season",
      badgeType: "tertiary",
      quantity: 2,
      price: 18000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5tDJLwCrAbLVdUUvq9b4jUpH8o_qxVeluivagCSM8YREfvQkhiN6BjTRiKKN-SGIzs3L9D87AyMdTib2U3EwT2XV0dO4mes7PgabMSlhiLEozOCeo53dnwTSdHFRKhpFYpCkJBSxYUY8BeGPZtm9QQkDoB3ioHktT6FOsQycgkXShhldDYqIhHcq-ZjRN5IxKSkt5qhFrkqzDs4tyR_ODl1f1cfuJB5FxfCupAsgWEIBcvUGDGTmxL0lj2cRZfEiEEffx77Osn4g",
    },
  ]);

  const deliveryFee = 4500;
  const serviceCharge = 1200;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee + serviceCharge;

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-[20px] py-[4px] max-w-7xl mx-auto bg-surface shadow-sm left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-4">
          <span className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] font-semibold text-primary">
            Malawi Bloom
          </span>
        </div>
        <nav className="hidden md:flex gap-[16px] items-center">
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-primary-container transition-colors"
            href="/"
          >
            Gula
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-primary-container transition-colors"
            href="/flowers"
          >
            Categories
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-primary border-b-2 border-primary"
            href="/cart"
          >
            Cart
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-primary-container transition-colors"
            href="#"
          >
            Orders
          </Link>
        </nav>
        <div className="flex items-center gap-[16px]">
          <button className="material-symbols-outlined text-primary">
            shopping_cart
          </button>
          <button className="material-symbols-outlined text-primary">
            account_circle
          </button>
        </div>
      </header>

      <main className="pt-24 pb-[32px] px-[20px] max-w-7xl mx-auto min-h-screen">
        {/* Page Title */}
        <div className="mb-[32px]">
          <h1 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold md:text-[48px] md:leading-[56px] md:tracking-[-0.02em] md:font-bold text-primary mb-2">
            Chikwama Chanu
          </h1>
          <p className="font-[family-name:var(--font-be-vietnam)] text-[18px] leading-[28px] text-on-surface-variant italic">
            Your Shopping Cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px] items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-[16px]">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-surface-container-low rounded-xl p-4 flex gap-4 md:gap-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all hover:shadow-md"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 relative">
                  <Image
                    className="w-full h-full object-cover rounded-lg"
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 96px, 128px"
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
                        {item.name}
                      </h3>
                      {item.badgeType === "secondary" ? (
                        <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-secondary uppercase tracking-wider mt-1">
                          {item.badge}
                        </p>
                      ) : (
                        <div className="flex gap-2 mt-1">
                          <span className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                            {item.badge}
                          </span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="material-symbols-outlined text-on-surface-variant hover:text-error transition-colors"
                    >
                      delete
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-3 bg-surface-variant rounded-full px-3 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-primary font-bold hover:bg-surface-container-high rounded-full transition-transform active:scale-90"
                      >
                        -
                      </button>
                      <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-primary font-bold hover:bg-surface-container-high rounded-full transition-transform active:scale-90"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
                      MK {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <Link
              className="inline-flex items-center gap-2 text-secondary font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:underline mt-[16px] transition-all"
              href="/flowers"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Continue Shopping
            </Link>
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-surface-container-high rounded-xl p-[32px] shadow-sm border border-outline-variant">
              <h2 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-background mb-[16px]">
                Order Summary
              </h2>
              <div className="space-y-4 mb-[32px]">
                <div className="flex justify-between font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>MK {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant">
                  <span>Delivery Fee</span>
                  <span>MK {deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant">
                  <span>Service Charge</span>
                  <span>MK {serviceCharge.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t border-outline-variant flex justify-between font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-background">
                  <span>Total</span>
                  <span className="text-primary">MK {total.toLocaleString()}</span>
                </div>
              </div>
              <button className="w-full bg-primary text-on-primary py-4 rounded-lg font-bold text-lg shadow-md hover:opacity-90 active:scale-95 transition-all mb-4 flex items-center justify-center gap-2">
                Proceed to Checkout
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button className="w-full border-2 border-secondary bg-white text-secondary py-4 rounded-lg font-bold text-lg hover:bg-secondary-container transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">smartphone</span>
                Pay with Mobile Money
              </button>
              <div className="mt-[16px] p-4 bg-surface rounded-lg border border-outline-variant flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary">
                  local_shipping
                </span>
                <div>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface font-bold">
                    Standard Delivery
                  </p>
                  <p className="text-[11px] text-on-surface-variant">
                    Arrives in 2-4 hours across Lilongwe & Blantyre.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestions Bento */}
        <section className="mt-20">
          <h2 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-background mb-[32px]">
            You Might Also Love
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px]">
            {/* Suggestion 1 */}
            <div className="group cursor-pointer">
              <div className="aspect-square rounded-xl overflow-hidden mb-3 relative shadow-sm">
                <Image
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJxa-PbYx1Eb00hAgbyQf-GZfXnk7uQL9snHO3IHz3TqxN8HIHugZMX6dkRbqnHtr1Bnpm3K1AYAb4eGo9h4KCE0B3pu9ndyT2C0CJLvqAy8gvp318KYvYUa6tGdpMQKCWaowGT_LPjD6jpEjhjF3Rm9NCJI_kiqfQbYFh4r_qJ6OE1PMcdvj80GWcFRaIv6bINThWBNumY1upyd_B8t5XpE9eaC3QEb88uWoZYgJ0KRSde6mf7iZK3-wA1yzGV73CPv5I4fKOzz0"
                  alt="Lush bouquet of Proteas and wild African greenery"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <button className="absolute bottom-2 right-2 bg-primary text-on-primary p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                  <span className="material-symbols-outlined text-sm">
                    add_shopping_cart
                  </span>
                </button>
              </div>
              <p className="font-[family-name:var(--font-source-serif)] text-[14px] leading-[20px] font-semibold">
                Mountain Protea
              </p>
              <p className="font-[family-name:var(--font-be-vietnam)] text-primary text-[14px]">
                MK 18,500
              </p>
            </div>

            {/* Suggestion 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-square rounded-xl overflow-hidden mb-3 relative shadow-sm">
                <Image
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLYnZ12X09F_6bgkKhxu23NPUIl5hMVF7CvAhr4Pz1NHwhWE-pUpb6xvT32tbISWAvNmfUO-OWXZZCwbnVsa1GYzv0W5L0QLeCrmltRdE-bpuBRNN96G1MUQElMNDAmTy-Ussh1_y-40XIbZ-VuMEC-Yxbc23MB75ABTiUiOIvBd69RqNre6xjo0WE8v3mMbjbHIduEm02JrlrEPvXis_j39BM4Hy399gtQVf8EvbM2dgFkZbUOIGvgKKcjuVyF3cF6yDb8z_vs4I"
                  alt="Collection of delicate yellow wildflowers"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <button className="absolute bottom-2 right-2 bg-primary text-on-primary p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                  <span className="material-symbols-outlined text-sm">
                    add_shopping_cart
                  </span>
                </button>
              </div>
              <p className="font-[family-name:var(--font-source-serif)] text-[14px] leading-[20px] font-semibold">
                Sunshine Daisies
              </p>
              <p className="font-[family-name:var(--font-be-vietnam)] text-primary text-[14px]">
                MK 12,000
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-[32px] px-[20px] grid grid-cols-1 md:grid-cols-3 gap-[16px] max-w-7xl mx-auto bg-surface-container-highest border-t border-outline-variant">
        <div>
          <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary block mb-4">
            Malawi Bloom
          </span>
          <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant max-w-xs">
            © 2024 Malawi Bloom. The Warm Heart of Africa in Every Petal.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface font-bold uppercase mb-2">
            Customer Care
          </span>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary transition-colors underline"
            href="#"
          >
            Contact Us
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary transition-colors underline"
            href="#"
          >
            WhatsApp Support
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary transition-colors underline"
            href="#"
          >
            Shipping Policy
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface font-bold uppercase mb-2">
            Culture
          </span>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary transition-colors underline"
            href="#"
          >
            Chichewa Guide
          </Link>
          <div className="mt-4 flex gap-4">
            <span className="material-symbols-outlined text-on-surface-variant">
              face_nod
            </span>
            <span className="material-symbols-outlined text-on-surface-variant">
              photo_camera
            </span>
          </div>
        </div>
      </footer>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe md:hidden bg-surface-container shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-xl">
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all"
          href="/"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            Gula
          </span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all"
          href="/flowers"
        >
          <span className="material-symbols-outlined">local_florist</span>
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            Categories
          </span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 scale-90 duration-150"
          href="/cart"
        >
          <span className="material-symbols-outlined">shopping_basket</span>
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            Cart
          </span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all"
          href="#"
        >
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            Orders
          </span>
        </Link>
      </nav>
    </>
  );
}
