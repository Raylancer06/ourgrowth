"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, PhoneCall } from "lucide-react";
import { faqs } from "@/data/faqs";
import Reveal from "@/components/animations/Reveal";

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="py-space-2xl bg-surface relative">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: Interactive FAQ Accordion */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Reveal direction="left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container/40 text-primary font-label-md text-label-md w-fit font-bold border border-secondary-container">
                <HelpCircle className="w-4 h-4 text-secondary shrink-0" />
                <span>Frequently Asked Questions</span>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <h2 className="font-headline-xl text-2xl sm:text-4xl text-primary font-extrabold tracking-tight">
                Learn more about our produce, process &amp; hygiene
              </h2>
            </Reveal>

            {/* Accordion List */}
            <div className="flex flex-col gap-3.5 mt-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === faq.id;
                return (
                  <Reveal key={faq.id} direction="up" delay={0.15 + idx * 0.06}>
                    <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-sm border border-surface-container transition-all">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between text-left font-headline-sm text-base sm:text-lg text-primary font-bold group cursor-pointer"
                        aria-expanded={isOpen}
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
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="overflow-hidden"
                          >
                            <p className="mt-3 pt-3 border-t border-surface-container/60 text-on-surface-variant font-body-md text-xs sm:text-body-md leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Right Side: Clean Kitchen Composite */}
          <div className="lg:col-span-5 relative">
            <Reveal direction="right" delay={0.2}>
              <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-surface-container border-4 border-surface-container-lowest group">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxbbbESeFhI61RLY1C4jBhMcASkQI-tiN-xRgLRe3a0Lg-32j_kpEzB7xFJbJ-o18Y8tX-YcNFd7mSFWhBcoqRX_Pb3AguMNaQEzrssfndYY4IfUieWwJy04Zz_ZJxmRFvTlb2cvgC57QajAYlznStKQ6exLxK1Y_W37VxHLmFhyOHT_ZApCiM3k368oPCJna9zXSJ-24hO6KSr1GHzja0vgsgTkTwDLOKPfmajgMYFaDhQpLcT4o1AnoyUpKWi-rtww"
                  alt="Executive chefs preparing food with OurGrowth peeled garlic"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

                {/* Bottom Callout Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-[2rem] bg-surface-container-lowest/95 backdrop-blur-md shadow-xl flex items-center gap-4 border border-white/40">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-secondary-container flex items-center justify-center text-primary shadow-sm shrink-0">
                    <PhoneCall className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <span className="font-headline-sm text-sm sm:text-base font-extrabold text-primary block leading-tight">
                      Need Custom Sizing?
                    </span>
                    <a
                      href="tel:+919476020341"
                      className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant hover:text-secondary font-bold transition-colors"
                    >
                      Direct Wholesale Desk: +91 94760 20341
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
