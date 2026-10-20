"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { testimonials as defaultTestimonials } from "@/data/testimonials";
import Reveal, { StaggerContainer, StaggerItem } from "@/components/animations/Reveal";
import { getTestimonials } from "@/lib/api";

export default function Testimonials() {
  const [items, setItems] = useState(defaultTestimonials);

  useEffect(() => {
    getTestimonials().then((apiTestimonials) => {
      if (apiTestimonials && apiTestimonials.length > 0) {
        const mapped = apiTestimonials.slice(0, 3).map((t, idx) => ({
          id: `cms-${t.id || idx}`,
          rating: t.rating || 5,
          comment: t.quote,
          avatar: t.avatar || t.client_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || "OG",
          name: t.client_name,
          role: t.role || "Verified Chef",
          outlet: t.company,
          highlighted: idx === 1,
        }));
        setItems(mapped);
      }
    }).catch(() => {});
  }, []);

  return (
    <section className="py-space-2xl bg-surface-container-low/60 relative">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high text-primary font-label-md text-xs sm:text-label-md mb-3 font-bold">
              <Star className="w-4 h-4 text-secondary fill-secondary" />
              <span>Customer Stories</span>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h2 className="font-headline-xl text-2xl sm:text-4xl text-primary font-extrabold tracking-tight">
              Trusted by top restaurants, cloud kitchens &amp; caterers
            </h2>
          </Reveal>
        </div>

        {/* 3 Review Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <StaggerItem key={item.id}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`rounded-[2rem] p-7 shadow-sm flex flex-col justify-between h-full transition-shadow duration-300 ${
                  item.highlighted
                    ? "bg-secondary-container text-on-secondary-container border border-secondary/20 shadow-md hover:shadow-xl"
                    : "bg-surface-container-lowest text-on-surface border border-surface-container/60 hover:shadow-lg"
                }`}
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                      item.highlighted
                        ? "bg-primary text-on-primary shadow-sm"
                        : "bg-secondary-container/40 text-secondary"
                    }`}
                  >
                    <Quote className="w-5 h-5 fill-current" />
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 fill-current ${
                          item.highlighted ? "text-primary" : "text-secondary"
                        }`}
                      />
                    ))}
                  </div>

                  <p
                    className={`font-body-md text-xs sm:text-sm leading-relaxed mb-6 ${
                      item.highlighted
                        ? "text-on-secondary-fixed-variant font-medium"
                        : "text-on-surface-variant font-normal"
                    }`}
                  >
                    &ldquo;{item.comment}&rdquo;
                  </p>
                </div>

                <div
                  className={`flex items-center gap-3 pt-4 border-t ${
                    item.highlighted ? "border-on-secondary-container/20" : "border-surface-container"
                  }`}
                >
                  <div className="w-11 h-11 rounded-full bg-primary text-on-primary font-extrabold flex items-center justify-center text-sm shadow-sm shrink-0">
                    {item.avatar}
                  </div>
                  <div>
                    <div
                      className={`font-headline-sm text-sm sm:text-base font-bold ${
                        item.highlighted ? "text-on-secondary-container" : "text-primary"
                      }`}
                    >
                      {item.name}
                    </div>
                    <div
                      className={`font-body-sm text-xs ${
                        item.highlighted ? "text-on-secondary-fixed-variant" : "text-on-surface-variant"
                      }`}
                    >
                      {item.role}, {item.outlet}
                    </div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
