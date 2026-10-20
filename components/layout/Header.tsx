"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react";
import AnnouncementBar from "@/components/sections/AnnouncementBar";
import { useToast } from "@/components/ui/Toast";
import { useCart } from "@/context/CartContext";

interface HeaderProps {
  onOpenBulkModal?: () => void;
}

export default function Header({ onOpenBulkModal }: HeaderProps) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { showToast } = useToast();
  const { itemCount } = useCart();
  const [accountHref, setAccountHref] = useState("/login?redirect=/account");
  const [customerAvatar, setCustomerAvatar] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("ourgrowth_customer_token") || localStorage.getItem("og_customer_token");
      setAccountHref(token ? "/account" : "/login?redirect=/account");
      if (token) {
        try {
          const userRaw = localStorage.getItem("ourgrowth_customer_user");
          if (userRaw) {
            const user = JSON.parse(userRaw);
            setCustomerAvatar(user?.avatar || null);
          } else {
            setCustomerAvatar(null);
          }
        } catch {
          setCustomerAvatar(null);
        }
      } else {
        setCustomerAvatar(null);
      }
    };
    checkToken();
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SHOP", href: "/shop" },
    { name: "BULK ORDERS", href: "/bulk-orders" },
    { name: "ABOUT US", href: "/about" },
    { name: "BLOG", href: "/blog" },
    { name: "FAQS", href: "/faqs" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Announcement Bar */}
      <AnnouncementBar
        onOpenBulkModal={onOpenBulkModal || (() => { window.location.href = "/bulk-orders"; })}
      />

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "h-16 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(29,93,58,0.08)] border-b border-surface-container/70"
            : "h-20 bg-surface-container-lowest/90 backdrop-blur-md border-b border-surface-container/50 shadow-[0_4px_20px_rgba(29,93,58,0.04)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter h-full flex items-center justify-between gap-space-md relative">
          {/* Brand Logo (+25% size) */}
          <Link href="/" className="flex items-center shrink-0 group z-10">
            <div className={`flex items-center transition-all duration-300 group-hover:scale-105 ${isScrolled ? "h-12" : "h-14"}`}>
              <Image
                src="/images/ourgrowth_logo.png"
                alt="OurGrowth Enterprises"
                width={220}
                height={55}
                className={`w-auto object-contain object-left transition-all duration-300 ${isScrolled ? "max-h-[48px] max-w-[195px]" : "max-h-[55px] max-w-[220px]"}`}
                style={{ height: 'auto', width: 'auto' }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Pills (Centered) */}
          <nav className="hidden xl:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-surface-container-low/80 p-1.5 rounded-full border border-surface-container shadow-inner whitespace-nowrap">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-label-md text-xs tracking-wider uppercase rounded-full transition-all py-1.5 px-3.5 font-bold ${
                    isActive
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-primary hover:bg-surface-container/70"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto z-10">
            {/* Account / Dashboard */}
            <Link
              href={accountHref}
              onClick={(e) => {
                const token = typeof window !== "undefined"
                  ? (localStorage.getItem("ourgrowth_customer_token") || localStorage.getItem("og_customer_token"))
                  : null;
                if (!token) {
                  e.preventDefault();
                  router.push("/login?redirect=/account");
                }
              }}
              aria-label="Account"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all overflow-hidden border border-surface-container/60 hover:border-primary/40 shadow-xs"
            >
              {customerAvatar ? (
                <img
                  src={customerAvatar}
                  alt="Customer Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </Link>

            {/* Cart Link with Live Count */}
            <Link
              href="/cart"
              aria-label="Shopping Cart"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <motion.span
                key={itemCount}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-on-primary font-label-md text-[10px] rounded-full flex items-center justify-center font-bold"
              >
                {itemCount}
              </motion.span>
            </Link>

            {/* CTA Button */}
            {onOpenBulkModal ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenBulkModal}
                className="hidden sm:inline-flex items-center gap-1.5 justify-center bg-secondary hover:bg-primary text-on-secondary font-label-md sm:font-label-lg text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-[0_6px_18px_rgba(52,107,0,0.22)] hover:shadow-lg transition-all font-bold shrink-0 ml-1"
              >
                <span>Bulk Supply</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <Link
                href="/bulk-orders"
                className="hidden sm:inline-flex items-center gap-1.5 justify-center bg-secondary hover:bg-primary text-on-secondary font-label-md sm:font-label-lg text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-[0_6px_18px_rgba(52,107,0,0.22)] hover:shadow-lg transition-all font-bold shrink-0 ml-1"
              >
                <span>Bulk Supply</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden w-9 h-9 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-surface-container-lowest border-b border-surface-container shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-2 max-h-[75vh] overflow-y-auto">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-headline-sm text-sm sm:text-base py-2.5 px-3 rounded-xl flex items-center justify-between transition-colors ${
                      isActive
                        ? "bg-primary text-on-primary font-bold"
                        : "text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className={`w-4 h-4 ${isActive ? "text-white" : "text-on-surface-variant"}`} />
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-surface-container flex flex-col gap-2">
                <Link
                  href={accountHref}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    const token = typeof window !== "undefined"
                      ? (localStorage.getItem("ourgrowth_customer_token") || localStorage.getItem("og_customer_token"))
                      : null;
                    if (!token) {
                      e.preventDefault();
                      router.push("/login?redirect=/account");
                    }
                  }}
                  className="w-full border border-surface-container text-on-surface py-2.5 rounded-full font-bold text-center text-sm flex items-center justify-center gap-2 hover:bg-surface-container"
                >
                  {customerAvatar ? (
                    <img
                      src={customerAvatar}
                      alt="Profile"
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span>My Account</span>
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-surface-container text-primary py-3 rounded-full font-bold text-center text-sm flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>View Cart ({itemCount})</span>
                </Link>
                <Link
                  href="/bulk-orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-secondary hover:bg-primary text-on-secondary py-3 rounded-full font-bold text-center text-sm shadow-md"
                >
                  Request Bulk Wholesale Rates →
                </Link>

                {/* Social Media Links in Mobile Drawer */}
                <div className="pt-3 border-t border-surface-container flex items-center justify-center gap-4">
                  <a
                    href="https://www.instagram.com/ourgrowthenterprises/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-on-surface-variant hover:text-secondary rounded-full bg-surface-container-low transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61594888355783"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-on-surface-variant hover:text-secondary rounded-full bg-surface-container-low transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@OurGrowthEnterprises"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-on-surface-variant hover:text-secondary rounded-full bg-surface-container-low transition-colors"
                    aria-label="YouTube"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
