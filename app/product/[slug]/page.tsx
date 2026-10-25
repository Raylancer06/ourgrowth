"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ShoppingBag,
  Zap,
  RefreshCw,
  ChevronRight,
  MessageSquarePlus,
  User,
  Building2,
  MapPin,
  Send,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { products, Product, transformApiProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";
import { getProduct } from "@/lib/api";
import { getReviews, submitProductReview } from "@/lib/api/cms";
import { ApiTestimonial } from "@/lib/api/types";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const initialProduct = products.find((p) => p.slug === slug || p.id === slug) || null;
  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [loading, setLoading] = useState<boolean>(!initialProduct);

  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [activeImage, setActiveImage] = useState<string>(initialProduct?.image || "");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // Dynamic Customer Reviews State
  const [reviews, setReviews] = useState<ApiTestimonial[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    restaurant: "",
    city: "",
    rating: 5,
    comment: "",
  });

  // Pre-fill logged-in customer info
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedUser = localStorage.getItem("ourgrowth_customer_user");
        if (savedUser) {
          const u = JSON.parse(savedUser);
          setReviewForm((prev) => ({
            ...prev,
            name: prev.name || u.name || "",
            restaurant: prev.restaurant || u.company_name || "",
            city: prev.city || u.billing_address?.city || "",
          }));
        }
      } catch {}
    }
  }, []);

  // Fetch Product
  useEffect(() => {
    if (slug) {
      getProduct(slug)
        .then((apiProd) => {
          if (apiProd) {
            const transformed = transformApiProduct(apiProd);
            setProduct(transformed);
            setActiveImage(transformed.image);
          } else if (!initialProduct) {
            setProduct(null);
          }
        })
        .catch(() => {
          if (!initialProduct) setProduct(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [slug]);

  // Fetch Dynamic Reviews for this product
  useEffect(() => {
    if (!slug) return;
    setReviewsLoading(true);
    getReviews({ productSlug: slug })
      .then((res) => {
        if (res && res.data && res.data.length > 0) {
          setReviews(res.data);
        } else {
          // If no specific reviews for this SKU, fallback to fetching all store reviews
          getReviews().then((allRes) => {
            const matching = (allRes.data || []).filter(
              (r) =>
                r.product_slug === slug ||
                r.product_id === product?.id ||
                r.category === slug
            );
            if (matching.length > 0) {
              setReviews(matching);
            } else {
              // Show store garlic reviews as general verified kitchen reviews if none specific yet
              setReviews(allRes.data || []);
            }
          });
        }
      })
      .catch(() => {
        setReviews([]);
      })
      .finally(() => {
        setReviewsLoading(false);
      });
  }, [slug, product?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
        <Header />
        <main className="w-full pt-28 bg-surface flex-1 flex flex-col items-center justify-center py-24">
          <div className="w-8 h-8 rounded-full border-4 border-secondary border-t-transparent animate-spin mb-3" />
          <p className="text-sm font-medium text-on-surface-variant">Loading fresh garlic details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
        <Header />
        <main className="w-full pt-28 bg-surface flex-1 flex flex-col items-center justify-center py-24 text-center px-4">
          <h2 className="font-headline-sm text-2xl font-bold text-primary mb-2">Product Not Found</h2>
          <p className="text-xs text-on-surface-variant max-w-md mb-6">
            The requested garlic item could not be retrieved from the catalog. It may have been archived or is out of stock.
          </p>
          <Link
            href="/shop"
            className="px-6 py-2.5 rounded-full bg-secondary text-on-secondary font-bold text-xs hover:bg-primary transition-colors"
          >
            Back to Garlic Catalog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const currentPack = product.packSizes[selectedPackIndex] || product.packSizes[0];
  const allImages = Array.from(new Set([product.image, ...(product.secondaryImages || [])].filter(Boolean)));

  // Dynamic reviews metrics
  const reviewsCount = reviews.length;
  const averageRating =
    reviewsCount > 0
      ? Number((reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) / reviewsCount).toFixed(1))
      : 5.0;

  // Star breakdown calculation
  const starCounts = [5, 4, 3, 2, 1].map((s) => ({
    stars: s,
    count: reviews.filter((r) => Math.round(Number(r.rating) || 5) === s).length,
    percentage:
      reviewsCount > 0
        ? Math.round(
            (reviews.filter((r) => Math.round(Number(r.rating) || 5) === s).length / reviewsCount) * 100
          )
        : 0,
  }));

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      title: product.title,
      packSize: currentPack.size,
      price: currentPack.price,
      quantity,
      image: product.image,
      badge: product.badge,
    });
    showToast(`Added ${quantity}x ${product.title} (${currentPack.size}) to cart.`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("ourgrowth_customer_token") || localStorage.getItem("og_customer_token")
        : null;
    if (!token) {
      showToast("Please log in or create an account to proceed to checkout.");
      router.push("/login?redirect=/checkout");
    } else {
      router.push("/checkout");
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name.trim()) {
      showToast("Please enter your name.");
      return;
    }
    if (!reviewForm.comment.trim()) {
      showToast("Please provide your review or kitchen feedback.");
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await submitProductReview({
        name: reviewForm.name.trim(),
        restaurant: reviewForm.restaurant.trim() || "Commercial Kitchen",
        city: reviewForm.city.trim(),
        rating: reviewForm.rating,
        comment: reviewForm.comment.trim(),
        product_id: product.id,
        product_slug: slug,
      });

      if (res && res.status === "error") {
        showToast(res.message || "Failed to submit review.");
        return;
      }

      // Optimistically add to reviews list
      const newEntry: ApiTestimonial = {
        id: Date.now(),
        slug: `review-${Date.now()}`,
        client_name: reviewForm.name.trim(),
        customer_name: reviewForm.name.trim(),
        company: reviewForm.restaurant.trim() || "Commercial Kitchen",
        role: "Verified Chef / Partner",
        quote: reviewForm.comment.trim(),
        comment: reviewForm.comment.trim(),
        rating: reviewForm.rating,
        city: reviewForm.city.trim(),
        verified_volume: "Verified Customer Review",
        product_id: product.id,
        product_slug: slug,
        avatar: reviewForm.name
          .trim()
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase() || "OG",
      };

      setReviews((prev) => [newEntry, ...prev]);
      setIsReviewFormOpen(false);
      setReviewForm({
        name: "",
        restaurant: "",
        city: "",
        rating: 5,
        comment: "",
      });
      showToast("Thank you! Your product review has been submitted successfully.");
    } catch {
      showToast("An error occurred while submitting your review.");
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter py-4">
          <nav className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/shop" className="hover:text-primary transition-colors">Catalog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary font-bold">{product.title}</span>
          </nav>
        </div>

        {/* Product Details Section */}
        <section className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Image Gallery */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-surface-container-low border border-surface-container shadow-sm">
                <Image
                  src={activeImage}
                  alt={product.title}
                  fill
                  className="object-cover transition-all duration-300"
                  priority
                />
                <div className="absolute top-4 left-4 bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  {product.badge}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === img ? "border-secondary scale-105 shadow-sm" : "border-surface-container opacity-70"
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>

              {/* Quality Guarantee Box */}
              <div className="bg-surface-container-low/70 rounded-2xl p-4 border border-surface-container flex items-center justify-between text-xs text-on-surface-variant">
                <span className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-secondary" /> FSSAI Certified
                </span>
                <span className="flex items-center gap-1.5 font-bold">
                  <Truck className="w-4 h-4 text-secondary" /> 2°C–4°C Cold-Chain
                </span>
                <span className="flex items-center gap-1.5 font-bold">
                  <RefreshCw className="w-4 h-4 text-secondary" /> 100% Usable Yield
                </span>
              </div>
            </div>

            {/* Right: Product Purchase Options */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1 text-xs font-bold text-secondary uppercase tracking-wider">
                  <span>{product.grade}</span>
                  <span>•</span>
                  <span>{product.cloveSize}</span>
                </div>
                <h1 className="font-headline-xl text-2xl sm:text-4xl font-extrabold text-primary mb-2">
                  {product.title}
                </h1>

                {/* Dynamic Rating & Review Anchor */}
                <div className="flex items-center gap-3">
                  <a
                    href="#reviews-section"
                    className="flex items-center text-amber-500 hover:text-amber-600 transition-colors font-bold gap-1 text-sm group"
                  >
                    <Star className="w-4 h-4 fill-current" />
                    <span>{averageRating}</span>
                  </a>
                  <a
                    href="#reviews-section"
                    className="text-xs text-on-surface-variant hover:text-primary transition-colors underline-offset-2 hover:underline"
                  >
                    ({reviewsCount} {reviewsCount === 1 ? "customer review" : "customer reviews"})
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsReviewFormOpen(true);
                      document.getElementById("reviews-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-[11px] font-bold text-secondary hover:text-primary transition-colors ml-2 bg-secondary/10 px-2.5 py-0.5 rounded-full flex items-center gap-1"
                  >
                    <MessageSquarePlus className="w-3 h-3" />
                    <span>Write Review</span>
                  </button>
                </div>
              </div>

              {/* Price Banner */}
              <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl border border-surface-container flex items-baseline justify-between">
                <div>
                  <span className="font-metric-counter text-3xl sm:text-4xl font-black text-primary">
                    ₹{currentPack.price * quantity}
                  </span>
                  <span className="text-xs text-on-surface-variant ml-2 font-medium">
                    (₹{currentPack.price} / {currentPack.size})
                  </span>
                </div>
                {currentPack.savings && (
                  <span className="bg-secondary-fixed text-on-secondary-fixed text-xs font-extrabold px-3 py-1 rounded-full">
                    {currentPack.savings}
                  </span>
                )}
              </div>

              {/* Packaging Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                  Select Pack Size:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {product.packSizes.map((pack, idx) => (
                    <button
                      key={pack.size}
                      onClick={() => setSelectedPackIndex(idx)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        selectedPackIndex === idx
                          ? "border-secondary bg-secondary-container/40 text-primary font-bold shadow-xs"
                          : "border-surface-container bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container"
                      }`}
                    >
                      <div className="text-xs font-bold">{pack.size}</div>
                      <div className="text-xs text-secondary font-black mt-0.5">₹{pack.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter & CTA */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex items-center justify-between bg-surface-container-low border border-surface-container rounded-full px-3 py-1.5 w-full sm:w-40 shadow-xs">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-full bg-surface-container-lowest text-primary font-bold flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      title="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val)) {
                          setQuantity(Math.max(1, Math.min(10000, val)));
                        }
                      }}
                      onBlur={(e) => {
                        const val = parseInt(e.target.value);
                        setQuantity(isNaN(val) || val < 1 ? 1 : Math.min(10000, val));
                      }}
                      className="w-16 text-center font-bold text-sm text-primary bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      aria-label="Direct order quantity"
                    />
                    <button
                      onClick={() => setQuantity((q) => Math.min(10000, q + 1))}
                      className="w-8 h-8 rounded-full bg-surface-container-lowest text-primary font-bold flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      title="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-secondary hover:bg-secondary/90 text-on-secondary font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart ({quantity} {currentPack.size})</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 text-secondary-fixed" />
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* Bulk Wholesale Quantity Quick-Presets */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs text-on-surface-variant">
                  <span className="font-semibold text-[11px] text-gray-500">Bulk Shortcuts:</span>
                  {[10, 25, 50, 100, 250, 500].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setQuantity(amt)}
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition-colors ${
                        quantity === amt
                          ? "bg-primary text-white border-primary"
                          : "bg-surface-container-lowest border-surface-container hover:border-primary/50 text-primary"
                      }`}
                    >
                      {amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Yield Calculator */}
              <div className="p-4 rounded-2xl bg-secondary-container/40 border border-secondary-container text-on-secondary-container text-xs">
                <span className="font-extrabold block mb-1">
                  💡 Commercial Yield Formula:
                </span>
                <span>
                  1KG of OurGrowth dry-peeled garlic gives 100% usable net weight—equivalent to buying ~1.35KG of raw unpeeled mandi garlic with zero shrinkage or prep garbage.
                </span>
              </div>

              {/* Key Features */}
              <div className="border-t border-surface-container pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  Kitchen Highlights:
                </h4>
                <ul className="space-y-1.5 text-xs text-on-surface-variant">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* Dynamic Customer Reviews & Ratings Section */}
        {/* ------------------------------------------------------------- */}
        <section id="reviews-section" className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter pb-24 scroll-mt-28">
          <div className="border-t border-surface-container pt-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-secondary font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Verified Buyer Feedback
                </span>
                <h2 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-primary">
                  Customer Ratings &amp; Reviews
                </h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Genuine reviews from restaurants, catering teams, and wholesale kitchens using this garlic harvest.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsReviewFormOpen((prev) => !prev)}
                className="self-start md:self-auto py-2.5 px-5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-xs shadow-sm transition-all flex items-center gap-2"
              >
                <MessageSquarePlus className="w-4 h-4 text-secondary-fixed" />
                <span>{isReviewFormOpen ? "Cancel Review" : "Write a Review"}</span>
              </button>
            </div>

            {/* Ratings Overview Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-surface-container-low p-6 sm:p-8 rounded-3xl border border-surface-container mb-8">
              {/* Score Column */}
              <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-surface-container">
                <span className="text-5xl sm:text-6xl font-black text-primary font-metric-counter">
                  {averageRating}
                </span>
                <div className="flex items-center gap-1 text-amber-500 my-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-5 h-5 ${
                        s <= Math.round(averageRating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-on-surface-variant">
                  Based on {reviewsCount} {reviewsCount === 1 ? "review" : "reviews"}
                </span>
                <span className="text-[11px] text-secondary font-bold mt-1 bg-secondary/10 px-3 py-0.5 rounded-full">
                  100% Commercial Grade Quality
                </span>
              </div>

              {/* Star Breakdown Bars */}
              <div className="md:col-span-8 flex flex-col justify-center gap-2 px-2 sm:px-6">
                {starCounts.map((s) => (
                  <div key={s.stars} className="flex items-center gap-3 text-xs">
                    <span className="w-12 font-bold text-primary flex items-center gap-1 shrink-0">
                      <span>{s.stars}</span>
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </span>
                    <div className="flex-1 h-2.5 bg-surface-container-lowest rounded-full overflow-hidden border border-surface-container">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${s.percentage}%` }}
                      />
                    </div>
                    <span className="w-14 text-right text-on-surface-variant font-medium shrink-0">
                      {s.count} ({s.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Review Form */}
            <AnimatePresence>
              {isReviewFormOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mb-10"
                >
                  <form
                    onSubmit={handleReviewSubmit}
                    className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border-2 border-secondary/30 shadow-md space-y-5"
                  >
                    <div className="flex items-center justify-between border-b border-surface-container pb-3">
                      <div>
                        <h3 className="font-headline-sm text-lg font-bold text-primary">
                          Review {product.title}
                        </h3>
                        <p className="text-xs text-on-surface-variant">
                          Share your experience regarding clove firmness, aroma, and net usable yield.
                        </p>
                      </div>
                      <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                        Verified Review Form
                      </span>
                    </div>

                    {/* Interactive Star Rating Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                        Your Rating: *
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          {[1, 2, 3, 4, 5].map((star) => {
                            const isFilled =
                              hoveredRating > 0 ? star <= hoveredRating : star <= reviewForm.rating;
                            return (
                              <button
                                key={star}
                                type="button"
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                onClick={() => setReviewForm((prev) => ({ ...prev, rating: star }))}
                                className="p-1 hover:scale-110 transition-transform focus:outline-none"
                                title={`Rate ${star} star${star > 1 ? "s" : ""}`}
                              >
                                <Star
                                  className={`w-7 h-7 ${
                                    isFilled
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-gray-300 hover:text-amber-200"
                                  }`}
                                />
                              </button>
                            );
                          })}
                        </div>
                        <span className="text-xs font-bold text-primary ml-2">
                          {(() => {
                            const r = hoveredRating || reviewForm.rating;
                            if (r === 5) return "5 Stars - Outstanding Quality";
                            if (r === 4) return "4 Stars - Very Good & Fresh";
                            if (r === 3) return "3 Stars - Satisfactory";
                            if (r === 2) return "2 Stars - Below Expectations";
                            return "1 Star - Poor Experience";
                          })()}
                        </span>
                      </div>
                    </div>

                    {/* Customer Info Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                          Your Name: *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            required
                            placeholder="Chef or Buyer Name"
                            value={reviewForm.name}
                            onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-surface-container bg-surface text-xs text-primary focus:outline-none focus:border-secondary font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                          Kitchen / Business Name:
                        </label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="e.g. Royal Biriyani Outlets"
                            value={reviewForm.restaurant}
                            onChange={(e) => setReviewForm({ ...reviewForm, restaurant: e.target.value })}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-surface-container bg-surface text-xs text-primary focus:outline-none focus:border-secondary font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                          City / State:
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="e.g. Kolkata, WB"
                            value={reviewForm.city}
                            onChange={(e) => setReviewForm({ ...reviewForm, city: e.target.value })}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-surface-container bg-surface text-xs text-primary focus:outline-none focus:border-secondary font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Review Comment */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                        Your Feedback / Kitchen Experience: *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell other culinary professionals about the skin cleanliness, clove moisture, aroma retention during cooking, and cold storage longevity..."
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        className="w-full p-3 rounded-2xl border border-surface-container bg-surface text-xs text-primary focus:outline-none focus:border-secondary font-medium resize-y"
                      />
                    </div>

                    {/* Form Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsReviewFormOpen(false)}
                        className="px-5 py-2.5 rounded-full border border-surface-container text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submittingReview}
                        className="px-6 py-2.5 rounded-full bg-secondary hover:bg-secondary/90 text-on-secondary text-xs font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                      >
                        {submittingReview ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Submitting Review...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit Product Review</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reviews List */}
            {reviewsLoading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3 text-on-surface-variant">
                <div className="w-6 h-6 border-3 border-secondary border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-medium">Loading genuine kitchen reviews...</span>
              </div>
            ) : reviews.length === 0 ? (
              <div className="bg-surface-container-low p-8 rounded-3xl border border-surface-container text-center">
                <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary mx-auto flex items-center justify-center mb-3">
                  <Star className="w-6 h-6" />
                </div>
                <h4 className="font-headline-sm text-base font-bold text-primary mb-1">
                  No Customer Reviews Yet
                </h4>
                <p className="text-xs text-on-surface-variant max-w-md mx-auto mb-4">
                  Be the first culinary professional or commercial buyer to review this fresh peeled garlic harvest!
                </p>
                <button
                  type="button"
                  onClick={() => setIsReviewFormOpen(true)}
                  className="px-5 py-2 rounded-full bg-secondary text-on-secondary font-bold text-xs hover:bg-primary transition-colors"
                >
                  Write the First Review
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((r, idx) => {
                  const ratingVal = Number(r.rating) || 5;
                  const reviewerName = r.client_name || r.customer_name || "Verified Customer";
                  const businessName = r.company || "Commercial Kitchen Partner";
                  const reviewComment = r.quote || r.comment || "Clean, high quality peeled garlic cloves.";
                  const avatarInitials =
                    r.avatar ||
                    reviewerName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() ||
                    "OG";

                  return (
                    <div
                      key={r.id || idx}
                      className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-container hover:border-secondary/40 transition-all shadow-xs flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-3">
                        {/* Header: Reviewer & Stars */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary font-black text-xs flex items-center justify-center shrink-0 border border-secondary/20">
                              {avatarInitials}
                            </div>
                            <div>
                              <div className="font-bold text-xs sm:text-sm text-primary flex items-center gap-1.5">
                                <span>{reviewerName}</span>
                                <span className="inline-flex items-center gap-0.5 text-[10px] bg-secondary-container/60 text-on-secondary-container font-extrabold px-2 py-0.2 rounded-full">
                                  <ShieldCheck className="w-3 h-3 text-secondary" />
                                  Verified
                                </span>
                              </div>
                              <div className="text-[11px] text-on-surface-variant font-medium">
                                {businessName} {r.city ? `• ${r.city}` : ""}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= ratingVal ? "fill-amber-400 text-amber-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Review Content */}
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          &ldquo;{reviewComment}&rdquo;
                        </p>
                      </div>

                      {/* Footer Badge */}
                      <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-surface-container/60 pt-2.5">
                        <span className="flex items-center gap-1 text-secondary font-semibold">
                          <ThumbsUp className="w-3 h-3" />
                          Recommended Commercial Garlic
                        </span>
                        <span>{r.verified_volume || "Verified Buyer"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
