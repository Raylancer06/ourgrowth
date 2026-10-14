"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Truck, ShieldCheck, Thermometer, MapPin, Download, ArrowRight, PhoneCall } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function OrderConfirmationPage() {
  const [orderId, setOrderId] = useState("");
  const [orderTotal, setOrderTotal] = useState("");
  const [chefName, setChefName] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMode, setPaymentMode] = useState("COD");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("latest_order_id");
      const storedTotal = localStorage.getItem("latest_order_total");
      const storedChef = localStorage.getItem("latest_order_chef");
      const storedRest = localStorage.getItem("latest_order_restaurant");
      const storedPhone = localStorage.getItem("latest_order_phone");
      const storedPay = localStorage.getItem("latest_order_payment_method");

      if (storedId) setOrderId(storedId);
      if (storedTotal) setOrderTotal(Number(storedTotal).toLocaleString());
      if (storedChef) setChefName(storedChef);
      if (storedRest) setRestaurant(storedRest);
      if (storedPhone) setPhone(storedPhone);
      if (storedPay) setPaymentMode(storedPay);
    }
  }, []);

  const whatsAppMessage = encodeURIComponent(
    `🧄 *OURGROWTH ENTERPRISES - ORDER CONFIRMATION*\n\n` +
    `📦 *Order No:* ${orderId || "Pending"}\n` +
    (restaurant ? `🏢 *Customer/Store:* ${restaurant}\n` : "") +
    (chefName ? `👤 *Receiver:* ${chefName} ${phone ? `(+91 ${phone})` : ""}\n` : "") +
    `💵 *Total Amount:* ₹${orderTotal || "0"} (${paymentMode})\n\n` +
    `📞 *Status:* Order placed successfully. Reefer delivery preparation in progress.\n` +
    `🚚 *Delivery:* Chilled Reefer Van Dispatch\n\n` +
    `_Sent from OurGrowth Customer Portal_`
  );

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1">
        <div className="max-w-5xl mx-auto px-margin-mobile lg:px-gutter py-12">
          {/* Success Banner */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center mx-auto mb-4 shadow-md"
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              Order Placed Successfully
            </span>
            <h1 className="font-headline-xl text-3xl sm:text-4xl font-extrabold text-primary mt-1">
              Order #{orderId || "Pending"} Received
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-2 max-w-lg mx-auto">
              Thank you{chefName ? <span className="font-bold text-primary">, {chefName}</span> : ""}. Your order has been received and is being prepared for dispatch.
            </p>
          </div>

          {/* Order Progress Workflow Card */}
          <div className="rounded-3xl border border-secondary/30 bg-secondary-container/20 p-6 sm:p-8 mb-8 text-left shadow-sm">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-primary">
              <PhoneCall className="h-4 w-4 text-secondary" />
              <span>Next Step: Order Confirmation &amp; Delivery Scheduling</span>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Our dispatch team will connect with your mobile number{phone ? <> (<strong>+91 {phone}</strong>)</> : ""} to confirm the preferred delivery window and address details.
            </p>

            {/* 4-Step Workflow Bar */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="rounded-2xl border border-secondary bg-surface-container-lowest p-3.5 text-center shadow-xs">
                <div className="text-secondary font-black">1. Order Placed</div>
                <div className="text-on-surface-variant text-[11px] mt-1">Confirmed ✅</div>
              </div>
              <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-3.5 text-center text-amber-950">
                <div className="font-black text-amber-800">2. Verification Call</div>
                <div className="text-amber-700 text-[11px] mt-1">Incoming on phone 📞</div>
              </div>
              <div className="rounded-2xl border border-blue-300 bg-blue-50/80 p-3.5 text-center text-blue-950">
                <div className="font-black text-blue-800">3. Clear Payment</div>
                <div className="text-blue-700 text-[11px] mt-1">UPI / NEFT / COD 💳</div>
              </div>
              <div className="rounded-2xl border border-purple-300 bg-purple-50/80 p-3.5 text-center text-purple-950">
                <div className="font-black text-purple-800">4. Factory Dispatch</div>
                <div className="text-purple-700 text-[11px] mt-1">Chilled Reefer Van 🚚</div>
              </div>
            </div>

            {/* Invoice Generation Policy Callout */}
            <div className="mt-5 pt-4 border-t border-secondary/20 flex items-start gap-3 text-xs text-on-surface-variant">
              <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div>
                <strong className="text-primary font-bold">Official GST Invoice Policy:</strong> Commercial GST tax invoices are generated upon payment verification and order confirmation by our operations desk prior to factory dispatch. Once confirmed, download certified tax invoices directly inside your Customer Portal.
              </div>
            </div>

            {/* Direct WhatsApp Send Requisition Button */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/919476020341?text=${whatsAppMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary hover:bg-primary text-white font-bold text-xs transition-colors shadow-sm"
              >
                <span>Send Order to WhatsApp (+91 94760 20341) →</span>
              </a>
              <Link
                href="/account"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs transition-colors"
              >
                <span>View in Customer Portal</span>
              </Link>
            </div>
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
                      SCHEDULED ROUTE
                    </span>
                  </div>
                  <span className="text-xs text-surface-container-high">
                    Operations Dispatch Desk: +91 94760 20341
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
                    <span className="font-bold text-xs text-primary block">Order Received</span>
                    <span className="text-[11px] text-on-surface-variant">Order Confirmed</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start md:flex-col md:items-center gap-3 text-left md:text-center flex-1">
                  <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary font-bold text-xs flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-xs text-secondary font-extrabold block">Verification Call</span>
                    <span className="text-[11px] text-on-surface-variant">Ops Desk Contacting</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start md:flex-col md:items-center gap-3 text-left md:text-center flex-1 opacity-60">
                  <div className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-xs text-on-surface block">Chilled Loading</span>
                    <span className="text-[11px] text-on-surface-variant">Cold Room Crating</span>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start md:flex-col md:items-center gap-3 text-left md:text-center flex-1 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant font-bold text-xs flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div>
                    <span className="font-bold text-xs text-on-surface block">Doorstep Delivery</span>
                    <span className="text-[11px] text-on-surface-variant">Reefer Cold-Chain Route</span>
                  </div>
                </div>
              </div>

              {/* Order Info Bar */}
              <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-container flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-on-surface-variant block">Customer / Store:</span>
                  <span className="font-bold text-primary">{restaurant || chefName || "Valued Customer"}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block">Order Amount:</span>
                  <span className="font-bold text-secondary">₹{orderTotal || "0"} ({paymentMode})</span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/account"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs transition-colors"
                  >
                    <span>My Account</span>
                  </Link>
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
              <span>Explore More Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/account"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs sm:text-sm transition-all"
            >
              <span>View My Account &amp; Orders</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
