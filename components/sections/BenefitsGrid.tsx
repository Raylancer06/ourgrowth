"use client";

import { motion } from "framer-motion";
import { Trash2, Wind, Clock, Sparkles } from "lucide-react";
import Reveal, { StaggerContainer, StaggerItem } from "@/components/animations/Reveal";

export default function BenefitsGrid() {
  const benefits = [
    {
      title: "Zero Waste Yield",
      description: "Pay only for 100% usable garlic cloves without skin loss, stem clipping, or rotted cloves inside bulk bags.",
      icon: Trash2,
    },
    {
      title: "Dry Air-Peeled",
      description: "No water immersion peeling means cloves don't get soggy, bloated, or sour during commercial refrigerated storage.",
      icon: Wind,
    },
    {
      title: "Drastic Labor Savings",
      description: "Redirect 2-3 hours of kitchen peeling work every single morning toward core culinary preparation and dish mastery.",
      icon: Clock,
    },
  ];

  return (
    <section className="py-space-2xl bg-surface relative">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container/40 text-primary font-label-md text-xs sm:text-label-md mb-3 font-bold border border-secondary-container">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>Why Our Process Matters</span>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h2 className="font-headline-xl text-2xl sm:text-4xl text-primary font-extrabold tracking-tight">
              Discover the benefits that set our peeled garlic apart
            </h2>
          </Reveal>
        </div>

        {/* 3 Pillars Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const IconComponent = b.icon;
            return (
              <StaggerItem key={b.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="flex flex-col gap-3 p-6 sm:p-7 rounded-3xl bg-surface-container-low/70 border border-surface-container shadow-sm hover:shadow-lg transition-all h-full"
                >
                  <div className="w-12 h-12 rounded-2xl bg-secondary-container/60 flex items-center justify-center text-secondary mb-1 shadow-inner">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="font-headline-sm text-lg sm:text-xl font-bold text-primary">
                    {b.title}
                  </h4>
                  <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant leading-relaxed">
                    {b.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
