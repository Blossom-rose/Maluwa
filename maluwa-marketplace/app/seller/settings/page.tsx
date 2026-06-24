"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const [nurseryProfile, setNurseryProfile] = useState({
    name: "Zomba Mountain Blooms",
    location: "Zomba, Malawi",
    bio: "Specializing in high-altitude Proteas and Flame Trees. We bring the beauty of Zomba Mountain to your doorstep with love and care.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4OIrOewJrNcV_-jU75Kumj5SY-LF1htmArLUtiB9kPmkF-EWcG5B8xP96F3RJDftL5Cj-cQz-RiXDtqux_8LxVAfoT9TOBg4-QyP9-CmnORqJQ9SZf2x3q31UOaeOS7a70GQY5QoqoW7deiHWVbU64U4HYjzHUGZaVdQtXcsNvGVQr5RxIswm-FrJXLcIqCtCQIXFVGqulofZEKKNdgOjCBZZPXN4br26bN8xu5y__0Ahc1pQpRgMAZNw8XkBmBJNwNuyss8UeIc",
  });

  const [payoutSettings, setPayoutSettings] = useState({
    provider: "Airtel Money",
    phoneNumber: "888 123 456",
  });

  const [notifications, setNotifications] = useState({
    smsAlerts: true,
    emailAlerts: false,
    marketing: true,
  });

  const [saveStates, setSaveStates] = useState({
    profile: false,
    payout: false,
    notifications: false,
  });

  const handleSave = (section: "profile" | "payout" | "notifications") => {
    setSaveStates({ ...saveStates, [section]: true });

    setTimeout(() => {
      console.log(`${section} saved:`, 
        section === "profile" ? nurseryProfile : 
        section === "payout" ? payoutSettings : 
        notifications
      );
      setSaveStates({ ...saveStates, [section]: false });
    }, 1500);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 w-full z-40 bg-surface/80 backdrop-blur-md px-[20px] py-[16px] flex justify-between items-center max-w-7xl mx-auto shadow-sm md:shadow-none border-b border-outline-variant/30">
        <div className="flex items-center gap-4">
          <h2 className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] text-primary md:hidden">
            Settings
          </h2>
          <h2 className="hidden md:block font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface">
            Account Settings
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
            notifications
          </button>
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold shadow-sm">
            ZM
          </div>
        </div>
      </header>

      <div className="px-[20px] py-[32px] max-w-4xl mx-auto space-y-10">
        {/* Nursery Profile Section */}
        <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-surface-container">
          <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
            {/* Profile Image */}
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-md relative">
                <Image
                  src={nurseryProfile.image}
                  alt="Nursery Profile"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="128px"
                />
              </div>
              <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="material-symbols-outlined text-white">photo_camera</span>
              </div>
            </div>

            {/* Profile Form */}
            <div className="flex-1">
              <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface mb-1">
                Nursery Profile
              </h3>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant mb-6">
                This information will be displayed publicly to flower lovers across the Warm Heart of Africa.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant px-1">
                      Nursery Name
                    </label>
                    <input
                      type="text"
                      value={nurseryProfile.name}
                      onChange={(e) => setNurseryProfile({ ...nurseryProfile, name: e.target.value })}
                      className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant px-1">
                      Location
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant text-[20px]">
                        location_on
                      </span>
                      <input
                        type="text"
                        value={nurseryProfile.location}
                        onChange={(e) => setNurseryProfile({ ...nurseryProfile, location: e.target.value })}
                        className="w-full bg-surface border border-outline-variant rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant px-1">
                    Bio / Story
                  </label>
                  <textarea
                    value={nurseryProfile.bio}
                    onChange={(e) => setNurseryProfile({ ...nurseryProfile, bio: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] resize-none"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => handleSave("profile")}
                    disabled={saveStates.profile}
                    className="bg-primary text-on-primary font-bold py-3 px-8 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-md disabled:opacity-70 flex items-center gap-2"
                  >
                    {saveStates.profile ? (
                      <>
                        <span className="material-symbols-outlined animate-spin">sync</span>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Payout Settings Section */}
        <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-surface-container">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
                Payout Settings
              </h3>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                How you receive your hard-earned Kwacha.
              </p>
            </div>
          </div>

          <form className="space-y-6">
            <div className="p-4 rounded-xl border-2 border-primary-container/20 bg-primary-container/5 flex items-start gap-4">
              <span className="material-symbols-outlined text-primary-container">info</span>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant">
                We support instant payouts via Mobile Money. Please ensure your number is registered and active.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant px-1">
                  Network Provider
                </label>
                <select
                  value={payoutSettings.provider}
                  onChange={(e) => setPayoutSettings({ ...payoutSettings, provider: e.target.value })}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] appearance-none"
                >
                  <option>Airtel Money</option>
                  <option>TNM Mpamba</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant px-1">
                  Mobile Money Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-on-surface-variant font-bold">+265</span>
                  <input
                    type="tel"
                    value={payoutSettings.phoneNumber}
                    onChange={(e) => setPayoutSettings({ ...payoutSettings, phoneNumber: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-lg pl-16 pr-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => handleSave("payout")}
                disabled={saveStates.payout}
                className="bg-secondary text-on-secondary font-bold py-3 px-8 rounded-full border-2 border-secondary hover:bg-secondary/10 hover:text-secondary transition-all active:scale-95 shadow-sm disabled:opacity-70 flex items-center gap-2"
              >
                {saveStates.payout ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">sync</span>
                    Saving...
                  </>
                ) : (
                  "Save Payout Details"
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Notification Preferences Section */}
        <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-surface-container">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
              <span className="material-symbols-outlined">notifications_active</span>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
                Notification Preferences
              </h3>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                Stay updated on new orders and payouts.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* SMS Alerts */}
            <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-outline-variant/30">
              <div className="flex gap-4 items-center">
                <span className="material-symbols-outlined text-primary">sms</span>
                <div>
                  <p className="font-[family-name:var(--font-source-serif)] text-[16px] leading-[24px] font-semibold text-on-surface">
                    SMS Alerts
                  </p>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                    Receive instant text messages for new orders.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.smsAlerts}
                  onChange={(e) => setNotifications({ ...notifications, smsAlerts: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {/* Email Alerts */}
            <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-outline-variant/30">
              <div className="flex gap-4 items-center">
                <span className="material-symbols-outlined text-primary">mail</span>
                <div>
                  <p className="font-[family-name:var(--font-source-serif)] text-[16px] leading-[24px] font-semibold text-on-surface">
                    Email Alerts
                  </p>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                    Weekly performance summaries and tax invoices.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.emailAlerts}
                  onChange={(e) => setNotifications({ ...notifications, emailAlerts: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {/* Marketing & Tips */}
            <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-outline-variant/30">
              <div className="flex gap-4 items-center">
                <span className="material-symbols-outlined text-primary">campaign</span>
                <div>
                  <p className="font-[family-name:var(--font-source-serif)] text-[16px] leading-[24px] font-semibold text-on-surface">
                    Marketing &amp; Tips
                  </p>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                    Get flower care tips and seasonal sale alerts.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.marketing}
                  onChange={(e) => setNotifications({ ...notifications, marketing: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-8">
            <button
              type="button"
              onClick={() => handleSave("notifications")}
              disabled={saveStates.notifications}
              className="bg-primary text-on-primary font-bold py-3 px-8 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-md disabled:opacity-70 flex items-center gap-2"
            >
              {saveStates.notifications ? (
                <>
                  <span className="material-symbols-outlined animate-spin">sync</span>
                  Saving...
                </>
              ) : (
                "Update Notifications"
              )}
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full py-[32px] px-[20px] grid grid-cols-1 md:grid-cols-3 gap-[16px] max-w-7xl mx-auto border-t border-outline-variant mt-[32px]">
        <div className="space-y-4">
          <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
            Malawi Bloom
          </h3>
          <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant">
            The Warm Heart of Africa in Every Petal.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase tracking-wider">
            Quick Links
          </h4>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant hover:text-secondary hover:underline transition-colors"
            href="#"
          >
            Contact Us
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant hover:text-secondary hover:underline transition-colors"
            href="#"
          >
            WhatsApp Support
          </Link>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant hover:text-secondary hover:underline transition-colors"
            href="#"
          >
            Chichewa Guide
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase tracking-wider">
            Legal
          </h4>
          <Link
            className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant hover:text-secondary hover:underline transition-colors"
            href="#"
          >
            Shipping Policy
          </Link>
          <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mt-4">
            © 2024 Malawi Bloom. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
