"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Truck, ShieldCheck, Thermometer, MapPin, Download, ArrowRight, PhoneCall } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function OrderConfirmationPage() {
  const [orderId, setOrderId] = useState("OG-748291");
  const [orderTotal, setOrderTotal] = useState("2,700");
  const [chefName, setChefName] = useState("Chef Rahim Khan");
  const [restaurant, setRestaurant] = useState("Nizam Kitchens Hub");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("latest_order_id");
      const storedTotal = localStorage.getItem("latest_order_total");
      const storedChef = localStorage.getItem("latest_order_chef");
      const storedRest = localStorage.getItem("latest_order_restaurant");

      if (storedId) setOrderId(storedId);
      if (storedTotal) setOrderTotal(Number(storedTotal).toLocaleString());
      if (storedChef) setChefName(storedChef);
      if (storedRest) setRestaurant(storedRest);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1">
        <div className="max-w-5xl mx-auto px-margin-mobile lg:px-gutter py-12">
          {/* Success Banner */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center mx-auto mb-4 shadow-md"
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              Cold-Chain Requisition Placed Successfully
            </span>
            <h1 className="font-headline-xl text-3xl sm:text-4xl font-extrabold text-primary mt-1">
              Order #{orderId} Confirmed
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-2 max-w-lg mx-auto">
              Thank you, <span className="font-bold text-primary">{chefName}</span> ({restaurant}). Your freshly peeled garlic batch is scheduled for chilled morning dispatch.
            </p>
          </div>

          {/* Live Reefer Cold-Chain Tracker Card */}
          <div className="bg-surface-container-lowest rounded-3xl border border-surface-container shadow-xl overflow-hidden mb-10">
            {/* Top Telemetry Header */}
            <div className="bg-gradient-to-r from-primary to-[#0f3d23] text-on-primary p-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-secondary-fixed">
                  <Truck className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-lg font-bold">Reefer Van #WB-04-9122</span>
                    <span className="bg-secondary-fixed text-[#041009] text-[10px] font-black px-2 py-0.5 rounded-full">
                      LIVE ROUTE
                    </span>
                  </div>
                  <span className="text-xs text-surface-container-high">
                    Assigned Driver: Ramesh Paul (+91 94760 20341)
                  </span>
                </div>
              </div>

              {/* Temperature Telemetry Dial */}
              <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-2xl border border-white/15">
                <Thermometer className="w-5 h-5 text-secondary-fixed" />
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-secondary-fixed block">
                    Cargo Bay Temperature
                  </span>
                  <span className="font-extrabold text-lg text-white">3.1°C Optimal</span>
                </div>
              </div>
            </div>

            {/* Tracking Progress Stepper */}
            <div className="p-6 sm:p-8">
              <div className="relative flex flex-col md:flex-row justify-between gap-6 pb-6">
                {/* Step 1 */}
                <div className="flex items-start md:flex-col md:items-center gap-3 text-left md:text-center flex-1">
                  <div className="w-8 h-8 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                    ✓
                  </div>
                  <div>
                    <span className="font-bold text-xs text-primary block">Requisition Received</span>
                    <span className="text-[11px] text-on-surface-variant">04:15 AM • Invoice Created</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start md:flex-col md:items-center gap-3 text-left md:text-center flex-1">
                  <div className="w-8 h-8 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                    ✓
                  </div>
                  <div>
                    <span className="font-bold text-xs text-primary block">Nitrogen Flushed &amp; Packed</span>
                    <span className="text-[11px] text-on-surface-variant">05:00 AM • Quality Inspected</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start md:flex-col md:items-center gap-3 text-left md:text-center flex-1">
                  <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary font-bold text-xs flex items-center justify-center shrink-0 shadow-sm animate-bounce">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-xs text-secondary font-extrabold block">Loaded in Reefer Van</span>
                    <span className="text-[11px] text-on-surface-variant">05:45 AM • Chilled Transit</span>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start md:flex-col md:items-center gap-3 text-left md:text-center flex-1 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant font-bold text-xs flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div>
                    <span className="font-bold text-xs text-on-surface block">Doorstep Kitchen Counter</span>
                    <span className="text-[11px] text-on-surface-variant">Est. 07:15 AM Arrival</span>
                  </div>
                </div>
              </div>

              {/* Order Info Bar */}
              <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-container flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-on-surface-variant block">Delivery Address:</span>
                  <span className="font-bold text-primary">Commercial Kitchen Hub Entry, Kolkata - 700019</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block">Payment Status:</span>
                  <span className="font-bold text-secondary">Pay on Delivery / COD (₹{orderTotal})</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => alert(`Downloading GST Invoice #${orderId}.pdf`)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tax Invoice PDF</span>
                  </button>
                  <a
                    href="https://wa.me/919476020341"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary hover:bg-primary text-on-secondary font-bold text-xs transition-colors"
                  >
                    <span>WhatsApp Updates</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-white font-bold text-xs sm:text-sm transition-all shadow-sm"
            >
              <span>Explore More Garlic Lots</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/account"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs sm:text-sm transition-all"
            >
              <span>View Kitchen Dashboard</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
