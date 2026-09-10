"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/lib/services/authService";
import { notificationService } from "@/lib/services/notificationService";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState<"en" | "ny">("en");

  // Redirect if already logged in
  useEffect(() => {
    const currentUser = authService.getUser();
    if (currentUser) {
      if (currentUser.isVendor) {
        router.replace("/seller");
      } else {
        const destination = redirectUrl !== "/" ? redirectUrl : "/buyer/orders";
        router.replace(destination);
      }
    }
  }, [router, redirectUrl]);

  // Seller detection based on email domain
  const SELLER_EMAIL_DOMAINS = ["seller@malawiblooms.mw", "admin@malawiblooms.mw", "vendor@malawiblooms.mw"];
  
  const isSellerEmail = (email: string) => {
    return SELLER_EMAIL_DOMAINS.some(domain => email.toLowerCase().includes(domain)) ||
           email.toLowerCase().endsWith("@malawiblooms.seller");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Clear any existing active session first to avoid state pollution
    authService.logout();

    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      // Check if seller email
      if (isSellerEmail(formData.email)) {
        if (response.user.isVendor) {
          notificationService.success("Welcome back, seller!");
          router.push("/seller");
        } else {
          setError("This email is registered as a buyer. Sellers must use a seller account.");
          authService.logout();
          return;
        }
      } else {
        // Regular buyer
        if (response.user.isVendor) {
          setError("Seller accounts cannot access buyer checkout. Use /seller dashboard instead.");
          authService.logout();
          return;
        }
        notificationService.success("Welcome back!");
        const destination = redirectUrl !== "/" ? redirectUrl : "/buyer/orders";
        router.push(destination);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Redirect to Google OAuth endpoint
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
    const redirectUri = `${window.location.origin}/api/auth/google/callback`;
    const scope = "openid profile email";
    
    if (!clientId) {
      notificationService.error("Google Sign-In is not configured. Please use email/password.");
      return;
    }
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
  };

  const handleFacebookSignIn = () => {
    // Redirect to Facebook OAuth endpoint
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "";
    const redirectUri = `${window.location.origin}/api/auth/facebook/callback`;
    
    if (!appId) {
      notificationService.error("Facebook Sign-In is not configured. Please use email/password.");
      return;
    }
    
    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=email,public_profile`;
    window.location.href = authUrl;
  };

  const content = {
    en: {
      title: "Welcome back",
      subtitle: "Sign in to your Malawi Bloom account",
      identifierLabel: "Email or Phone",
      identifierPlaceholder: "kwacha@example.mw or +265 888 000 000",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      forgotPassword: "Forgot Password?",
      signInButton: "Sign In",
      orDivider: "Or continue with",
      noAccount: "No account yet?",
      heroTitle: "Your Blooms Await",
      heroSubtitle: "Access your floral marketplace and continue your journey.",
    },
    ny: {
      title: "Takulandirani",
      subtitle: "Lowani ku akaunti yanu ya Malawi Bloom",
      identifierLabel: "Imelo kapena Foni",
      identifierPlaceholder: "kwacha@example.mw kapena +265 888 000 000",
      passwordLabel: "Chinsinsi",
      passwordPlaceholder: "••••••••",
      forgotPassword: "Mwayiwala Chinsinsi?",
      signInButton: "Lowani",
      orDivider: "Kapena pitirizani ndi",
      noAccount: "Mulibe akaunti?",
      createAccount: "Pangani tsopano",
      heroTitle: "Maluwa Anu Akukudikirani",
      heroSubtitle: "Lowani m'msika wanu wa maluwa ndipo pitirizani ulendo wanu.",
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden flex justify-between items-center px-[20px] py-[12px] bg-surface shadow-sm border-b border-outline-variant">
        <button
          onClick={() => router.push(redirectUrl)}
          className="text-primary hover:text-primary/80 transition-colors"
          aria-label="Go back"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <span className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
          Malawi Bloom
        </span>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-[24px]">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="fixed top-[60px] left-0 right-0 z-40 md:hidden bg-surface border-b border-outline-variant shadow-md">
          <div className="flex flex-col p-4 space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 text-primary font-semibold hover:bg-primary/10 rounded transition-colors"
            >
              Home
            </Link>
            <Link
              href="/flowers"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 text-on-surface-variant font-semibold hover:bg-surface-container-high rounded transition-colors"
            >
              Shop
            </Link>
            <button
              onClick={() => {
                notificationService.info("Contact us at support@malawiblooms.mw or WhatsApp +265 888 000 000");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-on-surface-variant font-semibold hover:bg-surface-container-high rounded transition-colors"
            >
              Contact Us
            </button>
          </div>
        </nav>
      )}

      <div className="flex-1 flex items-center justify-center p-0 md:p-[16px] pt-[120px] md:pt-0">
        <main className="w-full h-full min-h-screen md:min-h-0 md:max-w-6xl md:h-[800px] bg-surface rounded-none md:rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Image Column (Split Screen) */}
        <section className="hidden md:block md:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdUr5np1uPGS_Lk2g0Z4SClOC-HVeS1fp6BnrFEp3LqkXtptkJWsT10LZCK6uqZNyIgV9kuwPVE4B4kmasaI43MbuIIIh9rJpelPsMX3TIKgPJ6uFmbdlFMyKCWpbDhwi7-AIi7XKtoG_2uqo5K19OKrwCX2fbAa8R9_YGry2kXllrQZKcaSvsuoY9jtW5XTh0IMHzYRxROpWBAr7xzH_OQuGFrAQjUjZyuGb9dCI2xbdp8JW3wKkjyaGnvRA88paE4Ifb70P65sc"
              alt="Malawian Protea flowers and orange flame tree blossoms"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent flex flex-col justify-end p-[32px]">
            <h1 className="font-[family-name:var(--font-source-serif)] text-[48px] leading-[56px] font-bold text-white mb-[4px]">
              {t.heroTitle}
            </h1>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[18px] leading-[28px] text-white/90">
              {t.heroSubtitle}
            </p>
          </div>
        </section>

        {/* Form Column */}
        <section className="w-full md:w-1/2 flex flex-col bg-surface p-[20px] md:p-[32px] overflow-y-auto">
          {/* Language Toggle */}
          <div className="flex justify-end mb-[16px]">
            <div className="inline-flex items-center gap-1 bg-surface-container rounded-full p-1">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-4 py-2 rounded-full font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] font-semibold transition-all ${
                  language === "en"
                    ? "bg-primary text-white"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage("ny")}
                className={`px-4 py-2 rounded-full font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] font-semibold transition-all ${
                  language === "ny"
                    ? "bg-primary text-white"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                Chichewa
              </button>
            </div>
          </div>

          {/* Header/Logo Area */}
          <div className="flex flex-col items-center md:items-start mb-[32px]">
            <span className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] font-semibold text-primary mb-[4px]">
              Malawi Bloom
            </span>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
              {t.title}
            </h2>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant">
              {t.subtitle}
            </p>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-[16px] flex-grow">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-error/10 border border-error rounded-lg">
                <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] text-error">
                  {error}
                </p>
              </div>
            )}

            {/* Email */}
            <div className="space-y-[4px]">
              <label
                htmlFor="email"
                className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant block"
              >
                {t.identifierLabel}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                  person
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-lg font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder={t.identifierPlaceholder}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-[4px]">
              <label
                htmlFor="password"
                className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant block"
              >
                {t.passwordLabel}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                  lock
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-white border border-outline-variant rounded-lg font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder={t.passwordPlaceholder}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                href="#"
                className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] text-primary font-bold hover:underline"
              >
                {t.forgotPassword}
              </Link>
            </div>

            {/* Actions */}
            <div className="pt-[16px] flex flex-col gap-[16px]">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-white font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold rounded-full shadow-md hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : t.signInButton}
              </button>
              <div className="flex items-center justify-center gap-2">
                <span className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant">
                  {t.noAccount}
                </span>
                <Link
                  href="/sign-up"
                  className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-primary font-bold hover:underline"
                >
                  {language === "en" ? "Sign Up" : "Pangani tsopano"}
                </Link>
              </div>
            </div>
          </form>

          {/* Social Login Section */}
          <div className="mt-[32px] flex flex-col items-center gap-[16px] border-t border-outline-variant pt-[24px]">
            <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] text-on-surface-variant">
              {t.orDivider}
            </p>
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-outline-variant rounded-full font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] font-semibold text-on-surface hover:bg-surface-container-high transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={handleFacebookSignIn}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#1877F2] border-2 border-[#1877F2] rounded-full font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] font-semibold text-white hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </section>
      </main>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
