"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Quote, ShieldCheck, CheckCircle2, MessageSquarePlus, Sparkles, Building2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal, { StaggerContainer, StaggerItem } from "@/components/animations/Reveal";
import Counter from "@/components/animations/Counter";
import { testimonials } from "@/data/testimonials";
import { useToast } from "@/components/ui/Toast";
import { getTestimonials } from "@/lib/api";

interface ExtendedReview {
  id: string;
  name: string;
  role: string;
  restaurant: string;
  category: "biriyani" | "cloud" | "banquet" | "finedining";
  rating: number;
  comment: string;
  verifiedVolume: string;
  avatar: string;
}

const allChefReviews: ExtendedReview[] = [
  {
    id: "r1",
    name: "Rahim Khan",
    role: "Master Chef",
    restaurant: "Nizam Biriyani Hub (4 Outlets)",
    category: "biriyani",
    rating: 5,
    comment: "We run four high-cadence biriyani outlets. Peeling 40kg of garlic every morning was an absolute nightmare. OurGrowth provides dry, crisp cloves that retain that pungent kick throughout 90 minutes of sealed dum steaming.",
    verifiedVolume: "Verified 40KG/Day Account",
    avatar: "RK",
  },
  {
    id: "r2",
    name: "Chef Sunita Das",
    role: "Founder & Executive Chef",
    restaurant: "Urban Wok Cloud Kitchens",
    category: "cloud",
    rating: 5,
    comment: "The dry air-peeled process genuinely makes a difference. Previous market suppliers soaked garlic in water which spoiled our garlic oil sauces within 2 days. OurGrowth cloves last fresh in our walk-in for weeks.",
    verifiedVolume: "Verified 25KG/Week Account",
    avatar: "SD",
  },
  {
    id: "r3",
    name: "Anand Mukherjee",
    role: "Culinary Director",
    restaurant: "Royal Bengal Caterers",
    category: "banquet",
    rating: 5,
    comment: "Their 10kg master crate supply has never missed a morning delivery window. When catering for weddings with 2,000+ plates, knowing our garlic is 100% clean and ready gives our kitchen brigade massive peace of mind.",
    verifiedVolume: "Verified 150KG Event Orders",
    avatar: "AM",
  },
  {
    id: "r4",
    name: "Chef Rajesh Nair",
    role: "Head Chef",
    restaurant: "Saffron Pavilion Fine Dining",
    category: "finedining",
    rating: 5,
    comment: "The Grade A Jumbo Table cloves are perfectly uniform with zero root hairs or brownish skin remnants. We roast them whole in olive oil for our signature bread baskets.",
    verifiedVolume: "Verified Grade A Partner",
    avatar: "RN",
  },
  {
    id: "r5",
    name: "Manish Aggarwal",
    role: "Operations Head",
    restaurant: "Curry Express Cloud Network",
    category: "cloud",
    rating: 5,
    comment: "Eliminating manual knife prep saved our prep staff 2.5 hours every morning. That directly reduced overtime kitchen pay while guaranteeing zero batch inconsistency across our 6 cloud hubs.",
    verifiedVolume: "Verified Multi-Hub Account",
    avatar: "MA",
  },
  {
    id: "r6",
    name: "Ustad Gulam Rasool",
    role: "Bawarchi Head",
    restaurant: "Deccan Darbar Caterers",
    category: "biriyani",
    rating: 5,
    comment: "Pure garlic aroma without sour fermentation smell. Once the handi opens, the raw allicin aroma fills the banquet hall. 100% genuine agricultural quality.",
    verifiedVolume: "Verified 50KG Crate Partner",
    avatar: "GR",
  },
];

export default function TestimonialsPage() {
  const [reviewsList, setReviewsList] = useState<ExtendedReview[]>(allChefReviews);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", restaurant: "", comment: "", rating: 5 });
  const { showToast } = useToast();

  useEffect(() => {
    getTestimonials().then((apiTestimonials) => {
      if (apiTestimonials && apiTestimonials.length > 0) {
        const mapped: ExtendedReview[] = apiTestimonials.map((t, idx) => ({
          id: `cms-t-${t.id || idx}`,
          name: t.client_name,
          role: t.role || "Verified Chef / Partner",
          restaurant: t.company,
          category: (idx % 2 === 0 ? "biriyani" : "cloud") as any,
          rating: t.rating || 5,
          comment: t.quote,
          verifiedVolume: t.verified_volume || "Verified Commercial Account",
          avatar: t.avatar || t.client_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || "OG",
        }));
        setReviewsList(mapped);
      }
    }).catch(() => {});
  }, []);

  const categories = [
    { id: "all", label: "All Chef Reviews" },
    { id: "biriyani", label: "Biriyani Hubs" },
    { id: "cloud", label: "Cloud Kitchens" },
    { id: "banquet", label: "Banquets & Caterers" },
    { id: "finedining", label: "Fine Dining" },
  ];

  const filteredReviews = activeCategory === "all"
    ? reviewsList
    : reviewsList.filter((r) => r.category === activeCategory);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    showToast("Thank you, Chef! Your kitchen review has been submitted for verification.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-container to-[#041009] text-on-primary py-12 px-margin-mobile lg:px-margin text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-secondary-fixed text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                <Star className="w-4 h-4 text-secondary-fixed fill-secondary-fixed" />
                <span>Verified Commercial Endorsements</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h1 className="font-display-hero text-3xl sm:text-5xl text-surface-bright font-extrabold tracking-tight mb-4">
                Trusted by 180+ Commercial Kitchens Across India
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="text-surface-container-high text-xs sm:text-base max-w-2xl leading-relaxed mb-8">
                Read real feedback from executive chefs, biriyani masters, cloud kitchen founders, and banquet operators who rely on our daily cold-chain deliveries.
              </p>
            </Reveal>

            {/* Metrics Counter Bar */}
            <Reveal direction="up" delay={0.3} className="w-full max-w-3xl">
              <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-white/15 text-center">
                <div>
                  <div className="font-metric-counter text-2xl sm:text-4xl font-extrabold text-white">
                    <Counter value={98} suffix="%" />
                  </div>
                  <div className="text-[11px] text-surface-container-high mt-1 font-bold">Satisfaction Rate</div>
                </div>
                <div>
                  <div className="font-metric-counter text-2xl sm:text-4xl font-extrabold text-secondary-fixed">
                    <Counter value={180} suffix="+" />
                  </div>
                  <div className="text-[11px] text-surface-container-high mt-1 font-bold">Active Partner Kitchens</div>
                </div>
                <div>
                  <div className="font-metric-counter text-2xl sm:text-4xl font-extrabold text-white">
                    <Counter value={24000} suffix="KG+" />
                  </div>
                  <div className="text-[11px] text-surface-container-high mt-1 font-bold">Monthly Cold-Chain Supply</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Filter Categories & Action Button */}
        <section className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-secondary hover:bg-primary text-on-secondary px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm shrink-0 flex items-center gap-1.5"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Submit Kitchen Feedback</span>
            </button>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter pb-space-2xl">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => (
              <StaggerItem key={rev.id}>
                <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-7 border border-surface-container shadow-sm flex flex-col justify-between h-full hover:shadow-lg transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary">
                        <Quote className="w-5 h-5 fill-current" />
                      </div>
                      <span className="text-[11px] font-bold text-secondary bg-secondary-container/40 px-2.5 py-0.5 rounded-full">
                        {rev.verifiedVolume}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-secondary mb-3">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6 font-normal">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-surface-container">
                    <div className="w-11 h-11 rounded-full bg-primary text-on-primary font-extrabold flex items-center justify-center text-xs shadow-sm shrink-0">
                      {rev.avatar}
                    </div>
                    <div>
                      <div className="font-headline-sm text-sm font-bold text-primary">
                        {rev.name}
                      </div>
                      <div className="font-body-sm text-[11px] text-on-surface-variant">
                        {rev.role}, {rev.restaurant}
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Feedback Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm">
            <div className="bg-surface-container-lowest p-6 rounded-3xl max-w-md w-full border border-surface-container shadow-2xl">
              <h3 className="font-headline-sm text-xl font-bold text-primary mb-1">
                Submit Kitchen Feedback
              </h3>
              <p className="text-xs text-on-surface-variant mb-4">
                Share your kitchen experience with OurGrowth peeled garlic.
              </p>
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                <input
                  required
                  type="text"
                  placeholder="Your Name & Title (e.g. Chef Vikram)"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-surface-container-low text-xs border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <input
                  required
                  type="text"
                  placeholder="Restaurant / Kitchen Brand"
                  value={newReview.restaurant}
                  onChange={(e) => setNewReview({ ...newReview, restaurant: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-surface-container-low text-xs border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="How has our fresh peeled garlic improved your kitchen prep or food quality?"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-surface-container-low text-xs border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-full text-xs font-bold text-on-surface-variant"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-secondary text-on-secondary text-xs font-bold"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
