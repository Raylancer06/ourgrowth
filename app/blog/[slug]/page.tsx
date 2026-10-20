"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  Clock, 
  ArrowLeft, 
  Share2, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  Truck
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/animations/Reveal";
import { articles, Article } from "@/data/articles";
import { getBlogBySlug, ApiBlog } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";

interface PageProps {
  params: { slug: string };
}

export default function ArticleDetailPage({ params }: PageProps) {
  const rawParams = useParams();
  const router = useRouter();
  const slug = params?.slug || (rawParams?.slug as string);
  const { showToast } = useToast();

  const staticArticle = articles.find((a) => a.slug === slug) || null;
  const [article, setArticle] = useState<Article | null>(staticArticle);
  const [contentHtml, setContentHtml] = useState<string>("");
  const [loading, setLoading] = useState(!staticArticle);

  useEffect(() => {
    if (!slug) return;

    // 1. Check local static fallback first
    const staticArticle = articles.find((a) => a.slug === slug);
    if (staticArticle) {
      setArticle(staticArticle);
    }

    // 2. Fetch live CMS blog post
    getBlogBySlug(slug)
      .then((apiBlog: ApiBlog | null) => {
        if (apiBlog) {
          setArticle({
            id: String(apiBlog.id || apiBlog.slug),
            slug: apiBlog.slug,
            category: (apiBlog.category as any) || "efficiency",
            categoryLabel: apiBlog.categoryLabel || "Culinary & Kitchen Insights",
            title: apiBlog.title,
            excerpt: apiBlog.summary || apiBlog.excerpt || "",
            readTime: apiBlog.readTime || "5 Min Read",
            tag: apiBlog.badge || "Editorial",
            image: apiBlog.image || apiBlog.featured_image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDFsqXzpNUbbgN_9GpCJQM25GhYZa6UOGWlIEZriYfwdA_buSMawmO-6q932m-g6329oumxCbCGn3qJ1aL8PCKAvxJgSMsBRdZPcOwLFuAMKYmAQq_cipMWLGG1_QLG_7XnUYB0tU2wE7FfAg4-L9nibkKv3659fe98Tk6KPAL4IzprLhp_wZs5rw0-0wqWVuZOdKCxTSpV2kCmQpaZMbFexXvr5amrwUhDBm5mr3C1r-H8IIF2NvuRuJmqE2_WRWJyRg",
            date: apiBlog.date || "Oct 2026",
            author: apiBlog.author || "OurGrowth Team",
            badge: apiBlog.badge || "Editorial",
            stats: apiBlog.stats,
          });
          if (apiBlog.content) {
            setContentHtml(apiBlog.content);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleShare = () => {
    if (navigator.share && article) {
      navigator.share({ title: article.title, url: window.location.href });
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast("Article link copied to clipboard!");
    }
  };

  if (loading && !article) {
    return (
      <div className="min-h-screen flex flex-col bg-surface">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-28">
          <div className="text-center p-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-sm text-on-surface-variant font-medium">Loading article...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-surface">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-28">
          <div className="text-center p-8 max-w-md">
            <h2 className="text-xl font-bold text-primary mb-2">Article Not Found</h2>
            <p className="text-sm text-on-surface-variant mb-6">The blog post you requested does not exist or has been removed.</p>
            <Link href="/blog" className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-full text-xs font-bold">
              <ArrowLeft className="w-4 h-4" /> Return to Garlic Journal
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-2">
          <nav className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
            <Link href="/blog" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Articles</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-surface-container-highest" />
            <span className="text-primary font-bold truncate">{article.categoryLabel}</span>
          </nav>
        </div>

        {/* Hero Header */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-secondary-fixed text-on-secondary-fixed text-xs font-bold px-3 py-1 rounded-full">
              {article.categoryLabel}
            </span>
            <span className="bg-surface-container-high text-on-surface-variant text-xs font-semibold px-3 py-1 rounded-full">
              {article.badge}
            </span>
          </div>

          <h1 className="font-display-hero text-2xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex items-center justify-between py-4 border-y border-surface-container gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant font-medium">
              <Clock className="w-4 h-4 text-secondary" />
              <span>{article.readTime}</span>
              <span>•</span>
              <span className="font-bold text-primary">{article.author}</span>
              <span>•</span>
              <span>{article.date}</span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-primary transition-colors px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </section>

        {/* Featured Image */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
          <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden shadow-lg border border-surface-container">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Article Body Content */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          {/* Excerpt Lead */}
          <div className="bg-surface-container-low p-6 rounded-2xl border-l-4 border-secondary mb-8">
            <p className="text-sm sm:text-base text-on-surface font-medium leading-relaxed italic">
              "{article.excerpt}"
            </p>
          </div>

          {/* Stats Box if available */}
          {article.stats && (
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container shadow-sm mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  {article.stats.label}
                </span>
                <span className="text-sm font-extrabold text-secondary">
                  {article.stats.savings}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-error/10 rounded-xl">
                  <div className="text-xs text-error font-semibold">Manual Peeling</div>
                  <div className="text-sm font-bold text-error">{article.stats.manual}</div>
                </div>
                <div className="p-3 bg-secondary/10 rounded-xl">
                  <div className="text-xs text-secondary font-semibold">OurGrowth Delivered</div>
                  <div className="text-sm font-bold text-secondary">{article.stats.ourgrowth}</div>
                </div>
              </div>
            </div>
          )}

          {/* Rich Content */}
          {contentHtml ? (
            <div 
              className="prose prose-sm sm:prose-base max-w-none text-on-surface leading-relaxed [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-primary [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-2"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : (
            <div className="space-y-4 text-on-surface text-sm sm:text-base leading-relaxed">
              <p>
                In high-volume restaurant kitchens, food safety compliance, labor predictability, and raw ingredient yield dictate profit margins. OurGrowth's cold-chain peeled garlic eliminates preprocessing friction, allowing culinary teams to focus on signature flavors and rapid service.
              </p>
              <h3 className="text-xl font-bold text-primary mt-6 mb-2">Quality Standards &amp; Delivery</h3>
              <p>
                Every clove is pneumatic air-peeled, hand-sorted for blemishes, and vacuum-sealed without water contact or chemical washes. From our certified cold facility to your walk-in cooler, the cold-chain is maintained at 2°C–4°C for peak volatile allicin potency.
              </p>
            </div>
          )}

          {/* Wholesale Call to Action */}
          <div className="mt-12 bg-gradient-to-br from-primary to-[#052815] text-on-primary rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-secondary-fixed text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Commercial Kitchen Procurement</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-surface-bright">Ready to test fresh peeled cloves in your kitchen?</h4>
              <p className="text-xs sm:text-sm text-surface-container-high mt-1 max-w-md">
                Order sample 1kg packs or schedule weekly 25kg bulk delivery with tiered business rates.
              </p>
            </div>
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider hover:bg-secondary/90 transition-all shadow-md shrink-0"
            >
              <Truck className="w-4 h-4" />
              <span>Explore Packs</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
