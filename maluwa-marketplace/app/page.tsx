import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-[20px] py-[4px] max-w-7xl mx-auto bg-surface shadow-sm">
        <div className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] font-semibold text-primary md:text-[32px] md:leading-[40px]">
          Malawi Bloom
        </div>
        <nav className="hidden md:flex gap-[16px] items-center">
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-primary border-b-2 border-primary hover:text-primary-container transition-colors"
            href="#"
          >
            Home
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-primary-container transition-colors"
            href="#"
          >
            Categories
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-primary-container transition-colors"
            href="#"
          >
            Orders
          </Link>
        </nav>
        <div className="flex items-center gap-[16px]">
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all active:scale-95">
            shopping_cart
          </button>
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all active:scale-95">
            account_circle
          </button>
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
                    placeholder="Search for roses, lilies, or 'chikondi'..."
                    type="text"
                  />
                </div>
                <button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-primary-container transition-all active:scale-95">
                  Gula
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px]">
            {/* Valentines */}
            <Link
              className="group bg-surface-container hover:bg-primary-container hover:text-on-primary-container transition-all p-[32px] rounded-2xl flex flex-col items-center text-center shadow-sm"
              href="#"
            >
              <div className="bg-primary-container text-on-primary-container w-16 h-16 rounded-full flex items-center justify-center mb-[16px] group-hover:bg-surface group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  favorite
                </span>
              </div>
              <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold">
                Valentine&apos;s
              </span>
            </Link>
            {/* Weddings */}
            <Link
              className="group bg-surface-container hover:bg-secondary-container hover:text-on-secondary-container transition-all p-[32px] rounded-2xl flex flex-col items-center text-center shadow-sm"
              href="#"
            >
              <div className="bg-secondary-container text-on-secondary-container w-16 h-16 rounded-full flex items-center justify-center mb-[16px] group-hover:bg-surface group-hover:text-secondary transition-colors">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  celebration
                </span>
              </div>
              <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold">
                Weddings
              </span>
            </Link>
            {/* Funerals */}
            <Link
              className="group bg-surface-container hover:bg-surface-dim transition-all p-[32px] rounded-2xl flex flex-col items-center text-center shadow-sm"
              href="#"
            >
              <div className="bg-on-surface-variant/10 text-on-surface-variant w-16 h-16 rounded-full flex items-center justify-center mb-[16px] group-hover:bg-surface transition-colors">
                <span className="material-symbols-outlined text-3xl">filter_vintage</span>
              </div>
              <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold">
                Memorials
              </span>
            </Link>
            {/* Birthdays */}
            <Link
              className="group bg-surface-container hover:bg-tertiary-container hover:text-on-tertiary-container transition-all p-[32px] rounded-2xl flex flex-col items-center text-center shadow-sm"
              href="#"
            >
              <div className="bg-tertiary-container text-on-tertiary-container w-16 h-16 rounded-full flex items-center justify-center mb-[16px] group-hover:bg-surface group-hover:text-tertiary transition-colors">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  cake
                </span>
              </div>
              <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold">
                Birthdays
              </span>
            </Link>
            {/* Anniversary */}
            <Link
              className="group bg-surface-container hover:bg-primary-container hover:text-on-primary-container transition-all p-[32px] rounded-2xl flex flex-col items-center text-center shadow-sm"
              href="#"
            >
              <div className="bg-primary-container text-on-primary-container w-16 h-16 rounded-full flex items-center justify-center mb-[16px] group-hover:bg-surface group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  card_giftcard
                </span>
              </div>
              <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold">
                Anniversary
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
              <Link className="text-primary font-bold hover:underline" href="#">
                View All Bloom
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-[16px] h-auto md:h-[600px]">
              {/* Large Featured Card */}
              <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl shadow-lg bg-surface">
                <Image
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuARNLazUCyZM3fYjdHoIMpdpp49FNd75Oa0X9rIDB5A4RkYqcaeTza8IN0yQr-v9kWsw9scgxJPYvmoofGd8jC1hsid4-lTKX3-CBEvS_8OiWqm_PYGAeo2YUVTAjXBebGCJlv4S-sVkDzwbLKEONKPLUPM11oTOQJx37OiZ58lpb-1MR8Ofnqd65TMd7BvDNSjbBRnnqm5lf_Iia54AuRRQ9Qak1l7uKC8Vg8cLJCaL5vDqAV7xhvKXjjscAdv9uGW5EsjH89Yn0M"
                  alt="Malawi-grown bouquet featuring Flame Tree blossoms and Proteas"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-[32px] bg-gradient-to-t from-black/80 to-transparent text-white">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="inline-block px-3 py-1 bg-tertiary text-on-tertiary rounded-full text-[10px] uppercase font-bold tracking-widest mb-2">
                        Flame Tree Series
                      </span>
                      <h3 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-white">
                        Zomba Mountain Radiance
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-[family-name:var(--font-source-serif)] font-bold">MK 45,000</p>
                      <button className="mt-2 px-6 py-2 bg-primary text-on-primary rounded-full font-bold text-sm">
                        Gula
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Side Card 1 */}
              <div className="relative group overflow-hidden rounded-2xl shadow-lg bg-surface flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <Image
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD2grYnIjLohYrGUa90TeJ0D_8g4naphYYX6Zqn9-Jg2j7662-umATLI_1dLdJ8EBVqxzi4pSLtAIIOgLZJJXPkKD0pWygSOYxgmVkYn7lEbxIuQCiaBDi0tgLokPY6JG-KQYYmbb6_VMaH89h6xk3BSY7K_O0U66y9xdA6OCdxs8Jk94-mvx_dRif3tZ8Vu9KHWV7J9r7l5C6CLHaRu2UGY-CYd70TSCGspWEM-ABNd4YDKFYjAVWjwAqZNtqF9iEvaKfWmUXza4"
                    alt="Delicate white lilies"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
                      Chikondi Lilies
                    </h3>
                    <p className="text-on-surface-variant font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
                      Pure Grace
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-[16px]">
                    <span className="text-primary font-bold">MK 22,500</span>
                    <button className="material-symbols-outlined text-primary-container">add_shopping_cart</button>
                  </div>
                </div>
              </div>

              {/* Side Card 2 */}
              <div className="relative group overflow-hidden rounded-2xl shadow-lg bg-surface flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <Image
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3oEi_7i7S4KvCg7P1pcy_FyIuOlC3szGmw78MJ2IK2fDlBtPCqqvh25FQ9lYX1bLgiupfL6U68wfE4PcizPFXoc5BJEO2zFkQtnGb7FZPTdJIfpiLCabhTK7pORdGH59kLZr1heBMso57Xu-2gYDQv-OGYvt8naDHJhzawZfIyWs28g8WHoOy2m6XimKnInQuTlAv48tC4y2xfHY_skmnTW5ZJQ0o07SYyOrZFqZqVxiFp2G_FzzFcjsWYYTtfNW_NdKYkm2lZzY"
                    alt="Purple bougainvillea arrangement"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
                      Sun-Kissed Petals
                    </h3>
                    <p className="text-on-surface-variant font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
                      Bougainvillea Mix
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-[16px]">
                    <span className="text-primary font-bold">MK 18,000</span>
                    <button className="material-symbols-outlined text-primary-container">add_shopping_cart</button>
                  </div>
                </div>
              </div>
              {/* Bottom Long Card */}
              <div className="md:col-span-2 relative group overflow-hidden rounded-2xl shadow-lg bg-surface-container flex items-center">
                <div className="w-1/3 h-full relative">
                  <Image
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWs9XhW0TvAjZAXMywgpckX50O8qC73KgUFitlsE26F5ufmFueBJXuha2xfX5_zW-nYtC_Fp4nkJDIOg26HedAFkSk-fKJoq8oRaFhgJaizPenisP4iZvMw5fFzx2MwoRx5xfFn8MMG9xFXxw1reh9ike5L8k2XvuLh24c5a441cSh3KstkPKr5j0BlALwkAAvig3AuyY1vMzbfMNZWth_JN0uohuBKejBCRXPNR6hx7Nwgyz1xrRu750291N0BIU_8SxcVz8qJ6w"
                    alt="Yellow wild blooms from Malawian plateau"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="w-2/3 p-[16px]">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                        Same Day Delivery
                      </span>
                      <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
                        The Plateau Sunset
                      </h3>
                      <p className="text-on-surface-variant text-sm mt-1">Lilongwe Direct Bloom</p>
                    </div>
                    <span className="font-[family-name:var(--font-source-serif)] text-primary text-xl font-bold">
                      MK 30,000
                    </span>
                  </div>
                  <button className="mt-4 w-full py-2 border-2 border-secondary text-secondary rounded-lg font-bold hover:bg-secondary hover:text-on-secondary transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Verified Local Sellers */}
        <section className="px-[20px] py-[32px] max-w-7xl mx-auto">
          <div className="text-center mb-[32px]">
            <h2 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface">
              Verified Local Sellers
            </h2>
            <p className="font-[family-name:var(--font-be-vietnam)] text-on-surface-variant">
              Empowering Malawian florists and growers.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-[16px]">
            {/* Seller 1 */}
            <div className="flex items-center gap-4 bg-surface p-4 rounded-xl shadow-sm border border-outline-variant w-full md:w-auto min-w-[280px]">
              <div className="w-14 h-14 rounded-full bg-secondary-container overflow-hidden relative">
                <Image
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeEufok8BGQqf8fMlnGUXdZAuuZ5u9esGQYHr2swG4dM-31CO7I2bJRhOOKkWEGr14EefGjBq1MCZVGf3-JzZTOljCt2G5FiY1pjGiocpAWi8BKvdeGjj4aLKiScX_pL3BzZb7WsRj2Fsp0Mjb8SJvjAg-otnrV9dbsID8e_fbSI3xtEHSYBR_vXi9KrAwmQdL9IwZhntvzOl8zcb4v-TSQkEfy5xovGKLAjRcvYmriogzp15ITTBMNhcCzC6CgT62V94JH90PTW4"
                  alt="Malawian female florist"
                  fill
                  sizes="56px"
                />
              </div>
              <div>
                <h4 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
                  Blantyre Bloom Co.
                </h4>
                <div className="flex items-center gap-1 text-secondary">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
                    Verified Expert
                  </span>
                </div>
              </div>
            </div>
            {/* Seller 2 */}
            <div className="flex items-center gap-4 bg-surface p-4 rounded-xl shadow-sm border border-outline-variant w-full md:w-auto min-w-[280px]">
              <div className="w-14 h-14 rounded-full bg-primary-container overflow-hidden relative">
                <Image
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYGARvXRxqmCYIfcIewlq232ksbaW6j8yG2lkvPd3hTEo3J74Zlqqr4FJrh-37OYi_iIBATWPrYt_S-hZvUsbUrqi1n9W02Rn-ZMTuPQ-5lQwJ2J9rGvSXFhQRZFUOoDzKUbT-IokrMrMt2CdpfnX11IetiZc6YDxiEkHt8HTh_lXtP7BC7ESlTS7mCLZp24uHkYi8eQ6Pdy3_HZPwWnFQxcUhPCZ8nDmIgGOg5lldqrskXrXPskGq9spq5T0drjkNDZe6d04BulU"
                  alt="Malawian flower grower"
                  fill
                  sizes="56px"
                />
              </div>
              <div>
                <h4 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
                  Flame Tree Nurseries
                </h4>
                <div className="flex items-center gap-1 text-secondary">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
                    Verified Grower
                  </span>
                </div>
              </div>
            </div>
            {/* Seller 3 */}
            <div className="flex items-center gap-4 bg-surface p-4 rounded-xl shadow-sm border border-outline-variant w-full md:w-auto min-w-[280px]">
              <div className="w-14 h-14 rounded-full bg-tertiary-container overflow-hidden relative">
                <Image
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzZ94QkShHuFCD_c55MHai-I5uPJB1xtgtHCJvuCW2z_Zsw3QFMa2nuSU9SrOTnFEkcRQ5YUfNAGWmm-MA67GlcJsI-pNMdKzNOT-RaeUCKyjw01HLUo265gMGcN5JOywtSOoPcVd8su_nya0R69KblQcPU-IvF3aznn8eSjgh-iYaVpG4-odLkTkw4qDYLlla9uHWuTb2BSnoGub8p94SHmS-RF1ibrnZb121yhRvMv_XOmahJb9QwZ9TaEC_AVYSLv99vlVzZxg"
                  alt="Young Malawian woman florist"
                  fill
                  sizes="56px"
                />
              </div>
              <div>
                <h4 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
                  Lilongwe Petals
                </h4>
                <div className="flex items-center gap-1 text-secondary">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
                    Verified Boutique
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-[32px] px-[20px] grid grid-cols-1 md:grid-cols-3 gap-[16px] max-w-7xl mx-auto bg-surface-container-highest border-t border-outline-variant mt-[32px]">
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
          className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 transition-all active:scale-90 duration-150"
          href="#"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
            Gula
          </span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all"
          href="#"
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
