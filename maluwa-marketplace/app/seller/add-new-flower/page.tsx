"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AddNewFlowerPage() {
  const [formData, setFormData] = useState({
    flowerName: "",
    localName: "",
    price: "",
    stock: "",
    description: "",
    selectedTags: [] as string[],
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCvpKTQO_vM4E6_c7Q5V5yMDBVIfVUJBp4OauAyP0rvslARvzjLsfhoOt5Bql9XIphCLOsbj8tZgZlf3wNi894ZtWDAIrTHYgjUVQtUs2fE-SiSZWoBHzHFtXG_ARXnp4aMPLZLBN6lsjJvGXqMxxv145UZJmwr-6rbUyUMOe4O1QiZaqr6hLdRaYb117v5Mm4Usp_SYTtUhn5KgAKNHAUQuzf67ziQXMe8KsXUWU06UVhKdvVG8KjiZJ8lS2L5yctWp7QFN9Lpb0s",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBVpLrATXry9cPI35Td7RcmAHfPsvjgCIOFKfnIQBHf25HvgEirvSfiLHrF6olu6p4eyCnb5V3aQ0SX3tQe_oDDH0ibv0VMcMlyBGBvv_Nn24HvLwicBcBwoOIATISITIEp0SXhCCb_BDa-drZ625uBito0ufW9oiNBRn2t0tE_AXTpiAgBO-AKsbr_6mwUVMjkIDww8Q1_fFGTuHDHHdKMPAkMh6clCQ8EGQ88gPzHMdUzQwVpRc-vnsgNWwtvavf7rEcITo_2S1A",
  ]);
  const [isDragging, setIsDragging] = useState(false);

  const availableTags = ["Wedding", "Funeral", "Anniversary", "Birthday", "Mother's Day", "Sympathy"];

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter((t) => t !== tag)
        : [...prev.selectedTags, tag],
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImages((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle dropped files
    const files = e.dataTransfer.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImages((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSaveDraft = () => {
    console.log("Saving as draft:", formData);
    alert("Draft saved successfully!");
  };

  const handlePublish = () => {
    console.log("Publishing bloom:", formData);
    alert("Listing successful! Your bloom will appear on Maluwa Market shortly.");
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 md:pb-8">
      <main className="p-[20px] md:p-[32px]">
        {/* Header */}
        <header className="mb-[32px] flex flex-col md:flex-row md:items-end justify-between gap-[16px]">
          <div>
            <nav className="flex items-center gap-2 text-on-surface-variant mb-[4px]">
              <Link
                href="/seller/inventory"
                className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:text-primary"
              >
                Inventory
              </Link>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-primary">
                Add New Bloom
              </span>
            </nav>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface">
              List a New Flower
            </h2>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant max-w-2xl">
              Capture the beauty of your local Malawian blooms. Fill in the details below to reach thousands of
              customers.
            </p>
          </div>
          <div className="flex gap-[8px]">
            <button
              onClick={handleSaveDraft}
              className="px-[16px] py-2 border border-secondary text-secondary rounded-lg font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:bg-secondary-container transition-colors"
            >
              Save as Draft
            </button>
            <button
              onClick={handlePublish}
              className="px-[16px] py-2 bg-primary text-white rounded-lg font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:opacity-90 shadow-sm transition-all active:scale-95"
            >
              Publish Bloom
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px] items-start">
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-7 space-y-[16px]">
            {/* Basic Info Card */}
            <section className="bg-surface-container-lowest p-[16px] rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-highest">
              <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold mb-[16px] border-b border-outline-variant pb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                <div className="flex flex-col gap-[4px]">
                  <label className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                    Flower Name
                  </label>
                  <input
                    type="text"
                    value={formData.flowerName}
                    onChange={(e) => setFormData({ ...formData, flowerName: e.target.value })}
                    className="rounded-lg border border-outline-variant focus:border-primary focus:ring-primary font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] bg-surface-bright px-4 py-3"
                    placeholder="e.g. Flame Tree Blossom"
                  />
                </div>
                <div className="flex flex-col gap-[4px]">
                  <label className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                    Local Name (Chichewa)
                  </label>
                  <input
                    type="text"
                    value={formData.localName}
                    onChange={(e) => setFormData({ ...formData, localName: e.target.value })}
                    className="rounded-lg border border-outline-variant focus:border-primary focus:ring-primary font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] bg-surface-bright px-4 py-3"
                    placeholder="e.g. Maluwa a Chidindo"
                  />
                </div>
                <div className="flex flex-col gap-[4px]">
                  <label className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                    Price (MK)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">
                      MK
                    </span>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full pl-10 rounded-lg border border-outline-variant focus:border-primary focus:ring-primary font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] bg-surface-bright px-4 py-3"
                      placeholder="5,000"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <label className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="rounded-lg border border-outline-variant focus:border-primary focus:ring-primary font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] bg-surface-bright px-4 py-3"
                    placeholder="25"
                  />
                </div>
              </div>
            </section>

            {/* Categorization */}
            <section className="bg-surface-container-lowest p-[16px] rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-highest">
              <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold mb-[16px] border-b border-outline-variant pb-2">
                Category &amp; Occasions
              </h3>
              <div className="flex flex-col gap-[8px]">
                <label className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                  Select Applicable Tags (Multi-select)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => {
                    const isSelected = formData.selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagToggle(tag)}
                        className={`px-4 py-2 rounded-full font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-primary text-white border border-primary"
                            : "border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="bg-surface-container-lowest p-[16px] rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-highest">
              <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold mb-[16px] border-b border-outline-variant pb-2">
                Description
              </h3>
              <div className="flex flex-col gap-[4px]">
                <label className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                  Detailed Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="rounded-lg border border-outline-variant focus:border-primary focus:ring-primary font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] bg-surface-bright px-4 py-3 resize-none"
                  placeholder="Describe the fragrance, lifespan, and care instructions for these flowers..."
                  rows={5}
                />
              </div>
            </section>
          </div>

          {/* Right Column: Media Upload */}
          <div className="lg:col-span-5 lg:sticky lg:top-[32px] space-y-[16px]">
            <section className="bg-surface-container-lowest p-[16px] rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-highest h-full">
              <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold mb-[16px] border-b border-outline-variant pb-2">
                Upload Photos
              </h3>

              {/* Drag & Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-[32px] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-low transition-all group relative overflow-hidden ${
                  isDragging ? "border-primary bg-primary-fixed/20" : "border-outline-variant"
                }`}
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <span className="material-symbols-outlined text-primary text-5xl mb-[8px]">add_a_photo</span>
                <p className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface mb-[4px]">
                  Drag &amp; Drop Images
                </p>
                <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant px-[16px]">
                  Supports PNG, JPG (Max 5MB). High-resolution photos sell 3x faster in Malawi.
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="file-input"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("file-input")?.click()}
                  className="mt-[16px] px-4 py-2 bg-secondary-container text-on-secondary-container rounded-lg font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold"
                >
                  Browse Files
                </button>
              </div>

              {/* Preview Grid */}
              <div className="mt-[16px] grid grid-cols-2 gap-[8px]">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="aspect-square bg-surface-container rounded-lg overflow-hidden relative group">
                    <Image src={image} alt={`Upload ${index + 1}`} fill className="object-cover" sizes="200px" />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-surface-container-lowest p-1 rounded-full shadow-md text-error opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => document.getElementById("file-input")?.click()}
                  className="aspect-square border border-dashed border-outline-variant rounded-lg flex items-center justify-center bg-surface-bright group hover:border-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">add</span>
                </button>
              </div>

              {/* Tips */}
              <div className="mt-[32px] p-[8px] bg-tertiary-fixed text-on-tertiary-fixed rounded-lg flex gap-[8px]">
                <span className="material-symbols-outlined text-tertiary-container">lightbulb</span>
                <div className="space-y-1">
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold font-bold">
                    Seller Tip
                  </p>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
                    Natural sunlight from a window makes blooms look fresh and inviting. Avoid using camera flash.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Sticky Mobile Bottom Actions */}
      <div className="fixed bottom-0 left-0 w-full md:hidden bg-surface p-[20px] flex gap-[8px] border-t border-outline-variant z-50">
        <button
          onClick={handleSaveDraft}
          className="flex-1 py-3 border border-secondary text-secondary rounded-lg font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold font-bold"
        >
          Draft
        </button>
        <button
          onClick={handlePublish}
          className="flex-[2] py-3 bg-primary text-white rounded-lg font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold font-bold shadow-lg"
        >
          Publish Bloom
        </button>
      </div>
    </div>
  );
}
