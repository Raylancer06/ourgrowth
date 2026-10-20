"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Wind, CheckCircle2, ArrowRight, Truck, Award, Sparkles, Building2, Users } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Marquee from "@/components/animations/Marquee";
import Reveal, { StaggerContainer, StaggerItem } from "@/components/animations/Reveal";
import Counter from "@/components/animations/Counter";
import { tickerItems } from "@/data/ticker";
import { getStaticPage } from "@/lib/api";

export default function AboutPage() {
  const [badge, setBadge] = useState("The Pure Peel Revolution");
  const [headline, setHeadline] = useState("Cultivating Trust, Delivering Pure Flavor.");
  const [subtitle, setSubtitle] = useState("Founded to eliminate manual prep fatigue and toxic bleaching shortcuts, OurGrowth Enterprises provides premium, ready-to-cook, cold-chain peeled garlic directly from contracted Indian fields to commercial kitchens and discerning homes.");

  useEffect(() => {
    getStaticPage('about').then((page) => {
      if (page) {
        if (page.badge) setBadge(page.badge);
        if (page.headline) setHeadline(page.headline);
        if (page.subtitle) setSubtitle(page.subtitle);
      }
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1">
        {/* Ticker Ribbon */}
        <div className="w-full bg-secondary-container text-on-secondary-container py-3 overflow-hidden shadow-inner font-label-md text-xs sm:text-label-md font-bold border-y border-secondary/20">
          <Marquee speed="normal" pauseOnHover={true}>
            {tickerItems.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>{item}</span>
              </span>
            ))}
          </Marquee>
        </div>

        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-surface via-surface-container-low to-surface py-space-2xl px-margin-mobile lg:px-margin">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
              {/* Text Column */}
              <div className="lg:col-span-7 flex flex-col gap-space-md">
                <Reveal direction="down">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant self-start font-label-md text-xs sm:text-label-md font-bold">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>{badge}</span>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.1}>
                  <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-[56px] text-primary font-extrabold tracking-tight leading-[1.1]">
                    {headline}
                  </h1>
                </Reveal>

                <Reveal direction="up" delay={0.2}>
                  <p className="font-body-lg text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
                    {subtitle}
                  </p>
                </Reveal>

                {/* Quick Stats Ticker */}
                <Reveal direction="up" delay={0.3}>
                  <div className="grid grid-cols-3 gap-3 sm:gap-space-sm pt-space-sm max-w-xl">
                    <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-surface-container flex flex-col">
                      <span className="font-metric-counter text-2xl sm:text-4xl text-primary leading-none font-extrabold">
                        <Counter value={40} suffix="%+" />
                      </span>
                      <span className="font-label-md text-xs text-on-surface-variant mt-1.5 font-bold">Prep Time Saved</span>
                    </div>
                    <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-surface-container flex flex-col">
                      <span className="font-metric-counter text-2xl sm:text-4xl text-primary leading-none font-extrabold">
                        <Counter value={100} suffix="%" />
                      </span>
                      <span className="font-label-md text-xs text-on-surface-variant mt-1.5 font-bold">Usable Net Yield</span>
                    </div>
                    <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-surface-container flex flex-col">
                      <span className="font-metric-counter text-2xl sm:text-4xl text-secondary leading-none font-extrabold">
                        0 <span className="text-xs font-normal text-on-surface-variant">chem</span>
                      </span>
                      <span className="font-label-md text-xs text-on-surface-variant mt-1.5 font-bold">Zero Bleach Baths</span>
                    </div>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.4}>
                  <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
                    <Link
                      href="/shop"
                      className="bg-secondary hover:bg-secondary-container hover:text-on-secondary-container text-on-secondary font-label-lg text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-md transition-all flex items-center gap-2 font-bold"
                    >
                      <span>Order Sample Pack</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/bulk-orders"
                      className="bg-surface-container hover:bg-surface-container-high text-primary font-label-lg text-xs sm:text-sm px-7 py-3.5 rounded-full transition-colors flex items-center gap-2 font-bold border border-surface-container-highest"
                    >
                      <span>Commercial B2B Inquiry</span>
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Graphic / Visual Mosaic Column */}
              <div className="lg:col-span-5 relative mt-6 lg:mt-0">
                <Reveal direction="right" delay={0.2}>
                  <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-surface-container-highest border-4 border-surface-container-lowest group">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxppq1rsMWshl1_XnFANGgpTMEhEQrbvOovRSBDnRreB9yRpYs6xL-9oTW8dFhb-AW6l5xqumPTrjQS_snURP25P_R1tApK33RGfg5bPPpfiuwVNtSGvSY-cM0fnxdT9DMXowEqES2ccfxyaz7M6Q3hAJuaJqnlXbLR-5ZhHInNKWiIenmwQC0KslNIlAQeDxhtTDIx-x5-lRFoh2Yt6HmWXYoUPAzHkp0Hm_qhtijhxHIj7bqizW5PF4X4Bvl1eS3mw"
                      alt="OurGrowth Premium Peeled Garlic Pack"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex flex-col justify-end p-6 text-on-primary">
                      <span className="font-label-md text-xs uppercase tracking-wider text-secondary-fixed font-bold">
                        Pure Indian Crop
                      </span>
                      <p className="font-headline-sm text-sm sm:text-base font-semibold">
                        Pneumatically peeled &amp; vacuum-locked within 4 hours of de-husking.
                      </p>
                    </div>
                  </div>

                  {/* Floating Badges */}
                  <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-3 rounded-2xl shadow-xl max-w-[220px] flex items-center gap-3 border border-surface-container hidden sm:flex">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 relative bg-surface-container">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmnABuXkGmNAw3KDcOrFG8WkMc-MCLztxXv4I1H_cUebWfVSb0hMauHZeyCp19Xb_U2PYOfu46f9rgNXcDRur_-kgvMFZKLn5jjXGAgFYXaTNMDRnDwiKYq8dkxZJBd7qXtSyUriOECF87odHPUhRKLQJomV9lG2qJUq1Rjiyyo-r5zlMSTKgKEFtAAWDYtFHRbKxoQwGYw_Sdg22JgE9ECrM8ENSE6H34MQHje8J4BR9IM_ngeYU15Pe_3hj23BPwhQ"
                        alt="Garlic Cloves"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-xs font-bold text-primary">Flawless Grading</span>
                      <span className="font-body-sm text-[11px] text-on-surface-variant leading-tight">Grade-A plump cloves only</span>
                    </div>
                  </div>

                  <div className="absolute -top-4 -right-4 bg-primary text-on-primary px-4 py-2 rounded-full font-label-md text-xs flex items-center gap-1.5 shadow-lg">
                    <ShieldCheck className="w-4 h-4 text-secondary-fixed" />
                    <span>Food Safe FSSAI</span>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Genesis Section */}
        <section className="w-full py-space-2xl px-margin-mobile lg:px-margin bg-surface">
          <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div className="flex flex-col gap-space-xs max-w-2xl">
                <span className="font-label-lg text-xs sm:text-label-lg text-secondary uppercase tracking-widest font-bold">
                  Our Genesis
                </span>
                <h2 className="font-headline-xl text-2xl sm:text-4xl text-primary font-bold tracking-tight">
                  From Sticky Fingertips to Seamless Kitchen Flow
                </h2>
              </div>
              <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-md">
                We watched chefs and prep crews struggle with hours of repetitive, sticky clove peeling every dawn. We knew there was a cleaner, smarter engineering solution.
              </p>
            </div>

            {/* 3 Pillars */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <StaggerItem>
                <div className="bg-surface-container-low p-6 sm:p-8 rounded-3xl border border-surface-container flex flex-col gap-4 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-primary">
                    <Wind className="w-6 h-6" />
                  </div>
                  <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-primary">Pneumatic Air-Peeling</h3>
                  <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Zero chemical soaking baths or water chlorine tanks. Filtered high-speed pneumatic air jets blast off paper skins effortlessly without wetting the raw cloves.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-surface-container-low p-6 sm:p-8 rounded-3xl border border-surface-container flex flex-col gap-4 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-primary">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-primary">Cold-Chain Reefer Logistics</h3>
                  <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Maintained strictly at 2°C–4°C from packaging to restaurant walk-in coolers. Prevents volatile aromatic sulfur compound loss and fermentation.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-surface-container-low p-6 sm:p-8 rounded-3xl border border-surface-container flex flex-col gap-4 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-primary">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-primary">Certified Food Safety</h3>
                  <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Fully FSSAI certified facility (12823000000000) under temperature-controlled hygiene standards, complete with batch lab certificates and GST documentation.
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Technology Comparison Table */}
        <section className="w-full py-space-2xl px-margin-mobile lg:px-margin bg-surface-container-low/60">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-label-md text-secondary font-bold uppercase tracking-wider block mb-2">
                Pure Physics vs Market Shortcuts
              </span>
              <h2 className="font-headline-xl text-2xl sm:text-4xl text-primary font-bold">
                Why Dry Air-Peeling Is Superior to Wet Mandi Garlic
              </h2>
            </div>

            <div className="bg-surface-container-lowest rounded-3xl border border-surface-container overflow-hidden shadow-lg">
              <div className="grid grid-cols-12 bg-primary text-on-primary p-4 sm:p-5 font-bold text-xs sm:text-sm">
                <div className="col-span-5 sm:col-span-4">Metric / Quality Factor</div>
                <div className="col-span-3 sm:col-span-4 text-surface-container-high">Traditional Wet Peeling</div>
                <div className="col-span-4 text-secondary-fixed">OurGrowth Dry Air-Peel</div>
              </div>

              <div className="divide-y divide-surface-container text-xs sm:text-sm">
                <div className="grid grid-cols-12 p-4 sm:p-5 items-center">
                  <div className="col-span-5 sm:col-span-4 font-bold text-primary">Water Soaking</div>
                  <div className="col-span-3 sm:col-span-4 text-error font-medium">Soaked in water 6-12 hrs</div>
                  <div className="col-span-4 text-secondary font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> 0% Water Added
                  </div>
                </div>

                <div className="grid grid-cols-12 p-4 sm:p-5 items-center bg-surface-container-low/30">
                  <div className="col-span-5 sm:col-span-4 font-bold text-primary">Bleach &amp; Preservatives</div>
                  <div className="col-span-3 sm:col-span-4 text-error font-medium">Chlorine / Sulfur dioxide</div>
                  <div className="col-span-4 text-secondary font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> 100% Chemical-Free
                  </div>
                </div>

                <div className="grid grid-cols-12 p-4 sm:p-5 items-center">
                  <div className="col-span-5 sm:col-span-4 font-bold text-primary">Shelf Life Under Chill</div>
                  <div className="col-span-3 sm:col-span-4 text-on-surface-variant font-medium">3-5 days before souring</div>
                  <div className="col-span-4 text-secondary font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Up to 30 Days (2°C–4°C)
                  </div>
                </div>

                <div className="grid grid-cols-12 p-4 sm:p-5 items-center bg-surface-container-low/30">
                  <div className="col-span-5 sm:col-span-4 font-bold text-primary">Dum Cooking Aroma</div>
                  <div className="col-span-3 sm:col-span-4 text-error font-medium">Muted / grey discoloration</div>
                  <div className="col-span-4 text-secondary font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Full Natural Allicin Potency
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-space-2xl bg-gradient-to-br from-primary via-[#0a482b] to-[#00381e] text-on-primary text-center px-margin-mobile">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="font-headline-xl text-2xl sm:text-4xl font-extrabold text-white mb-4">
              Bring Pure Peeled Garlic to Your Prep Line
            </h2>
            <p className="text-surface-container-high text-xs sm:text-base mb-8 max-w-xl">
              Request sample trial pouches for your culinary team or schedule reliable daily wholesale deliveries.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-lg transition-all"
              >
                Browse Garlic Catalog
              </Link>
              <Link
                href="/bulk-orders"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold text-sm border border-white/20 transition-all"
              >
                Request Commercial Rate Card
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
