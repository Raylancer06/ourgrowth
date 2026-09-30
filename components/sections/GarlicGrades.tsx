"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { garlicGrades, GarlicGrade } from "@/data/grades";
import Reveal, { StaggerContainer, StaggerItem } from "@/components/animations/Reveal";

interface GarlicGradesProps {
  onSelectGrade: (gradeName: string) => void;
}

export default function GarlicGrades({ onSelectGrade }: GarlicGradesProps) {
  return (
    <section id="grades" className="py-space-2xl bg-surface-container-low/60 relative">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high text-primary font-label-md text-xs sm:text-label-md mb-3 font-bold">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>Tailored Grade Profiles</span>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h2 className="font-headline-xl text-2xl sm:text-4xl text-primary font-extrabold tracking-tight">
              Peeled garlic grades crafted for specific kitchen demands
            </h2>
          </Reveal>
        </div>

        {/* 4 Grade Cards */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {garlicGrades.map((grade) => (
            <StaggerItem key={grade.id}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-surface-container-lowest rounded-[2.25rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center border border-surface-container/60 h-full group"
              >
                {/* Circular image disc with subtle gradient outline */}
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-secondary-container/50 to-surface-container-low p-1.5 mb-5 shadow-inner relative group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image
                      src={grade.image}
                      alt={grade.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="text-[11px] font-extrabold text-secondary uppercase tracking-wider mb-1">
                  {grade.bestFor}
                </div>

                <h3 className="font-headline-sm text-lg sm:text-xl text-primary font-bold mb-2">
                  {grade.name}
                </h3>

                <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant mb-6 leading-relaxed flex-1">
                  {grade.description}
                </p>

                <button
                  onClick={() => onSelectGrade(grade.name)}
                  className="text-secondary hover:text-primary font-label-md text-xs sm:text-label-md font-extrabold transition-all flex items-center gap-1.5 mt-auto bg-surface-container-low/60 hover:bg-secondary-container px-4 py-2 rounded-full w-full justify-center group/btn"
                >
                  <span>Request Grade Sample</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
