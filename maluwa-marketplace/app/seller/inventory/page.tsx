"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [inventory, setInventory] = useState([
    {
      id: "MB-FTR-001",
      name: "Flame Tree Roses",
      category: "Roses",
      stock: 42,
      stockPercentage: 80,
      price: 12500,
      status: "available",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYJYFbrC01s2MBz4Rqqhd1m8xQN-UNsMBf-f9luuz3pCUK88xZIBFu4m-j7Rn0LrMj76OtWPyWVOyLFf7hN99JT8zJ7ke0HwPYXiLlxb7MAHZ1DTV6-OuiewFclbvjANg6o6sJBeO7Ji0nmbPyJr6gVCGYNTc9Zc8-ENNyg8wkyfDd9mDnG4KeBuArdHlwyOlCxQgVi5rJQ5ApTkrWI_yeHJxPZ4a2dxd7zuyNjNiIARfFxZyNsjY_Id2OYI_BCs9DtfGLPOIdXo0",
    },
    {
      id: "MB-PRO-024",
      name: "Zomba Protea",
      category: "Proteas",
      stock: 5,
      stockPercentage: 15,
      price: 18200,
      status: "available",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCG_y6KUJpT4vHgHVUtYBb2p60s9oGVGLVFxKtCZ0BRuY54iyAUICUQMn59WidEct1K7p3Z2vPDaflNQIFNR6scDpkKX2Kbk9rl1uW9B1tGR1-C45oxgkbk3oQvFJwl5U_nazNIwHGb9SQvZ445_YRHoPPpohMVUHEuXBJdSdB-oTzKA02dI6pvSi42eldjrztoeAGPYshMLkq7rGgUeuldOMB2evMTnLzIxmRLtmXAeZn9D5-ucGvuWvCwXKtzoKOVUsVqXOd0m3Y",
    },
    {
      id: "MB-LIL-089",
      name: "Lake Side Lilies",
      category: "Lilies",
      stock: 0,
      stockPercentage: 0,
      price: 8900,
      status: "hidden",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPz5jDlyfz7cv2X0my7elzES9ZEVY5zjOZPU5ZHJb678xihntbaLq9BbA9eGqXBoUbWvvEUpwoxBrAzMIvXqbCVbAiXz46igH97G4OJL4_F4XJd4fEEtW8RrjawCaTgHRC3ePF6zhaOOdRWEXlolOWUlEJeTEEQmouTdXkM8aWL5SvTQnrhLcg2LeecPHraFFBMY7JnyhBobTxyItl800VooV5YOjjI-gt5QsRa2UykYnF8Mu3GC9wVZQsz4C7sNxZGkSzDpZDEgY",
    },
    {
      id: "MB-SUN-012",
      name: "Sunshine Daisies",
      category: "Daisies",
      stock: 38,
      stockPercentage: 75,
      price: 10500,
      status: "available",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLYnZ12X09F_6bgkKhxu23NPUIl5hMVF7CvAhr4Pz1NHwhWE-pUpb6xvT32tbISWAvNmfUO-OWXZZCwbnVsa1GYzv0W5L0QLeCrmltRdE-bpuBRNN96G1MUQElMNDAmTy-Ussh1_y-40XIbZ-VuMEC-Yxbc23MB75ABTiUiOIvBd69RqNre6xjo0WE8v3mMbjbHIduEm02JrlrEPvXis_j39BM4Hy399gtQVf8EvbM2dgFkZbUOIGvgKKcjuVyF3cF6yDb8z_vs4I",
    },
    {
      id: "MB-LUM-045",
      name: "Luminous Lilies",
      category: "Bouquets",
      stock: 28,
      stockPercentage: 56,
      price: 25000,
      status: "available",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbozD8g1vrExMrmjoMLdZdmzNfDgb98uronwqshlSTSnbeEebIzbhVe-4vK9fpplXKJQtnR3Yfb3nrxRfPRyKw3Os4y2ceA_aZDb77HFlF0Y21tNg62gKt6oqp9ixSfBsFJtHcR0hax1xDlVGOkcXhflJmnT-Bg0VBo_b3JRl5aQlmGGwQzwqxxFl3XKpqg3RMijHA8PVvvTTwdwkR9RQ9CZYw2udFchuhiPMp21cfn5IdGPuWOtmp5woQUXm1Aejes5bQuTFqg5k",
    },
  ]);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Roses: "bg-secondary-container text-on-secondary-container",
      Proteas: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
      Lilies: "bg-outline-variant text-on-surface-variant",
      Daisies: "bg-primary-container text-on-primary-container",
      Bouquets: "bg-secondary-fixed text-on-secondary-fixed",
    };
    return colors[category] || "bg-surface-container text-on-surface-variant";
  };

  const getStockStatus = (stock: number, percentage: number) => {
    if (stock === 0) {
      return {
        text: "0 in stock",
        color: "text-on-surface-variant",
        barColor: "bg-outline",
        badge: null,
      };
    }
    if (stock < 10) {
      return {
        text: `${stock} - Low Stock`,
        color: "text-error font-bold",
        barColor: "bg-error",
        badge: "low",
      };
    }
    return {
      text: `${stock} in stock`,
      color: "text-on-surface",
      barColor: "bg-secondary",
      badge: null,
    };
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto px-[20px] py-[32px]">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[16px] mb-[32px]">
          <div className="lg:col-span-2">
            <h2 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] md:text-[48px] md:leading-[56px] font-bold text-on-surface mb-[4px]">
              Floral Inventory
            </h2>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant">
              Manage your botanical collection, track stock levels from the Warm Heart of Africa, and update pricing.
            </p>
          </div>
          <div className="flex items-end justify-end gap-3">
            <div className="hidden lg:flex flex-col items-end">
              <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                Last Synchronized
              </span>
              <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-secondary">
                Today, 09:42 AM
              </span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-surface-container-low rounded-2xl p-4 mb-[16px] flex flex-wrap gap-4 items-center shadow-sm border border-outline-variant/30">
          <div className="flex-1 min-w-[280px] relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border-none rounded-xl py-3 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-primary/20 font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] placeholder:opacity-50"
              placeholder="Find your perfect bouquet..."
            />
          </div>
          <div className="flex gap-2">
            <button className="bg-surface-container-highest px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-surface-container-high transition-colors font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filter
            </button>
            <button className="bg-surface-container-highest px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-surface-container-high transition-colors font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
              <span className="material-symbols-outlined text-[18px]">sort</span>
              Sort
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-surface-container-lowest rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden border border-outline-variant/20">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead className="bg-surface-container-low border-b border-outline-variant/20">
                <tr>
                  <th className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase tracking-wider">
                    Stock Level
                  </th>
                  <th className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase tracking-wider">
                    Price (MK)
                  </th>
                  <th className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {inventory.map((item) => {
                  const stockStatus = getStockStatus(item.stock, item.stockPercentage);
                  const isHidden = item.status === "hidden";

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-surface-container-lowest/50 transition-colors group ${
                        isHidden ? "opacity-70" : ""
                      }`}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-16 h-16 rounded-xl overflow-hidden bg-surface-container shadow-sm border border-outline-variant/20 relative ${
                              isHidden ? "grayscale" : ""
                            }`}
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div>
                            <div className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
                              {item.name}
                            </div>
                            <div className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant opacity-60">
                              ID: {item.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold ${getCategoryColor(
                            item.category
                          )}`}
                        >
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-1">
                          <span
                            className={`font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] ${stockStatus.color}`}
                          >
                            {stockStatus.text}
                          </span>
                          <div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
                            <div
                              className={`h-full ${stockStatus.barColor}`}
                              style={{ width: `${item.stockPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
                        MK {item.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-5">
                        {item.status === "available" ? (
                          <span className="flex items-center gap-1.5 text-secondary font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
                            <span className="w-2 h-2 rounded-full bg-secondary"></span>
                            Available
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-on-surface-variant font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
                            <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                            Hidden
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <Link href={`/seller/inventory/${item.id}/edit`}>
                          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
                            more_vert
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-outline-variant/20 flex justify-between items-center bg-surface-container-low/30">
            <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
              Showing {inventory.length} of 48 items
            </span>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant/30 hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-on-primary font-bold">
                1
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant/30 hover:bg-surface-container transition-colors">
                2
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant/30 hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-[32px] px-[20px] grid grid-cols-1 md:grid-cols-3 gap-[16px] max-w-7xl mx-auto border-t border-outline-variant bg-surface-container-highest mt-[32px]">
        <div>
          <h4 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary mb-2">
            Malawi Bloom
          </h4>
          <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant max-w-xs">
            © 2024 Malawi Bloom. The Warm Heart of Africa in Every Petal.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ul className="space-y-2">
            <li>
              <Link
                className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary transition-colors underline"
                href="#"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary transition-colors underline"
                href="#"
              >
                WhatsApp Support
              </Link>
            </li>
          </ul>
          <ul className="space-y-2">
            <li>
              <Link
                className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary transition-colors underline"
                href="#"
              >
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link
                className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary transition-colors underline"
                href="#"
              >
                Chichewa Guide
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex md:justify-end items-start">
          <div className="bg-surface p-4 rounded-xl shadow-sm border border-outline-variant/20">
            <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-secondary block mb-1">
              Local Growth Badge
            </span>
            <span className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface">
              Verified Lilongwe Florist
            </span>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (Mobile) */}
      <Link href="/seller/inventory/new">
        <button className="md:hidden fixed right-6 bottom-24 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40">
          <span className="material-symbols-outlined text-[32px]">add</span>
        </button>
      </Link>
    </div>
  );
}
