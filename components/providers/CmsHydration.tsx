"use client";

import { useEffect } from "react";
import { primeStorefrontCms } from "@/lib/api";

export default function CmsHydration() {
  useEffect(() => {
    primeStorefrontCms().catch(() => {});
  }, []);

  return null;
}
