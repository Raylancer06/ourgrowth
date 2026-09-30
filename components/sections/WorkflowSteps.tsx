"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Send,
  CheckCircle2,
  Package,
  Truck,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { workflowSteps } from "@/data/workflow";
import Reveal, { StaggerContainer, StaggerItem } from "@/components/animations/Reveal";

export default function WorkflowSteps() {
  const getIcon = (name: string) => {
    switch (name) {
      case "ShoppingBag":
        return <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Send":
        return <Send className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "CheckCircle":
        return <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Package":
        return <Package className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Truck":
        return <Truck className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "CreditCard":
        return <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />;
      default:
        return <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  };

  return (
    <section id="workflow" className="py-space-2xl bg-[#031d13] text-on-primary relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Reveal direction="down">
            <div className="text-secondary-fixed text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-secondary-fixed" />
              <span>EFFORTLESS 6-STEP WORKFLOW</span>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h2 className="text-2xl sm:text-4xl lg:text-[40px] text-white font-extrabold tracking-tight mb-3 font-headline-xl">
              How It Works
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <p className="text-surface-container-high/90 text-xs sm:text-base font-normal leading-relaxed">
              From picking your batch to chilled morning doorstep delivery in 6 seamless steps.
            </p>
          </Reveal>
        </div>

        {/* 6 Step Cards Grid */}
        <StaggerContainer className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4">
          {workflowSteps.map((item) => (
            <StaggerItem key={item.step}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-[#06301d]/80 hover:bg-[#093f27] border border-white/10 hover:border-secondary-fixed/50 rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 group pt-8 shadow-lg h-full"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-3.5 left-4 w-7 h-7 rounded-full bg-secondary-fixed text-[#031d13] font-black text-xs flex items-center justify-center shadow-[0_0_12px_rgba(170,247,111,0.5)] group-hover:scale-110 transition-transform">
                  {item.step}
                </div>

                {/* Icon Disc */}
                <div className="w-12 h-12 rounded-xl bg-surface-container-lowest/10 border border-white/10 flex items-center justify-center text-secondary-fixed mb-4 group-hover:scale-110 group-hover:bg-secondary-fixed/20 transition-all">
                  {getIcon(item.iconName)}
                </div>

                <h3 className="text-white font-bold text-sm sm:text-base mb-2 font-headline-sm">
                  {item.title}
                </h3>
                <p className="text-surface-container-high/80 text-xs leading-relaxed flex-1">
                  {item.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
