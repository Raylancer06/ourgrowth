"use client";

import Link from "next/link";
import { ShieldCheck, Truck, RotateCcw, Lock, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PoliciesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary via-[#0f3d23] to-[#041009] text-on-primary py-12 px-margin-mobile lg:px-margin text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-secondary-fixed text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
              <ShieldCheck className="w-4 h-4 text-secondary-fixed" />
              <span>Commercial Trust &amp; Compliance</span>
            </div>
            <h1 className="font-display-hero text-3xl sm:text-5xl text-surface-bright font-extrabold tracking-tight mb-4">
              Policies, Cold-Chain Logistics &amp; Customer Assurance
            </h1>
            <p className="text-surface-container-high text-xs sm:text-base max-w-2xl leading-relaxed">
              Transparent operating protocols governing temperature controls, kitchen delivery inspections, FSSAI regulatory compliance, and replacement guarantees.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-5xl mx-auto px-margin-mobile lg:px-gutter py-12 space-y-10 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          {/* Section 1 */}
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-primary">
                1. Cold-Chain Transportation &amp; Delivery Policy
              </h2>
            </div>
            <div className="space-y-3">
              <p>
                All OurGrowth peeled garlic orders are dispatched exclusively in dedicated temperature-monitored refrigerated vehicles (Reefers) maintained strictly between <strong>2°C and 4°C</strong>.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li><strong>Morning Delivery Slots:</strong> Standard commercial shipments in partner cities (Kolkata, Mumbai, Bengaluru, Delhi NCR) are fulfilled between <strong>6:00 AM and 8:30 AM</strong>.</li>
                <li><strong>Inter-State Transit:</strong> Long-haul orders travel in double-walled insulated thermocol master crates with dry gel packs to prevent condensation build-up.</li>
                <li><strong>Inspection on Arrival:</strong> Kitchen staff are encouraged to inspect cargo temperature with the driver&apos;s digital probe thermometer before signing the consignment note.</li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-primary">
                2. 100% Usable Yield &amp; Purity Assurance
              </h2>
            </div>
            <div className="space-y-3">
              <p>
                We operate under strict agricultural contract standards where zero toxic chemicals, chlorine bleaches, or sulfur soaking baths are ever utilized.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li><strong>Zero Skin Residue:</strong> Our mechanical pneumatic air separators ensure that 100% of the purchased net weight is ready-to-cook whole cloves.</li>
                <li><strong>FSSAI Registration:</strong> Processed under FSSAI Central License #12823000000000 in sanitary food-grade clean rooms.</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-primary">
                3. On-the-Spot Replacement &amp; Credit Policy
              </h2>
            </div>
            <div className="space-y-3">
              <p>
                Because fresh peeled garlic is a perishable cold-chain agricultural produce, claims must be registered at the time of delivery inspection.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li>If any bag exhibits temperature breakdown or seal leakage upon driver delivery, the crate will be replaced immediately on the next available morning route, or credited on your GST statement.</li>
                <li>Report quality remarks to your dedicated relationship manager within 4 hours of receipt.</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-primary">
                4. Data Confidentiality &amp; GST Compliance
              </h2>
            </div>
            <p>
              We treat corporate kitchen volumes and restaurant rate contracts with strict business confidentiality. Trade accounts receive automated GST E-Way invoices compatible with all enterprise ERP software.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
