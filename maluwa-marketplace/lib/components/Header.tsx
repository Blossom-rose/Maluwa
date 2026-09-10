"use client";

import Link from "next/link";
import { useCart } from "@/lib/context/CartContext";
import UserMenu from "@/lib/components/UserMenu";

export function Header() {
  const { getItemCount } = useCart();
  const cartCount = getItemCount();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-[20px] py-[8px] bg-surface/95 backdrop-blur-md shadow-sm border-b border-outline-variant">
      <div className="flex items-center gap-[24px]">
        <Link href="/" className="font-[family-name:var(--font-source-serif)] text-[24px] leading-[32px] md:text-[28px] font-semibold text-primary">
          Malawi Bloom
        </Link>
        <nav className="hidden md:flex gap-[16px] items-center">
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[13px] font-semibold text-on-surface hover:text-primary transition-colors"
            href="/"
          >
            Home
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[13px] font-semibold text-on-surface-variant hover:text-primary transition-colors"
            href="/flowers"
          >
            Shop
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[13px] font-semibold text-on-surface-variant hover:text-primary transition-colors"
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[13px] font-semibold text-on-surface-variant hover:text-primary transition-colors"
            href="/about"
          >
            About
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-[16px]">
        <Link href="/cart" className="relative p-2 hover:bg-surface-container rounded-full transition-all">
          <span className="material-symbols-outlined text-primary text-[22px]">
            shopping_cart
          </span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-error text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Dynamic User Menu with My Orders button & Logout dropdown */}
        <UserMenu />
      </div>
    </header>
  );
}
