"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, PhoneCall, ArrowRight, UserCheck, Building2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/components/ui/Toast";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { showToast } = useToast();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setIsOtpSent(true);
    showToast(`OTP 4829 sent to +91 ${phone}`);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Authenticated successfully as Verified Kitchen Account!");
    localStorage.setItem("user_authenticated", "true");
    router.push("/account");
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1 flex items-center justify-center py-16 px-margin-mobile">
        <div className="max-w-md w-full bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-surface-container shadow-xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-secondary-container text-secondary flex items-center justify-center mx-auto mb-3">
              <Building2 className="w-6 h-6" />
            </div>
            <h1 className="font-headline-sm text-2xl font-bold text-primary">
              Procurement Portal Access
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              For commercial restaurants, hotels, and institutional accounts.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-1.5 rounded-2xl mb-6 text-xs font-bold">
            <button
              onClick={() => { setTab("login"); setIsOtpSent(false); }}
              className={`py-2 rounded-xl transition-all ${
                tab === "login"
                  ? "bg-surface-container-lowest text-primary shadow-xs"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              Merchant Login
            </button>
            <button
              onClick={() => { setTab("register"); setIsOtpSent(false); }}
              className={`py-2 rounded-xl transition-all ${
                tab === "register"
                  ? "bg-surface-container-lowest text-primary shadow-xs"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              New Kitchen Signup
            </button>
          </div>

          {/* Form */}
          {!isOtpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Registered Mobile / WhatsApp *
                </label>
                <div className="flex items-center rounded-xl bg-surface-container-low border border-surface-container overflow-hidden">
                  <span className="px-3 py-2.5 bg-surface-container text-xs font-bold text-on-surface-variant">+91</span>
                  <input
                    required
                    type="tel"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 bg-transparent text-xs sm:text-sm text-on-surface focus:outline-none"
                  />
                </div>
              </div>

              {tab === "register" && (
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Restaurant / Hotel Trade Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Grand Dum Biriyani House"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-secondary hover:bg-primary text-on-secondary font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Send WhatsApp OTP →</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="p-3 rounded-2xl bg-secondary-container/40 text-xs text-on-secondary-container">
                Enter the 4-digit code sent to <span className="font-bold">+91 {phone}</span>
                <div className="text-[11px] text-secondary font-bold mt-1">💡 Demo hint: Type 4829</div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Verification Code (OTP)
                </label>
                <input
                  required
                  type="text"
                  maxLength={6}
                  placeholder="4829"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-black py-3 rounded-xl bg-surface-container-low border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                Verify &amp; Enter Dashboard
              </button>

              <button
                type="button"
                onClick={() => setIsOtpSent(false)}
                className="w-full text-xs text-on-surface-variant hover:text-primary font-bold text-center underline block"
              >
                Change Phone Number
              </button>
            </form>
          )}

          {/* Quick Help */}
          <div className="mt-6 pt-4 border-t border-surface-container text-center text-[11px] text-on-surface-variant">
            <span>Need institutional contract onboarding? </span>
            <a href="tel:+919476020341" className="text-secondary font-bold hover:underline">
              Call Wholesale Desk: +91 94760 20341
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
