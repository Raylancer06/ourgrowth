"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import TickerSection from "@/components/sections/TickerSection";
import BrandStory from "@/components/sections/BrandStory";
import ProductShowcase from "@/components/sections/ProductShowcase";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import GarlicGrades from "@/components/sections/GarlicGrades";
import WorkflowSteps from "@/components/sections/WorkflowSteps";
import BenefitsGrid from "@/components/sections/BenefitsGrid";
import Testimonials from "@/components/sections/Testimonials";
import FaqSection from "@/components/sections/FaqSection";
import CtaBanner from "@/components/sections/CtaBanner";
import BulkOrderModal from "@/components/ui/BulkOrderModal";

export default function Home() {
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [selectedProductForBulk, setSelectedProductForBulk] = useState("Grade A Jumbo Peeled");

  const handleOpenBulkModal = (productName?: string) => {
    if (productName) {
      setSelectedProductForBulk(productName);
    }
    setIsBulkModalOpen(true);
  };

  const handleScrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      {/* Interactive Sticky Header */}
      <Header onOpenBulkModal={() => handleOpenBulkModal()} />

      {/* Main Content Sections */}
      <main className="w-full pt-28 bg-surface min-h-[calc(100vh-28rem)] flex-1">
        <HeroSection
          onOpenBulkModal={() => handleOpenBulkModal()}
          onExploreProducts={handleScrollToProducts}
        />

        {/* Infinite Scroller Marquee */}
        <TickerSection />

        {/* Brand Story with Animated Counter */}
        <BrandStory />

        {/* Product Showcase with Pack Selectors */}
        <ProductShowcase onSelectProductForBulk={(prod) => handleOpenBulkModal(prod)} />

        {/* Why Choose Us with 4 Stat Counters */}
        <WhyChooseUs />

        {/* 4 Garlic Grades Showcase */}
        <GarlicGrades onSelectGrade={(grade) => handleOpenBulkModal(grade)} />

        {/* 6-Step Workflow Journey */}
        <WorkflowSteps />

        {/* 3 Pillars of Freshness */}
        <BenefitsGrid />

        {/* Verified Chef Reviews */}
        <Testimonials />

        {/* Animated FAQ Accordion */}
        <FaqSection />

        {/* High-Conversion Bottom CTA Banner */}
        <CtaBanner
          onOpenBulkModal={() => handleOpenBulkModal()}
          onExploreProducts={handleScrollToProducts}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive B2B Wholesale Modal */}
      <BulkOrderModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        defaultProduct={selectedProductForBulk}
      />
    </div>
  );
}
