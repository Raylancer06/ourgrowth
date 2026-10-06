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
              <li><Link href="/checkout" className="hover:text-secondary-fixed transition-colors">Kitchen Requisition Checkout</Link></li>
              <li><Link href="/account" className="hover:text-secondary-fixed transition-colors">Merchant Dashboard</Link></li>
              <li><Link href="/login" className="hover:text-secondary-fixed transition-colors">Client Portal Login</Link></li>
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
