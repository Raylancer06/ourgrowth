"use client";

import { useEffect, useState } from "react";
import { Sparkles, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { getAnnouncements } from "@/lib/api";

interface AnnouncementBarProps {
  onOpenBulkModal: () => void;
}

export default function AnnouncementBar({ onOpenBulkModal }: AnnouncementBarProps) {
  const [headline, setHeadline] = useState<string>("Special Wholesale Garlic Rates Available for Restaurants & Caterers (50KG+ Lots).");
  const [ctaText, setCtaText] = useState("Get B2B Rate Card");
  const [ctaLink, setCtaLink] = useState("/bulk-orders");
  const [dismissible, setDismissible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    getAnnouncements().then((list) => {
      if (list && list.length > 0) {
        const active = list.find((a: any) => (a.active !== false && a.is_published !== false)) || list[0];
        if (active) {
          const text = active.headline || active.message;
          if (text) setHeadline(text);
          if (active.cta_text !== undefined) setCtaText(active.cta_text);
          if (active.cta_link !== undefined) setCtaLink(active.cta_link);
          if (active.dismissible !== undefined) setDismissible(Boolean(active.dismissible));
          setIsVisible(active.active !== false && active.is_published !== false);
        } else {
          setIsVisible(false);
        }
      } else {
        setIsVisible(false);
      }
    }).catch(() => {
      // Keep initial display if offline
    });
  }, []);

  if (!isVisible || isDismissed || !headline) return null;

  const handleCtaClick = (e: React.MouseEvent) => {
    if ((!ctaLink || ctaLink === "/bulk-orders" || ctaLink === "#bulk") && onOpenBulkModal) {
      e.preventDefault();
      onOpenBulkModal();
    }
  };

  return (
    <div className="bg-primary-container text-on-primary py-2 px-margin-mobile lg:px-margin text-center font-label-md text-xs sm:text-label-md flex items-center justify-center gap-space-xs tracking-wide shadow-sm relative z-50">
      <Sparkles className="w-4 h-4 text-secondary-fixed shrink-0 animate-pulse" />
      <span>
        {headline}{" "}
        {ctaText && (
          <Link
            href={ctaLink || "/bulk-orders"}
            onClick={handleCtaClick}
            className="underline text-secondary-fixed font-bold hover:text-white transition-colors inline-flex items-center gap-1 ml-1"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 inline" />
          </Link>
        )}
      </span>
      {dismissible && (
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-on-primary/70 hover:text-white transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
