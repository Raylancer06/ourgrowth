"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ShoppingBag, Star, ShieldCheck, Truck, ArrowRight, Sparkles, Filter } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal, { StaggerContainer, StaggerItem } from "@/components/animations/Reveal";
import { products, Product, transformApiProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";
import { getProducts } from "@/lib/api";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPack, setSelectedPack] = useState<Record<string, number>>({});
  const [productList, setProductList] = useState<Product[]>(products);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    getProducts().then((apiProds) => {
      if (apiProds && apiProds.length > 0) {
        setProductList(apiProds.map(transformApiProduct));
      }
    }).catch(() => null);
  }, []);

  const categories = [
    { id: "all", label: "All Harvest Products" },
    { id: "retail", label: "Retail Packs (1KG)" },
    { id: "commercial", label: "Commercial Crates (5KG-10KG)" },
    { id: "bulk-crates", label: "Bulk Crates (20KG-50KG+)" },
    { id: "specialty", label: "Specialty & Blends" },
  ];

  const filteredProducts = productList.filter((prod) => {
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "commercial" && (prod.category === "commercial" || prod.category === "bulk-crates")) ||
      (selectedCategory === "retail" && prod.category === "retail") ||
      (selectedCategory === "bulk-crates" && prod.category === "bulk-crates") ||
      (selectedCategory === "specialty" && prod.category === "specialty") ||
      prod.category === selectedCategory;

    const matchesSearch =
      prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.grade.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleAdd = (product: Product) => {
    const packIndex = selectedPack[product.id] ?? 0;
    const pack = product.packSizes[packIndex] || product.packSizes[0];

    addToCart({
      productId: product.id,
      title: product.title,
      packSize: pack.size,
      price: pack.price,
      quantity: 1,
      image: product.image,
      badge: product.badge,
    });

    showToast(`Added ${product.title} (${pack.size}) to cart.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1">
        {/* Shop Hero Banner */}
        <section className="bg-gradient-to-br from-primary via-primary-container to-[#041009] text-on-primary py-12 px-margin-mobile lg:px-margin">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-secondary-fixed text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                <Sparkles className="w-4 h-4 text-secondary-fixed" />
                <span>Verified Direct-to-Kitchen Inventory</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h1 className="font-display-hero text-3xl sm:text-5xl text-surface-bright font-extrabold tracking-tight mb-4 max-w-3xl">
                Pure Peeled Garlic Harvest Catalog
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="text-surface-container-high text-xs sm:text-base max-w-2xl leading-relaxed mb-8">
                Air-peeled within 4 hours of de-husking. 0% added water, 0% chemicals, delivered at 2°C–4°C directly to commercial restaurants, banquets, and homes.
              </p>
            </Reveal>

            {/* Live Search Bar */}
            <Reveal direction="up" delay={0.3} className="w-full max-w-xl">
              <div className="relative w-full">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by grade (e.g. Jumbo, Biriyani, Cloud Kitchen, Paste)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-full bg-surface-container-lowest text-on-surface placeholder:text-outline text-xs sm:text-sm font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary-fixed"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Filter Category Tabs */}
        <section className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin py-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar pb-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-secondary shrink-0 hidden sm:block" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <span className="text-xs text-on-surface-variant font-bold shrink-0 hidden md:block">
              Showing {filteredProducts.length} Harvest Grades
            </span>
          </div>
        </section>

        {/* Product Cards Catalog Grid */}
        <section className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin pb-space-2xl">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-surface-container-low rounded-3xl p-8">
              <p className="text-on-surface-variant text-base font-bold mb-2">No garlic grades matching &ldquo;{searchQuery}&rdquo;</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                className="text-xs font-bold text-secondary underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const activePackIndex = selectedPack[product.id] ?? 0;
                const activePack = product.packSizes[activePackIndex] || product.packSizes[0];

                return (
                  <StaggerItem key={product.id}>
                    <motion.article
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="flex flex-col bg-surface-container-lowest rounded-3xl p-5 shadow-sm hover:shadow-xl border border-surface-container/70 h-full group"
                    >
                      {/* Product Image Frame */}
                      <Link href={`/product/${product.slug}`} className="block relative w-full aspect-square rounded-2xl overflow-hidden bg-surface-container-low mb-4">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                          <span className="px-2.5 py-1 rounded-full bg-secondary text-on-secondary font-label-md text-[11px] font-bold shadow-sm">
                            {product.badge}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-md text-[10px] font-bold">
                            {product.cloveSize}
                          </span>
                        </div>
                        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface text-[11px] font-semibold flex items-center gap-1 shadow-sm">
                          <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                          <span>Food-Grade Vacuum</span>
                        </div>
                      </Link>

                      {/* Header & Title */}
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1">
                          <span className="font-semibold text-secondary">{product.grade}</span>
                          <div className="flex items-center text-amber-500 font-semibold gap-1 text-xs">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{product.reviewsCount > 0 ? `${product.rating} (${product.reviewsCount})` : "Verified Fresh"}</span>
                          </div>
                        </div>

                        <Link href={`/product/${product.slug}`}>
                          <h3 className="text-headline-sm text-base sm:text-lg font-bold text-primary group-hover:text-secondary transition-colors mb-2">
                            {product.title}
                          </h3>
                        </Link>

                        <p className="text-xs text-on-surface-variant mb-4 leading-relaxed line-clamp-2">
                          {product.description}
                        </p>

                        {/* Pack Selection Buttons */}
                        <div className="mb-4">
                          <div className="text-[11px] font-bold uppercase text-on-surface-variant/80 tracking-wider mb-1.5">
                            Select Packaging Tier:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {product.packSizes.map((pack, idx) => (
                              <button
                                key={pack.size}
                                onClick={() => setSelectedPack({ ...selectedPack, [product.id]: idx })}
                                className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all ${
                                  activePackIndex === idx
                                    ? "bg-secondary text-on-secondary shadow-xs scale-105"
                                    : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant"
                                }`}
                              >
                                <span>{pack.size}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Price & Add to Kitchen CTA */}
                        <div className="mt-auto pt-4 border-t border-surface-container flex flex-col gap-3">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <span className="font-headline-md text-xl sm:text-2xl font-black text-primary">
                                ₹{activePack.price}
                              </span>
                              {activePack.savings && (
                                <span className="ml-2 text-xs font-bold text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded">
                                  {activePack.savings}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-on-surface-variant font-medium">
                              ({product.priceUnit})
                            </span>
                          </div>

                          {/* Live Warehouse Stock Badge */}
                          <div className="flex items-center justify-between text-[11px] font-medium">
                            {product.isInStock !== false && (product.availableStock === undefined || product.availableStock > 0) ? (
                              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>In Stock {product.availableStock ? `(${Math.floor(product.availableStock)} KG live)` : ''}</span>
                              </span>
                            ) : (
                              <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 font-semibold">
                                Sold Out Today
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-12 gap-2 items-center">
                            <button
                              onClick={() => handleAdd(product)}
                              disabled={product.isInStock === false || (product.availableStock !== undefined && product.availableStock <= 0)}
                              className={`col-span-8 py-2.5 px-4 rounded-full font-label-lg text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 font-bold ${
                                product.isInStock === false || (product.availableStock !== undefined && product.availableStock <= 0)
                                  ? "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none"
                                  : "bg-secondary text-on-secondary hover:bg-primary"
                              }`}
                            >
                              <ShoppingBag className="w-4 h-4" />
                              <span>{product.isInStock === false || (product.availableStock !== undefined && product.availableStock <= 0) ? 'Out of Stock' : 'Add to Cart'}</span>
                            </button>
                            <Link
                              href={`/product/${product.slug}`}
                              className="col-span-4 py-2.5 px-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs flex items-center justify-center transition-colors text-center"
                            >
                              <span>Specs →</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}

          {/* Quick Wholesale Desk Card */}
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center text-primary shrink-0">
                <Truck className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-headline-sm text-base sm:text-lg font-bold text-primary">
                  Need Recurring Daily / Bi-Weekly Crate Deliveries?
                </h4>
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  We supply 50kg to 500kg lots with dedicated temperature-controlled Reefer routes and locked seasonal rates.
                </p>
              </div>
            </div>
            <Link
              href="/bulk-orders"
              className="bg-primary hover:bg-primary-container text-on-primary px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Explore B2B Rate Desk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
