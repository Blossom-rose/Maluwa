"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-[20px] py-[4px] bg-surface shadow-sm">
        <div className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] font-semibold text-secondary md:text-[32px] md:leading-[40px]">
          Malawi Bloom
        </div>
        <nav className="hidden md:flex gap-[16px] items-center">
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-primary-container transition-colors"
            href="/"
          >
            Home
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-primary-container transition-colors"
            href="/flowers"
          >
            Shop
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-primary-container transition-colors"
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-secondary border-b-2 border-secondary hover:text-primary-container transition-colors"
            href="/about"
          >
            About Us
          </Link>
        </nav>
        <div className="flex items-center gap-[16px]">
          <Link href="/cart" className="relative group">
            <button className="material-symbols-outlined text-on-surface-variant hover:text-secondary transition-all active:scale-95">
              shopping_cart
            </button>
          </Link>
          <Link href="/sign-in">
            <button className="material-symbols-outlined text-on-surface-variant hover:text-secondary transition-all active:scale-95">
              account_circle
            </button>
          </Link>
        </div>
      </header>

      <main className="pt-16 pb-24 md:pb-0">
        {/* Hero Section */}
        <section className="relative w-full min-h-[400px] flex items-center justify-center overflow-hidden bg-surface-container-highest">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-multiply"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDNjraFHei3Xxe6qWUl8wy3H8WivaynHw2PjYgyubogQ53o9GPgcV8zPPakpkFjVNALKQcy8weSJmv1kgki1iE4utkdOaKNYlL3J1IBC9RwMacLxdj408lfeg0-kM9zDFlmQWuJYn7552fxbB44CBTjQtOrFlHLEhz2blqKk6H_pYi4j6YCCmKmr0AHY0RC7epTpdwdlCNryEBxEeDr3ECHSnxg77b-Fklzj6yjU-nu0J41NPUVhBMR')",
            }}
          />
          <div className="relative z-10 text-center px-[20px] max-w-3xl">
            <h1 className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] md:text-[48px] md:leading-[56px] font-semibold text-on-surface mb-[16px]">
              Warmly grown in Lilongwe.
            </h1>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] text-on-surface-variant">
              Bringing the Warm Heart of Africa to every petal, handcrafted with love and local expertise.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-[32px] px-[20px] max-w-7xl mx-auto my-[32px]">
          <div className="grid md:grid-cols-2 gap-[32px] items-center">
            <div className="order-2 md:order-1 space-y-[16px]">
              <h2 className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] md:text-[32px] md:leading-[40px] font-semibold text-secondary">
                Our Story
              </h2>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface">
                Malawi Bloom began as a small patch of soil in the heart of Lilongwe. We envisioned a space where the vibrant, natural beauty of Malawi could be cultivated and shared. Our journey is rooted in a deep appreciation for the unique flora that thrives in our rich, sun-drenched earth.
              </p>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface">
                From our humble beginnings, we have grown into a beloved local institution, partnering with skilled Malawian botanists and gardeners. Every flower we nurture is a testament to the resilience and vibrancy of our community. We don't just grow flowers; we cultivate joy, connection, and a tangible piece of the 'Warm Heart of Africa'.
              </p>
            </div>
            <div className="order-1 md:order-2 rounded-xl overflow-hidden shadow-md">
              <Image
                className="w-full h-[400px] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxOnmGdeuRhBDoMcsmt6dUYXrqyhbUqgoE8XMWsDOvO1XWaDWM7mWnekxS-FfX180deqCMs_wOL0D39R1lYqPQymTIbVQIxeu3oZRawSvgyNhxw3P7S2jeCzk6M9Y59R4NdKZ13fTdiT4FYWQYeoyTusvDwCi6eyiBffHUGIh3dJ55JJE2n3KF0oC6rdvNVniueBlDTl7bwsbCWyQ1OJiXWgAT7wKGg_8JBkX5Qeu3ONRMzhjgGrdm"
                alt="A close-up, high-resolution lifestyle photograph of hands gently planting a bright orange Flame Tree sapling in rich, dark soil"
                fill
                unoptimized={true}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-[32px] px-[20px] max-w-3xl mx-auto text-center my-[32px]">
          <span className="material-symbols-outlined text-[64px] text-tertiary mb-[16px] block" style={{ fontVariationSettings: "'FILL' 1" }}>
            favorite
          </span>
          <h2 className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] md:text-[32px] md:leading-[40px] font-semibold text-secondary mb-[32px]">
            Our Mission
          </h2>
          <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] text-on-surface mb-[32px]">
            To weave the natural splendor of Malawi into the fabric of everyday moments. We strive to provide premium, locally grown blooms that celebrate the rich heritage and warmth of our country, delivering not just flowers, but a heartfelt connection with every arrangement.
          </p>
          <Link
            className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-6 py-3 rounded-full font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold uppercase hover:bg-secondary-container transition-colors shadow-sm hover:shadow-md"
            href="/flowers"
          >
            <span>View Our Collections</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </section>

        {/* Values Section */}
        <section className="py-[32px] px-[20px] max-w-7xl mx-auto">
          <h2 className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] md:text-[32px] md:leading-[40px] font-semibold text-secondary mb-[32px] text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {/* Quality */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary-container text-on-secondary-container rounded-full flex-shrink-0">
                  <span className="material-symbols-outlined">stars</span>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface mb-2">
                    Quality
                  </h3>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] text-on-surface-variant">
                    Every bloom is hand-selected and carefully cultivated to meet the highest standards of beauty and freshness.
                  </p>
                </div>
              </div>
            </div>

            {/* Sustainability */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary-container text-on-secondary-container rounded-full flex-shrink-0">
                  <span className="material-symbols-outlined">eco</span>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface mb-2">
                    Sustainability
                  </h3>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] text-on-surface-variant">
                    We practice sustainable farming techniques that honor Malawi's natural environment and support local communities.
                  </p>
                </div>
              </div>
            </div>

            {/* Community */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary-container text-on-secondary-container rounded-full flex-shrink-0">
                  <span className="material-symbols-outlined">group</span>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface mb-2">
                    Community
                  </h3>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] text-on-surface-variant">
                    We invest in our community by creating jobs, supporting local artisans, and celebrating Malawi's unique culture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-[32px] px-[20px] grid grid-cols-1 md:grid-cols-3 gap-[16px] mx-auto bg-surface-container-highest border-t border-outline-variant mt-[32px]">
        <div className="space-y-[16px]">
          <div className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-secondary">
            Malawi Bloom
          </div>
          <p className="font-[family-name:var(--font-be-vietnam)] text-on-surface-variant">
            © 2024 Malawi Bloom. Warmly grown in Lilongwe.
          </p>
          <div className="flex gap-4">
            <button className="text-on-surface-variant hover:text-secondary transition-colors">
              <span className="material-symbols-outlined">face_nod</span>
            </button>
            <button className="text-on-surface-variant hover:text-secondary transition-colors">
              <span className="material-symbols-outlined">photo_camera</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[16px]">
          <div className="space-y-2">
            <h5 className="font-bold text-on-surface text-sm uppercase tracking-wider mb-4">Explore</h5>
            <Link
              className="block text-on-surface-variant hover:text-secondary hover:underline transition-colors font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold"
              href="/contact"
            >
              Contact Us
            </Link>
            <Link
              className="block text-on-surface-variant hover:text-secondary hover:underline transition-colors font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold"
              href="#"
            >
              WhatsApp Support
            </Link>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-on-surface text-sm uppercase tracking-wider mb-4">Local</h5>
            <Link
              className="block text-on-surface-variant hover:text-secondary hover:underline transition-colors font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold"
              href="#"
            >
              Lilongwe Store
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
