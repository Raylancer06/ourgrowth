"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight, Truck, ShieldCheck, Tag, Check, ChevronLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, coldChainFee, total, itemCount } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const { showToast } = useToast();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "CHEF10" || couponCode.toUpperCase() === "BULK10") {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      showToast("Coupon Applied! 10% commercial discount unlocked.");
    } else {
      showToast("Invalid code. Try 'CHEF10' for 10% off your commercial lot.");
    }
  };

  const finalTotal = Math.max(0, total - appliedDiscount);

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter py-8">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-surface-container pb-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                Commercial Requisition Review
              </span>
              <h1 className="font-headline-xl text-2xl sm:text-4xl font-extrabold text-primary">
                Kitchen Shopping Cart ({itemCount} {itemCount === 1 ? "Item" : "Items"})
              </h1>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Produce Catalog</span>
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-3xl p-12 text-center border border-surface-container max-w-lg mx-auto my-12">
              <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="font-headline-sm text-xl font-bold text-primary mb-2">
                Your Kitchen Cart is Empty
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-6">
                Explore our Grade A peeled cloves, Biriyani specials, and 10KG cloud kitchen crates.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md hover:bg-primary transition-colors"
              >
                <span>Browse Garlic Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Cart Items List */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-surface-container-lowest p-4 sm:p-5 rounded-3xl border border-surface-container shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-surface-container-low shrink-0 border border-surface-container">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div>
                        {item.badge && (
                          <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                            {item.badge}
                          </span>
                        )}
                        <h3 className="font-headline-sm text-sm sm:text-base font-bold text-primary">
                          {item.title}
                        </h3>
                        <span className="text-xs text-on-surface-variant font-medium">
                          Pack: {item.packSize}
                        </span>
                        <div className="text-sm font-bold text-primary sm:hidden mt-1">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Quantity Controller */}
                      <div className="flex items-center bg-surface-container-low border border-surface-container rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-full bg-surface-container-lowest text-primary font-bold flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        >
                          −
                        </button>
                        <span className="font-bold text-xs text-primary px-3">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-full bg-surface-container-lowest text-primary font-bold flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="hidden sm:block text-right">
                        <span className="font-headline-sm text-base font-extrabold text-primary block">
                          ₹{item.price * item.quantity}
                        </span>
                        <span className="text-[11px] text-on-surface-variant">
                          ₹{item.price} each
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          removeFromCart(item.id);
                          showToast(`Removed ${item.title} from cart.`);
                        }}
                        className="text-on-surface-variant hover:text-error transition-colors p-2"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Free Cold-Chain Callout */}
                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex items-center gap-3 text-xs text-on-surface-variant">
                  <Truck className="w-5 h-5 text-secondary shrink-0" />
                  <span>
                    {subtotal >= 2000
                      ? "🎉 Qualified for Free Cold-Chain Delivery! Your order will arrive at 2°C–4°C in insulated crating."
                      : `Add ₹${2000 - subtotal} more to unlock Free Cold-Chain Reefer Crating delivery.`}
                  </span>
                </div>
              </div>

              {/* Right Column: Order Requisition Summary */}
              <div className="lg:col-span-4 bg-surface-container-lowest p-6 rounded-3xl border border-surface-container shadow-sm flex flex-col gap-6">
                <h3 className="font-headline-sm text-lg font-bold text-primary border-b border-surface-container pb-3">
                  Requisition Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Items Subtotal:</span>
                    <span className="font-bold text-on-surface">₹{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <span>Insulated Reefer Crating:</span>
                    </span>
                    <span className="font-bold text-on-surface">
                      {coldChainFee === 0 ? <span className="text-secondary font-bold">FREE</span> : `₹${coldChainFee}`}
                    </span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-secondary font-bold">
                      <span>Commercial Promo Discount:</span>
                      <span>-₹{appliedDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="border-t border-surface-container pt-3 flex justify-between text-sm sm:text-base font-extrabold text-primary">
                    <span>Grand Total:</span>
                    <span>₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (CHEF10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-surface-container-low border border-surface-container text-on-surface uppercase focus:outline-none focus:ring-1 focus:ring-secondary"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-primary transition-colors"
                  >
                    Apply
                  </button>
                </form>

                <Link
                  href="/checkout"
                  className="w-full py-4 rounded-full bg-secondary hover:bg-primary text-on-secondary font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 text-center"
                >
                  <span>Proceed to Kitchen Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-center gap-4 text-[11px] text-on-surface-variant pt-2 border-t border-surface-container">
                  <span className="flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-secondary" /> GST Invoice
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Truck className="w-3.5 h-3.5 text-secondary" /> Same-Day Route
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
