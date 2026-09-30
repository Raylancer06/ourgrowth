"use client";

import { Sparkles, ArrowRight } from "lucide-react";

interface AnnouncementBarProps {
  onOpenBulkModal: () => void;
}

export default function AnnouncementBar({ onOpenBulkModal }: AnnouncementBarProps) {
  return (
    <div className="bg-primary-container text-on-primary py-2 px-margin-mobile lg:px-margin text-center font-label-md text-xs sm:text-label-md flex items-center justify-center gap-space-xs tracking-wide shadow-sm relative z-50">
      <Sparkles className="w-4 h-4 text-secondary-fixed shrink-0 animate-pulse" />
      <span>
        Special Wholesale Garlic Rates Available for Restaurants &amp; Caterers (50KG+ Lots).{" "}
        <button
          onClick={onOpenBulkModal}
          className="underline text-secondary-fixed font-bold hover:text-white transition-colors inline-flex items-center gap-1 ml-1"
        >
          <span>Get B2B Rate Card</span>
          <ArrowRight className="w-3.5 h-3.5 inline" />
        </button>
      </span>
    </div>
  );
}
