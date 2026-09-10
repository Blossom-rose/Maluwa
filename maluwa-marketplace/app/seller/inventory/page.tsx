"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { inventoryService, InventoryItem } from "@/lib/services/inventoryService";
import { authService } from "@/lib/services/authService";
import { notificationService } from "@/lib/services/notificationService";

export default function SellerInventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sellerId, setSellerId] = useState<string | null>(null);

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const user = authService.getUser();
        if (!user?._id && !user?.id) {
          setError("You must be logged in as a seller to view inventory");
          setLoading(false);
          return;
        }

        const id = user._id || user.id;
        if (!id) {
          setError("User ID not found");
          setLoading(false);
          return;
        }
        setSellerId(id);

        const data = await inventoryService.getSellerInventory(id);
        setItems(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch inventory:", err);
        setError("Failed to load your inventory. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadInventory();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await inventoryService.deleteItem(id);
      setItems(items.filter(item => item._id !== id && item.id !== id));
      notificationService.success("Item deleted successfully");
    } catch (err) {
      notificationService.error("Failed to delete item");
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[400px]">
        <p className="text-on-surface-variant">Loading inventory...</p>
      </div>
    );
  }

  return (
    <div className="p-6 pb-20 md:pb-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface">
            Your Inventory
          </h1>
          <p className="text-on-surface-variant">Manage your flower products</p>
        </div>
        <Link href="/seller/inventory/new">
          <button className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">add</span>
            Add New Product
          </button>
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-error-container text-on-error rounded-lg">
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-12 bg-surface-container rounded-lg">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4 block">
            inventory_2
          </span>
          <p className="text-on-surface-variant mb-4">No products yet</p>
          <Link href="/seller/inventory/new">
            <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold">
              Add Your First Product
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const itemId = (item._id || item.id) as string;
            return (
              <div
                key={itemId}
                className="bg-surface rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all border border-outline-variant"
              >
                {item.image && (
                  <div className="relative h-48 bg-surface-container overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.photoName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={false}
                      unoptimized={true}
                      onError={(e) => {
                        console.error("Image failed to load:", item.image, e);
                      }}
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-[family-name:var(--font-source-serif)] text-[18px] font-semibold text-on-surface mb-2">
                    {item.photoName}
                  </h3>
                  <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">
                    {item.description || "No description"}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div>
                      <span className="text-on-surface-variant">Price</span>
                      <p className="font-bold text-primary">K{item.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-on-surface-variant">Stock</span>
                      <p className={`font-bold ${item.countInStock > 0 ? "text-secondary" : "text-error"}`}>
                        {item.countInStock}
                      </p>
                    </div>
                    <div>
                      <span className="text-on-surface-variant">Category</span>
                      <p className="font-bold text-tertiary capitalize">{item.category}</p>
                    </div>
                    <div>
                      <span className="text-on-surface-variant">Status</span>
                      <p className={`font-bold capitalize ${
                        item.status === "active" ? "text-secondary" : 
                        item.status === "out_of_stock" ? "text-error" : "text-on-surface-variant"
                      }`}>
                        {item.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/seller/inventory/${itemId}/edit`} className="flex-1">
                      <button className="w-full py-2 bg-primary-container text-on-primary-container rounded font-bold hover:opacity-90 transition-all text-sm">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(itemId)}
                      className="flex-1 py-2 bg-error-container text-on-error rounded font-bold hover:opacity-90 transition-all text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
