"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Sparkles, ShoppingBag, ArrowRight, Award, Leaf, Layers } from "lucide-react";
import Floating from "@/components/animations/Floating";
import Reveal from "@/components/animations/Reveal";

interface HeroSectionProps {
  onOpenBulkModal: () => void;
  onExploreProducts: () => void;
}

export default function HeroSection({ onOpenBulkModal, onExploreProducts }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-[#07160d] via-[#0d2719] to-[#041009] text-on-primary overflow-hidden min-h-[720px] lg:min-h-[820px] flex flex-col justify-between pt-12 pb-14 rounded-b-[3rem] sm:rounded-b-[4rem] shadow-2xl"
    >
      {/* Background Image with Ambient Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0.15 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNI-Zhnqf4Bc4Z80xyh9ZcG5PgHZYZjDOAafR01lMMXThiMh4TqyUjki-RcEB3jM2soHYLy_8W-VS92TeZWdWACYe2rmuPBb9kTL4S6H0viCNcxX87VRiYqxPHRwp499Tmr5YTSAtKEmab384DBeNX0qxq4DkbXuhH_3hJfjrfs23kIvzOY-iYRu-Qv85vy9dBnHYXXgDOecLYzZaZfg8pgipfrSlTOhvfhjG7LzTFLgnk2bAktDnNxQylH1rsSefrIw"
            alt="Fresh Peeled Garlic Harvest"
            fill
            className="object-cover object-center filter blur-[0.5px]"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#07160d] via-[#0d2719]/80 to-[#07160d]/90" />

        {/* Ambient Glowing Orbs */}
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
        <div className="absolute -bottom-32 right-1/4 w-[600px] h-[600px] bg-primary-container/30 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
      </div>

      {/* Floating Accent Cards (Left & Right) */}
      <div className="absolute -left-10 bottom-24 w-64 h-64 lg:w-88 lg:h-88 opacity-30 lg:opacity-40 pointer-events-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)] z-0 hidden md:block">
        <Floating duration={7} yOffset={14} rotateOffset={3}>
          <div className="w-full h-full rounded-[3rem] p-3 bg-white/5 backdrop-blur-md rotate-[-8deg] border border-white/10 relative overflow-hidden aspect-square">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_Kw5xrGxNfAIULbpDWPYfhOLv5cfHf-rVNdGKMrSvN5IUuWjGWJM0-6slmV8TQMMAL2kDtZx7Z9jgSzEWR6tJK-QM8yiANk-Vvn0hI0OBcHys9xeRR1bd6wqU5Ac1vCZzYX2RCtToIJFcMaAFrUJ-ej9KmtqYsQwoj9eeaCxcTEqnoxmMMWJTRIg1AD6AIr9a_cFbe12BvRriShiDLXZfjQC7M2DiczKS4uzP8gJ-ltlcF6RRBZyrAnVNTTVBgKm-TQ"
              alt="Peeled Garlic Pack Accent"
              fill
              className="object-cover rounded-[2.5rem]"
            />
          </div>
        </Floating>
      </div>

      <div className="absolute -right-10 top-24 w-64 h-64 lg:w-88 lg:h-88 opacity-30 lg:opacity-40 pointer-events-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)] z-0 hidden md:block">
        <Floating duration={8} yOffset={16} rotateOffset={-3} delay={1}>
          <div className="w-full h-full rounded-[3rem] p-3 bg-white/5 backdrop-blur-md rotate-[10deg] border border-white/10 relative overflow-hidden aspect-square">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEzQUx7GS3EhxAXSiKaoAxdRi6_BYgoFmd0H50mScvxdcOONgzbtg69gn6mN-V49pcNrt1nKeRnNKL2Im2jSLXI3edA6Wk72I5h5OQx0S3Rh4bXcLO4oPQ4e9u-CKI5S7dQ9nHJ5qrV1pNeGCdpw1e5NnQJcX2egYA0D8g-eTyNJfE4yV_kg5DDa6sKTHjOLsqPX_rXhwalUP-9KaE6DzKhqdLV3IhBnpB5PYW2UZplU1eqDyNZAaAa0A1Gy9syse5vg"
              alt="Peeled Garlic Cloves Accent"
              fill
              className="object-cover rounded-[2.5rem]"
            />
          </div>
        </Floating>
      </div>

      {/* Central Hero Content */}
      <div className="max-w-5xl mx-auto px-margin-mobile lg:px-gutter relative z-10 flex flex-col items-center text-center my-auto pt-8">
        {/* Top Guarantee Pill Badge */}
        <Reveal direction="down" delay={0.1}>
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-surface-container-low/10 border border-secondary-fixed/30 backdrop-blur-xl text-primary-fixed font-label-md text-xs sm:text-label-md mb-6 shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed animate-ping" />
            <Truck className="w-4 h-4 text-secondary-fixed" />
            <span className="tracking-wide font-medium">B2B Wholesale Rates • Cold-Chain Logistics</span>
          </div>
        </Reveal>

        {/* Main Headline */}
        <Reveal direction="up" delay={0.2}>
          <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-[62px] text-surface-bright font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6 drop-shadow-md">
            Wholesale Rates For Commercial Kitchens &amp; Food Brands
          </h1>
        </Reveal>

        {/* Subhead */}
        <Reveal direction="up" delay={0.35}>
          <p className="font-body-lg text-base sm:text-xl text-surface-container-high/90 max-w-2xl leading-relaxed mb-10 font-normal">
            Supplying bulk restaurants, hotels &amp; caterers with daily cold-chain delivery in 1KG, 5KG &amp; 10KG packs with GST invoices.
          </p>
        </Reveal>

        {/* Interactive CTA Buttons */}
        <Reveal direction="up" delay={0.45}>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onExploreProducts}
              className="inline-flex items-center gap-3 bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-white font-label-lg text-sm sm:text-base px-8 sm:px-9 py-4 rounded-full shadow-[0_10px_25px_rgba(170,247,111,0.25)] hover:shadow-2xl transition-all duration-300 font-extrabold"
            >
              <ShoppingBag className="w-5 h-5 fill-current" />
              <span className="font-bold tracking-wide">ORDER NOW</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenBulkModal}
              className="inline-flex items-center gap-2.5 bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 border border-white/20 text-surface-bright font-label-lg text-sm sm:text-base px-7 sm:px-8 py-4 rounded-full transition-all backdrop-blur-md font-bold"
            >
              <Sparkles className="w-4 h-4 text-secondary-fixed" />
              <span>Wholesale B2B Enquiries</span>
            </motion.button>
          </div>
        </Reveal>

        {/* Trust Highlights Bar */}
        <Reveal direction="up" delay={0.6}>
          <div className="w-full max-w-4xl bg-surface-container-lowest/10 border border-white/15 rounded-3xl sm:rounded-full py-4 px-6 sm:px-8 backdrop-blur-xl shadow-2xl flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-xs sm:text-sm text-surface-bright font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-fixed shrink-0" />
              <span>ISO &amp; FSSAI Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-fixed shrink-0" />
              <span>100% Preservative Free</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-fixed shrink-0" />
              <span>Cold-Chain Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-fixed shrink-0" />
              <span>Wholesale Volume Rates</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
