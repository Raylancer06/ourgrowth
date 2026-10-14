"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  User, Mail, Lock, Eye, EyeOff, Phone, Building2, 
  MapPin, ChevronDown, ChevronUp, Loader2, ArrowRight, Check,
  ShieldCheck, Key, X
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/components/ui/Toast";
import { loginCustomer, registerCustomer, sendOtp, resetCustomerPasswordWithOtp } from "@/lib/api";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect") || "/account";
  const [tab, setTab] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { showToast } = useToast();

  // Forgot Password State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotPhone, setForgotPhone] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [forgotNewPassword, setForgotNewPassword] = useState("");
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState("");
  const [forgotShowPw, setForgotShowPw] = useState(false);
  const [forgotShowConfirmPw, setForgotShowConfirmPw] = useState(false);
  const [forgotOtpSent, setForgotOtpSent] = useState(false);
  const [forgotOtpTimer, setForgotOtpTimer] = useState(0);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotHint, setForgotHint] = useState<string | null>(null);

  // Login Form
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register Form
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regErrors, setRegErrors] = useState<{ [key: string]: string }>({});

  // Real-time validation change handlers
  const handleNameChange = (val: string) => {
    setRegName(val);
    if (regErrors.name && val.trim().length >= 2) {
      setRegErrors((prev) => {
        const u = { ...prev };
        delete u.name;
        return u;
      });
    }
  };

  const handleEmailChange = (val: string) => {
    setRegEmail(val);
    if (regErrors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
      setRegErrors((prev) => {
        const u = { ...prev };
        delete u.email;
        return u;
      });
    }
  };

  const handlePhoneChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 10);
    setRegPhone(digits);
    if (regErrors.phone && /^[6-9]\d{9}$/.test(digits)) {
      setRegErrors((prev) => {
        const u = { ...prev };
        delete u.phone;
        return u;
      });
    }
  };

  const handlePasswordChange = (val: string) => {
    setRegPassword(val);
    if (regErrors.password && val.length >= 6) {
      setRegErrors((prev) => {
        const u = { ...prev };
        delete u.password;
        return u;
      });
    }
    if (regConfirmPassword) {
      if (val !== regConfirmPassword) {
        setRegErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match." }));
      } else {
        setRegErrors((prev) => {
          const u = { ...prev };
          delete u.confirmPassword;
          return u;
        });
      }
    }
  };

  const handleConfirmPasswordChange = (val: string) => {
    setRegConfirmPassword(val);
    if (regPassword && val !== regPassword) {
      setRegErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match." }));
    } else {
      setRegErrors((prev) => {
        const u = { ...prev };
        delete u.confirmPassword;
        return u;
      });
    }
  };

  const validateRegister = () => {
    const errors: { [key: string]: string } = {};
    const trimmedName = regName.trim();
    const trimmedEmail = regEmail.trim();
    const trimmedPhone = regPhone.trim();

    if (!trimmedName) {
      errors.name = "Full name is required.";
    } else if (trimmedName.length < 2) {
      errors.name = "Full name must be at least 2 characters.";
    }

    if (!trimmedEmail) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!trimmedPhone) {
      errors.phone = "Mobile number is mandatory.";
    } else if (!/^[6-9]\d{9}$/.test(trimmedPhone)) {
      errors.phone = "Enter a valid 10-digit mobile number (starts with 6, 7, 8, or 9).";
    }

    if (!regPassword) {
      errors.password = "Password is required.";
    } else if (regPassword.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (!regConfirmPassword) {
      errors.confirmPassword = "Confirm password is required.";
    } else if (regPassword !== regConfirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setRegErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Optional Business & Address Details
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [regCompany, setRegCompany] = useState("");
  const [regGstin, setRegGstin] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regCity, setRegCity] = useState("");
  const [regPincode, setRegPincode] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier || !loginPassword) {
      showToast("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await loginCustomer({
        email: loginIdentifier,
        password: loginPassword,
      });

      if (res.success && res.token) {
        localStorage.setItem("ourgrowth_customer_token", res.token);
        if (res.customer) {
          localStorage.setItem("ourgrowth_customer_user", JSON.stringify(res.customer));
        }
        localStorage.setItem("user_authenticated", "true");
        showToast(`Welcome back, ${res.customer?.name || "Customer"}!`);
        router.push(redirectParam);
      } else {
        showToast(res.message || "Invalid credentials. Please check your email or password.");
      }
    } catch (err: any) {
      showToast("Sign in failed. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegister()) {
      showToast("Please fix the highlighted errors before submitting.");
      return;
    }

    setLoading(true);
    try {
      const res = await registerCustomer({
        name: regName.trim(),
        email: regEmail.trim().toLowerCase(),
        password: regPassword,
        phone: regPhone.trim(),
        company_name: regCompany ? regCompany.trim() : undefined,
        gstin: regGstin ? regGstin.trim().toUpperCase() : undefined,
        address: regAddress ? regAddress.trim() : undefined,
        city: regCity ? regCity.trim() : undefined,
        pincode: regPincode ? regPincode.trim() : undefined,
      });

      if (res.success && res.token) {
        localStorage.setItem("ourgrowth_customer_token", res.token);
        if (res.customer) {
          localStorage.setItem("ourgrowth_customer_user", JSON.stringify(res.customer));
        }
        localStorage.setItem("user_authenticated", "true");
        showToast("Account created successfully! Welcome to OurGrowth.");
        router.push(redirectParam);
      } else {
        showToast(res.message || "Could not create account. Please try again.");
      }
    } catch (err: any) {
      showToast("Registration failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password OTP countdown
  useEffect(() => {
    let interval: any;
    if (forgotOtpTimer > 0) {
      interval = setInterval(() => {
        setForgotOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [forgotOtpTimer]);

  const handleSendForgotOtp = async () => {
    const phone = forgotPhone.trim();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      showToast("Please enter a valid 10-digit mobile number.");
      return;
    }
    setForgotLoading(true);
    try {
      const res = await sendOtp(phone);
      if (res.success) {
        setForgotOtpSent(true);
        setForgotOtpTimer(30);
        if (res.demo_hint) setForgotHint(res.demo_hint);
        showToast(res.message || `OTP sent to +91 ${phone}`);
      } else {
        showToast(res.message || "Failed to send OTP. Please verify mobile number.");
      }
    } catch {
      showToast("Error sending OTP. Please check your network.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPasswordFromLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const phone = forgotPhone.trim();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      showToast("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!forgotOtp.trim()) {
      showToast("Please enter the verification OTP.");
      return;
    }
    if (forgotNewPassword.length < 6) {
      showToast("Password must be at least 6 characters.");
      return;
    }
    if (forgotNewPassword !== forgotConfirmPassword) {
      showToast("New passwords do not match.");
      return;
    }

    setForgotLoading(true);
    try {
      const res = await resetCustomerPasswordWithOtp({
        phone,
        otp: forgotOtp.trim(),
        new_password: forgotNewPassword,
        new_password_confirmation: forgotConfirmPassword,
      });

      if (res.success) {
        showToast("Password reset successfully! Please sign in with your new password.");
        setShowForgotModal(false);
        setLoginIdentifier(phone);
        setLoginPassword(forgotNewPassword);
        setForgotOtp("");
        setForgotNewPassword("");
        setForgotConfirmPassword("");
        setForgotOtpSent(false);
        setForgotHint(null);
      } else {
        showToast(res.message || "Could not reset password.");
      }
    } catch {
      showToast("Error resetting password. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1 flex items-center justify-center py-16 px-margin-mobile">
        <div className="max-w-md w-full bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-surface-container shadow-xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-secondary-container text-secondary flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6" />
            </div>
            <h1 className="font-headline-sm text-2xl font-bold text-primary">
              {tab === "login" ? "Sign In to Your Account" : "Create a New Account"}
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              {tab === "login"
                ? "Enter your email address and password to access your orders."
                : "Register with your details to place orders and manage saved addresses."}
            </p>
          </div>

          {redirectParam === "/checkout" && (
            <div className="mb-6 p-3.5 rounded-2xl bg-secondary-container/40 border border-secondary-container text-xs text-on-secondary-container flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-secondary shrink-0" />
              <span>Please sign in or create an account to proceed to checkout and place your order.</span>
            </div>
          )}

          {/* Tab Selector */}
          <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-1.5 rounded-2xl mb-6 text-xs font-bold">
            <button
              type="button"
              onClick={() => setTab("login")}
              className={`py-2.5 rounded-xl transition-all ${
                tab === "login"
                  ? "bg-surface-container-lowest text-primary shadow-xs font-extrabold"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setTab("register")}
              className={`py-2.5 rounded-xl transition-all ${
                tab === "register"
                  ? "bg-surface-container-lowest text-primary shadow-xs font-extrabold"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Tab 1: Sign In */}
          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Email Address or Full Name *
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    placeholder="Enter your email or full name"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <Mail className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <Lock className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-on-surface-variant hover:text-primary"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex justify-end mt-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotModal(true);
                      const digits = loginIdentifier.replace(/\D/g, "").slice(0, 10);
                      if (digits.length === 10) setForgotPhone(digits);
                    }}
                    className="text-[11px] font-bold text-secondary hover:text-primary transition-colors"
                  >
                    Forgot Password? Reset via OTP →
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-secondary hover:bg-primary text-on-secondary font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Tab 2: Create Account */
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    placeholder="Enter your full name"
                    value={regName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low border text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 transition-all ${
                      regErrors.name
                        ? "border-red-500 focus:ring-red-400 bg-red-50/10"
                        : "border-surface-container focus:ring-secondary"
                    }`}
                  />
                  <User className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
                </div>
                {regErrors.name && (
                  <p className="text-red-500 text-[11px] mt-1 font-medium">{regErrors.name}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    required
                    type="email"
                    placeholder="Enter your email address"
                    value={regEmail}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low border text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 transition-all ${
                      regErrors.email
                        ? "border-red-500 focus:ring-red-400 bg-red-50/10"
                        : "border-surface-container focus:ring-secondary"
                    }`}
                  />
                  <Mail className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
                </div>
                {regErrors.email && (
                  <p className="text-red-500 text-[11px] mt-1 font-medium">{regErrors.email}</p>
                )}
              </div>

              {/* Mobile Number - Mandatory */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Mobile Number * (10 Digits)
                </label>
                <div className="relative">
                  <input
                    required
                    type="tel"
                    maxLength={10}
                    placeholder="10-digit mobile number (e.g. 9876543210)"
                    value={regPhone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low border text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 transition-all ${
                      regErrors.phone
                        ? "border-red-500 focus:ring-red-400 bg-red-50/10"
                        : "border-surface-container focus:ring-secondary"
                    }`}
                  />
                  <Phone className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
                </div>
                {regErrors.phone ? (
                  <p className="text-red-500 text-[11px] mt-1 font-medium">{regErrors.phone}</p>
                ) : (
                  <p className="text-on-surface-variant text-[10px] mt-1">Used for order tracking &amp; delivery dispatch calls.</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Password * (Min. 6 Characters)
                </label>
                <div className="relative">
                  <input
                    required
                    minLength={6}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={regPassword}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container-low border text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 transition-all ${
                      regErrors.password
                        ? "border-red-500 focus:ring-red-400 bg-red-50/10"
                        : "border-surface-container focus:ring-secondary"
                    }`}
                  />
                  <Lock className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-on-surface-variant hover:text-primary"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {regErrors.password && (
                  <p className="text-red-500 text-[11px] mt-1 font-medium">{regErrors.password}</p>
                )}
              </div>

              {/* Confirm Password - Mandatory */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={regConfirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container-low border text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 transition-all ${
                      regErrors.confirmPassword
                        ? "border-red-500 focus:ring-red-400 bg-red-50/10"
                        : "border-surface-container focus:ring-secondary"
                    }`}
                  />
                  <Lock className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-3 text-on-surface-variant hover:text-primary"
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {regErrors.confirmPassword ? (
                  <p className="text-red-500 text-[11px] mt-1 font-medium">{regErrors.confirmPassword}</p>
                ) : regConfirmPassword && regPassword === regConfirmPassword ? (
                  <p className="text-emerald-600 text-[11px] mt-1 font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Passwords match
                  </p>
                ) : null}
              </div>

              {/* Collapsible Optional Section */}
              <div className="pt-2 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setShowOptionalFields(!showOptionalFields)}
                  className="w-full flex items-center justify-between text-xs font-bold text-secondary hover:text-primary py-1 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Add Business, Shop &amp; Delivery Details (Optional)</span>
                  </span>
                  {showOptionalFields ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showOptionalFields && (
                  <div className="mt-3 space-y-3 p-3.5 rounded-2xl bg-surface-container-low border border-surface-container">
                    <div>
                      <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Shop / Company / Store Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sharma Grocery Store or Royal Kitchen"
                        value={regCompany}
                        onChange={(e) => setRegCompany(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        GSTIN for Tax Invoices (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 19AAAAA0000A1Z5"
                        value={regGstin}
                        onChange={(e) => setRegGstin(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-surface-container text-xs text-on-surface uppercase font-mono focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Delivery Address (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Door / Flat / Street / Landmark"
                        value={regAddress}
                        onChange={(e) => setRegAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Kolkata"
                          value={regCity}
                          onChange={(e) => setRegCity(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                          Pincode
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 700019"
                          value={regPincode}
                          onChange={(e) => setRegPincode(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-secondary hover:bg-primary text-on-secondary font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer Assistance */}
          <div className="mt-6 pt-4 border-t border-surface-container text-center text-[11px] text-on-surface-variant">
            <span>Need help with your account or order? </span>
            <Link href="/contact" className="text-secondary font-bold hover:underline">
              Contact Support
            </Link>
          </div>
        </div>

        {/* Forgot Password Modal */}
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-surface-container-lowest max-w-md w-full rounded-3xl p-6 sm:p-7 border border-surface-container shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="absolute right-4 top-4 p-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <div className="w-10 h-10 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center mb-2">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-headline-sm text-lg font-bold text-primary">
                  Reset Password via OTP
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Enter your registered 10-digit mobile number to receive a verification OTP code.
                </p>
              </div>

              <form onSubmit={handleResetPasswordFromLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Registered Mobile Number *
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        required
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={forgotPhone}
                        onChange={(e) => setForgotPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                      <Phone className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendForgotOtp}
                      disabled={forgotLoading || forgotOtpTimer > 0 || forgotPhone.length !== 10}
                      className="px-3.5 py-2.5 rounded-xl bg-secondary hover:bg-primary text-on-secondary font-bold text-xs shrink-0 transition-colors disabled:opacity-50"
                    >
                      {forgotOtpTimer > 0 ? `${forgotOtpTimer}s` : forgotOtpSent ? "Resend" : "Send OTP"}
                    </button>
                  </div>
                </div>

                {forgotHint && (
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs flex items-center justify-between">
                    <span>Test code: <strong>{forgotHint}</strong></span>
                    <button
                      type="button"
                      onClick={() => setForgotOtp(forgotHint)}
                      className="underline font-bold hover:text-amber-900 text-[11px]"
                    >
                      Fill
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Verification OTP *
                  </label>
                  <div className="relative">
                    <input
                      required
                      type="text"
                      maxLength={6}
                      placeholder="Enter 4 or 6-digit OTP"
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value.trim())}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-xs sm:text-sm text-on-surface font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <ShieldCheck className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      New Password *
                    </label>
                    <div className="relative">
                      <input
                        required
                        minLength={6}
                        type={forgotShowPw ? "text" : "password"}
                        placeholder="Min 6 chars"
                        value={forgotNewPassword}
                        onChange={(e) => setForgotNewPassword(e.target.value)}
                        className="w-full pl-9 pr-8 py-2 rounded-xl bg-surface-container-low border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                      <Key className="w-3.5 h-3.5 text-on-surface-variant absolute left-3 top-2.5" />
                      <button
                        type="button"
                        onClick={() => setForgotShowPw(!forgotShowPw)}
                        className="absolute right-2.5 top-2.5 text-on-surface-variant"
                      >
                        {forgotShowPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        required
                        minLength={6}
                        type={forgotShowConfirmPw ? "text" : "password"}
                        placeholder="Repeat password"
                        value={forgotConfirmPassword}
                        onChange={(e) => setForgotConfirmPassword(e.target.value)}
                        className="w-full pl-9 pr-8 py-2 rounded-xl bg-surface-container-low border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                      <Key className="w-3.5 h-3.5 text-on-surface-variant absolute left-3 top-2.5" />
                      <button
                        type="button"
                        onClick={() => setForgotShowConfirmPw(!forgotShowConfirmPw)}
                        className="absolute right-2.5 top-2.5 text-on-surface-variant"
                      >
                        {forgotShowConfirmPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2.5 rounded-full border border-surface-container text-xs font-bold text-on-surface-variant hover:bg-surface-container"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading || !forgotOtp || forgotNewPassword.length < 6}
                    className="px-5 py-2.5 rounded-full bg-secondary text-on-secondary hover:bg-primary font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors disabled:opacity-50"
                  >
                    {forgotLoading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Resetting...</span>
                      </>
                    ) : (
                      <span>Set New Password</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
          <Header />
          <main className="w-full pt-28 bg-surface flex-1 flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-secondary" />
          </main>
          <Footer />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
