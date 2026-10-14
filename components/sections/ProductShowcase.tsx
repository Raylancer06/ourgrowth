"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Truck, Star } from "lucide-react";
import { products, Product, transformApiProduct } from "@/data/products";
import Reveal, { StaggerContainer, StaggerItem } from "@/components/animations/Reveal";
import { useToast } from "@/components/ui/Toast";
import { useCart } from "@/context/CartContext";
import { getProducts } from "@/lib/api";

interface ProductShowcaseProps {
  onSelectProductForBulk: (productName: string) => void;
}

export default function ProductShowcase({ onSelectProductForBulk }: ProductShowcaseProps) {
  const [productList, setProductList] = useState<Product[]>(products);
  const [selectedPackIndex, setSelectedPackIndex] = useState<Record<string, number>>({});
  const { showToast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts().then((apiProds) => {
      if (apiProds && apiProds.length > 0) {
        setProductList(apiProds.map(transformApiProduct));
      }
    }).catch(() => null);
  }, []);

  const handleAddToCart = (product: Product) => {
    const pIndex = selectedPackIndex[product.id] ?? 0;
    const pack = product.packSizes[pIndex] || product.packSizes[0];

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
    <section id="products" className="py-space-2xl bg-surface-container-low/60 relative">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-2xl mb-12">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high text-primary font-label-md text-xs sm:text-label-md mb-3 font-bold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>Our Harvest Selection</span>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h2 className="font-headline-xl text-2xl sm:text-4xl text-primary font-extrabold tracking-tight">
              Premium peeled garlic for every culinary &amp; commercial need
            </h2>
          </Reveal>
        </div>

        {/* Grid Product Showcase */}
        <StaggerContainer className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productList.slice(0, 8).map((product) => {
            const activeIdx = selectedPackIndex[product.id] ?? 0;
            const currentPack = product.packSizes[activeIdx] || product.packSizes[0];

            return (
              <StaggerItem key={product.id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm hover:shadow-xl border border-surface-container/70 flex flex-col h-full group transition-all duration-300 relative overflow-hidden"
                >
                  {/* Product Image Frame */}
                  <Link href={`/product/${product.slug}`} className="block w-full aspect-square rounded-2xl overflow-hidden bg-surface-container-low mb-4 relative">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-primary shadow-xs flex items-center gap-1">
                      <Star className="w-3 h-3 fill-secondary text-secondary" />
                      <span>{product.rating}</span>
                    </div>
                  </Link>

                  {/* Badge & Title */}
                  <span className="text-xs uppercase tracking-wider font-extrabold text-secondary mb-1">
                    {product.badge}
                  </span>
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-headline-sm text-base sm:text-lg font-bold text-primary hover:text-secondary transition-colors mb-1">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mb-4 flex-1 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Pack Size Selector */}
                  <div className="mb-4">
                    <div className="text-[11px] font-bold uppercase text-on-surface-variant/80 tracking-wider mb-1.5">
                      Available Packs:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.packSizes.map((pack, idx) => {
                        const isSelected = activeIdx === idx;
                        return (
                          <button
                            key={pack.size}
                            onClick={() => setSelectedPackIndex({ ...selectedPackIndex, [product.id]: idx })}
                            className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all ${
                              isSelected
                                ? "bg-secondary text-on-secondary shadow-xs scale-105"
                                : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant"
                            }`}
                          >
                            {pack.size}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-surface-container flex items-center justify-between gap-2 mt-auto">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-white py-2 px-3 rounded-full text-xs font-bold transition-all shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => onSelectProductForBulk(product.title)}
                      className="inline-flex items-center gap-1 text-secondary hover:text-primary font-label-md text-xs font-bold px-2 py-2 transition-colors"
                    >
                      <span>Rates</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Floating Quick-Order Banner Pill */}
        <Reveal direction="up" delay={0.4} className="w-full flex justify-center">
          <div className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-surface-container-high/90 text-on-surface-variant font-body-sm text-xs sm:text-sm shadow-md border border-surface-container text-center flex-wrap justify-center">
            <span className="text-secondary font-extrabold flex items-center gap-1.5">
              <Truck className="w-4 h-4" />
              Free Cold-Chain Dispatch
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Clean, conscious, and crafted with care — explore our tailored institutional contracts.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
