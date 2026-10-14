'use client';

import { useState } from "react";
import { Lock, Key, ShieldCheck, ShieldAlert, Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { changeCustomerPassword, resetCustomerPasswordWithOtp, sendOtp } from "@/lib/api";

interface SecurityTabProps {
  profile: any;
  token: string | null;
  showToast: (msg: string) => void;
}

export default function SecurityTab({ profile, token, showToast }: SecurityTabProps) {
  const [securityMode, setSecurityMode] = useState<"change" | "reset">("change");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // OTP Reset State
  const [resetOtp, setResetOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [demoOtpHint, setDemoOtpHint] = useState<string | null>(null);

  const startOtpTimer = () => {
    setOtpTimer(60);
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendResetOtp = async () => {
    const phone = profile?.phone;
    if (!phone) {
      showToast("No mobile number registered to this profile.");
      return;
    }

    setOtpSending(true);
    try {
      const res = await sendOtp(phone);
      if (res.success) {
        setOtpSent(true);
        if (res.demo_hint) {
          setDemoOtpHint(res.demo_hint);
        }
        showToast("Verification code dispatched to your registered phone!");
        startOtpTimer();
      } else {
        showToast(res.message || "Failed to dispatch verification code.");
      }
    } catch {
      showToast("Network failure while sending OTP. Please retry.");
    } finally {
      setOtpSending(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      showToast("Session expired. Please log in again.");
      return;
    }
    if (newPassword.length < 6) {
      showToast("New password must contain at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("New password and confirmation do not match.");
      return;
    }

    setSavingPassword(true);
    try {
      const res = await changeCustomerPassword(token, {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });

      if (res.success) {
        showToast("Security credentials successfully updated!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        showToast(res.message || "Failed to update password.");
      }
    } catch {
      showToast("Network error while updating credentials.");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleResetPasswordWithOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const phone = profile?.phone;
    if (!phone) {
      showToast("Registered phone number missing.");
      return;
    }
    if (!resetOtp) {
      showToast("Please enter the verification code.");
      return;
    }
    if (newPassword.length < 6) {
      showToast("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match.");
      return;
    }

    setSavingPassword(true);
    try {
      const res = await resetCustomerPasswordWithOtp({
        phone,
        otp: resetOtp,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });

      if (res.success) {
        showToast("Password successfully reset! You can now use your new password.");
        setResetOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setSecurityMode("change");
        setOtpSent(false);
        setDemoOtpHint(null);
      } else {
        showToast(res.message || "Failed to reset password.");
      }
    } catch {
      showToast("Network error during password reset.");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div id="security-settings" className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-primary">
              Password &amp; Security
            </h3>
          </div>
          <p className="text-xs text-on-surface-variant">
            Update your account password or reset it securely using a mobile verification code (OTP).
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="inline-flex p-1 bg-surface-container-low rounded-full border border-surface-container self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => {
              setSecurityMode("change");
              setNewPassword("");
              setConfirmPassword("");
              setCurrentPassword("");
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              securityMode === "change"
                ? "bg-primary text-on-primary shadow-xs"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Change Password
          </button>
          <button
            type="button"
            onClick={() => {
              setSecurityMode("reset");
              setNewPassword("");
              setConfirmPassword("");
              setCurrentPassword("");
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              securityMode === "reset"
                ? "bg-primary text-on-primary shadow-xs"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Reset via OTP
          </button>
        </div>
      </div>

      {/* 1. Change Password Mode */}
      {securityMode === "change" && (
        <form onSubmit={handleChangePassword} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              Current Password *
            </label>
            <div className="relative">
              <input
                required
                type={showCurrentPw ? "text" : "password"}
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <Lock className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
              <button
                type="button"
                onClick={() => setShowCurrentPw(!showCurrentPw)}
                className="absolute right-3 top-3 text-on-surface-variant hover:text-primary"
                aria-label="Toggle password visibility"
              >
                {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                New Password * (Min 6 Characters)
              </label>
              <div className="relative">
                <input
                  required
                  minLength={6}
                  type={showNewPw ? "text" : "password"}
                  placeholder="Set new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <Key className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowNewPw(!showNewPw)}
                  className="absolute right-3 top-3 text-on-surface-variant hover:text-primary"
                  aria-label="Toggle password visibility"
                >
                  {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {newPassword.length > 0 && newPassword.length < 6 && (
                <p className="text-[11px] text-amber-600 mt-1">Must be at least 6 characters</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Confirm New Password *
              </label>
              <div className="relative">
                <input
                  required
                  minLength={6}
                  type={showConfirmPw ? "text" : "password"}
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border focus:outline-none focus:ring-2 ${
                    confirmPassword && confirmPassword !== newPassword
                      ? "border-red-400 focus:ring-red-400"
                      : "border-surface-container focus:ring-secondary"
                  }`}
                />
                <Key className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPw(!showConfirmPw)}
                  className="absolute right-3 top-3 text-on-surface-variant hover:text-primary"
                  aria-label="Toggle password visibility"
                >
                  {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && confirmPassword !== newPassword && (
                <p className="text-[11px] text-red-500 mt-1">Passwords do not match</p>
              )}
              {confirmPassword && confirmPassword === newPassword && (
                <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Passwords match
                </p>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-surface-container flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setSecurityMode("reset");
                handleSendResetOtp();
              }}
              className="text-xs font-bold text-secondary hover:text-primary transition-colors"
            >
              Forgot current password? Reset via OTP →
            </button>

            <button
              type="submit"
              disabled={savingPassword || (newPassword.length >= 6 && confirmPassword !== newPassword)}
              className="px-6 py-2.5 rounded-full bg-secondary text-on-secondary hover:bg-primary font-bold text-xs flex items-center gap-2 shadow-sm transition-colors disabled:opacity-50"
            >
              {savingPassword ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* 2. Reset via OTP Mode */}
      {securityMode === "reset" && (
        <form onSubmit={handleResetPasswordWithOtp} className="space-y-5">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold block">Mobile OTP Password Recovery</strong>
              <span>
                A secure verification code will be dispatched to your registered phone number (<strong>{profile?.phone}</strong>). Enter the code below to reset your password.
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={handleSendResetOtp}
              disabled={otpSending || otpTimer > 0}
              className="px-5 py-2.5 rounded-full bg-surface-container text-primary font-bold text-xs hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 shrink-0"
            >
              {otpSending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Sending code...</span>
                </>
              ) : otpTimer > 0 ? (
                <span>Resend in {otpTimer}s</span>
              ) : (
                <span>{otpSent ? "Resend Verification Code" : "Send Verification Code"}</span>
              )}
            </button>

            {otpSent && !demoOtpHint && (
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Code sent to {profile?.phone}
              </span>
            )}

            {demoOtpHint && (
              <span className="text-xs text-secondary font-bold font-mono bg-secondary-fixed/50 px-3 py-1 rounded-full">
                {demoOtpHint}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              Verification OTP Code *
            </label>
            <div className="relative">
              <input
                required
                type="text"
                maxLength={6}
                placeholder="Enter 4 or 6-digit code received on mobile"
                value={resetOtp}
                onChange={(e) => setResetOtp(e.target.value.trim())}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container tracking-widest font-mono font-bold focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <ShieldCheck className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                New Password * (Min 6 Characters)
              </label>
              <div className="relative">
                <input
                  required
                  minLength={6}
                  type={showNewPw ? "text" : "password"}
                  placeholder="Set new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <Key className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowNewPw(!showNewPw)}
                  className="absolute right-3 top-3 text-on-surface-variant hover:text-primary"
                  aria-label="Toggle password visibility"
                >
                  {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {newPassword.length > 0 && newPassword.length < 6 && (
                <p className="text-[11px] text-amber-600 mt-1">Must be at least 6 characters</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Confirm New Password *
              </label>
              <div className="relative">
                <input
                  required
                  minLength={6}
                  type={showConfirmPw ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border focus:outline-none focus:ring-2 ${
                    confirmPassword && confirmPassword !== newPassword
                      ? "border-red-400 focus:ring-red-400"
                      : "border-surface-container focus:ring-secondary"
                  }`}
                />
                <Key className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPw(!showConfirmPw)}
                  className="absolute right-3 top-3 text-on-surface-variant hover:text-primary"
                  aria-label="Toggle password visibility"
                >
                  {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && confirmPassword !== newPassword && (
                <p className="text-[11px] text-red-500 mt-1">Passwords do not match</p>
              )}
              {confirmPassword && confirmPassword === newPassword && (
                <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Passwords match
                </p>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-surface-container flex items-center justify-between">
            <button
              type="button"
              onClick={() => setSecurityMode("change")}
              className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              ← Switch to Standard Change Password
            </button>

            <button
              type="submit"
              disabled={savingPassword || !resetOtp || (newPassword.length >= 6 && confirmPassword !== newPassword)}
              className="px-6 py-2.5 rounded-full bg-secondary text-on-secondary hover:bg-primary font-bold text-xs flex items-center gap-2 shadow-sm transition-colors disabled:opacity-50"
            >
              {savingPassword ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Resetting Password...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Reset &amp; Save Password</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
