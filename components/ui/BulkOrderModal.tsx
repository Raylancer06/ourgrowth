"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Package, Truck, ShieldCheck, Building2 } from "lucide-react";

interface BulkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export default function BulkOrderModal({
  isOpen,
  onClose,
  defaultProduct = "Grade A Jumbo Peeled",
}: BulkOrderModalProps) {
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    phone: "",
    city: "",
    product: defaultProduct,
    quantity: "50kg",
    deliveryCadence: "Daily Morning",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Reset after a delay
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-inverse-surface/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-surface-container overflow-hidden z-10 my-8"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-container p-6 text-on-primary flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/15 text-secondary-fixed text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Wholesale B2B Rate Desk</span>
                </div>
                <h3 className="font-headline-sm text-2xl font-bold text-surface-bright">
                  Request Bulk Quote &amp; Samples
                </h3>
                <p className="text-surface-container-high text-xs sm:text-sm mt-1">
                  Guaranteed 2°C–4°C cold-chain logistics for restaurants, caterers &amp; kitchens.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Form */}
            <div className="p-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-secondary mb-4 shadow-inner">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-headline-sm text-2xl font-bold text-primary mb-2">
                    Enquiry Received!
                  </h4>
                  <p className="text-on-surface-variant text-sm max-w-sm">
                    Our wholesale supply manager will contact{" "}
                    <span className="font-bold text-primary">{formData.phone || "your number"}</span>{" "}
                    within 30 minutes with customized commercial pricing.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Restaurant / Business Name
                      </label>
                      <div className="relative">
                        <input
                          required
                          type="text"
                          placeholder="e.g. Royal Kitchens"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          className="w-full bg-surface-container-low border border-surface-container rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Contact Person
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Chef Rahim"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full bg-surface-container-low border border-surface-container rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Phone / WhatsApp (for rates)
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-surface-container-low border border-surface-container rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        City / Destination
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Kolkata, Bengaluru, Mumbai"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-surface-container-low border border-surface-container rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Garlic Grade Needed
                      </label>
                      <select
                        value={formData.product}
                        onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                        className="w-full bg-surface-container-low border border-surface-container rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all"
                      >
                        <option>Grade A Jumbo Peeled</option>
                        <option>Dum Biriyani Special</option>
                        <option>Cloud Kitchen Crate</option>
                        <option>Pure Puree &amp; Paste Blend</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Estimated Weekly Volume
                      </label>
                      <select
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full bg-surface-container-low border border-surface-container rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all"
                      >
                        <option>10kg - 25kg (Trial Batch)</option>
                        <option>50kg - 100kg (Weekly)</option>
                        <option>100kg - 500kg (High-Volume)</option>
                        <option>500kg+ (Contract Distribution)</option>
                      </select>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="bg-surface-container-low/70 border border-surface-container rounded-2xl p-3 flex items-center justify-between text-xs text-on-surface-variant">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Truck className="w-4 h-4 text-secondary" /> Direct Cold-Chain
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Package className="w-4 h-4 text-secondary" /> Sample Pack Available
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Building2 className="w-4 h-4 text-secondary" /> GST Invoice
                    </span>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-full text-sm font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-3 rounded-full text-sm font-bold bg-secondary hover:bg-primary text-on-secondary shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                    >
                      Send Bulk Rate Request →
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
