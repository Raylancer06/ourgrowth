"use client";

import { motion } from "framer-motion";
import React from "react";

interface FloatingProps {
  children: React.ReactNode;
  duration?: number;
  yOffset?: number;
  rotateOffset?: number;
  delay?: number;
  className?: string;
}

export default function Floating({
  children,
  duration = 5,
  yOffset = 12,
  rotateOffset = 2,
  delay = 0,
  className,
}: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [-yOffset, yOffset, -yOffset],
        rotate: [-rotateOffset, rotateOffset, -rotateOffset],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
