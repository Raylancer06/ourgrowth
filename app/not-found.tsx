import Link from "next/link";
import { ArrowLeft, Home, ShoppingBag, PhoneCall } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1 flex items-center justify-center py-20 px-margin-mobile">
        <div className="max-w-md w-full text-center bg-surface-container-lowest p-8 sm:p-10 rounded-3xl border border-surface-container shadow-xl">
          <div className="font-metric-counter text-6xl sm:text-7xl font-black text-secondary leading-none mb-3">
            404
          </div>
          <h1 className="font-headline-sm text-2xl font-bold text-primary mb-2">
            Fresh Clove Route Not Found
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mb-8 leading-relaxed">
            The page or product lot you are looking for might have been moved or is currently in Reefer transit.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="w-full py-3.5 rounded-full bg-secondary hover:bg-primary text-on-secondary font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Return to Storefront</span>
            </Link>

            <Link
              href="/shop"
              className="w-full py-3.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Garlic Catalog</span>
            </Link>

            <a
              href="tel:+919476020341"
              className="text-xs text-on-surface-variant hover:text-primary font-bold transition-colors pt-2 flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-secondary" />
              <span>Need Help? Call +91 94760 20341</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
