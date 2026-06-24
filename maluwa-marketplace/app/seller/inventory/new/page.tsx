"use client";

import Link from "next/link";
import { useState } from "react";

export default function NewFlowerPage() {
  const [formData, setFormData] = useState({
    name: "",
    nameChichewa: "",
    price: "",
    category: "Bouquets",
    stock: "",
    description: "",
    occasion: [] as string[],
    imageFile: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOccasionToggle = (occasion: string) => {
    setFormData((prev) => ({
      ...prev,
      occasion: prev.occasion.includes(occasion)
        ? prev.occasion.filter((o) => o !== occasion)
        : [...prev.occasion, occasion],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto px-[20px] py-[32px]">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/seller/inventory"
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Inventory
          </Link>
          <h1 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] md:text-[48px] md:leading-[56px] font-bold text-primary">
            Add New Flower
          </h1>
          <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant mt-2">
            List a new botanical product in your Malawi Bloom collection
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <section className="bg-surface-container-low rounded-2xl p-6 shadow-sm border border-outline-variant/30">
            <h2 className="font-[family-name:var(--font-source-serif)] text-[24px] leading-[32px] font-semibold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">info</span>
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-2">
                  Flower Name (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Luminous Lilies"
                  className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px]"
                />
              </div>

              <div>
                <label className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-2">
                  Chichewa Name
                </label>
                <input
                  type="text"
                  value={formData.nameChichewa}
                  onChange={(e) => setFormData({ ...formData, nameChichewa: e.target.value })}
                  placeholder="e.g., Maluwa a Kuwala"
                  className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px]"
                />
              </div>

              <div>
                <label className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px]"
                >
                  <option>Bouquets</option>
                  <option>Roses</option>
                  <option>Lilies</option>
                  <option>Proteas</option>
                  <option>Daisies</option>
                  <option>Single Stems</option>
                  <option>Arrangements</option>
                  <option>Potted Plants</option>
                </select>
              </div>

              <div>
                <label className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-2">
                  Price (MK) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="25000"
                  className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px]"
                />
              </div>

              <div>
                <label className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="50"
                  className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px]"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Describe your flower arrangement, including special features, care instructions, or cultural significance..."
                className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px]"
              />
            </div>
          </section>

          {/* Occasion Tags Section */}
          <section className="bg-surface-container-low rounded-2xl p-6 shadow-sm border border-outline-variant/30">
            <h2 className="font-[family-name:var(--font-source-serif)] text-[24px] leading-[32px] font-semibold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">celebration</span>
              Occasion Tags
            </h2>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] text-on-surface-variant mb-6">
              Select all occasions that fit this flower arrangement
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                "Weddings",
                "Funerals",
                "Birthdays",
                "Anniversaries",
                "Congratulations",
                "Get Well Soon",
                "Thank You",
                "Just Because",
              ].map((occasion) => (
                <button
                  key={occasion}
                  type="button"
                  onClick={() => handleOccasionToggle(occasion)}
                  className={`px-4 py-2 rounded-full font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold transition-all ${
                    formData.occasion.includes(occasion)
                      ? "bg-secondary-container text-on-secondary-container border-2 border-secondary"
                      : "bg-surface-container text-on-surface-variant border-2 border-outline-variant hover:border-secondary"
                  }`}
                >
                  {occasion}
                </button>
              ))}
            </div>
          </section>

          {/* Image Upload Section */}
          <section className="bg-surface-container-low rounded-2xl p-6 shadow-sm border border-outline-variant/30">
            <h2 className="font-[family-name:var(--font-source-serif)] text-[24px] leading-[32px] font-semibold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">image</span>
              Product Image
            </h2>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] text-on-surface-variant mb-6">
              Upload a high-quality image that showcases your flower arrangement
            </p>

            <div className="relative border-2 border-dashed border-outline-variant rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-primary transition-colors cursor-pointer bg-surface group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {imagePreview ? (
                <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold">Change Image</span>
                  </div>
                </div>
              ) : (
                <>
                  <span className="material-symbols-outlined text-primary text-5xl">cloud_upload</span>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] font-bold text-on-surface">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-[12px] text-on-surface-variant">JPG, PNG up to 5MB</p>
                </>
              )}
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 pt-6">
            <Link href="/seller/inventory" className="flex-1">
              <button
                type="button"
                className="w-full border-2 border-outline-variant text-on-surface-variant py-4 rounded-xl font-bold text-lg hover:bg-surface-container transition-all"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="flex-1 bg-primary text-on-primary py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">add_circle</span>
              Add to Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
