"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, BookOpen, ArrowRight, Share2, Sparkles, TrendingUp } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal, { StaggerContainer, StaggerItem } from "@/components/animations/Reveal";
import { articles, Article } from "@/data/articles";
import { useToast } from "@/components/ui/Toast";

export default function BlogPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const { showToast } = useToast();

  const categories = [
    { id: "all", label: "All Editorial Pieces" },
    { id: "efficiency", label: "Kitchen Efficiency & ROI" },
    { id: "health", label: "Allicin Science & Health" },
    { id: "storage", label: "Cold-Chain & Storage" },
    { id: "recipes", label: "Chef Techniques & Recipes" },
  ];

  const filteredArticles = selectedFilter === "all"
    ? articles
    : articles.filter((a) => a.category === selectedFilter);

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({ title, url: window.location.href });
    } else {
      showToast("Article link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-[#0a3a20] to-[#041009] text-on-primary py-12 px-margin-mobile lg:px-margin text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-secondary-fixed text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                <BookOpen className="w-4 h-4 text-secondary-fixed" />
                <span>Culinary &amp; Procurement Insights</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h1 className="font-display-hero text-3xl sm:text-5xl text-surface-bright font-extrabold tracking-tight mb-4">
                The Pure Garlic Journal
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="text-surface-container-high text-xs sm:text-base max-w-2xl leading-relaxed mb-6">
                Deep-dives into commercial kitchen economics, volatile allicin preservation chemistry, cold-chain refrigeration protocols, and chef masterclasses.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter py-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedFilter === cat.id
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter pb-space-2xl">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((article) => (
              <StaggerItem key={article.id}>
                <article className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-surface-container flex flex-col h-full group transition-all duration-300">
                  {/* Image Frame */}
                  <div className="relative h-64 overflow-hidden bg-surface-container shrink-0">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-secondary-fixed text-on-secondary-fixed font-label-md text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {article.categoryLabel}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-primary/90 backdrop-blur-md text-on-primary text-[11px] font-bold px-3 py-1 rounded-full">
                      {article.badge}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-on-surface-variant text-xs font-semibold mb-2">
                        <Clock className="w-3.5 h-3.5 text-secondary" />
                        <span>{article.readTime}</span>
                        <span>•</span>
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>

                      <h3 className="font-headline-md text-lg sm:text-xl font-bold text-primary group-hover:text-secondary transition-colors mb-3 leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                        {article.excerpt}
                      </p>

                      {/* Optional Stats Comparison Block */}
                      {article.stats && (
                        <div className="bg-surface-container-low p-4 rounded-2xl mb-4 border border-surface-container text-xs">
                          <div className="flex justify-between items-center font-bold mb-1.5">
                            <span className="text-on-surface-variant">{article.stats.label}</span>
                            <span className="text-secondary font-extrabold">{article.stats.savings}</span>
                          </div>
                          <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden flex mb-2">
                            <div className="bg-error h-full" style={{ width: "100%" }} />
                          </div>
                          <div className="flex justify-between text-[11px] text-on-surface-variant">
                            <span>Manual Prep: {article.stats.manual}</span>
                            <span className="text-primary font-bold">OurGrowth: {article.stats.ourgrowth}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-surface-container mt-2">
                      <span className="font-label-lg text-xs font-bold text-secondary flex items-center gap-1.5 group-hover:text-primary transition-colors">
                        <span>Read Full Guide</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <button
                        onClick={() => handleShare(article.title)}
                        className="text-on-surface-variant hover:text-secondary p-1.5 rounded-full transition-colors"
                        aria-label="Share article"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </main>

      <Footer />
    </div>
  );
}
