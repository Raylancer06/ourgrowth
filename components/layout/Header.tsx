"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowUpRight, PhoneCall } from "lucide-react";
import AnnouncementBar from "@/components/sections/AnnouncementBar";
import { useToast } from "@/components/ui/Toast";
import { useCart } from "@/context/CartContext";

interface HeaderProps {
  onOpenBulkModal?: () => void;
}

export default function Header({ onOpenBulkModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const pathname = usePathname();
  const { showToast } = useToast();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWishlistClick = () => {
    setWishlistCount((prev) => prev + 1);
    showToast("Added grade to your restaurant wishlist!");
  };

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SHOP", href: "/shop" },
    { name: "BULK ORDERS", href: "/bulk-orders" },
    { name: "ABOUT US", href: "/about" },
    { name: "CHEF REVIEWS", href: "/testimonials" },
    { name: "CULINARY JOURNAL", href: "/blog" },
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
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter h-full flex items-center justify-between gap-space-md">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <div className="relative h-11 w-36 sm:w-44 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTbcokG7_Q76gNkQbcw0zb2_XmaT_fj2J3-s0ZXx-Jdc5sB-4kYkwwP4RhPcKlbKZ2o_5K8H7q35kfC5aasnPaDenr60Pq97WkgM6ycvplaDHzYORRcYx8VP34bOpt8pOr4nBE2kHQDPu2Qil4f9TB6QsNo_a2YiGDCEw6XCKC2H0W4N76HPpo1BV37Qrer8x0wonf3eaqVfPUc3O5-tMihVDJhzIDCkKRphYTcZY4CbdpZ8MF2z4vCwXSkhARUDtuQg"
                alt="OurGrowth Enterprises"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Pills */}
          <nav className="hidden xl:flex items-center gap-1 bg-surface-container-low/80 p-1.5 rounded-full border border-surface-container shadow-inner whitespace-nowrap">
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
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
            {/* Direct Calling Desk */}
            <a
              href="tel:+919476020341"
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors bg-surface-container-low px-3 py-1.5 rounded-full border border-surface-container"
            >
              <PhoneCall className="w-3.5 h-3.5 text-secondary" />
              <span>+91 94760 20341</span>
            </a>

            {/* Account / Dashboard */}
            <Link
              href="/account"
              aria-label="Merchant Account"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            {/* Wishlist */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlistClick}
              aria-label="Wishlist"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary text-on-secondary font-label-md text-[10px] rounded-full flex items-center justify-center font-bold"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </motion.button>

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
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-surface-container text-primary py-3 rounded-full font-bold text-center text-sm flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>View Kitchen Cart ({itemCount})</span>
                </Link>
                <Link
                  href="/bulk-orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-secondary hover:bg-primary text-on-secondary py-3 rounded-full font-bold text-center text-sm shadow-md"
                >
                  Request Bulk Wholesale Rates →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
