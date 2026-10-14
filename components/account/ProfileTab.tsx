'use client';

import { useState } from "react";
import { User, Mail, Phone, Building, Store, Truck, Save, Loader2, Camera, Upload } from "lucide-react";
import { updateCustomerProfile } from "@/lib/api";
import SecurityTab from "./SecurityTab";

interface ProfileTabProps {
  profile: any;
  token: string | null;
  showToast: (msg: string) => void;
  onProfileUpdated: (updatedProfile: any) => void;
}

export default function ProfileTab({
  profile,
  token,
  showToast,
  onProfileUpdated,
}: ProfileTabProps) {
  const [profileForm, setProfileForm] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    alt_phone: profile?.alt_phone || "",
    company_name: profile?.company_name || "",
    business_type: profile?.business_type || (profile?.company_name ? "Grocery & Kirana Store" : "Individual / Retail Customer"),
    tax_number: profile?.tax_number || "",
    notes: profile?.notes || "",
    avatar: profile?.avatar || "",
  });

  const [savingProfile, setSavingProfile] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast("Avatar image size must be under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setProfileForm((prev) => ({ ...prev, avatar: dataUrl }));
      showToast("Profile avatar preview updated. Click 'Save Profile Changes' to persist.");
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setSavingProfile(true);
    try {
      const res = await updateCustomerProfile(token, {
        name: profileForm.name,
        email: profileForm.email,
        phone: profileForm.phone,
        alt_phone: profileForm.alt_phone,
        company_name: profileForm.company_name,
        business_type: profileForm.business_type,
        tax_number: profileForm.tax_number,
        notes: profileForm.notes,
        avatar: profileForm.avatar,
      });

      if (res.success && res.customer) {
        onProfileUpdated(res.customer);
        showToast("Profile details updated successfully!");
      } else {
        showToast(res.message || "Failed to update profile.");
      }
    } catch {
      showToast("Network error while updating profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-surface-container">
          <div>
            <h3 className="font-headline-sm text-xl font-bold text-primary">
              Account Profile &amp; Preferences
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">
              Update your personal contact details, retail or business entity credentials, and delivery instructions.
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="mt-6 space-y-6">
          {/* Avatar Upload Field */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-4 rounded-2xl bg-surface-container-low border border-surface-container">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-surface-container-highest border-2 border-secondary/30 flex items-center justify-center shrink-0 shadow-sm group">
              {profileForm.avatar ? (
                <img
                  src={profileForm.avatar}
                  alt={profileForm.name || "Customer Avatar"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-extrabold text-2xl text-secondary">
                  {(profileForm.name || "C").charAt(0).toUpperCase()}
                </span>
              )}
              <label
                htmlFor="avatar-file-input"
                className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-[10px] font-bold"
              >
                <Camera className="w-5 h-5 mb-0.5" />
                Change
              </label>
            </div>

            <div className="space-y-1.5 flex-1">
              <label className="block text-xs font-bold text-primary">
                Profile Photo / Store Logo
              </label>
              <p className="text-xs text-on-surface-variant">
                Upload a JPEG, PNG, or WebP image under 2MB. Displayed across order confirmations and invoices.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <label
                  htmlFor="avatar-file-input"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container text-primary hover:bg-surface-container-high font-bold text-xs transition-colors cursor-pointer border border-surface-container"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload New Picture</span>
                </label>
                <input
                  id="avatar-file-input"
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                {profileForm.avatar && (
                  <button
                    type="button"
                    onClick={() => setProfileForm((prev) => ({ ...prev, avatar: "" }))}
                    className="text-xs font-semibold text-rose-500 hover:underline"
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 1. Personal & Contact Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>Contact &amp; Identification</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Full Name / Contact Person *
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <User className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    required
                    type="email"
                    placeholder="email@example.com"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <Mail className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Mobile Number * (10 Digits)
                </label>
                <div className="relative">
                  <input
                    required
                    type="tel"
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <Phone className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Alternate Phone / WhatsApp (Optional)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="Alternate 10-digit number"
                    value={profileForm.alt_phone}
                    onChange={(e) => setProfileForm({ ...profileForm, alt_phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <Phone className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Business / Trade Information (Optional) */}
          <div className="pt-6 border-t border-surface-container space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                <Building className="w-4 h-4" />
                <span>Business &amp; Trade Details (Optional)</span>
              </h4>
              <span className="text-[10px] text-on-surface-variant font-medium bg-surface-container px-2 py-0.5 rounded-full">
                Optional for Retail
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Shop / Store / Business Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Sharma Grocery Store or Royal Kitchen"
                    value={profileForm.company_name}
                    onChange={(e) => setProfileForm({ ...profileForm, company_name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <Store className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  GSTIN (GST Number)
                </label>
                <input
                  type="text"
                  maxLength={15}
                  placeholder="15-digit GSTIN (e.g. 19AAAAA0000A1Z5)"
                  value={profileForm.tax_number}
                  onChange={(e) => setProfileForm({ ...profileForm, tax_number: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary uppercase font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Account Category / Trade Classification
                </label>
                <select
                  value={profileForm.business_type}
                  onChange={(e) => setProfileForm({ ...profileForm, business_type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <option value="Individual / Retail Customer">Individual / Retail Consumer</option>
                  <option value="Grocery & Kirana Store">Grocery &amp; Kirana Store</option>
                  <option value="Supermarket / Retail Chain">Supermarket / Retail Chain</option>
                  <option value="Restaurant / Cloud Kitchen">Restaurant / Cafe / Cloud Kitchen</option>
                  <option value="Catering & Bulk Food Service">Catering &amp; Event Food Service</option>
                  <option value="Wholesale Distributor / Mandi Trader">Wholesale Distributor / Mandi Merchant</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. Special Delivery Notes & Preferences */}
          <div className="pt-6 border-t border-surface-container space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
              <Truck className="w-4 h-4" />
              <span>Delivery Preferences &amp; Special Instructions</span>
            </h4>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Delivery Instructions / Gate Notes (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Call before delivery, drop at front counter, deliver between 7:00 AM - 9:00 AM..."
                value={profileForm.notes}
                onChange={(e) => setProfileForm({ ...profileForm, notes: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t border-surface-container flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={savingProfile}
              className="px-6 py-2.5 rounded-full bg-secondary text-on-secondary hover:bg-primary font-bold text-xs flex items-center gap-2 shadow-sm transition-colors disabled:opacity-60"
            >
              {savingProfile ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Updating Profile...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Password & Security Section directly on Profile */}
      <SecurityTab profile={profile} token={token} showToast={showToast} />
    </div>
  );
}
