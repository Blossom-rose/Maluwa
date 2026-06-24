"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function SellerLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/seller", label: "Dashboard", icon: "dashboard", exact: true },
    { href: "/seller/inventory", label: "Inventory", icon: "inventory_2", exact: false },
    { href: "/seller/orders", label: "Orders", icon: "receipt_long", exact: false },
    { href: "/seller/payments", label: "Payments", icon: "payments", exact: false },
    { href: "/seller/settings", label: "Settings", icon: "settings", exact: false },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 w-64 h-screen bg-surface-container border-r border-outline-variant z-40">
        <div className="p-6 border-b border-outline-variant">
          <Link href="/" className="font-[family-name:var(--font-source-serif)] text-[24px] leading-[32px] font-semibold text-primary">
            Malawi Bloom
          </Link>
          <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mt-1">
            Seller Dashboard
          </p>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact 
              ? pathname === item.href 
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-bold"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px]">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-outline-variant">
          <Link href="/seller/add-new-flower">
            <button className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md">
              <span className="material-symbols-outlined">add</span>
              Add New Flower
            </button>
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-surface border-b border-outline-variant">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
            Malawi Bloom
          </Link>
          <button className="material-symbols-outlined text-primary">menu</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen bg-background">
        <div className="pt-16 md:pt-0">{children}</div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-container border-t border-outline-variant">
        <div className="flex justify-around items-center px-2 py-2">
          {navItems.slice(0, 4).map((item) => {
            const isActive = item.exact 
              ? pathname === item.href 
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all ${
                  isActive ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="font-[family-name:var(--font-be-vietnam)] text-[10px] mt-1">
                  {item.label}
                </span>
              </Link>
            );
          })}
          <Link
            href="/seller/add-new-flower"
            className="flex flex-col items-center justify-center py-2 px-3 text-secondary"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span className="font-[family-name:var(--font-be-vietnam)] text-[10px] mt-1">Add</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
