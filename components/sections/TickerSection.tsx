"use client";

import Marquee from "@/components/animations/Marquee";
import { tickerItems } from "@/data/ticker";
import { Sparkles } from "lucide-react";

export default function TickerSection() {
  return (
    <div className="w-full bg-secondary-container text-on-secondary-container py-3.5 overflow-hidden shadow-inner font-label-lg text-xs sm:text-label-md font-bold border-y border-secondary/20">
      <Marquee speed="normal" pauseOnHover={true} fadeEdges={true}>
        {tickerItems.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-2 hover:text-primary transition-colors cursor-default"
          >
            <Sparkles className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span className="tracking-wide">{item}</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
