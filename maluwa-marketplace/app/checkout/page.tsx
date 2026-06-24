"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Checkout() {
  const [quantity, setQuantity] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("pay_changu");
  const [showManualInfo, setShowManualInfo] = useState(false);

  const price = 25000;

  const getPaymentDetails = () => {
    switch (paymentMethod) {
      case "airtel":
        return "<p class='font-bold'>Airtel Money:</p><p class='text-primary text-lg'>099 123 4567 (Malawi Bloom)</p>";
      case "mpamba":
        return "<p class='font-bold'>TNM Mpamba:</p><p class='text-primary text-lg'>088 123 4567 (Malawi Bloom)</p>";
      case "bank":
        return "<p class='font-bold'>National Bank of Malawi</p><p>Acc: <span class='text-primary font-bold'>10023456</span></p><p>Branch: Lilongwe</p><p>Name: Malawi Bloom</p>";
      case "cod":
        return "<p class='font-bold text-on-surface-variant'>Pay when you receive your flowers at your doorstep.</p>";
      default:
        return "";
    }
  };

  const getCtaText = () => {
    if (paymentMethod === "pay_changu") {
      return "GULA NOW (Secure Pay)";
    }
    if (paymentMethod === "cod") {
      return "Confirm Order (COD)";
    }
    return "Submit Order & Proof";
  };

  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-[20px] py-[4px] max-w-7xl mx-auto bg-surface shadow-sm">
        <div className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] font-semibold text-primary">
          Malawi Bloom
        </div>
        <div className="flex items-center gap-[16px]">
          <div className="hidden md:flex gap-[16px] items-center">
            <Link
              className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-primary transition-colors"
              href="/"
            >
              Gula
            </Link>
            <Link
              className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-primary transition-colors"
              href="/flowers"
            >
              Categories
            </Link>
            <Link
              className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Orders
            </Link>
          </div>
          <div className="flex items-center gap-[4px]">
            <button className="p-2 text-primary">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
            <button className="p-2 text-primary">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-[32px] max-w-7xl mx-auto px-[20px]">
        {/* Breadcrumb */}
        <nav className="mb-[16px] flex items-center gap-2 text-on-surface-variant font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
          <Link className="hover:text-primary" href="/">
            Home
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link className="hover:text-primary" href="/flowers">
            Bouquets
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-bold">Luminous Lilies</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[16px]">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 space-y-[16px]">
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-lg bg-surface-container relative">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqEPbbha-bu_H0j0gvf4xflxkYaUkPj2kfXhMQFxDivG7yfUmr4suyyeSDMWoYUXoL0XiDvvzhUtkIBDt4JgS4F8NE-4hkv49CXRqqwx9OECFpzfw4l602tNWvbAG3yFp_S-7vhqlpaLAqWMsu-B9QjRZvZ5MRMChnSK4fECKVb_qeh26RNjNjGV2iW1HCt7za6gzr1X1HfVG9rBpyYYrkVA8BxPNEOClJy1AnjJQNxsgwvv9a1h62mVbmn8ds8-BTj-gljMpio14"
                alt="Luxurious close-up of Luminous Lilies bouquet"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-[16px]">
              {[
                "https://lh3.googleusercontent.com/aida-public/AB6AXuC2DtLK5X9veimCEk-e14q4X02fDt10LD7oF5QWDfvc5QY-cUGbi6kdK5VZRzln5wxXRihD1xXMe7K-6j4dy74aiNqhZuwUL7U3BlD7prYYaOxnky2WnJ79fQ9RyCo5p9TJjZvK1dK7p-X3mX0XY91bkm5XBphDPLpTMporUCO524-shp7DHQJ6GlYxG8Y6ziLw-FPFzyuYdWUYMzRkfHmv2UVptGTE3Xj2ErKcP5ylHOTVesrvcLJdHRVnw4CDZrfHoboq8klJalo",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuA0Y8hfZjSH7HNLBGQEicBFFc2VZKUgUH7Q6VOCkDjSS6jj-YjEtITcMHu9lj_JuA8AGFxCMF4EaM2zgZgp3hCzUHF8SBPY6AiPJU7SkSLZPe2J83iySNs9pD4gXcKktWvyIAzTr25O3pqmHyRzoMwaC6P7a27xaR6w8sduDyBADKg7PQ8AYBcDbVVA2AIJSGMHk5EGAg_hfmSCjouPf9XpQzemybCTG_7YkuHCkg0g9xFp-aszH-Tm7wEG-xLpk7B1SXGruFHbEHE",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDPTmWOWh_2I_xCPvP3biWNbOLrJvZrFXzK4E6rON291jubYuBGR8aOR2_sUlsg9_bH90UmlG6GyYuo7H04gSN2hFNapppD34ix_Qqg89mws8knzH4dOX1OAW7tNxEDei81KUy2vlGlIjBXJi0n11ExqGCTAzsKm7fqARp1HOsUqILdTaQPF3Uvx-QzO8HT48MwUu8EaA6Nc0yFzH3wO0HcdXwyfYl88cTMDoYQqi4mQ0WKpsyC3oy8FledUMeUaDjdCtjbKxqZDh8",
              ].map((src, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-lg overflow-hidden relative ${
                    i === 0 ? "border-2 border-primary" : ""
                  }`}
                >
                  <Image src={src} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="200px" />
                </div>
              ))}
              <div className="aspect-square rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center font-bold text-on-surface bg-surface-container-low">
                  +3
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Checkout */}
          <div className="lg:col-span-5 space-y-[32px]">
            <section className="bg-surface-container-low p-[16px] rounded-xl shadow-sm border border-outline-variant/30">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface">
                    Luminous Lilies (Lilies za Kuwala)
                  </h1>
                  <p className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary mt-2">
                    MK {price.toLocaleString()}
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-tertiary-container px-3 py-1 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-tertiary-container">
                  In Season
                </span>
              </div>
              <div className="mt-[32px] flex items-center gap-[16px]">
                <div className="flex items-center border border-outline rounded-lg overflow-hidden bg-surface">
                  <button
                    className="p-3 hover:bg-surface-container-high transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <span className="material-symbols-outlined text-[20px]">remove</span>
                  </button>
                  <span className="px-6 font-bold text-on-surface">{quantity}</span>
                  <button
                    className="p-3 hover:bg-surface-container-high transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>
                <button className="flex-1 bg-surface-container border border-outline-variant text-on-surface-variant font-bold py-3.5 rounded-lg hover:bg-surface-container-high transition-all flex justify-center items-center gap-2">
                  <span className="material-symbols-outlined">favorite</span>
                  Wishlist
                </button>
              </div>
            </section>

            {/* Delivery Details Form */}
            <section className="space-y-[16px]">
              <h2 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                Delivery Details
              </h2>
              <div className="mb-[16px]">
                <label className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-1">
                  Delivery Method
                </label>
                <select
                  className="w-full bg-surface border-outline-variant rounded-lg p-3 focus:ring-primary focus:border-primary font-[family-name:var(--font-be-vietnam)]"
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                >
                  <option value="delivery">Delivery</option>
                  <option value="pickup">Self-Pickup</option>
                </select>
              </div>
              {deliveryMethod === "delivery" ? (
                <div className="grid grid-cols-1 gap-[16px]">
                  <div>
                    <label className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-1">
                      Full Name
                    </label>
                    <input
                      className="w-full bg-surface border-outline-variant rounded-lg p-3 focus:ring-primary focus:border-primary"
                      placeholder="Dzina lanu"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-1">
                      Delivery Address
                    </label>
                    <textarea
                      className="w-full bg-surface border-outline-variant rounded-lg p-3 focus:ring-primary focus:border-primary"
                      placeholder="Likulu lanu (Lilongwe, Blantyre, etc.)"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-1">
                      Phone Number (SMS Confirmation)
                    </label>
                    <div className="flex gap-2">
                      <span className="bg-surface-container flex items-center px-3 border border-outline-variant rounded-lg font-[family-name:var(--font-be-vietnam)]">
                        +265
                      </span>
                      <input
                        className="flex-1 bg-surface border-outline-variant rounded-lg p-3 focus:ring-primary focus:border-primary"
                        placeholder="0XXXXXX..."
                        type="tel"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-surface-container-low border border-outline-variant rounded-xl">
                  <p className="text-on-surface font-[family-name:var(--font-be-vietnam)] flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    Pickup available at our Lilongwe Nursery, Area 47
                  </p>
                </div>
              )}
            </section>

            {/* Payment Selection */}
            <section className="space-y-[16px]">
              <h2 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">payments</span>
                Payment Method
              </h2>
              {/* Primary Option */}
              <div className="space-y-3">
                <label className="block cursor-pointer group">
                  <input
                    checked={paymentMethod === "pay_changu"}
                    className="hidden"
                    name="payment_method"
                    type="radio"
                    value="pay_changu"
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setShowManualInfo(false);
                    }}
                  />
                  <div
                    className={`flex items-center justify-between p-4 border-2 rounded-xl transition-all group-hover:bg-primary/5 ${
                      paymentMethod === "pay_changu" ? "border-primary bg-primary/5" : "border-outline-variant"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-primary">security</span>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-on-surface">Pay Changu</p>
                        <span className="text-[12px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                          Instant & Secure
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
                        paymentMethod === "pay_changu" ? "border-primary" : "border-outline-variant"
                      }`}
                    >
                      {paymentMethod === "pay_changu" && (
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                </label>
              </div>

              {/* Alternative Options */}
              <div className="space-y-3 pt-2">
                <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant px-1 uppercase tracking-wider">
                  Alternative/Manual Payments
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { value: "airtel", label: "Airtel Money", bgColor: "bg-[#E31E24]" },
                    { value: "mpamba", label: "TNM Mpamba", bgColor: "bg-[#00AEEF]" },
                  ].map((method) => (
                    <label key={method.value} className="block cursor-pointer group">
                      <input
                        checked={paymentMethod === method.value}
                        className="hidden"
                        name="payment_method"
                        type="radio"
                        value={method.value}
                        onChange={(e) => {
                          setPaymentMethod(e.target.value);
                          setShowManualInfo(true);
                        }}
                      />
                      <div
                        className={`flex items-center justify-between p-4 border rounded-xl transition-all group-hover:bg-surface-container-low ${
                          paymentMethod === method.value
                            ? "border-primary bg-primary/5"
                            : "border-outline-variant"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 ${method.bgColor} rounded-lg flex items-center justify-center text-white font-bold text-[10px] p-1 text-center`}
                          >
                            {method.label}
                          </div>
                          <p className="font-[family-name:var(--font-source-serif)] text-[15px] leading-[20px] font-semibold text-on-surface">
                            {method.label}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                            paymentMethod === method.value ? "border-primary" : "border-outline-variant"
                          }`}
                        >
                          {paymentMethod === method.value && (
                            <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                  <label className="block cursor-pointer group">
                    <input
                      checked={paymentMethod === "bank"}
                      className="hidden"
                      name="payment_method"
                      type="radio"
                      value="bank"
                      onChange={(e) => {
                        setPaymentMethod(e.target.value);
                        setShowManualInfo(true);
                      }}
                    />
                    <div
                      className={`flex items-center justify-between p-4 border rounded-xl transition-all group-hover:bg-surface-container-low ${
                        paymentMethod === "bank" ? "border-primary bg-primary/5" : "border-outline-variant"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-surface-container-high rounded-lg flex items-center justify-center text-on-surface-variant">
                          <span className="material-symbols-outlined text-[20px]">account_balance</span>
                        </div>
                        <p className="font-[family-name:var(--font-source-serif)] text-[15px] leading-[20px] font-semibold text-on-surface">
                          Bank Transfer
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                          paymentMethod === "bank" ? "border-primary" : "border-outline-variant"
                        }`}
                      >
                        {paymentMethod === "bank" && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                      </div>
                    </div>
                  </label>
                  <label className="block cursor-pointer group">
                    <input
                      checked={paymentMethod === "cod"}
                      className="hidden"
                      name="payment_method"
                      type="radio"
                      value="cod"
                      onChange={(e) => {
                        setPaymentMethod(e.target.value);
                        setShowManualInfo(true);
                      }}
                    />
                    <div
                      className={`flex items-center justify-between p-4 border rounded-xl transition-all group-hover:bg-surface-container-low ${
                        paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-outline-variant"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-surface-container-high rounded-lg flex items-center justify-center text-on-surface-variant">
                          <span className="material-symbols-outlined text-[20px]">local_atm</span>
                        </div>
                        <p className="font-[family-name:var(--font-source-serif)] text-[15px] leading-[20px] font-semibold text-on-surface">
                          Cash on Delivery
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                          paymentMethod === "cod" ? "border-primary" : "border-outline-variant"
                        }`}
                      >
                        {paymentMethod === "cod" && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Dynamic Info Area */}
              {showManualInfo && paymentMethod !== "pay_changu" && (
                <div className="space-y-4">
                  <div className="p-4 bg-surface-container-low border border-outline-variant rounded-xl space-y-3">
                    <div
                      className="text-on-surface font-[family-name:var(--font-be-vietnam)] space-y-1"
                      dangerouslySetInnerHTML={{ __html: getPaymentDetails() }}
                    />
                    {paymentMethod !== "cod" && (
                      <div className="p-3 bg-secondary-container/20 border border-secondary/20 rounded-lg">
                        <p className="text-on-secondary-container font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">info</span>
                          Admin will verify your payment manually once the receipt is uploaded.
                        </p>
                      </div>
                    )}
                  </div>
                  {paymentMethod !== "cod" && (
                    <div className="space-y-2">
                      <label className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                        Upload Proof of Payment (Screenshot/Receipt)
                      </label>
                      <div className="relative border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors cursor-pointer bg-surface">
                        <input className="absolute inset-0 opacity-0 cursor-pointer" type="file" />
                        <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                        <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold font-bold text-on-surface">
                          Click to upload or drag & drop
                        </p>
                        <p className="text-[10px] text-on-surface-variant">JPG, PNG up to 5MB</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 px-1">
                <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                  You will receive an SMS order confirmation and receipt.
                </p>
              </div>
              <Link href={paymentMethod === "pay_changu" ? "/checkout/processing" : "/checkout/payment"}>
                <button className="w-full bg-primary text-on-primary font-[family-name:var(--font-source-serif)] text-[20px] font-bold py-5 rounded-xl shadow-lg hover:shadow-xl transform active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                  {getCtaText()}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-[32px] px-[20px] grid grid-cols-1 md:grid-cols-3 gap-[16px] max-w-7xl mx-auto bg-surface-container-highest border-t border-outline-variant mt-[32px]">
        <div>
          <div className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary mb-2">
            Malawi Bloom
          </div>
          <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant">
            © 2024 Malawi Bloom. The Warm Heart of Africa in Every Petal.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-on-surface">Support</h4>
          <ul className="space-y-1">
            <li>
              <Link
                className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary underline transition-colors"
                href="#"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary underline transition-colors"
                href="#"
              >
                WhatsApp Support
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-on-surface">Localized</h4>
          <ul className="space-y-1">
            <li>
              <Link
                className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary underline transition-colors"
                href="#"
              >
                Chichewa Guide
              </Link>
            </li>
            <li>
              <Link
                className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary underline transition-colors"
                href="#"
              >
                Delivery Network
              </Link>
            </li>
          </ul>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
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
          className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1"
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
