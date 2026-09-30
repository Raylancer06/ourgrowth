"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Star, Truck, ShieldCheck } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import Counter from "@/components/animations/Counter";

export default function WhyChooseUs() {
  const highlights = [
    "100% Usable Yield",
    "Zero Preservative Soaking",
    "Controlled 2–4°C Logistics",
    "Custom Grades for Dishes",
  ];

  return (
    <section className="py-space-2xl bg-surface relative">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative & Key Metric Badges */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <Reveal direction="left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container/40 text-primary font-label-md text-label-md w-fit font-bold border border-secondary-container">
                <Star className="w-4 h-4 text-secondary fill-secondary" />
                <span>Why Choose OurGrowth</span>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <h2 className="font-headline-xl text-2xl sm:text-4xl lg:text-[40px] text-primary font-extrabold tracking-tight leading-[1.2]">
                Rooted in purity, peeled with care, delivered ultra-fresh
              </h2>
            </Reveal>

            <Reveal direction="left" delay={0.2}>
              <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
                Our peeled garlic brings nature&apos;s finest harvest straight to your prep table. By standardizing clove size, eliminating outer shells, and retaining natural allicin oils, kitchen teams cut up to 3 hours of kitchen labor daily.
              </p>
            </Reveal>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 py-1">
              {highlights.map((item, idx) => (
                <Reveal key={item} direction="up" delay={0.25 + idx * 0.08}>
                  <div className="flex items-center gap-2.5 font-label-lg text-sm sm:text-label-lg text-primary font-bold">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    <span>{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Humanistic Rounded Counter Cluster */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
              <Reveal direction="up" delay={0.4}>
                <div className="bg-surface-container-low/80 border border-surface-container p-4 rounded-3xl text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="font-metric-counter text-3xl sm:text-4xl text-primary font-black leading-none">
                    <Counter value={25} suffix="+" />
                  </div>
                  <div className="font-label-md text-xs sm:text-label-md text-on-surface-variant mt-1.5 font-semibold">
                    Years Experience
                  </div>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.45}>
                <div className="bg-surface-container-low/80 border border-surface-container p-4 rounded-3xl text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="font-metric-counter text-3xl sm:text-4xl text-primary font-black leading-none">
                    <Counter value={98} suffix="%" />
                  </div>
                  <div className="font-label-md text-xs sm:text-label-md text-on-surface-variant mt-1.5 font-semibold">
                    Purity Assurance
                  </div>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.5}>
                <div className="bg-surface-container-low/80 border border-surface-container p-4 rounded-3xl text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="font-metric-counter text-3xl sm:text-4xl text-primary font-black leading-none">
                    <Counter value={180} suffix="+" />
                  </div>
                  <div className="font-label-md text-xs sm:text-label-md text-on-surface-variant mt-1.5 font-semibold">
                    Active Kitchens
                  </div>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.55}>
                <div className="bg-surface-container-low/80 border border-surface-container p-4 rounded-3xl text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="font-metric-counter text-3xl sm:text-4xl text-primary font-black leading-none">
                    <Counter value={8} suffix="+" />
                  </div>
                  <div className="font-label-md text-xs sm:text-label-md text-on-surface-variant mt-1.5 font-semibold">
                    Garlic Grades
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Photographic Composite */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <Reveal direction="right" delay={0.2}>
              <div className="relative w-full aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl bg-surface-container border-4 border-surface-container-lowest group">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA49jXqp4xhQzwy9JDb7gxClZDy7Apxs1M_okV3ubK3LttEwen8DWfOxHag-9EhdB6pVrAa-AsfnFroqIK_xgsvcC8SqtLgjykagwN5xljTZmpEUFqrjaFATQtJ05a-Xsbw_0IwUzAucQwdylk7o7aoJcnIiWi8nF8BQAoJBbXhrj4QzGcu72BnRIdyRc8Y4CqJnDKukn6NK9leEhbsKFFeDxKmpdUfGcOtTQ2YvJBqc8c0-XyR-L9_E5nZ4myI8Xnw0Q"
                  alt="Hygienic garlic batch procurement"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-on-primary">
                  <span className="font-label-md text-xs font-bold uppercase tracking-widest text-secondary-fixed block mb-1">
                    Safe Food Standard
                  </span>
                  <span className="font-headline-sm text-sm sm:text-base text-surface-bright font-bold leading-snug block">
                    Pristine mechanical separation with zero skin residue.
                  </span>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Reveal direction="up" delay={0.35}>
                <div className="rounded-[2rem] overflow-hidden shadow-lg aspect-video bg-surface-container border-2 border-surface-container-lowest relative group">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq6t79FQ2spIuDuhZEdtqcp-NW8deHt7ofzgMOVyWpgW-DXNhWiPDIvjhikchDNizazM9laFiDUuaJnqeQsop_9kqbUxLRNP98bdbxtBzg8S70oBxiviwBqn_80nXgYKYJj5oSdWhgSMdZbYlcQC39uWsP4XKdJ7d4IOyP599esIDuxejvL61KT1m0KkgeO7UF2xV9FVrJi8fAneD0b-Xgs5yW5tE9KXcKm83Qd1sBeRa1PVlj_Bce2Z56egROrSto-Q"
                    alt="Fresh peeled garlic inspect"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.45}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-secondary-container rounded-[2rem] p-5 flex flex-col justify-center text-on-secondary-container shadow-md h-full"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className="w-5 h-5 text-primary" />
                    <span className="font-headline-sm text-base sm:text-lg font-extrabold text-primary">
                      Pan-India Freight
                    </span>
                  </div>
                  <p className="font-body-sm text-xs sm:text-body-sm leading-snug text-on-secondary-fixed-variant">
                    Chilled insulated thermocol crating for express restaurant delivery within 24–48 hours.
                  </p>
                </motion.div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
