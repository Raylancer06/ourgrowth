"use client";

import { useState } from "react";
import { PhoneCall, Mail, MapPin, Truck, ShieldCheck, Send, CheckCircle2, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal, { StaggerContainer, StaggerItem } from "@/components/animations/Reveal";
import { dispatchHubs } from "@/data/hubs";
import { useToast } from "@/components/ui/Toast";
import { sendEnquiry } from "@/lib/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
    city: "",
    inquiryType: "Commercial Restaurant Bulk",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendEnquiry({
        type: 'contact',
        name: formData.name,
        business_name: formData.business,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        product_requested: formData.inquiryType,
        message: formData.message,
      });
    } catch (err) {
      console.error('Failed to send enquiry:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast("Requisition sent! Dispatch coordinator will call you in 15 minutes.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1">
        {/* Hero Header */}
        <section className="bg-gradient-to-br from-primary via-primary-container to-[#041009] text-on-primary py-12 px-margin-mobile lg:px-margin text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-secondary-fixed text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                <Truck className="w-4 h-4 text-secondary-fixed" />
                <span>Cold-Chain Regional Network</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h1 className="font-display-hero text-3xl sm:text-5xl text-surface-bright font-extrabold tracking-tight mb-4">
                Kitchen Dispatch Hubs &amp; Contact Desks
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="text-surface-container-high text-xs sm:text-base max-w-2xl leading-relaxed mb-6">
                Direct connections to our cold-storage dispatch terminals, regional logistics managers, and emergency kitchen supply lines across India.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold">
                <a
                  href="tel:+919476020341"
                  className="bg-secondary-fixed text-on-secondary-fixed px-5 py-2.5 rounded-full shadow-md hover:bg-white transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Emergency Dispatch: +91 94760 20341</span>
                </a>
                <a
                  href="mailto:supply@ourgrowth.in"
                  className="bg-white/10 text-white px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-secondary-fixed" />
                  <span>supply@ourgrowth.in</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Dispatch Hubs Grid */}
        <section className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter py-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-wider text-secondary">
              Regional Operations
            </span>
            <h2 className="font-headline-xl text-2xl sm:text-3xl font-extrabold text-primary mt-1">
              Temperature-Controlled Dispatch Hubs
            </h2>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {dispatchHubs.map((hub, i) => (
              <StaggerItem key={i}>
                <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container shadow-sm flex flex-col justify-between h-full hover:shadow-lg transition-shadow">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-extrabold text-secondary uppercase mb-2">
                      <MapPin className="w-4 h-4 text-secondary shrink-0" />
                      <span>{hub.state}</span>
                    </div>
                    <h3 className="font-headline-sm text-lg font-bold text-primary mb-2">
                      {hub.city}
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                      {hub.address}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-surface-container text-xs space-y-1.5">
                    <div className="flex items-center gap-1.5 text-primary font-bold">
                      <Clock className="w-3.5 h-3.5 text-secondary" />
                      <span>{hub.leadTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface-variant">
                      <Truck className="w-3.5 h-3.5 text-secondary" />
                      <span>{hub.reeferFleet}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface-variant pt-1 font-semibold">
                      <PhoneCall className="w-3.5 h-3.5 text-secondary" />
                      <span>{hub.phone} ({hub.manager})</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Contact Requisition Form */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-10 border border-surface-container shadow-sm max-w-4xl mx-auto">
            <div className="mb-8 text-center max-w-lg mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                Direct Dispatch Request
              </span>
              <h3 className="font-headline-sm text-2xl font-bold text-primary mt-1">
                Fast Kitchen Supply Requisition
              </h3>
              <p className="text-xs text-on-surface-variant mt-2">
                Submit today&apos;s garlic requirements and our cold-chain coordinator will share today&apos;s locked-in rate chart within 15 minutes.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-10 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-secondary-container text-secondary flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-headline-sm text-xl font-bold text-primary mb-1">
                  Requisition Logged!
                </h4>
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  We have assigned your inquiry to our dispatch lead. Check your WhatsApp ({formData.phone || "provided phone"}) for the locked rate card.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Chef Rajesh Kulkarni"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      Business / Kitchen Name
                    </label>
                    <input
                      type="text"
                      placeholder="Spice Route Cloud Kitchens"
                      value={formData.business}
                      onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
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
                      placeholder="+91 94760 20341"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      Official Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="procurement@brand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      Delivery City &amp; Pincode *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Kolkata - 700007"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      Inquiry Type *
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <option>Commercial Restaurant Bulk (50kg+ Daily/Weekly)</option>
                      <option>Retail Pack Inquiry (500g &amp; 1kg packs)</option>
                      <option>Catering Event Supply (One-time large order)</option>
                      <option>Distributorship / APMC Mandi Dealership</option>
                      <option>Free Kitchen Sample Evaluation Box</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Requirement Notes / Tone
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mention expected weekly tonnage, packing preference (vacuum nitrogen pouches vs 5kg crates), or trial sample request..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-secondary hover:bg-primary text-on-secondary font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Requisition &amp; Lock Mandi Rate</span>
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
