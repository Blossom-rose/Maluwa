"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    isVendor: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up data:", formData);
    alert("Account created successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-0 md:p-[16px]">
      <main className="w-full h-full min-h-screen md:min-h-0 md:max-w-6xl md:h-[800px] bg-surface rounded-none md:rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Image Column (Split Screen) */}
        <section className="hidden md:block md:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdUr5np1uPGS_Lk2g0Z4SClOC-HVeS1fp6BnrFEp3LqkXtptkJWsT10LZCK6uqZNyIgV9kuwPVE4B4kmasaI43MbuIIIh9rJpelPsMX3TIKgPJ6uFmbdlFMyKCWpbDhwi7-AIi7XKtoG_2uqo5K19OKrwCX2fbAa8R9_YGry2kXllrQZKcaSvsuoY9jtW5XTh0IMHzYRxROpWBAr7xzH_OQuGFrAQjUjZyuGb9dCI2xbdp8JW3wKkjyaGnvRA88paE4Ifb70P65sc"
              alt="Malawian Protea flowers and orange flame tree blossoms"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent flex flex-col justify-end p-[32px]">
            <h1 className="font-[family-name:var(--font-source-serif)] text-[48px] leading-[56px] font-bold text-white mb-[4px]">
              Cultivating Joy
            </h1>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[18px] leading-[28px] text-white/90">
              Join our community and share the warm heart of Africa, one petal at a time.
            </p>
          </div>
        </section>

        {/* Form Column */}
        <section className="w-full md:w-1/2 flex flex-col bg-surface p-[20px] md:p-[32px] overflow-y-auto">
          {/* Header/Logo Area */}
          <div className="flex flex-col items-center md:items-start mb-[32px]">
            <span className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] font-semibold text-primary mb-[4px]">
              Malawi Bloom
            </span>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
              Join the bloom
            </h2>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant">
              Create an account to start your floral journey.
            </p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-[16px] flex-grow">
            {/* Full Name */}
            <div className="space-y-[4px]">
              <label
                htmlFor="full_name"
                className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant block"
              >
                Full Name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                  person
                </span>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-lg font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="Kwacha Phiri"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-[4px]">
              <label
                htmlFor="email"
                className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant block"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                  mail
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-lg font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="kwacha@example.mw"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-[4px]">
              <label
                htmlFor="phone"
                className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant block"
              >
                Phone Number
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                  call
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-lg font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="+265 888 000 000"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-[4px]">
              <label
                htmlFor="password"
                className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant block"
              >
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                  lock
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-white border border-outline-variant rounded-lg font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Vendor Checkbox */}
            <div className="flex items-start gap-3 pt-[4px]">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="vendor"
                  name="vendor"
                  checked={formData.isVendor}
                  onChange={(e) => setFormData({ ...formData, isVendor: e.target.checked })}
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                />
              </div>
              <label
                htmlFor="vendor"
                className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface select-none"
              >
                I want to sell flowers on Malawi Bloom
                <span className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                  Apply for a vendor account to list your local blooms.
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="pt-[16px] flex flex-col gap-[16px]">
              <button
                type="submit"
                className="w-full py-4 bg-primary text-white font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold rounded-full shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                Create Account
              </button>
              <div className="flex items-center justify-center gap-2">
                <span className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant">
                  Existing user?
                </span>
                <Link
                  href="/sign-in"
                  className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-primary font-bold hover:underline"
                >
                  Sign in instead
                </Link>
              </div>
            </div>
          </form>

          {/* Secondary Actions/Footer */}
          <div className="mt-[32px] flex flex-col items-center gap-[16px] border-t border-outline-variant pt-[16px]">
            <button
              type="button"
              className="flex items-center gap-3 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-secondary border border-secondary px-6 py-2 rounded-full hover:bg-secondary-container transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                account_balance_wallet
              </span>
              Quick Sign-up with Mobile Money
            </button>
            <div className="flex gap-4">
              <Link
                href="#"
                className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-primary"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
