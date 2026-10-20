"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShoppingBag } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { getBanners } from "@/lib/api";

interface CtaBannerProps {
  onOpenBulkModal: () => void;
  onExploreProducts: () => void;
}

export default function CtaBanner({ onOpenBulkModal, onExploreProducts }: CtaBannerProps) {
  const [headline, setHeadline] = useState("Ready for better, fresher peeled garlic in your kitchen?");
  const [subtitle, setSubtitle] = useState("Request sample pouches for your restaurant or schedule reliable weekly wholesale crates. Freshly peeled. Hygienically packed. Ready to cook.");
  const [badge, setBadge] = useState("Commercial & Retail Supply");
  const [ctaText, setCtaText] = useState("Shop Produce Catalog");

  useEffect(() => {
    getBanners().then((banners) => {
      if (banners && banners.length > 0) {
        const cta = banners.find(b => b.placement === 'cta' || b.slug === 'banner-bottom-cta');
        if (cta) {
          if (cta.headline) setHeadline(cta.headline);
          if (cta.subtitle) setSubtitle(cta.subtitle);
          if (cta.badge) setBadge(cta.badge);
          if (cta.cta_text) setCtaText(cta.cta_text);
        }
      }
    }).catch(() => {});
  }, []);

  return (
    <section className="py-space-2xl bg-gradient-to-br from-primary via-[#0a482b] to-[#00381e] text-on-primary relative overflow-hidden rounded-t-[3rem] sm:rounded-t-[4rem] shadow-2xl">
      {/* Ambient background orbs */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-primary-container/40 blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter relative z-10 text-center flex flex-col items-center">
        <Reveal direction="down">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-secondary-fixed font-label-md text-xs sm:text-label-md mb-6 border border-white/10">
            <Sparkles className="w-4 h-4 text-secondary-fixed" />
            <span className="tracking-wider uppercase font-semibold">{badge}</span>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <h2 className="font-headline-xl text-2xl sm:text-4xl lg:text-5xl text-surface-bright font-extrabold tracking-tight max-w-3xl mb-6 leading-tight">
            {headline}
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <p className="font-body-lg text-sm sm:text-lg text-surface-container-high max-w-2xl mb-10 leading-relaxed font-normal">
            {subtitle}
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onExploreProducts}
              className="inline-flex items-center gap-2.5 bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-white font-label-lg text-xs sm:text-label-lg px-8 sm:px-9 py-4 rounded-full shadow-xl shadow-secondary-container/20 transition-all font-extrabold"
            >
              <ShoppingBag className="w-4 h-4 fill-current" />
              <span>{ctaText}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenBulkModal}
              className="inline-flex items-center gap-2.5 bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 border border-white/20 text-surface-bright font-label-lg text-xs sm:text-label-lg px-8 sm:px-9 py-4 rounded-full transition-all backdrop-blur-md font-bold"
            >
              <span>Request Bulk Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
