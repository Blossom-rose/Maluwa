"use client";
 
import { useState, useEffect } from "react";
import { authService } from "@/lib/services/authService";
import { notificationService } from "@/lib/services/notificationService";
 
export default function SellerSettings() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  // Snapshot of the last-saved values, used to detect unsaved changes
  const [originalData, setOriginalData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
 
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
 
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      notificationService.error("Please fill in all password fields");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      notificationService.error("New password must be at least 6 characters long");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      notificationService.error("New password and confirmation do not match");
      return;
    }
 
    try {
      setIsChangingPassword(true);
      await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      notificationService.success("Password changed successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      notificationService.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };
 
  useEffect(() => {
    let mounted = true;
 
    const loadUser = async () => {
      try {
        // Try fetching fresh user from backend if token exists
        if (authService.isLoggedIn()) {
          const freshUser = await authService.getCurrentUser();
          if (!mounted) return;
          setUser(freshUser);
          const loaded = {
            fullName: freshUser.fullName || "",
            email: freshUser.email || "",
            phone: freshUser.phone || "",
          };
          setFormData(loaded);
          setOriginalData(loaded);
        } else {
          const currentUser = authService.getUser();
          if (currentUser) {
            setUser(currentUser);
            const loaded = {
              fullName: currentUser.fullName || "",
              email: currentUser.email || "",
              phone: currentUser.phone || "",
            };
            setFormData(loaded);
            setOriginalData(loaded);
          }
        }
      } catch (err) {
        console.error("Failed to load user:", err);
        const currentUser = authService.getUser();
        if (currentUser) {
          setUser(currentUser);
          const loaded = {
            fullName: currentUser.fullName || "",
            email: currentUser.email || "",
            phone: currentUser.phone || "",
          };
          setFormData(loaded);
          setOriginalData(loaded);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
 
    loadUser();
 
    return () => {
      mounted = false;
    };
  }, []);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  // True only when the form differs from the last-saved snapshot
  const isDirty =
    formData.fullName !== originalData.fullName ||
    formData.email !== originalData.email ||
    formData.phone !== originalData.phone;
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
 
      // Validate inputs
      if (!formData.fullName.trim()) {
        notificationService.error("Full name is required");
        return;
      }
      if (!formData.email.trim()) {
        notificationService.error("Email is required");
        return;
      }
      if (!formData.phone.trim()) {
        notificationService.error("Phone is required");
        return;
      }
 
      // Update profile
      const updatedUser = await authService.updateProfile(formData);
      setUser(updatedUser);
      // Re-baseline so the button disables again until the next edit
      setOriginalData(formData);
      notificationService.success("Profile updated successfully!");
    } catch (err: any) {
      console.error("Error updating profile:", err);
      notificationService.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };
 
  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[400px]">
        <p className="text-on-surface-variant">Loading...</p>
      </div>
    );
  }
 
  return (
    <div className="p-6 pb-20 md:pb-6">
      <h1 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface mb-8">
        Settings
      </h1>
 
      <div className="max-w-2xl space-y-6">
        {/* Profile Settings */}
        <div className="bg-surface rounded-lg shadow-md p-6 border border-outline-variant">
          <h2 className="font-bold text-[20px] mb-6 text-on-surface">Profile Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold text-on-surface mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block font-bold text-on-surface mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block font-bold text-on-surface mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              disabled={isSaving || !isDirty}
              className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-all disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
 
        {/* Shop Information */}
        <div className="bg-surface rounded-lg shadow-md p-6 border border-outline-variant">
          <h2 className="font-bold text-[20px] mb-6 text-on-surface">Shop Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-bold text-on-surface mb-2">Shop Name</label>
              <input
                type="text"
                value={user?.fullName || ""}
                disabled
                className="w-full px-4 py-2 bg-surface-container rounded-lg text-on-surface"
              />
            </div>
            <div>
              <label className="block font-bold text-on-surface mb-2">Vendor Status</label>
              <div className="px-4 py-2 bg-surface-container rounded-lg text-on-surface font-bold capitalize">
                {user?.vendorStatus || "pending"}
              </div>
            </div>
            <div>
              <label className="block font-bold text-on-surface mb-2">Member Since</label>
              <input
                type="text"
                value={user?.dateCreated ? new Date(user.dateCreated).toLocaleDateString() : ""}
                disabled
                className="w-full px-4 py-2 bg-surface-container rounded-lg text-on-surface"
              />
            </div>
          </div>
        </div>
 
        {/* Security */}
        <div className="bg-surface rounded-lg shadow-md p-6 border border-outline-variant">
          <h2 className="font-bold text-[20px] mb-6 text-on-surface">Security</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block font-bold text-on-surface mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 pr-12 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showCurrentPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>
 
            <div>
              <label className="block font-bold text-on-surface mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 pr-12 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showNewPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>
 
            <div>
              <label className="block font-bold text-on-surface mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 pr-12 border border-outline rounded-lg focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showConfirmPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>
 
            <button
              type="submit"
              disabled={isChangingPassword}
              className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-all disabled:opacity-50"
            >
              {isChangingPassword ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>
 
        {/* Logout */}
        <button
          onClick={() => {
            authService.logout();
            notificationService.success("Logged out successfully");
            window.location.href = "/";
          }}
          className="w-full bg-error text-on-error px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
 