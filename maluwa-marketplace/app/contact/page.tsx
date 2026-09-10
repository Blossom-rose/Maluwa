"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { notificationService } from "@/lib/services/notificationService";
import { contactService } from "@/lib/services/contactService";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.message) {
      notificationService.warning("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await contactService.sendMessage({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject || undefined,
        message: formData.message,
      });

      if (response.success) {
        notificationService.success("Message sent successfully! We'll get back to you soon.");
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        notificationService.error(response.message || "Failed to send message");
      }
    } catch (err: any) {
      console.error("Error sending message:", err);
      notificationService.error(
        err.response?.data?.message || "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-secondary border-b-2 border-secondary hover:text-primary-container transition-colors"
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-primary-container transition-colors"
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
        <section className="relative min-h-[400px] flex items-center overflow-hidden rounded-xl mx-[20px] mt-[20px]">
          <div className="absolute inset-0 z-0">
            <Image
              className="w-full h-full object-cover opacity-30"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAksZrhIupNAcuqz23q0qFS6XqRcP87oUcPJUSS1OUu7CrMTWlfb-egwLzo9XzIIuOjhv4p16d0CUbFqIT_3QV4sgDn0m5CXz2IRZrxH4jQN-EHNSOWeCsogHO5EWFV9hImduhNT2Lzpk6ci8k0FS-ZGFmlppqUxnSooIlw_u8ErFp8-Q-lCjTerFIS7wrmDnPaIKUHUiA08iW9JtVaPzmhE_4cj35e2Aq8VKY3RX6iQR11DgXVkOF"
              alt="A lush, high-resolution close-up photograph of vibrant orange Malawian proteas and lilies in full bloom"
              fill
              unoptimized={true}
              sizes="100vw"
            />
          </div>
          <div className="relative z-10 py-16 px-4 bg-gradient-to-t from-surface to-transparent w-full text-center">
            <h1 className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] md:text-[32px] md:leading-[40px] font-semibold text-secondary mb-4">
              Get in Touch
            </h1>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant max-w-2xl mx-auto">
              Whether you're looking for the perfect arrangement or have questions about our nursery, our team is here to help bring the joy of gifting and Malawi's natural beauty to you.
            </p>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="max-w-7xl mx-auto px-[20px] py-[32px] grid grid-cols-1 md:grid-cols-2 gap-[32px]">
          {/* Left Column: Contact Information */}
          <div className="flex flex-col gap-[16px]">
            {/* Direct Support */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary-container text-on-secondary-container rounded-full">
                  <span className="material-symbols-outlined">support_agent</span>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface mb-2">
                    Direct Support
                  </h3>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-1">
                    Chat with us on WhatsApp or call.
                  </p>
                  <a
                    className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-secondary font-bold hover:underline block"
                    href="tel:+265881234567"
                  >
                    +265 88 123 456
                  </a>
                </div>
              </div>
            </div>

            {/* Email Us */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary-container text-on-secondary-container rounded-full">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface mb-2">
                    Email Us
                  </h3>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-1">
                    For general inquiries and custom orders.
                  </p>
                  <a
                    className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-secondary font-bold hover:underline block"
                    href="mailto:hello@malawibloom.mw"
                  >
                    hello@malawibloom.mw
                  </a>
                </div>
              </div>
            </div>

            {/* Our Location */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary-container text-on-secondary-container rounded-full">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface mb-2">
                    Our Location
                  </h3>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-1">
                    Lilongwe Nursery
                  </p>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-2">
                    Area 9, Lilongwe, Malawi
                  </p>
                  <div className="inline-flex items-center px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full font-[family-name:var(--font-be-vietnam)] text-[10px] leading-[16px] tracking-[0.05em] font-semibold">
                    Mon-Sat, 8am - 5pm
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Message Form */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/30">
            <h2 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface mb-6">
              Send us a message
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-1"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <input
                    className="w-full rounded-lg border border-outline-variant bg-surface-bright focus:border-secondary focus:ring-2 focus:ring-secondary text-on-surface font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] shadow-sm px-4 py-2"
                    id="fullName"
                    placeholder="Your Name"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-1"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className="w-full rounded-lg border border-outline-variant bg-surface-bright focus:border-secondary focus:ring-2 focus:ring-secondary text-on-surface font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] shadow-sm px-4 py-2"
                    id="email"
                    placeholder="you@example.com"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-1"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    className="w-full rounded-lg border border-outline-variant bg-surface-bright focus:border-secondary focus:ring-2 focus:ring-secondary text-on-surface font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] shadow-sm px-4 py-2"
                    id="phone"
                    placeholder="+265 88..."
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-1"
                    htmlFor="subject"
                  >
                    Subject
                  </label>
                  <input
                    className="w-full rounded-lg border border-outline-variant bg-surface-bright focus:border-secondary focus:ring-2 focus:ring-secondary text-on-surface font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] shadow-sm px-4 py-2"
                    id="subject"
                    placeholder="How can we help?"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label
                  className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-1"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="w-full rounded-lg border border-outline-variant bg-surface-bright focus:border-secondary focus:ring-2 focus:ring-secondary text-on-surface font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] shadow-sm px-4 py-2 resize-none"
                  id="message"
                  placeholder="Write your message here..."
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button
                className="w-full sm:w-auto px-8 py-3 bg-secondary text-on-secondary rounded-lg font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:bg-secondary-container transition-colors shadow-md active:scale-95 transform disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
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
            © 2024 Malawi Bloom. The Warm Heart of Africa in Every Petal.
          </p>
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
        </div>
      </footer>
    </>
  );
}
