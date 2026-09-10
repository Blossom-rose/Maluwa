"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { inventoryService, InventoryItem } from "@/lib/services/inventoryService";
import { useCart } from "@/lib/context/CartContext";
import { notificationService } from "@/lib/services/notificationService";
import UserMenu from "@/lib/components/UserMenu";

function FlowersCatalogContent() {
  const [flowers, setFlowers] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const { addItem, getItemCount,isLoggedIn } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const cartCount = getItemCount();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "ALL";
  
  // Initialize with values from search params to avoid hydration mismatch
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        setLoading(true);
        const filters: any = {};
        if (selectedCategory && selectedCategory !== "ALL") {
          filters.category = selectedCategory;
        }
        const data = await inventoryService.getAllItems(filters);
        
        // Filter by search query locally
        let filtered = data;
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filtered = data.filter(flower =>
            flower.photoName.toLowerCase().includes(query) ||
            flower.description?.toLowerCase().includes(query)
          );
        }

        setFlowers(filtered);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch flowers:", err);
        const errorMsg = err.response?.data?.message || "Failed to load flowers from backend server. Please check connection.";
        setError(errorMsg);
        setFlowers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlowers();
  }, [searchQuery, selectedCategory]);

  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-[20px] py-[4px] bg-surface shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] font-semibold text-primary md:text-[32px] md:leading-[40px]">
            Malawi Bloom
          </h1>
          <nav className="hidden md:flex gap-6 ml-8">
            <Link
              className="text-on-surface-variant font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold py-2 hover:text-secondary transition-colors"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-secondary border-b-2 border-secondary font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold py-2"
              href="/flowers"
            >
              Shop
            </Link>
            <Link
              className="text-on-surface-variant font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold py-2 hover:text-secondary transition-colors"
              href="/contact"
            >
              Contact
            </Link>
            <Link
              className="text-on-surface-variant font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold py-2 hover:text-secondary transition-colors"
              href="/about"
            >
              About Us
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-[20px] flex-1 justify-end">
          <div className="relative hidden sm:flex items-center w-full max-w-xs ml-4">
            {isHydrated && (
              <input
                className="w-full pl-10 pr-4 py-2 rounded-full border-none bg-surface-container shadow-sm focus:ring-2 focus:ring-primary text-[16px] leading-[24px]"
                placeholder="Find your perfect bouquet..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant">
              search
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2 hover:bg-surface-container-high rounded-full transition-all">
              <span className="material-symbols-outlined text-primary">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 pb-20 md:pb-10 min-h-screen max-w-7xl mx-auto flex flex-col md:flex-row gap-[16px] px-[20px]">
        {/* Side Filter Navigation (Web) */}
        <aside className="hidden md:flex flex-col w-64 h-full sticky top-24 space-y-6 bg-surface-container-low p-4 rounded-xl border border-outline-variant">
          <div>
            <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface mb-4">
              Occasion
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-outline text-primary focus:ring-primary"
                  type="checkbox"
                  checked={selectedCategory === "ALL"}
                  onChange={() => setSelectedCategory("ALL")}
                />
                <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant group-hover:text-primary transition-colors">
                  ALL
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-outline text-primary focus:ring-primary"
                  type="checkbox"
                  checked={selectedCategory === "valentines"}
                  onChange={() => setSelectedCategory(selectedCategory === "valentines" ? "ALL" : "valentines")}
                />
                <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant group-hover:text-primary transition-colors">
                  Valentines Day
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-outline text-primary focus:ring-primary"
                  type="checkbox"
                  checked={selectedCategory === "weddings"}
                  onChange={() => setSelectedCategory(selectedCategory === "weddings" ? "ALL" : "weddings")}
                />
                <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant group-hover:text-primary transition-colors">
                  Weddings
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-outline text-primary focus:ring-primary"
                  type="checkbox"
                  checked={selectedCategory === "birthdays"}
                  onChange={() => setSelectedCategory(selectedCategory === "birthdays" ? "ALL" : "birthdays")}
                />
                <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant group-hover:text-primary transition-colors">
                  Birthdays
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-outline text-primary focus:ring-primary"
                  type="checkbox"
                  checked={selectedCategory === "anniversaries"}
                  onChange={() => setSelectedCategory(selectedCategory === "anniversaries" ? "ALL" : "anniversaries")}
                />
                <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant group-hover:text-primary transition-colors">
                  Anniversaries
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-outline text-primary focus:ring-primary"
                  type="checkbox"
                  checked={selectedCategory === "memorials"}
                  onChange={() => setSelectedCategory(selectedCategory === "memorials" ? "ALL" : "memorials")}
                />
                <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant group-hover:text-primary transition-colors">
                  Memorials
                </span>
              </label>
            </div>
          </div>
          
        </aside>

        {/* Content Canvas */}
        <div className="flex-1">
          {/* Mobile Filter Toggle (Mobile Only) */}
          <div className="md:hidden flex justify-between items-center mb-6">
            <button className="flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
              <span className="material-symbols-outlined text-[20px]">tune</span>
              Filter Blooms
            </button>
            <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
              {flowers.length} Results
            </span>
          </div>

          {/* Page Title & Sort */}
          <div className="flex justify-between items-end mb-[32px]">
            <div>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-tertiary uppercase tracking-widest mb-1">
                Seasonal Selection
              </p>
              <h2 className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] font-semibold md:text-[32px] md:leading-[40px]">
                Fresh from the Warm Heart
              </h2>
            </div>
            <div className="hidden sm:block">
              <select className="bg-transparent border-none font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold focus:ring-0 text-on-surface-variant cursor-pointer">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] text-on-surface-variant">
                  Loading our beautiful collection...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] text-error">
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-primary text-on-primary px-6 py-2 rounded-lg font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:opacity-90"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Product Bento Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
              {flowers.map((flower) => {
                const flowerId = flower.id || flower._id || "";
                return (
                  <div
                    key={flowerId}
                    className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-64 overflow-hidden bg-surface-container-high">
                      {flower.image ? (
                        <Image
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          src={flower.image}
                          alt={flower.photoName}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized={true}
                          onError={(e) => {
                            console.error("Image failed to load:", flower.image, e);
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-surface-container">
                          <span className="material-symbols-outlined text-[48px] text-on-surface-variant">
                            local_florist
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 bg-secondary-container text-on-secondary-container px-2 py-1 rounded flex items-center gap-1 font-[family-name:var(--font-be-vietnam)] text-[10px]">
                        <span
                          className="material-symbols-outlined text-[14px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        {flower.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface group-hover:text-primary transition-colors">
                            {flower.photoName}
                          </h3>
                        </div>
                        <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
                          K{flower.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="font-[family-name:var(--font-be-vietnam)] text-on-surface-variant mb-4 line-clamp-2">
                        Stock: {flower.countInStock} available
                      </p>
                      <button
                       onClick={async () => {
                          if (!isLoggedIn) {
                            notificationService.info("Please sign in to add items to your cart");
                            router.push(`/sign-in?redirect=${encodeURIComponent("/flowers")}`);
                            return;
                            }
                          try {
                            await addItem(flower as any, 1);
                            notificationService.success("Added to cart!");
                           } catch (err) {
                              console.error("Failed to add to cart:", err);
                              notificationService.error("Couldn't add item to cart. Please try again.");
                               }
                             }}
                        disabled={flower.countInStock === 0}
                        className="w-full flex justify-center items-center gap-2 bg-primary text-on-primary py-3 rounded-lg font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:brightness-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          shopping_basket
                        </span>
                        Shop Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && flowers.length === 0 && (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] text-on-surface-variant">
                  No flowers available at the moment
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default function FlowersCatalog() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 pb-20 flex justify-center items-center"><p>Loading flowers...</p></div>}>
      <FlowersCatalogContent />
    </Suspense>
  );
}
