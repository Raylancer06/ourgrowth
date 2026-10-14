'use client';

import Link from "next/link";
import { Calendar } from "lucide-react";

export default function ScheduleTab() {
  return (
    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container space-y-6">
      <h3 className="font-headline-sm text-lg font-bold text-primary">
        Recurring Delivery Route
      </h3>
      <p className="text-xs text-on-surface-variant">
        Set up automated weekly garlic deliveries for your kitchen or retail store without placing manual orders every time.
      </p>

      <div className="p-6 rounded-2xl bg-surface-container-low border border-surface-container text-center space-y-3">
        <Calendar className="w-8 h-8 mx-auto text-secondary" />
        <p className="font-bold text-sm text-primary">No standing delivery schedule set up.</p>
        <p className="text-xs text-on-surface-variant max-w-md mx-auto">
          To set up a regular weekly or bi-weekly standing delivery for your kitchen or grocery counter, contact our dispatch team or place a bulk order inquiry.
        </p>
        <Link
          href="/bulk-orders"
          className="inline-block px-5 py-2 rounded-full bg-secondary text-on-secondary hover:bg-primary font-bold text-xs transition-colors"
        >
          Configure Standing Schedule
        </Link>
      </div>
    </div>
  );
}
