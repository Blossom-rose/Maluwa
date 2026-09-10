"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService, User } from "@/lib/services/authService";
import { notificationService } from "@/lib/services/notificationService";

export default function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = authService.getUser();
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsOpen(false);
    notificationService.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  // Not logged in
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/sign-in"
          className="px-4 py-2 text-primary font-semibold hover:bg-surface-container rounded-lg transition-colors text-sm"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm shadow-sm"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  // Logged in
  return (
    <div className="flex items-center gap-3">
      {/* Option 2: Direct "My Orders" / "Seller Dashboard" Header Button */}
      <Link
        href={user.isVendor ? "/seller" : "/buyer/orders"}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-xs md:text-sm font-semibold transition-all border border-primary/20"
      >
        <span className="material-symbols-outlined text-[18px]">
          {user.isVendor ? "dashboard" : "receipt_long"}
        </span>
        <span>{user.isVendor ? "Seller Dashboard" : "My Orders"}</span>
      </Link>

      {/* Profile Dropdown Menu */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-outline-variant hover:bg-surface-container-high transition-colors bg-surface"
        >
          <span className="material-symbols-outlined text-primary text-[22px]">account_circle</span>
          <span className="hidden sm:inline font-semibold text-on-surface text-sm">
            {user.fullName ? user.fullName.split(" ")[0] : "Account"}
          </span>
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
            {isOpen ? "expand_less" : "expand_more"}
          </span>
        </button>

        {/* Dropdown Card */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-surface border border-outline-variant rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
            {/* User Profile Header */}
            <div className="p-4 bg-surface-container-low border-b border-outline-variant">
              <p className="font-bold text-on-surface text-sm leading-tight">{user.fullName}</p>
              <p className="text-xs text-on-surface-variant truncate mt-0.5">{user.email}</p>
              <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-bold rounded-full bg-primary/10 text-primary capitalize">
                {user.isVendor ? "Seller Account" : "Buyer Account"}
              </span>
            </div>

            {/* Menu Links */}
            <div className="py-1">
              <Link
                href="/buyer/orders"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium hover:bg-surface-container text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant">receipt_long</span>
                My Orders
              </Link>

              {user.isVendor && (
                <Link
                  href="/seller"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium hover:bg-surface-container text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px] text-on-surface-variant">store</span>
                  Seller Dashboard
                </Link>
              )}
            </div>

            {/* Logout Action */}
            <div className="border-t border-outline-variant p-1.5">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-error hover:bg-error/10 rounded-lg transition-colors text-left"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
