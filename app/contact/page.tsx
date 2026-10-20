"use client";

import { useEffect, useState } from "react";
import { PhoneCall, Mail, MapPin, Truck, ShieldCheck, Send, CheckCircle2, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal, { StaggerContainer, StaggerItem } from "@/components/animations/Reveal";
import { dispatchHubs } from "@/data/hubs";
import { useToast } from "@/components/ui/Toast";
import { sendEnquiry, getBusinessInfo, getStaticPage } from "@/lib/api";

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

  // Dynamic CMS content state
  const [contactPhone, setContactPhone] = useState("+91 94760 20341");
  const [contactEmail, setContactEmail] = useState("supply@ourgrowth.in");
  const [instagramUrl, setInstagramUrl] = useState("https://www.instagram.com/ourgrowthenterprises/");
  const [facebookUrl, setFacebookUrl] = useState("https://www.facebook.com/profile.php?id=61594888355783");
  const [youtubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/@OurGrowthEnterprises");
  const [heroBadge, setHeroBadge] = useState("Cold-Chain Regional Network");
  const [heroHeadline, setHeroHeadline] = useState("Kitchen Dispatch Hubs & Contact Desks");
  const [heroSubtitle, setHeroSubtitle] = useState("Direct connections to our cold-storage dispatch terminals, regional logistics managers, and emergency kitchen supply lines across India.");

  useEffect(() => {
    // 1. Fetch dynamic business info (phone, email, social links)
    getBusinessInfo().then((infos) => {
      if (infos && infos.length > 0) {
        for (const item of infos) {
          if (item.key === 'contact_phone' && item.value) {
            setContactPhone(item.value);
          } else if (item.key === 'contact_email' && item.value) {
            setContactEmail(item.value);
          } else if (item.key === 'social_media') {
            if (item.social_instagram) setInstagramUrl(item.social_instagram);
            if (item.social_facebook) setFacebookUrl(item.social_facebook);
            if (item.social_youtube) setYoutubeUrl(item.social_youtube);
          }
        }
      }
    }).catch(() => {});

    // 2. Fetch dynamic static page hero text
    getStaticPage('contact').then((page) => {
      if (page) {
        if (page.headline) setHeroHeadline(page.headline);
        if (page.subtitle) setHeroSubtitle(page.subtitle);
        if (page.badge) setHeroBadge(page.badge);
      }
    }).catch(() => {});
  }, []);

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
                <span>{heroBadge}</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h1 className="font-display-hero text-3xl sm:text-5xl text-surface-bright font-extrabold tracking-tight mb-4">
                {heroHeadline}
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="text-surface-container-high text-xs sm:text-base max-w-2xl leading-relaxed mb-6">
                {heroSubtitle}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold">
                <a
                  href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                  className="bg-secondary-fixed text-on-secondary-fixed px-5 py-2.5 rounded-full shadow-md hover:bg-white transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Emergency Dispatch: {contactPhone}</span>
                </a>
                <a
                  href={`mailto:${contactEmail}`}
                  className="bg-white/10 text-white px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-secondary-fixed" />
                  <span>{contactEmail}</span>
                </a>
              </div>

              {/* Official Social Media Channels */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <span className="text-xs text-surface-container-high font-medium mr-1">Follow Us:</span>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] flex items-center justify-center text-white transition-all shadow-sm hover:scale-110"
                  title="Follow OurGrowth on Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#1877f2] flex items-center justify-center text-white transition-all shadow-sm hover:scale-110"
                  title="Follow OurGrowth on Facebook"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#ff0000] flex items-center justify-center text-white transition-all shadow-sm hover:scale-110"
                  title="Subscribe to OurGrowth on YouTube"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
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
