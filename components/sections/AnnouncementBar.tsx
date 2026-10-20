"use client";

import { useEffect, useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { getAnnouncements } from "@/lib/api";

interface AnnouncementBarProps {
  onOpenBulkModal: () => void;
}

export default function AnnouncementBar({ onOpenBulkModal }: AnnouncementBarProps) {
  const [headline, setHeadline] = useState("Special Wholesale Garlic Rates Available for Restaurants & Caterers (50KG+ Lots).");
  const [ctaText, setCtaText] = useState("Get B2B Rate Card");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    getAnnouncements().then((list) => {
      if (list && list.length > 0) {
        const first = list[0];
        if (first.headline || first.message) {
          setHeadline(first.headline || first.message);
        }
        if (first.cta_text) {
          setCtaText(first.cta_text);
        }
      }
    }).catch(() => {});
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-primary-container text-on-primary py-2 px-margin-mobile lg:px-margin text-center font-label-md text-xs sm:text-label-md flex items-center justify-center gap-space-xs tracking-wide shadow-sm relative z-50">
      <Sparkles className="w-4 h-4 text-secondary-fixed shrink-0 animate-pulse" />
      <span>
        {headline}{" "}
        <button
          onClick={onOpenBulkModal}
          className="underline text-secondary-fixed font-bold hover:text-white transition-colors inline-flex items-center gap-1 ml-1"
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-3.5 h-3.5 inline" />
        </button>
      </span>
    </div>
  );
}
