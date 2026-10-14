"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Truck, CheckCircle2, ShoppingBag, ArrowRight, Zap, RefreshCw, ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { products, Product, transformApiProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";
import { getProduct } from "@/lib/api";

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
  const allImages = [product.image, ...(product.secondaryImages || [])];

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
    const token = typeof window !== "undefined"
      ? (localStorage.getItem("ourgrowth_customer_token") || localStorage.getItem("og_customer_token"))
      : null;
    if (!token) {
      showToast("Please log in or create an account to proceed to checkout.");
      router.push("/login?redirect=/checkout");
    } else {
      router.push("/checkout");
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
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-amber-500 font-bold gap-1 text-sm">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs text-on-surface-variant">
                    ({product.reviewsCount} commercial kitchens &amp; chef reviews)
                  </span>
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
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex items-center justify-between bg-surface-container-low border border-surface-container rounded-full px-4 py-2 w-full sm:w-36">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full bg-surface-container-lowest text-primary font-bold flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    −
                  </button>
                  <span className="font-bold text-sm text-primary px-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-full bg-surface-container-lowest text-primary font-bold flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-secondary hover:bg-secondary/90 text-on-secondary font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 text-secondary-fixed" />
                  <span>Buy Now</span>
                </button>
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
      </main>

      <Footer />
    </div>
  );
}
