"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Sprout, Wind, ArrowRight } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import Counter from "@/components/animations/Counter";

export default function BrandStory() {
  return (
    <section id="about" className="py-space-2xl bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Overlapping Visual Composition */}
          <div className="lg:col-span-6 relative">
            <Reveal direction="left" duration={0.8}>
              <div className="relative grid grid-cols-12 gap-4">
                {/* Back card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="col-span-8 rounded-[2.5rem] overflow-hidden shadow-2xl bg-surface-container rotate-[-2deg] border-4 border-surface-container-lowest relative aspect-[4/3]"
                >
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHHelEtnZ9GKGRJTt9AzvuVKswPxn0SgWsoDRdUwQVG1RkoXGtz_mU8j6XXCur6P99mcUoiF_d0CeFfVUxfA2Vwa17PuG9siw-D11KRShnXcmikW1V0HlTQKcgZY-EgTbaodgetmtE7fQabBFJb3MgHZ2KsvoEnPy-yzZcmNGIey88kdHmCnT9xq1VtCfo4qEwm0PWWWDxUhnITAR2xwe74js6FDHfWzJI66XaWC30c4Yc0r_cxi_r51ZYvEOKQ5N-9Q"
                    alt="OurGrowth Verified Garlic Batch"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>

                {/* Overlapping front card */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="col-span-6 col-start-7 -mt-20 sm:-mt-28 rounded-[2.5rem] overflow-hidden shadow-2xl bg-surface-container rotate-[3deg] border-4 border-surface-container-lowest z-10 relative aspect-[4/3]"
                >
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfbnSs_kb31dVtqj-TITvK8XEI95NFj4YReRvCoowUlD1ooS-Tv-u6S-Fj82YuEprQ8f_ApM-pXBv9XFSYUcZ2vIAeOn8-oiYAFeBJ1cANtLXztyRoJHOduAgYYjRmNZKg3GkMFwhoO5ggutczAxsRFkj3otkYuvMcJ8uod2UHpee7zRKJu1s337v_0RdnZs4YUSmDWz8ZnzZ045ueo6d2Ari-TpafrI6hnK-N0fBOwQ11Eunll_lcOZN6RuooNQGeJA"
                    alt="Hand holding fresh peeled garlic cloves"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              </div>
            </Reveal>

            {/* Floating Metric Elevation Card with Animated Counter */}
            <Reveal direction="up" delay={0.3}>
              <div className="mt-6 bg-surface-container-lowest/95 backdrop-blur-md p-6 rounded-3xl shadow-[0_12px_30px_rgba(0,69,37,0.08)] border border-surface-container flex items-center justify-between hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-secondary-container/70 flex items-center justify-center text-primary shadow-inner shrink-0">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="font-metric-counter text-4xl sm:text-5xl text-primary leading-none font-black tracking-tight">
                      <Counter value={98} suffix="%" />
                    </div>
                    <div className="font-label-md text-xs sm:text-label-md text-on-surface-variant uppercase tracking-wider font-bold mt-1">
                      Chef Satisfaction Rate
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col text-right pl-4 border-l border-surface-container">
                  <span className="font-label-lg text-label-lg font-extrabold text-secondary">Zero Prep Time</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Instant Pan &amp; Pot Ready</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Narrative Story */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <Reveal direction="right" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container/40 text-primary font-label-md text-label-md w-fit font-bold border border-secondary-container">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span>About OurGrowth</span>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.2}>
              <h2 className="font-headline-xl text-2xl sm:text-4xl lg:text-[42px] text-primary font-extrabold tracking-tight leading-[1.2]">
                Born from respect for busy kitchens and pure, pungent garlic flavor
              </h2>
            </Reveal>

            <Reveal direction="right" delay={0.3}>
              <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant leading-relaxed font-normal">
                Peeling garlic cloves is universally recognized as the most tedious, sticky, and time-draining bottle-neck in commercial food prep. OurGrowth was engineered to eliminate this friction entirely.
              </p>
            </Reveal>

            <Reveal direction="right" delay={0.4}>
              <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant leading-relaxed font-normal">
                By combining single-origin agricultural procurement directly from vetted farm clusters with state-of-the-art hygienic dry air-peeling technology, we seal raw cloves at their apex of allicin potency—free from soaking water or artificial preservatives.
              </p>
            </Reveal>

            {/* Feature Mini-cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Reveal direction="up" delay={0.5}>
                <div className="flex flex-col gap-1.5 p-5 rounded-3xl bg-surface-container-low/80 border border-surface-container shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-2.5 text-primary font-headline-sm text-base sm:text-headline-sm font-bold">
                    <div className="w-8 h-8 rounded-full bg-secondary-container/60 flex items-center justify-center shrink-0">
                      <Sprout className="w-4 h-4 text-secondary" />
                    </div>
                    <span>Ethically Sourced</span>
                  </div>
                  <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant">
                    Farm-direct contracts ensuring clean agro-practices, soil mineral testing, and zero toxic chemical washes.
                  </p>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.6}>
                <div className="flex flex-col gap-1.5 p-5 rounded-3xl bg-surface-container-low/80 border border-surface-container shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-2.5 text-primary font-headline-sm text-base sm:text-headline-sm font-bold">
                    <div className="w-8 h-8 rounded-full bg-secondary-container/60 flex items-center justify-center shrink-0">
                      <Wind className="w-4 h-4 text-secondary" />
                    </div>
                    <span>Nutrition &amp; Aroma Intact</span>
                  </div>
                  <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant">
                    Dry-peeled cold handling keeps natural aromatic oils and robust pungent allicin fully uncompromised.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
