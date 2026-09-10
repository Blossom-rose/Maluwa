"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/context/CartContext";
import { notificationService } from "@/lib/services/notificationService";
import { inventoryService, InventoryItem } from "@/lib/services/inventoryService";
import { useState, Suspense, useEffect } from "react";

function HomeContent() {
  const { addItem, getItemCount, isLoggedIn } = useCart();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingFlowers, setTrendingFlowers] = useState<InventoryItem[]>([]);
  const [loadingFlowers, setLoadingFlowers] = useState(true);
  const cartCount = getItemCount();

  // Load trending flowers on mount
  useEffect(() => {
    const loadTrendingFlowers = async () => {
      try {
        setLoadingFlowers(true);
        // Fetch all flowers from seller's inventory
        const flowers = await inventoryService.getAllItems();
        // Get up to 4 flowers for trending section
        setTrendingFlowers(flowers.slice(0, 4));
      } catch (err) {
        console.error("Failed to load trending flowers:", err);
        setTrendingFlowers([]);
      } finally {
        setLoadingFlowers(false);
      }
    };

    loadTrendingFlowers();
  }, []);

  const handleAddToCart = (flower: InventoryItem) => {
    if (!isLoggedIn) {
      notificationService.info("Please sign in to add items to your cart");
      router.push(`/sign-in?redirect=${encodeURIComponent("/")}`);
      return;
    }
    try {
      addItem(flower, 1);
      notificationService.success("Added to cart!");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      notificationService.error("Couldn't add item to cart. Please try again.");
    }
  };

  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-[20px] py-[4px] bg-surface shadow-sm">
        <div className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] font-semibold text-primary md:text-[32px] md:leading-[40px]">
          Malawi Bloom
        </div>
        <nav className="hidden md:flex gap-[16px] items-center">
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-secondary border-b-2 border-secondary hover:text-primary-container transition-colors"
            href="/"
          >
            Home
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary transition-colors"
            href="/flowers"
          >
            Shop
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary transition-colors"
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary transition-colors"
            href="/about"
          >
            About Us
          </Link>
        </nav>
        <div className="flex items-center gap-[16px]">
          <Link href="/cart" className="relative group">
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all active:scale-95">
              shopping_cart
            </button>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-error text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/sign-in">
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all active:scale-95">
              account_circle
            </button>
          </Link>
        </div>
      </header>

      <main className="pt-16 pb-24 md:pb-0">
        {/* Hero Banner */}
        <section className="relative min-h-[716px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAmFXW8yMuXlEJpkf4lLyY5P7u9c2TPowkMHGHqo3NjVif1Thdx6fnNxyO9tHmBtVlAXFjk64pxtyFdnR7KZRWZml833lytEJ1oXnTbYFfNeh_vF9gI10uTiR58X-JIlLbCmVyVFjkO6C3vRMghBpniPPTksIFsIQGnJuhY4XPEZ8aW_Qh8aJMCGBRyUiKx-78SBt3KodtlAgVbck0ufxdwslGtBpSleQEVj_kKrrKAee76GxVou8ink2aS478Cm8tVXG7fgw5RnQ"
              alt="A lush, sun-drenched landscape in Malawi featuring vibrant Flame Trees"
              fill
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 hero-gradient"></div>
          </div>
          <div className="relative z-10 px-[20px] max-w-7xl mx-auto w-full">
            <div className="max-w-2xl">
              <h1 className="font-[family-name:var(--font-source-serif)] text-[48px] leading-[56px] tracking-[-0.02em] font-bold text-on-surface mb-[16px]">
                The Warm Heart of Africa in Every Petal.
              </h1>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[18px] leading-[28px] text-on-surface-variant mb-[32px] max-w-lg">
                Discover Malawi&apos;s most exquisite local blooms, hand-picked and delivered with the same warmth that defines our home.
              </p>
              {/* Hero Search */}
              <div className="flex flex-col md:flex-row gap-[8px] w-full max-w-lg">
                <div className="relative flex-grow">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    search
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-none shadow-lg bg-surface text-on-surface focus:ring-2 focus:ring-primary"
                    placeholder="Search for roses, lilies, etc"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchQuery.trim()) {
                        router.push(`/flowers?search=${encodeURIComponent(searchQuery)}`);
                      }
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    if (searchQuery.trim()) {
                      router.push(`/flowers?search=${encodeURIComponent(searchQuery)}`);
                    } else {
                      notificationService.warning("Please enter a search term");
                    }
                  }}
                  className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-primary-container transition-all active:scale-95"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Shop by Occasion */}
        <section className="px-[20px] py-[32px] max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-[32px]">
            <div>
              <h2 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface">
                Shop by Occasion
              </h2>
              <p className="font-[family-name:var(--font-be-vietnam)] text-on-surface-variant">
                The right bloom for every moment.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-[16px]">
            {/* Valentines */}
            <Link
              className="group bg-surface-container hover:bg-primary-container hover:text-on-primary-container transition-all p-[32px] rounded-2xl flex flex-col items-center text-center shadow-sm"
              href="/flowers?category=valentines"
            >
              <div className="bg-primary-container text-on-primary-container w-16 h-16 rounded-full flex items-center justify-center mb-[16px] group-hover:bg-surface group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  favorite
                </span>
              </div>
              <span className="font-[family-name:var(--font-source-serif)] text-[16px] leading-[24px] font-semibold">
                Valentine&apos;s
              </span>
            </Link>
            {/* Weddings */}
            <Link
              className="group bg-surface-container hover:bg-secondary-container hover:text-on-secondary-container transition-all p-[32px] rounded-2xl flex flex-col items-center text-center shadow-sm"
              href="/flowers?category=weddings"
            >
              <div className="bg-secondary-container text-on-secondary-container w-16 h-16 rounded-full flex items-center justify-center mb-[16px] group-hover:bg-surface group-hover:text-secondary transition-colors">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  celebration
                </span>
              </div>
              <span className="font-[family-name:var(--font-source-serif)] text-[16px] leading-[24px] font-semibold">
                Weddings
              </span>
            </Link>
            {/* Memorials */}
            <Link
              className="group bg-surface-container hover:bg-surface-dim transition-all p-[32px] rounded-2xl flex flex-col items-center text-center shadow-sm"
              href="/flowers?category=memorials"
            >
              <div className="bg-on-surface-variant/10 text-on-surface-variant w-16 h-16 rounded-full flex items-center justify-center mb-[16px] group-hover:bg-surface transition-colors">
                <span className="material-symbols-outlined text-3xl">filter_vintage</span>
              </div>
              <span className="font-[family-name:var(--font-source-serif)] text-[16px] leading-[24px] font-semibold">
                Memorials
              </span>
            </Link>
            {/* Birthdays */}
            <Link
              className="group bg-surface-container hover:bg-tertiary-container hover:text-on-tertiary-container transition-all p-[32px] rounded-2xl flex flex-col items-center text-center shadow-sm"
              href="/flowers?category=birthdays"
            >
              <div className="bg-tertiary-container text-on-tertiary-container w-16 h-16 rounded-full flex items-center justify-center mb-[16px] group-hover:bg-surface group-hover:text-tertiary transition-colors">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  cake
                </span>
              </div>
              <span className="font-[family-name:var(--font-source-serif)] text-[16px] leading-[24px] font-semibold">
                Birthdays
              </span>
            </Link>
            {/* Anniversaries */}
            <Link
              className="group bg-surface-container hover:bg-primary-container hover:text-on-primary-container transition-all p-[32px] rounded-2xl flex flex-col items-center text-center shadow-sm"
              href="/flowers?category=anniversaries"
            >
              <div className="bg-primary-container text-on-primary-container w-16 h-16 rounded-full flex items-center justify-center mb-[16px] group-hover:bg-surface group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  card_giftcard
                </span>
              </div>
              <span className="font-[family-name:var(--font-source-serif)] text-[16px] leading-[24px] font-semibold">
                Anniversaries
              </span>
            </Link>
          </div>
        </section>

        {/* Trending Now Bento Grid */}
        <section className="px-[20px] py-[32px] bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-[32px]">
              <h2 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface">
                Trending Now
              </h2>
              <Link className="text-primary font-bold hover:underline" href="/flowers">
                View All Bloom
              </Link>
            </div>

            {loadingFlowers ? (
              <div className="text-center py-12">
                <p className="text-on-surface-variant">Loading flowers...</p>
              </div>
            ) : trendingFlowers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-on-surface-variant">No flowers available yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-[16px] h-auto md:h-[600px]">
                {/* Large Featured Card - First flower */}
                {trendingFlowers[0] && (
                  <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl shadow-lg bg-surface">
                    <Image
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={trendingFlowers[0].image || "https://via.placeholder.com/400"}
                      alt={trendingFlowers[0].photoName}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized={true}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-[32px] bg-gradient-to-t from-black/80 to-transparent text-white">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="inline-block px-3 py-1 bg-tertiary text-on-tertiary rounded-full text-[10px] uppercase font-bold tracking-widest mb-2">
                            {trendingFlowers[0].category || "Featured"}
                          </span>
                          <h3 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-white">
                            {trendingFlowers[0].photoName}
                          </h3>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-[family-name:var(--font-source-serif)] font-bold">K {trendingFlowers[0].price.toLocaleString()}</p>
                          <button
                            onClick={() => handleAddToCart(trendingFlowers[0])}
                            className="material-symbols-outlined text-primary-container hover:text-primary transition-colors mt-2"
                            title="Add to Cart"
                          >
                            add_shopping_cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Side Cards */}
                {trendingFlowers.slice(1, 4).map((flower) => (
                  <div key={flower._id} className="relative group overflow-hidden rounded-2xl shadow-lg bg-surface flex flex-col">
                    <div className="h-48 overflow-hidden relative">
                      <Image
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        src={flower.image || "https://via.placeholder.com/300"}
                        alt={flower.photoName}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        unoptimized={true}
                      />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
                          {flower.photoName}
                        </h3>
                        <p className="text-on-surface-variant font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold capitalize">
                          {flower.category || "Flower"}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-[16px]">
                        <span className="text-primary font-bold">K {flower.price.toLocaleString()}</span>
                        <button
                          onClick={() => handleAddToCart(flower)}
                          className="material-symbols-outlined text-primary-container hover:text-primary transition-colors"
                          title="Add to Cart"
                        >
                          add_shopping_cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full py-[32px] px-[20px] grid grid-cols-1 md:grid-cols-3 gap-[16px]  mx-auto bg-surface-container-highest border-t border-outline-variant mt-[32px]">
        <div className="space-y-[16px]">
          <div className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
            Malawi Bloom
          </div>
          <p className="font-[family-name:var(--font-be-vietnam)] text-on-surface-variant">
            © 2024 Malawi Bloom. The Warm Heart of Africa in Every Petal.
          </p>
          <div className="flex gap-4">
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">face_nod</span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">photo_camera</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[16px]">
          <div className="space-y-2">
            <h5 className="font-bold text-on-surface text-sm uppercase tracking-wider mb-4">Explore</h5>
            <Link
              className="block text-on-surface-variant hover:text-secondary hover:underline transition-colors font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold"
              href="#"
            >
              Contact Us
            </Link>
            <Link
              className="block text-on-surface-variant hover:text-secondary hover:underline transition-colors font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold"
              href="#"
            >
              WhatsApp Support
            </Link>
            <Link
              className="block text-on-surface-variant hover:text-secondary hover:underline transition-colors font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold"
              href="#"
            >
              Shipping Policy
            </Link>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-on-surface text-sm uppercase tracking-wider mb-4">Local</h5>
            <Link
              className="block text-on-surface-variant hover:text-secondary hover:underline transition-colors font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold"
              href="#"
            >
              Chichewa Guide
            </Link>
            <Link
              className="block text-on-surface-variant hover:text-secondary hover:underline transition-colors font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold"
              href="#"
            >
              Lilongwe Store
            </Link>
            <Link
              className="block text-on-surface-variant hover:text-secondary hover:underline transition-colors font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold"
              href="#"
            >
              Blantyre Store
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <h5 className="font-bold text-on-surface text-sm uppercase tracking-wider">Payments Accepted</h5>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 bg-surface px-3 py-2 rounded-lg border border-outline-variant">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                smartphone
              </span>
              <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
                Airtel Money
              </span>
            </div>
            <div className="flex items-center gap-2 bg-surface px-3 py-2 rounded-lg border border-outline-variant">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                account_balance_wallet
              </span>
              <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
                TNM Mpamba
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between p-2 rounded-lg bg-surface-container-high">
            <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
              Language:
            </span>
            <div className="flex gap-2">
              <button className="px-2 py-1 bg-primary text-on-primary rounded font-bold text-xs">English</button>
              <button className="px-2 py-1 text-on-surface-variant hover:bg-surface rounded text-xs transition-colors">
                Chichewa
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe md:hidden bg-surface-container shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-xl">
        <Link
          className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 transition-all active:scale-90 duration-150"
          href="/"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            Home
          </span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all"
          href="/flowers"
        >
          <span className="material-symbols-outlined">local_florist</span>
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            Shop
          </span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all"
          href="/contact"
        >
          <span className="material-symbols-outlined">mail</span>
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            Contact
          </span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all"
          href="/about"
        >
          <span className="material-symbols-outlined">info</span>
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            About
          </span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all"
          href="/cart"
        >
          <span className="material-symbols-outlined">shopping_basket</span>
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            Cart
          </span>
        </Link>
      </nav>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
