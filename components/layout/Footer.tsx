"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Truck, Lock, Send, Check } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast("Subscribed! You'll receive our weekly harvest & wholesale garlic rate report.");
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-[#123620] text-on-primary font-body-sm text-body-sm relative z-20">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter pt-space-2xl pb-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl mb-space-2xl">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 flex flex-col pr-0 lg:pr-space-lg">
            <div className="flex items-center gap-space-sm mb-space-sm">
              <Link href="/" className="relative h-12 w-48 bg-surface-container-lowest px-3 py-1.5 rounded-2xl shadow-sm block">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxX9XF8O7niPyFjKlIFGqKTb2t1Mv4rQmW4bRCrJ4MHI0Xq7p6WDiR9vwHNuf71KBIcpqizKL9gSAfT-nI7qeMp_mKNvhJqF1Lk_yOpDo_I5zgS7L6-pFbDs-gXjdo8ZjsGbQ_w4voqbT9mlZGfT6gO2O863zCjXT0xlwlJlM3iO5ssfQR0Tm7vu8Ts8mvGVfwJVeu2Eh99KXbXegkw-x0WqaXcXNMMiCxhQXmRdHlnHbtxshEDi63PwA7fDtNFLRPhQ"
                  alt="OurGrowth Enterprises"
                  fill
                  className="object-contain p-1"
                />
              </Link>
            </div>
            <p className="font-body-md text-body-md text-surface-container-high mb-space-md font-semibold">
              Pure · Peeled · Garlic — Freshly Peeled. Hygienically Packed. Ready to Cook.
            </p>
            <p className="text-surface-variant mb-space-lg leading-relaxed font-normal text-xs sm:text-sm">
              Premium farm-direct peeled garlic cloves, dry air-peeled under certified food safety environments for kitchens, cloud kitchens, and restaurant enterprises across India.
            </p>

            {/* Social Media Links */}
            <div className="flex flex-col gap-2 mb-space-lg">
              <span className="font-label-md text-xs font-bold text-surface-container-high tracking-wider uppercase">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/ourgrowthenterprises/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-surface-container-lowest/15 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] flex items-center justify-center text-surface-bright transition-all shadow-sm hover:scale-110"
                  title="Follow OurGrowth on Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61594888355783"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-surface-container-lowest/15 hover:bg-[#1877f2] flex items-center justify-center text-surface-bright transition-all shadow-sm hover:scale-110"
                  title="Follow OurGrowth on Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@OurGrowthEnterprises"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-surface-container-lowest/15 hover:bg-[#ff0000] flex items-center justify-center text-surface-bright transition-all shadow-sm hover:scale-110"
                  title="Subscribe to OurGrowth on YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-lg text-label-lg text-secondary-fixed font-bold text-xs sm:text-sm">
                Subscribe for Harvest &amp; Wholesale Updates
              </span>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md mt-1">
                <input
                  type="email"
                  required
                  placeholder="Enter business email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-surface-container-lowest/10 border border-surface-container-highest/20 rounded-full px-5 py-2.5 font-body-sm text-xs sm:text-sm text-surface-bright placeholder-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary-fixed flex-1"
                />
                <button
                  type="submit"
                  className="bg-secondary-fixed hover:bg-secondary text-on-secondary-fixed hover:text-on-secondary px-5 py-2.5 rounded-full font-label-lg text-xs sm:text-sm font-bold transition-all shadow-md shrink-0 flex items-center gap-1.5"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Joined</span>
                    </>
                  ) : (
                    <>
                      <span>Join</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-headline-sm text-base text-surface-bright mb-space-md font-bold">
              Navigation
            </h4>
            <ul className="flex flex-col gap-space-sm text-surface-variant text-xs sm:text-sm">
              <li><Link href="/" className="hover:text-secondary-fixed transition-colors">Home Storefront</Link></li>
              <li><Link href="/shop" className="hover:text-secondary-fixed transition-colors">Produce Catalog</Link></li>
              <li><Link href="/bulk-orders" className="hover:text-secondary-fixed transition-colors">B2B Wholesale Procurement</Link></li>
              <li><Link href="/about" className="hover:text-secondary-fixed transition-colors">About Our Growth &amp; Tech</Link></li>
              <li><Link href="/testimonials" className="hover:text-secondary-fixed transition-colors">Chef &amp; Caterer Reviews</Link></li>
              <li><Link href="/blog" className="hover:text-secondary-fixed transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-secondary-fixed transition-colors">Dispatch Hubs &amp; Contact</Link></li>
            </ul>
          </div>

          {/* Commerce & Account */}
          <div>
            <h4 className="font-headline-sm text-base text-surface-bright mb-space-md font-bold">
              Store &amp; Account
            </h4>
            <ul className="flex flex-col gap-space-sm text-surface-variant text-xs sm:text-sm">
              <li><Link href="/cart" className="hover:text-secondary-fixed transition-colors">Shopping Cart</Link></li>
              <li><Link href="/checkout" className="hover:text-secondary-fixed transition-colors">Checkout</Link></li>
              <li><Link href="/account" className="hover:text-secondary-fixed transition-colors">My Account &amp; Addresses</Link></li>
              <li><Link href="/login" className="hover:text-secondary-fixed transition-colors">Sign In / Register</Link></li>
              <li><Link href="/faqs" className="hover:text-secondary-fixed transition-colors">Freshness Help &amp; FAQs</Link></li>
              <li><Link href="/policies" className="hover:text-secondary-fixed transition-colors">Cold-Chain &amp; Refund Policy</Link></li>
            </ul>
          </div>

          {/* Bulk Supply & Compliance */}
          <div>
            <h4 className="font-headline-sm text-base text-surface-bright mb-space-md font-bold">
              Bulk Supply &amp; Compliance
            </h4>
            <ul className="flex flex-col gap-space-sm text-surface-variant mb-space-md text-xs sm:text-sm">
              <li><span>Direct Desk: +91 94760 20341</span></li>
              <li><span>Email: supply@ourgrowth.in</span></li>
              <li><span>Kolkata • Mumbai • Bengaluru • Delhi</span></li>
              <li className="flex items-center gap-space-xs text-secondary-fixed font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>FSSAI Certified: 12823000000000</span>
              </li>
            </ul>
            <div className="p-4 rounded-2xl bg-surface-container-lowest/5 border border-surface-container-highest/15 text-surface-container-high">
              <span className="font-label-md text-xs font-bold text-secondary-fixed block mb-0.5">
                Cold-Chain Guarantee
              </span>
              <span className="text-[11px] leading-snug block opacity-90">
                Delivered at 2°C–4°C in insulated thermocol crating to preserve pungent allicin natural oils.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-container-highest/15 pt-space-md flex flex-col md:flex-row items-center justify-between gap-space-md text-surface-variant font-body-sm text-xs">
          <div>© {new Date().getFullYear()} OurGrowth Enterprises. All Rights Reserved. Pure Peeled Produce Div.</div>
          <div className="flex items-center gap-space-md text-surface-bright flex-wrap justify-center">
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-secondary-fixed shrink-0" />
              <span>100% Secure Checkout</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-secondary-fixed shrink-0" />
              <span>Hygienic Direct Delivery</span>
            </span>
            <Link href="/policies" className="hover:text-secondary-fixed transition-colors underline">
              Policies &amp; Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
