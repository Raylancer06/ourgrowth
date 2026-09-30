"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  className?: string;
  fadeEdges?: boolean;
}

export default function Marquee({
  children,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
  fadeEdges = true,
}: MarqueeProps) {
  const speedClass = {
    slow: "animate-[marquee_55s_linear_infinite]",
    normal: "animate-[marquee_35s_linear_infinite]",
    fast: "animate-[marquee_20s_linear_infinite]",
  }[speed];

  const reverseSpeedClass = {
    slow: "animate-[marquee-reverse_55s_linear_infinite]",
    normal: "animate-[marquee-reverse_35s_linear_infinite]",
    fast: "animate-[marquee-reverse_20s_linear_infinite]",
  }[speed];

  const animationClass = direction === "left" ? speedClass : reverseSpeedClass;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden flex",
        fadeEdges && "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-around gap-6 py-1 whitespace-nowrap min-w-full",
          animationClass,
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "flex shrink-0 items-center justify-around gap-6 py-1 whitespace-nowrap min-w-full",
          animationClass,
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
    </div>
  );
}
