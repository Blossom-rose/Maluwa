"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { inventoryService, InventoryItem } from "@/lib/services/inventoryService";
import { notificationService } from "@/lib/services/notificationService";

export default function EditFlower() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<InventoryItem> | null>(null);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 2;

    const loadItem = async () => {
      try {
        if (!id) {
          setLoading(false);
          return;
        }
        console.log(`Loading inventory item: ${id}`);
        const item = await inventoryService.getItemById(id);
        setFormData(item);
      } catch (err: any) {
        console.error("Failed to load product:", err);
        
        // Retry once on timeout
        if ((err.code === 'ECONNABORTED' || err.message?.includes('timeout')) && retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying... Attempt ${retryCount}/${maxRetries}`);
          setTimeout(loadItem, 1000); // Retry after 1 second
          return;
        }

        if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
          notificationService.error("Server is taking too long to respond. Please check your connection and try again.");
        } else if (err.response?.status === 404) {
          notificationService.error("Product not found");
        } else {
          notificationService.error("Failed to load product. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !id) return;

    setSaving(true);
    try {
      await inventoryService.updateItem(id, {
        photoName: formData.photoName,
        description: formData.description,
        category: formData.category as any,
        price: Number(formData.price),
        countInStock: Number(formData.countInStock),
        image: formData.image,
        minOrderQuantity: formData.minOrderQuantity ? Number(formData.minOrderQuantity) : 1,
        maxOrderQuantity: formData.maxOrderQuantity ? Number(formData.maxOrderQuantity) : undefined,
        status: formData.status as any,
      });

      notificationService.success("Product updated successfully!");
      router.push("/seller/inventory");
    } catch (err: any) {
      console.error("Error updating item:", err);
      notificationService.error(err.response?.data?.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[400px]">
        <p className="text-on-surface-variant">Loading product...</p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[400px]">
        <p className="text-error">Product not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 pb-20 md:pb-6">
      <h1 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface mb-8">
        Edit Product
      </h1>

      <form onSubmit={handleSubmit} className="max-w-2xl bg-surface rounded-lg shadow-md p-6 border border-outline-variant space-y-6">
        <div>
          <label className="block font-bold text-on-surface mb-2">Product Name</label>
          <input
            type="text"
            name="photoName"
            value={formData.photoName || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block font-bold text-on-surface mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-on-surface mb-2">Category</label>
            <select
              name="category"
              value={formData.category || "mixed"}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
            >
              <option value="roses">Roses</option>
              <option value="lilies">Lilies</option>
              <option value="proteas">Proteas</option>
              <option value="flame_tree">Flame Tree</option>
              <option value="mixed">Mixed</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-on-surface mb-2">Price (MK)</label>
            <input
              type="number"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
              min="0"
              step="100"
              className="w-full px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-on-surface mb-2">Stock Count</label>
            <input
              type="number"
              name="countInStock"
              value={formData.countInStock || ""}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block font-bold text-on-surface mb-2">Status</label>
            <select
              name="status"
              value={formData.status || "active"}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-bold text-on-surface mb-2">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
          />
          {formData.image && (
            <div className="mt-2 relative w-full h-32 bg-surface-container rounded-lg overflow-hidden">
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-bold hover:opacity-90 transition-all disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 bg-surface-container text-on-surface py-3 rounded-lg font-bold hover:opacity-90 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
