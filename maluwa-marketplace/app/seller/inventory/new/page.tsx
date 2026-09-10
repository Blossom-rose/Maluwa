"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { inventoryService } from "@/lib/services/inventoryService";
import { authService } from "@/lib/services/authService";
import { notificationService } from "@/lib/services/notificationService";

export default function AddNewFlower() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [formData, setFormData] = useState({
    photoName: "",
    description: "",
    category: "custom" as const,
    price: "",
    countInStock: "",
    minOrderQuantity: "1",
    maxOrderQuantity: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      notificationService.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      notificationService.error("Image size must be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
    };
    reader.readAsDataURL(file);

    // Upload file to backend
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("http://localhost:3001/photos/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      // Use the URL directly from the response (already fully formed with proper encoding)
      setUploadedImageUrl(data.url);
      notificationService.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      notificationService.error("Failed to upload image");
      setImagePreview("");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = authService.getUser();
      if (!user?._id && !user?.id) {
        notificationService.error("You must be logged in as a seller");
        return;
      }

      const sellerId = (user._id || user.id) as string;

      // Validate required fields
      if (!formData.photoName.trim()) {
        notificationService.error("Product name is required");
        return;
      }
      if (!formData.price || Number(formData.price) <= 0) {
        notificationService.error("Valid price is required");
        return;
      }
      if (!formData.countInStock || Number(formData.countInStock) < 0) {
        notificationService.error("Valid stock count is required");
        return;
      }
      if (!uploadedImageUrl) {
        notificationService.error("Product image is required");
        return;
      }

      await inventoryService.createItem({
        sellerId,
        photoName: formData.photoName,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        countInStock: Number(formData.countInStock),
        image: uploadedImageUrl,
        minOrderQuantity: formData.minOrderQuantity ? Number(formData.minOrderQuantity) : 1,
        maxOrderQuantity: formData.maxOrderQuantity ? Number(formData.maxOrderQuantity) : undefined,
      });

      notificationService.success("Product added successfully!");
      router.push("/seller/inventory");
    } catch (err: any) {
      console.error("Error creating item:", err);
      notificationService.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 pb-20 md:pb-6">
      <h1 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface mb-8">
        Add New Flower Product
      </h1>

      <form onSubmit={handleSubmit} className="max-w-2xl bg-surface rounded-lg shadow-md p-6 border border-outline-variant space-y-6">
        <div>
          <label className="block font-bold text-on-surface mb-2">Product Name *</label>
          <input
            type="text"
            name="photoName"
            value={formData.photoName}
            onChange={handleChange}
            placeholder="e.g., Red Roses Bouquet"
            className="w-full px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block font-bold text-on-surface mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your product..."
            rows={4}
            className="w-full px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-on-surface mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
            >
              <option value="valentines">Valentine's Day</option>
              <option value="weddings">Weddings</option>
              <option value="birthdays">Birthdays</option>
              <option value="anniversaries">Anniversaries</option>
              <option value="memorials">Memorials</option>
              <option value="custom">Custom/Other</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-on-surface mb-2">Price (MK) *</label>
            <input
              type="decimal"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0"
              min="0"
              step="100"
              className="w-full px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-on-surface mb-2">Stock Count *</label>
            <input
              type="number"
              name="countInStock"
              value={formData.countInStock}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className="w-full px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-on-surface mb-2">Min Order Quantity</label>
            <input
              type="number"
              name="minOrderQuantity"
              value={formData.minOrderQuantity}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-on-surface mb-2">Max Order Quantity</label>
          <input
            type="number"
            name="maxOrderQuantity"
            value={formData.maxOrderQuantity}
            onChange={handleChange}
            placeholder="Leave empty for unlimited"
            className="w-full px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block font-bold text-on-surface mb-2">Product Image *</label>
          <div className="border-2 border-dashed border-primary rounded-lg p-6 text-center cursor-pointer hover:bg-primary/5 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
              disabled={uploading}
              required={!uploadedImageUrl}
            />
            <label htmlFor="image-upload" className="cursor-pointer block">
              {uploading ? (
                <div className="space-y-2">
                  <span className="material-symbols-outlined text-[48px] text-primary mx-auto block animate-spin">
                    cloud_upload
                  </span>
                  <p className="text-on-surface font-semibold">Uploading...</p>
                </div>
              ) : imagePreview ? (
                <div className="space-y-2">
                  <span className="material-symbols-outlined text-[48px] text-primary mx-auto block">cloud_upload</span>
                  <p className="text-on-surface font-semibold">Click to change image</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="material-symbols-outlined text-[48px] text-primary mx-auto block">cloud_upload</span>
                  <p className="text-on-surface font-semibold">Click to upload or drag and drop</p>
                  <p className="text-on-surface-variant text-sm">PNG, JPG, GIF up to 5MB</p>
                </div>
              )}
            </label>
          </div>

          {imagePreview && (
            <div className="mt-4 relative w-full h-48 bg-surface-container rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              {uploadedImageUrl && (
                <div className="absolute top-2 left-2 bg-success text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Uploaded
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setImagePreview("");
                  setUploadedImageUrl("");
                }}
                className="absolute top-2 right-2 bg-error text-white p-2 rounded-full hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-bold hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Product"}
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
