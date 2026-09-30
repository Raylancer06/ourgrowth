"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, HelpCircle, PhoneCall, Mail, Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/animations/Reveal";

interface ExtendedFaq {
  id: string;
  category: "storage" | "rates" | "hygiene" | "delivery";
  question: string;
  answer: string;
}

const extendedFaqs: ExtendedFaq[] = [
  {
    id: "faq-1",
    category: "storage",
    question: "How should peeled garlic be stored for maximum freshness?",
    answer: "Store our peeled garlic pouches in your commercial walk-in or kitchen refrigerator at 2°C to 4°C. Our breathable micro-perforated pouches maintain peak aroma, firm texture, and crispness for up to 30 days without freezing. Keep the pouch sealed when not in use to prevent ambient moisture absorption.",
  },
  {
    id: "faq-2",
    category: "hygiene",
    question: "Do you use water soaking or chemicals to peel the skins?",
    answer: "Never. We use high-velocity filtered dry air-jet friction peeling. Traditional wet peeling washes away volatile allicin oils, accelerates fermentation, and leaches water into cloves. Our dry pneumatic method leaves cloves pristine, whole, and completely dry to the touch.",
  },
  {
    id: "faq-3",
    category: "rates",
    question: "What are the minimum order quantities for restaurant wholesale?",
    answer: "Commercial wholesale rates begin at 10KG crates. For institutional contracts exceeding 50KG per week, we assign dedicated cold-chain delivery routes with locked-in seasonal APMC pricing and consolidated monthly GST invoicing.",
  },
  {
    id: "faq-4",
    category: "hygiene",
    question: "Is OurGrowth certified by food safety authorities?",
    answer: "Yes, our processing and packaging hubs are 100% compliant with FSSAI certified standard operating procedures (Licence: 12823000000000) under strict temperature-controlled sanitary standards. Batch lab reports are available upon request.",
  },
  {
    id: "faq-5",
    category: "delivery",
    question: "How fast is transit and morning kitchen delivery?",
    answer: "For partner metro hubs (Kolkata, Mumbai, Bengaluru, Delhi NCR), we provide morning delivery between 6:00 AM and 8:30 AM before kitchen prep rush. Pan-India inter-state routes operate via chilled Reefer vans within 24–48 hours.",
  },
  {
    id: "faq-6",
    category: "storage",
    question: "Can peeled garlic be frozen?",
    answer: "While whole raw cloves can technically be frozen, freezing ruptures internal plant cells, causing cloves to turn soft and translucent upon thawing. We strongly recommend storing cloves at 2°C–4°C in their original pouch where they stay crisp for 30 days.",
  },
  {
    id: "faq-7",
    category: "rates",
    question: "Can we get sample packs before signing a weekly contract?",
    answer: "Yes! Commercial restaurants and hotels can request a complimentary 2KG evaluation box to test allicin potency and dum steam retention. Contact our Wholesale Desk or use the Bulk Orders portal.",
  },
  {
    id: "faq-8",
    category: "delivery",
    question: "What payment methods are supported for restaurant delivery?",
    answer: "We support Pay on Delivery via Cash or UPI QR Code, as well as RTGS/NEFT bank transfer for institutional accounts with 15-day or 30-day billing terms upon trade verification.",
  },
];

export default function FaqsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "storage", label: "Storage & Shelf-Life" },
    { id: "hygiene", label: "Hygiene & Air-Peeling" },
    { id: "rates", label: "Wholesale & Pricing" },
    { id: "delivery", label: "Cold-Chain Delivery" },
  ];

  const filteredFaqs = extendedFaqs.filter((f) => {
    const matchesCat = selectedCategory === "all" || f.category === selectedCategory;
    const matchesQuery =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
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
                <HelpCircle className="w-4 h-4 text-secondary-fixed" />
                <span>Knowledge Base &amp; Freshness Support</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h1 className="font-display-hero text-3xl sm:text-5xl text-surface-bright font-extrabold tracking-tight mb-4">
                Frequently Asked Questions
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="text-surface-container-high text-xs sm:text-base max-w-2xl leading-relaxed mb-6">
                Learn how our dry air-peeling technology works, guidelines on refrigeration, and commercial wholesale contract rates.
              </p>
            </Reveal>

            {/* Live Search Bar */}
            <Reveal direction="up" delay={0.3} className="w-full max-w-xl">
              <div className="relative w-full">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search questions (e.g. storage, shelf-life, soaking, bulk rates)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-full bg-surface-container-lowest text-on-surface placeholder:text-outline text-xs sm:text-sm font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary-fixed"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="max-w-4xl mx-auto px-margin-mobile lg:px-gutter py-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* FAQs Accordion List */}
        <section className="max-w-4xl mx-auto px-margin-mobile lg:px-gutter pb-16">
          <div className="flex flex-col gap-3.5">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12 bg-surface-container-low rounded-3xl p-6">
                <p className="text-sm font-bold text-on-surface-variant">No answers matching your search.</p>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-sm border border-surface-container transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between text-left font-headline-sm text-sm sm:text-base text-primary font-bold cursor-pointer group"
                    >
                      <span className="pr-4 group-hover:text-secondary transition-colors">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 text-secondary" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-3 pt-3 border-t border-surface-container text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>

          {/* Need help callout */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-secondary-container/50 border border-secondary-container flex flex-col sm:flex-row items-center justify-between gap-6 text-on-secondary-container">
            <div>
              <h4 className="font-headline-sm text-base sm:text-lg font-bold text-primary">
                Still have a question about custom packing or farm cluster sourcing?
              </h4>
              <p className="text-xs sm:text-sm mt-1">
                Our agricultural procurement leads are available on WhatsApp and direct line.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="tel:+919476020341"
                className="bg-primary text-on-primary px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-primary-container transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-secondary-fixed" />
                <span>+91 94760 20341</span>
              </a>
              <Link
                href="/contact"
                className="bg-white/70 hover:bg-white text-primary px-5 py-2.5 rounded-full text-xs font-bold transition-colors"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
