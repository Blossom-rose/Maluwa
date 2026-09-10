"use client";

import { useState, useEffect } from "react";
import { inventoryService, InventoryItem } from "@/lib/services/inventoryService";
import { authService } from "@/lib/services/authService";
import Link from "next/link";
import Image from "next/image";

export default function SellerDashboard() {
  const [sellerInventory, setSellerInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState(authService.getUser());

  useEffect(() => {
    const fetchSellerInventory = async () => {
      try {
        if (seller?._id || seller?.id) {
          const items = await inventoryService.getSellerInventory(seller._id || seller.id || "");
          setSellerInventory(items);
        }
      } catch (err) {
        console.error("Failed to load seller inventory:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerInventory();
  }, [seller]);

  const totalProducts = sellerInventory.length;
  const totalStock = sellerInventory.reduce((sum, item) => sum + item.countInStock, 0);
  const totalValue = sellerInventory.reduce((sum, item) => sum + item.price * item.countInStock, 0);

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-secondary to-secondary-container rounded-2xl p-8 text-on-secondary">
        <h1 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold mb-2">
          Welcome back, {seller?.fullName || "Seller"}!
        </h1>
        <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px]">
          Manage your flower inventory and track your sales
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Products */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-2">
                Total Products
              </p>
              <p className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface">
                {totalProducts}
              </p>
            </div>
            <div className="p-3 bg-secondary-container text-on-secondary-container rounded-full">
              <span className="material-symbols-outlined text-[24px]">inventory_2</span>
            </div>
          </div>
        </div>

        {/* Total Stock */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-2">
                Total Items in Stock
              </p>
              <p className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface">
                {totalStock}
              </p>
            </div>
            <div className="p-3 bg-tertiary-container text-on-tertiary-container rounded-full">
              <span className="material-symbols-outlined text-[24px]">local_florist</span>
            </div>
          </div>
        </div>

        {/* Inventory Value */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-2">
                Inventory Value
              </p>
              <p className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface">
                K{totalValue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-secondary-fixed-dim text-on-secondary-fixed rounded-full">
              <span className="material-symbols-outlined text-[24px]">trending_up</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Inventory */}
      <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant overflow-hidden">
        <div className="p-6 border-b border-outline-variant">
          <h2 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
            Your Inventory
          </h2>
          <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
            {sellerInventory.length} products listed
          </p>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <p className="text-on-surface-variant">Loading your inventory...</p>
          </div>
        ) : sellerInventory.length === 0 ? (
          <div className="p-12 text-center">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4">
              inventory_2
            </span>
            <h3 className="font-[family-name:var(--font-source-serif)] text-[18px] leading-[28px] font-semibold text-on-surface mb-2">
              No products yet
            </h3>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] text-on-surface-variant mb-6">
              Start by adding your first flower to your inventory
            </p>
            <Link
              href="/seller/inventory/new"
              className="inline-block px-6 py-2 bg-secondary text-on-secondary rounded-lg font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:opacity-90 transition-all"
            >
              Add Your First Flower
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container">
                  <th className="text-left p-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                    Flower Name
                  </th>
                  <th className="text-left p-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                    Category
                  </th>
                  <th className="text-left p-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                    Price
                  </th>
                  <th className="text-left p-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                    Stock
                  </th>
                  <th className="text-left p-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sellerInventory.slice(0, 5).map((item) => (
                  <tr key={item._id} className="border-b border-outline-variant hover:bg-surface-container transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                            <Image
                              src={item.image}
                              alt={item.photoName}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <span className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] text-on-surface font-semibold">
                          {item.photoName}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant capitalize">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] font-semibold text-secondary">
                        K{item.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold ${item.countInStock > 0 ? "text-secondary" : "text-error"}`}>
                        {item.countInStock}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/seller/inventory/${item._id}/edit`}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-surface-container hover:bg-surface-container-high rounded font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-secondary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {sellerInventory.length > 5 && (
          <div className="p-4 border-t border-outline-variant text-center">
            <Link
              href="/seller/inventory"
              className="inline-block px-6 py-2 bg-secondary text-on-secondary rounded-lg font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:opacity-90 transition-all"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
