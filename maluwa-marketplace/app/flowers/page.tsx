import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Malawi Bloom | Bloom Catalog",
  description: "Browse our collection of fresh Malawian flowers and bouquets",
};

export default function FlowersCatalog() {
  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-[20px] py-[4px] max-w-7xl mx-auto bg-surface shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] font-semibold text-primary md:text-[32px] md:leading-[40px]">
            Malawi Bloom
          </h1>
          <nav className="hidden md:flex gap-6 ml-8">
            <Link
              className="text-primary border-b-2 border-primary font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold py-2"
              href="/"
            >
              Gula
            </Link>
            <Link
              className="text-on-surface-variant font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:text-primary-container transition-colors py-2"
              href="/flowers"
            >
              Categories
            </Link>
            <Link
              className="text-on-surface-variant font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:text-primary-container transition-colors py-2"
              href="#"
            >
              Contact Us
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-[20px] flex-1 justify-end">
          <div className="relative hidden sm:flex items-center w-full max-w-xs ml-4">
            <input
              className="w-full pl-10 pr-4 py-2 rounded-full border-none bg-surface-container shadow-sm focus:ring-2 focus:ring-primary text-[16px] leading-[24px]"
              placeholder="Find your perfect bouquet..."
              type="text"
            />
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant">
              search
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-all">
              <span className="material-symbols-outlined text-primary">shopping_cart</span>
            </button>
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-all">
              <span className="material-symbols-outlined text-primary">account_circle</span>
            </button>
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
                />
                <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant group-hover:text-primary transition-colors">
                  Funerals (Maliro)
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-outline text-primary focus:ring-primary"
                  type="checkbox"
                />
                <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant group-hover:text-primary transition-colors">
                  Weddings (Zaukwati)
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-outline text-primary focus:ring-primary"
                  type="checkbox"
                />
                <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant group-hover:text-primary transition-colors">
                  Home (Pakhomo)
                </span>
              </label>
            </div>
          </div>
          <hr className="border-outline-variant" />
          <div>
            <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface mb-4">
              Flower Type
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-outline text-primary focus:ring-primary"
                  type="checkbox"
                />
                <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant group-hover:text-primary">
                  Flame Tree Blooms
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-outline text-primary focus:ring-primary"
                  type="checkbox"
                />
                <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant group-hover:text-primary">
                  Proteas
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-outline text-primary focus:ring-primary"
                  type="checkbox"
                />
                <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant group-hover:text-primary">
                  Wild Lilies
                </span>
              </label>
            </div>
          </div>
          <hr className="border-outline-variant" />
          <div>
            <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface mb-4">
              Price Range
            </h3>
            <div className="flex flex-col gap-2">
              <input
                className="w-full accent-primary"
                max="100000"
                min="5000"
                step="5000"
                type="range"
              />
              <div className="flex justify-between font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                <span>K5,000</span>
                <span>K100k+</span>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 bg-primary text-on-primary py-3 rounded-lg font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold uppercase tracking-wider hover:opacity-90 transition-all">
            Apply Filters
          </button>
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
              32 Results
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

          {/* Product Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
            {/* Product Card 1 */}
            <div className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7e_q-iRmlnDD_M9ZLzjddHBnul0wo2iSqC9ABm9ThnPYj63v7H2yJ9-RtPIx5kWlKzBlXvz9_gpkazLli-XoYvyQKFIqj1yQGZ-8rGzGWY-QSNNajynszs5BNCDt1dwOag67V00cdWSxZYsu9U4ybiGa7rdyACfyP8Ol9IVaKmrqwUbWU_SmDKyvQJTz8msMHy8-w8cWC5JiKVVQMJufHZcMaw7v150XIPPZNK6i0dKOfpbDvuLovRmVHVL-2_lL0JdQk4xaBib0"
                  alt="Luxurious bouquet of deep orange Malawian Flame Tree flowers"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full font-[family-name:var(--font-be-vietnam)] text-[10px] uppercase">
                    In Season
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-secondary-container text-on-secondary-container px-2 py-1 rounded flex items-center gap-1 font-[family-name:var(--font-be-vietnam)] text-[10px]">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  In Stock
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface group-hover:text-primary transition-colors">
                      Flame Radiance
                    </h3>
                    <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant italic">
                      Maluwa a Moto
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
                    K18,500
                  </span>
                </div>
                <p className="font-[family-name:var(--font-be-vietnam)] text-on-surface-variant mb-4 line-clamp-2">
                  A vibrant burst of local energy featuring our signature Flame Tree blooms and desert lilies.
                </p>
                <button className="w-full flex justify-center items-center gap-2 bg-primary text-on-primary py-3 rounded-lg font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:brightness-90 transition-all">
                  <span className="material-symbols-outlined text-[18px]">shopping_basket</span>
                  Gula Tsopano
                </button>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA48dr-DKAzmu0nX60fazFmNZtnDQDK8MEhtgWfWcJVvJQ4aW0TYx4YZv9fgdQh7kQOiIi3r_NR1anIhN3K3cToWZOVfi5or68BISNMBMPOMTVFwg5I_AjMN8LDXyrdGCmtgUMYrIsJtG8P6Z7ncMcWhKdqboahpuTkHpfTcIK2WALlWrLRHVI_kZ5TRLRg_AxmhW5qHtditjsXZbgv--cFIR8y_ItJwsi3mVGCVPUR0Ib220U8D1OVNEhqlr9CE3B2S_c5QhY0Cbw"
                  alt="Elegant funeral arrangement featuring white proteas and lilies"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full font-[family-name:var(--font-be-vietnam)] text-[10px] uppercase">
                    Respectful
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-secondary-container text-on-secondary-container px-2 py-1 rounded flex items-center gap-1 font-[family-name:var(--font-be-vietnam)] text-[10px]">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  In Stock
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
                      Zikomo Serenety
                    </h3>
                    <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant italic">
                      Chitonthozo
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
                    K25,000
                  </span>
                </div>
                <p className="font-[family-name:var(--font-be-vietnam)] text-on-surface-variant mb-4 line-clamp-2">
                  A dignified collection of white lilies and silver leaf proteas for moments of remembrance.
                </p>
                <button className="w-full flex justify-center items-center gap-2 bg-primary text-on-primary py-3 rounded-lg font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:brightness-90 transition-all">
                  <span className="material-symbols-outlined text-[18px]">shopping_basket</span>
                  Gula Tsopano
                </button>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuSgi-7qg9rRrO0deBqDmgRiLD7n8tE3i023cLaYWEm8cW-8eS1TpwhArD_hr3Cqa2G09e4On-SpuU1tAxWAqFsnzGLYSFsILzELHXyBgA3j_pd1v6oxo5DYtmuw1zLi2wXIABJQnD91g56B3HuDCJ5xOsRyx8gIPp2-fEIW_G6NmPj94w_qSMV8gvX_nJ_K4cvOIB8FcjpEz-vnULTsZG7pfyxkGRrSEs8RofLslnsBQNXZWGPa7xsJIlfe53lL8se_woxo5rF2o"
                  alt="Bright and cheerful bouquet featuring yellow wild sunflowers"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute bottom-3 right-3 bg-secondary-container text-on-secondary-container px-2 py-1 rounded flex items-center gap-1 font-[family-name:var(--font-be-vietnam)] text-[10px]">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  In Stock
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
                      Golden Hour
                    </h3>
                    <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant italic">
                      M&apos;mawa Wabwino
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
                    K15,000
                  </span>
                </div>
                <p className="font-[family-name:var(--font-be-vietnam)] text-on-surface-variant mb-4 line-clamp-2">
                  Bring the warmth of the Malawian sun indoors with this vibrant yellow and green display.
                </p>
                <button className="w-full flex justify-center items-center gap-2 bg-primary text-on-primary py-3 rounded-lg font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:brightness-90 transition-all">
                  <span className="material-symbols-outlined text-[18px]">shopping_basket</span>
                  Gula Tsopano
                </button>
              </div>
            </div>

            {/* Product Card 4 */}
            <div className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsOtJxe1KYf8Htk6td8eiYpqNHwWIfdfvVlZKx3W7P9LKhAWM62gofAL7AeDXHVu23_XhVLjZ1fIe5xJPvgwp27Fbg3F-ZxoNsO7UQ1CioCxr42FxaZqOYf19Fnrmdj0kzu2V5j1Lm_YFCsROcFW8YRp8CAYzgABqxzoq_EpySfofObZqoc-l0kvnAQj3z_Is3BObUnF8Gle9YV0Myxcx_Zxn5KlX7uR1_iQEpLY8qrSLCgMm9bminl2nR8yypTJHPsZedNMAi7pI"
                  alt="Stunning pink and purple exotic orchids wedding centerpiece"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-[family-name:var(--font-be-vietnam)] text-[10px] uppercase">
                    Wedding Fav
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-secondary-container text-on-secondary-container px-2 py-1 rounded flex items-center gap-1 font-[family-name:var(--font-be-vietnam)] text-[10px]">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  In Stock
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
                      Ukwati Elegance
                    </h3>
                    <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant italic">
                      Zaukwati
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
                    K45,000
                  </span>
                </div>
                <p className="font-[family-name:var(--font-be-vietnam)] text-on-surface-variant mb-4 line-clamp-2">
                  Our most requested wedding arrangement featuring rare orchids and hand-tied ribbons.
                </p>
                <button className="w-full flex justify-center items-center gap-2 bg-primary text-on-primary py-3 rounded-lg font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:brightness-90 transition-all">
                  <span className="material-symbols-outlined text-[18px]">shopping_basket</span>
                  Gula Tsopano
                </button>
              </div>
            </div>

            {/* Product Card 5 */}
            <div className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlTJU62iGZN3KsR-uTVWPjVNn34qFWhjIpQdrKrhdBS7jokD5m2tNuOHtgfHoOUievhzXthU9ccnFB6Z8dF6yhSXycSON7SWEcH6dZLkCWD85Pu0a_3gykvC94HXQ0I_PYl5k9Ln1c0GRFKc5vqHQPTysFCBgKnhlYaur1wG7sOvrf_TIX4nyF8sCanxnpFid45i5iyHSlwvj4Y-E2wnN_th1-0Daq_tQrkfliC6t4TAqFzCb-mPE1MGH4pYUIV54jS2WDQj9UENQ"
                  alt="Romantic arrangement of deep red roses in rustic woven basket"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute bottom-3 right-3 bg-secondary-container text-on-secondary-container px-2 py-1 rounded flex items-center gap-1 font-[family-name:var(--font-be-vietnam)] text-[10px]">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  In Stock
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
                      Lake Rose Basket
                    </h3>
                    <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant italic">
                      Chikondi
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
                    K32,000
                  </span>
                </div>
                <p className="font-[family-name:var(--font-be-vietnam)] text-on-surface-variant mb-4 line-clamp-2">
                  Hand-woven basket filled with deep velvet roses for your special someone.
                </p>
                <button className="w-full flex justify-center items-center gap-2 bg-primary text-on-primary py-3 rounded-lg font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:brightness-90 transition-all">
                  <span className="material-symbols-outlined text-[18px]">shopping_basket</span>
                  Gula Tsopano
                </button>
              </div>
            </div>

            {/* Product Card 6 */}
            <div className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEnxtiaedjU6G4clcRtogG4JMVWljWbyD6qNZpeq0KxVsbGLDyRVeygBE0j-ypA-DvQw7G6MagkoKiHUyNN5wovbX5t5FVZIdI1vIZGXgp1gOaiMamhMtP1UCfob5K_M_IsHl8MITHhASlNtWPz1jtodbv8dYSG0yMpxPQ24oKgzkyyVbwN_RyvdzlPOGp8hpV-fdOtl1Jy3ilPVthipYGJt2tqbXmziAWKpOjs82h0OmY8COGCsP0NW_TOQZXwuAlDN47nbM5wRc"
                  alt="Wild and colorful meadow-style bouquet of Malawian wildflowers"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute bottom-3 right-3 bg-secondary-container text-on-secondary-container px-2 py-1 rounded flex items-center gap-1 font-[family-name:var(--font-be-vietnam)] text-[10px]">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  In Stock
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
                      Zomba Wildflower
                    </h3>
                    <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant italic">
                      Maluwa a m&apos;thengo
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
                    K12,500
                  </span>
                </div>
                <p className="font-[family-name:var(--font-be-vietnam)] text-on-surface-variant mb-4 line-clamp-2">
                  A wild, free-spirited arrangement inspired by the Zomba Plateau meadows.
                </p>
                <button className="w-full flex justify-center items-center gap-2 bg-primary text-on-primary py-3 rounded-lg font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:brightness-90 transition-all">
                  <span className="material-symbols-outlined text-[18px]">shopping_basket</span>
                  Gula Tsopano
                </button>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-[32px] flex justify-center items-center gap-4">
            <button className="p-2 border border-outline-variant rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="flex gap-2">
              <span className="w-10 h-10 flex items-center justify-center bg-primary text-on-primary rounded-full font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
                1
              </span>
              <button className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high rounded-full font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high rounded-full font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
                3
              </button>
            </div>
            <button className="p-2 border border-outline-variant rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-[32px] px-[20px] grid grid-cols-1 md:grid-cols-3 gap-[16px] max-w-7xl mx-auto bg-surface-container-highest border-t border-outline-variant mt-[32px]">
        <div className="flex flex-col gap-4">
          <h2 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
            Malawi Bloom
          </h2>
          <p className="font-[family-name:var(--font-be-vietnam)] text-on-surface-variant max-w-xs">
            Connecting the Warm Heart of Africa through the language of petals and beauty.
          </p>
          <div className="flex gap-4">
            <Link className="text-on-surface-variant hover:text-secondary" href="#">
              <span className="material-symbols-outlined">language</span>
            </Link>
            <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant self-center">
              Chichewa / English
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <h4 className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface font-bold">
              Quick Links
            </h4>
            <Link
              className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary hover:underline transition-colors"
              href="#"
            >
              Contact Us
            </Link>
            <Link
              className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary hover:underline transition-colors"
              href="#"
            >
              WhatsApp Support
            </Link>
            <Link
              className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary hover:underline transition-colors"
              href="#"
            >
              Shipping Policy
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface font-bold">
              Community
            </h4>
            <Link
              className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary hover:underline transition-colors"
              href="#"
            >
              Chichewa Guide
            </Link>
            <Link
              className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary hover:underline transition-colors"
              href="#"
            >
              Local Growers
            </Link>
            <Link
              className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-secondary hover:underline transition-colors"
              href="#"
            >
              Gift Cards
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface font-bold">
            Newsletter
          </h4>
          <div className="flex gap-2">
            <input
              className="flex-1 bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary"
              placeholder="Email"
              type="email"
            />
            <button className="bg-secondary text-on-secondary px-4 py-2 rounded-lg font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold uppercase">
              Join
            </button>
          </div>
          <p className="text-[12px] font-[family-name:var(--font-be-vietnam)] text-on-surface-variant">
            © 2024 Malawi Bloom. The Warm Heart of Africa in Every Petal.
          </p>
        </div>
      </footer>

      {/* Mobile Bottom NavBar */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe md:hidden bg-surface-container shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-xl">
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all"
          href="/"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            Gula
          </span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 scale-90"
          href="/flowers"
        >
          <span className="material-symbols-outlined">local_florist</span>
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            Categories
          </span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all"
          href="#"
        >
          <span className="material-symbols-outlined">shopping_basket</span>
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            Cart
          </span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all"
          href="#"
        >
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            Orders
          </span>
        </Link>
      </nav>
    </>
  );
}
