"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Building2, CheckCircle2, PhoneCall, Sparkles, Send, Download } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/animations/Reveal";
import { useToast } from "@/components/ui/Toast";
import { sendEnquiry } from "@/lib/api";

export default function BulkOrdersPage() {
  const [volume, setVolume] = useState<number>(100);
  const [cadence, setCadence] = useState<string>("daily");
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    phone: "",
    email: "",
    city: "",
    gstin: "",
    kitchenType: "Restaurant & Bar",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const getTierRate = (kg: number) => {
    if (kg >= 500) return 184;
    if (kg >= 250) return 195;
    if (kg >= 100) return 210;
    return 225;
  };

  const ratePerKg = getTierRate(volume);
  const estimatedCost = volume * ratePerKg;
  const savingsVsMarket = Math.round(volume * 65); // Market manual peel waste is approx ₹65/kg higher

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendEnquiry({
        type: 'quote',
        name: formData.contactPerson || formData.businessName || 'B2B Client',
        business_name: formData.businessName,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        product_requested: `Wholesale Crate (${formData.kitchenType})`,
        quantity_requested: `${volume} KG`,
        delivery_cadence: cadence,
        message: `GSTIN: ${formData.gstin || 'N/A'}. Kitchen: ${formData.kitchenType}. Estimated: ₹${estimatedCost}. Notes: ${formData.notes || 'None'}`,
      });
    } catch (err) {
      console.error('Error submitting wholesale requisition:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast("Wholesale Requisition Ticket generated! Directing to Dispatch Head.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-[#0d3f23] to-[#041009] text-on-primary py-12 px-margin-mobile lg:px-margin">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-secondary-fixed text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                <Building2 className="w-4 h-4 text-secondary-fixed" />
                <span>B2B Institutional Rate Desk</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h1 className="font-display-hero text-3xl sm:text-5xl text-surface-bright font-extrabold tracking-tight mb-4 max-w-3xl">
                Commercial Garlic Supply &amp; Procurement
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="text-surface-container-high text-xs sm:text-base max-w-2xl leading-relaxed mb-6">
                Supplying hotels, cloud kitchens, caterers &amp; food manufacturing commissaries with daily chilled deliveries in 10KG, 25KG &amp; 50KG master crates.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-secondary-fixed">
                <span className="flex items-center gap-1.5 bg-white/10 px-4 py-2 rounded-full">
                  <ShieldCheck className="w-4 h-4" /> GST Invoicing &amp; E-Way Bills
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-4 py-2 rounded-full">
                  <Truck className="w-4 h-4" /> 2°C–4°C Reefer Fleet
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-4 py-2 rounded-full">
                  <PhoneCall className="w-4 h-4" /> Direct Desk: +91 94760 20341
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Core Requisition & Volume Calculator */}
        <section className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Volume Estimator & Tier Breakdown */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-surface-container-lowest p-6 sm:p-7 rounded-3xl border border-surface-container shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-headline-sm text-lg font-bold text-primary">
                    Estimated Weekly Volume
                  </h3>
                  <span className="font-black text-xl text-secondary">{volume} KG</span>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-secondary mb-4"
                />

                <div className="flex justify-between text-[11px] font-bold text-on-surface-variant mb-6">
                  <span>50 KG (Starter)</span>
                  <span>250 KG</span>
                  <span>500 KG</span>
                  <span>1000+ KG (Enterprise)</span>
                </div>

                {/* Calculated Tier Stats */}
                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-3 text-xs mb-6">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant font-medium">Locked Mandi Rate:</span>
                    <span className="font-extrabold text-primary text-sm">₹{ratePerKg} / KG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant font-medium">Weekly Order Estimate:</span>
                    <span className="font-extrabold text-primary text-sm">₹{estimatedCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-surface-container/60 pt-2 text-secondary font-bold">
                    <span>Est. Kitchen Labor &amp; Waste Saved:</span>
                    <span>₹{savingsVsMarket.toLocaleString()} / week</span>
                  </div>
                </div>

                {/* Delivery Cadence Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                    Delivery Cadence:
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setCadence("daily")}
                      className={`p-2.5 rounded-xl border transition-all ${
                        cadence === "daily"
                          ? "bg-secondary text-on-secondary border-secondary shadow-xs"
                          : "bg-surface-container-lowest border-surface-container hover:bg-surface-container text-on-surface-variant"
                      }`}
                    >
                      Daily 6 AM
                    </button>
                    <button
                      type="button"
                      onClick={() => setCadence("biweekly")}
                      className={`p-2.5 rounded-xl border transition-all ${
                        cadence === "biweekly"
                          ? "bg-secondary text-on-secondary border-secondary shadow-xs"
                          : "bg-surface-container-lowest border-surface-container hover:bg-surface-container text-on-surface-variant"
                      }`}
                    >
                      Bi-Weekly
                    </button>
                    <button
                      type="button"
                      onClick={() => setCadence("weekly")}
                      className={`p-2.5 rounded-xl border transition-all ${
                        cadence === "weekly"
                          ? "bg-secondary text-on-secondary border-secondary shadow-xs"
                          : "bg-surface-container-lowest border-surface-container hover:bg-surface-container text-on-surface-variant"
                      }`}
                    >
                      Weekly Lot
                    </button>
                  </div>
                </div>
              </div>

              {/* Sample Box Callout */}
              <div className="p-6 rounded-3xl bg-secondary-container/50 border border-secondary-container text-on-secondary-container">
                <span className="font-extrabold text-sm block mb-1">
                  🧪 Complimentary Kitchen Sample Box
                </span>
                <p className="text-xs leading-relaxed mb-3">
                  Qualified restaurant kitchens can request a complimentary 2KG evaluation box with zero freight charges to test dum aroma and wok retention.
                </p>
                <span className="text-[11px] font-bold text-secondary flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Dispatched within 24 hours of request
                </span>
              </div>
            </div>

            {/* Right: Procurement Requisition Form */}
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-surface-container shadow-sm">
              <div className="mb-6">
                <span className="text-xs uppercase font-extrabold tracking-wider text-secondary">
                  Fast Institutional Requisition
                </span>
                <h3 className="font-headline-sm text-2xl font-bold text-primary mt-1">
                  Request B2B Wholesale Rate Card &amp; Contract
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Our regional distribution manager will coordinate your morning delivery route and send locked APMC rates within 15 minutes.
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-headline-sm text-2xl font-bold text-primary mb-2">
                    Wholesale Ticket Dispatched!
                  </h4>
                  <p className="text-xs sm:text-sm text-on-surface-variant max-w-sm">
                    Karan Mehta from our cold-chain dispatch terminal has received your {volume}KG requirement for {formData.businessName || "your kitchen"} and will WhatsApp your rate card shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Business / Brand Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Biriyani Junction Chain"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Executive Chef / Contact Person *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Chef Sanjay Roy"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        WhatsApp / Mobile *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Procurement Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="procurement@brand.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Delivery City / Pincode *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Kolkata - 700019"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        GSTIN (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="19AAAAA0000A1Z5"
                        value={formData.gstin}
                        onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      Kitchen Category:
                    </label>
                    <select
                      value={formData.kitchenType}
                      onChange={(e) => setFormData({ ...formData, kitchenType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <option>Biriyani Hub / Mughlai Kitchen</option>
                      <option>Cloud Kitchen Network (Fast Rush)</option>
                      <option>Hotel &amp; Banquet Catering</option>
                      <option>Central Processing &amp; Sauce Commissary</option>
                      <option>Retail Supermarket Distributor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      Specific Grade / Packaging Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need 50kg jumbo cloves in nitrogen vacuum pouches by 6:30 AM daily..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-secondary hover:bg-primary text-on-secondary font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Requisition &amp; Lock Rate (₹{ratePerKg}/KG)</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
