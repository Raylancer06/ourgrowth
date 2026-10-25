export interface Product {
  id: string;
  slug: string;
  title: string;
  badge: string;
  badgeType?: "bestseller" | "allicin" | "commercial" | "pure";
  category: "retail" | "commercial" | "specialty" | "bulk-crates";
  grade: "Grade A" | "Grade B" | "Specialty Dum" | "Paste Grade";
  cloveSize: string;
  description: string;
  fullDescription: string;
  image: string;
  secondaryImages?: string[];
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice: number;
  priceUnit: string;
  packSizes: { size: string; price: number; savings?: string }[];
  features: string[];
  kitchenYield: string;
  storageDays: string;
  availableStock?: number;
  isInStock?: boolean;
}

const DEFAULT_GARLIC_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCabO8HJEP-tUgMOtNeoUZSDnNJ3mpuH6huHZAJKJSwPRuNOiBfAAmeFDDNX44uT9koJIC1FX43wl8uzqhumpZRkzDrGLeUCusTLkRNWK5lr55TKVeO3yMBjLvoHZNmb0zse8xK-VD8Tm4JdnlnTOPeRtyb_xMgsf3H79KFNJGXxtXbc67dm2MY6OGbtWRMS7nSeu7n917TV8ADDcpbzpqwfOF2g4yxUiJ65LsnF1CXx2XxwEWpxEH3hbXz98WDN2PKqg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBX9Lx3_jJmhS-xpnNxWKNyC-pUFFuJ7riy_38w4buXgM6X7LozF5krKZQOEVb2hRoYzPwy4revekR3paqAa996rhkPauIYI5nszp2QNwlv2cZcE6omvR-xkMjYyl-hhTParHn0_9cBLLGoS9KdtXbzSoqsuZ-BPzM6gLw9YjIXCqzgqjth5sFiTHb-L4wBHQwhKGgOTW-dsogFQrFr5U-bRwuCH_zZ5F8Omw3WvyCdTzhcVHMuoVuSzwSS4N4FMkW85g",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuARydxRL1yzcGAyvJ-675OlosXsRqUur1FiR1-5fEAAMv1w2cve2KBy6vg--3jkyKjEZR6jnjhq_A8T11xT74fufA_fxxn1flX7Xf3ztV8KwauHM831i0ehPWrUDpxbxTDdzpKaZNoZFVTo80V8-kyiipHzLM6DIG2xSeNQzXJce7K7uu_dfAQ8yVVnzmAg3dvvgYf6x-L2n0qh3N4PcgWZHPf_IUG3USjn5zHamr46NlCnbf2-H2242WHP3c8VKj5_1g",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAgnUTnreGXEcvRcv8hTVQQOs0QBlqf1RAJWQVWaegBxEZjKjxPKXUTViQjOHvdw1yCaxQS_eR7VF2G7KLG9nNMWYRyzQav_3biEcShmIvpuPVVLKjcih7rYnYCAkSJ47Q4lctRM-OQp8LVcAR6ReEawpRYa4yslmvr8LnEH-NOHIMHjy9AYmul2mEkmgVBVyV5w9fWQdl2uU3aOMHk_TcsIqVcJc5ZKFh4XGP57jegvfAEJus50hKz8TFX54RknjqxhA",
];

export function transformApiProduct(ap: any): Product {
  const salePrice = Number(ap.price ?? ap.sale_price ?? 0);
  const origPrice = Math.round(salePrice * 1.15);
  const packSizeStr = ap.pack_size || "1 KG";

  let cat: "retail" | "commercial" | "specialty" | "bulk-crates" = "commercial";
  const catLower = (ap.category_name || "").toLowerCase();
  const titleLower = (ap.name || ap.title || "").toLowerCase();

  if (catLower.includes("spices") || catLower.includes("specialty") || titleLower.includes("mountain") || titleLower.includes("flakes")) {
    cat = "specialty";
  } else if (titleLower.includes("crate") || titleLower.includes("wholesale") || titleLower.includes("lot") || (ap.pack_sizes && ap.pack_sizes.some((p: any) => p.weight_kg >= 20))) {
    cat = "bulk-crates";
  } else if (titleLower.includes("retail") || titleLower.includes("pantry") || packSizeStr.toLowerCase().includes("250g") || packSizeStr.toLowerCase().includes("500g") || packSizeStr.toLowerCase().includes("1 kg") || packSizeStr.toLowerCase().includes("1kg") || titleLower.includes("jumbo")) {
    cat = "retail";
  }

  const packSizes = ap.pack_sizes && ap.pack_sizes.length > 0
    ? ap.pack_sizes.map((ps: any) => ({
        size: ps.size,
        price: Number(ps.price),
        savings: ps.savings || "",
      }))
    : [
        { size: packSizeStr, price: salePrice, savings: "Standard Pack" },
        { size: "5 KG", price: Math.round(salePrice * 5 * 0.95), savings: "Save 5%" },
        { size: "10 KG", price: Math.round(salePrice * 10 * 0.92), savings: "Save 8%" },
      ];

  const resolveImg = (imgUrl: string) => {
    if (!imgUrl || typeof imgUrl !== "string") return "";
    if (imgUrl.startsWith("http") || imgUrl.startsWith("/")) return imgUrl;
    return `/api/erp/${imgUrl}`;
  };

  let rawImg = resolveImg(ap.image);
  const imgIndex = typeof ap.id === "number" ? Math.abs(ap.id) % DEFAULT_GARLIC_IMAGES.length : 0;
  const prodImg = rawImg || DEFAULT_GARLIC_IMAGES[imgIndex] || DEFAULT_GARLIC_IMAGES[0];

  // Resolve gallery & additional images
  let resolvedGallery: string[] = [];
  if (Array.isArray(ap.images) && ap.images.length > 0) {
    resolvedGallery = ap.images.map(resolveImg).filter(Boolean);
  } else if (Array.isArray(ap.additional_images) && ap.additional_images.length > 0) {
    resolvedGallery = [prodImg, ...ap.additional_images.map(resolveImg).filter(Boolean)];
  }

  if (resolvedGallery.length === 0) {
    resolvedGallery = [prodImg];
  }

  // Ensure prodImg is included
  if (!resolvedGallery.includes(prodImg)) {
    resolvedGallery.unshift(prodImg);
  }

  return {
    id: ap.sku || `erp-${ap.id}`,
    slug: ap.sku || (ap.name ? ap.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : `prod-${ap.id}`),
    title: ap.name || ap.title || "Fresh Garlic Harvest",
    badge: ap.category_name || (ap.pack_size ? `${ap.pack_size} Pack` : "Direct Harvest"),
    badgeType: (salePrice > 400 ? "bestseller" : "pure") as any,
    category: cat,
    grade: (titleLower.includes("jumbo") || titleLower.includes("grade a")) ? "Grade A" : (titleLower.includes("dum") || titleLower.includes("biriyani")) ? "Specialty Dum" : (titleLower.includes("paste")) ? "Paste Grade" : "Grade B",
    cloveSize: packSizeStr ? `${packSizeStr} Pack` : "20-30mm Whole Cloves",
    description: ap.description || "Hygienically sorted fresh peeled garlic ready for commercial cooking.",
    fullDescription: ap.long_description || ap.description || "Farm fresh garlic sourced and processed under hygienic GMP standards at OurGrowth Enterprises.",
    image: prodImg,
    secondaryImages: resolvedGallery,
    rating: typeof ap.rating === 'number' ? ap.rating : 5.0,
    reviewsCount: typeof ap.reviews_count === 'number' ? ap.reviews_count : (typeof ap.reviewsCount === 'number' ? ap.reviewsCount : 0),
    price: salePrice,
    originalPrice: origPrice,
    priceUnit: ap.price_unit || (ap.pack_size ? `per ${ap.pack_size}` : "per KG"),
    packSizes: packSizes,
    features: [
      "100% net peeled usable cloves",
      "Pneumatic de-skinned, zero chemical washes",
      "Cold-chain refrigerated delivery (2°C–4°C)",
      "Instant GST invoice & batch certification",
    ],
    kitchenYield: "100% Usable Yield (0% Kitchen Prep Waste)",
    storageDays: "30 Days at 2°C–4°C",
    availableStock: typeof ap.available_stock === "number" ? ap.available_stock : 100,
    isInStock: ap.is_in_stock !== false,
  };
}

// Fallback products perfectly matching ERP items in database
export const products: Product[] = [
  {
    id: "SKU-1791935348285",
    slug: "SKU-1791935348285",
    title: "jumbo gralic",
    badge: "New ERP Harvest",
    badgeType: "bestseller",
    category: "retail",
    grade: "Grade A",
    cloveSize: "500g Pack",
    description: "Premium jumbo peeled garlic cloves vacuum sealed for restaurant and hotel kitchens.",
    fullDescription: "Premium jumbo peeled garlic cloves vacuum sealed for restaurant and hotel kitchens. Hygienically processed at OurGrowth facility.",
    image: DEFAULT_GARLIC_IMAGES[0],
    secondaryImages: [DEFAULT_GARLIC_IMAGES[1]],
    rating: 5.0,
    reviewsCount: 24,
    price: 501,
    originalPrice: 575,
    priceUnit: "per 500g",
    packSizes: [
      { size: "500g", price: 501, savings: "Standard Pack" },
      { size: "1 KG", price: 1002, savings: "Save 5%" },
      { size: "5 KG", price: 4750, savings: "Save 8%" },
    ],
    features: [
      "100% peeled net weight",
      "Dry air friction peeled, 0% water content",
      "Guaranteed 30 days chilled shelf life",
      "Direct ERP live harvest sync",
    ],
    kitchenYield: "100% Usable Yield",
    storageDays: "30 Days at 2°C–4°C",
    availableStock: 1000,
    isInStock: true,
  },
  {
    id: "PEELED-GARLIC-KG",
    slug: "PEELED-GARLIC-KG",
    title: "Peeled Fresh Garlic (Vacuum Pack)",
    badge: "Direct Harvest",
    badgeType: "pure",
    category: "commercial",
    grade: "Grade A",
    cloveSize: "20-30mm Whole Cloves",
    description: "Hygienically peeled fresh garlic ready to cook for hotels, restaurants and caterers.",
    fullDescription: "Hygienically peeled fresh garlic ready to cook for hotels, restaurants and caterers. Zero moisture soaking ensures cloves remain crisp, plump, and pan-ready.",
    image: DEFAULT_GARLIC_IMAGES[1],
    rating: 4.9,
    reviewsCount: 156,
    price: 200,
    originalPrice: 230,
    priceUnit: "per KG",
    packSizes: [
      { size: "1 KG", price: 200, savings: "Standard Rate" },
      { size: "5 KG", price: 950, savings: "Save 5%" },
      { size: "10 KG", price: 1840, savings: "Save 8%" },
    ],
    features: [
      "Zero moisture surface tension",
      "Pneumatically de-skinned",
      "100% usable net weight",
      "FSSAI certified facility",
    ],
    kitchenYield: "100% Usable Yield",
    storageDays: "30 Days at 2°C–4°C",
    availableStock: 500,
    isInStock: true,
  },
  {
    id: "grade-a-jumbo-peeled",
    slug: "grade-a-jumbo-peeled",
    title: "Grade A Jumbo Peeled Garlic",
    badge: "Bestseller",
    badgeType: "bestseller",
    category: "retail",
    grade: "Grade A",
    cloveSize: "25-35mm Jumbo Cloves",
    description: "Plump, whole peeled cloves with zero skin residue. Best for roasting, fine-dining, and gourmet presentations.",
    fullDescription: "Our flagship Grade A Jumbo Peeled Garlic is pneumatically de-skinned with filtered air friction, leaving natural volatile allicin completely intact.",
    image: DEFAULT_GARLIC_IMAGES[0],
    rating: 4.95,
    reviewsCount: 184,
    price: 150,
    originalPrice: 175,
    priceUnit: "per KG",
    packSizes: [
      { size: "1 KG", price: 150, savings: "Standard Rate" },
      { size: "5 KG", price: 712, savings: "Save 5%" },
      { size: "10 KG", price: 1380, savings: "Save 8%" },
    ],
    features: [
      "Dry air friction peeled, 0% water content",
      "Guaranteed 30 days chilled shelf life",
      "Zero sticky chemical washes",
      "100% usable net clove weight",
    ],
    kitchenYield: "100% Net Yield (Saves 2.5 hrs daily prep)",
    storageDays: "30 Days at 2°C–4°C",
    availableStock: 350,
    isInStock: true,
  },
  {
    id: "biriyani-handi-special",
    slug: "biriyani-handi-special",
    title: "Biriyani Handi Special Peeled Garlic",
    badge: "High Allicin",
    badgeType: "allicin",
    category: "specialty",
    grade: "Specialty Dum",
    cloveSize: "20-30mm High Oil Cloves",
    description: "High-potency allicin concentration crafted to withstand long sealed dum steaming without losing raw pungent aroma.",
    fullDescription: "Formulated specifically for Mughlai master chefs and high-cadence biriyani houses. Extra large unbroken cloves that withstand high dum steam.",
    image: DEFAULT_GARLIC_IMAGES[1],
    rating: 5.0,
    reviewsCount: 92,
    price: 220,
    originalPrice: 250,
    priceUnit: "per KG",
    packSizes: [
      { size: "1 KG", price: 220, savings: "Standard Rate" },
      { size: "5 KG", price: 1045, savings: "Save 5%" },
      { size: "10 KG", price: 2024, savings: "Save 8%" },
    ],
    features: [
      "Extra large unbroken cloves",
      "Zero sulfur degradation",
      "Recommended by 90+ catering houses",
      "Airtight vacuum food-grade packaging",
    ],
    kitchenYield: "100% Usable Yield for 800+ Dum Portions",
    storageDays: "30 Days at 2°C–4°C",
    availableStock: 420,
    isInStock: true,
  },
  {
    id: "cloud-kitchen-crate",
    slug: "cloud-kitchen-crate",
    title: "Cloud Kitchen Fast-Prep Crate",
    badge: "Commercial Value",
    badgeType: "commercial",
    category: "bulk-crates",
    grade: "Grade B",
    cloveSize: "18-24mm Uniform Cloves",
    description: "Sorted uniform peeled cloves optimized for high-cadence gravies, curries, and high-volume daily prep.",
    fullDescription: "Designed for high-speed wok tosses, Indo-Chinese sautéing, and fast-casual food production lines. Uniform medium sizing ensures even cooking.",
    image: DEFAULT_GARLIC_IMAGES[2],
    rating: 4.85,
    reviewsCount: 64,
    price: 210,
    originalPrice: 240,
    priceUnit: "per KG",
    packSizes: [
      { size: "1 KG", price: 210, savings: "Standard Rate" },
      { size: "5 KG", price: 995, savings: "Save 5%" },
      { size: "10 KG", price: 1930, savings: "Save 8%" },
    ],
    features: [
      "Optimized for high-cadence evening rush",
      "Insulated reusable crates",
      "Immediate chop, crush, or sauté readiness",
      "Pre-screened for zero stem clippings",
    ],
    kitchenYield: "100% Ready-to-Sauté Cloves",
    storageDays: "25 Days at 2°C–4°C",
    availableStock: 800,
    isInStock: true,
  },
  {
    id: "paste-grade-cloves",
    slug: "paste-grade-cloves",
    title: "Paste & Puree Grade Peeled Cloves",
    badge: "Master Blends",
    badgeType: "pure",
    category: "specialty",
    grade: "Paste Grade",
    cloveSize: "Assorted Crisp Cloves",
    description: "Clean peeled garlic sorted for high-torque wet grinding, emulsifying, and marinade manufacturing.",
    fullDescription: "Engineered specifically for central commissary paste production. Because our garlic is never water-soaked, paste grinds smoother and stays fresh.",
    image: DEFAULT_GARLIC_IMAGES[3],
    rating: 4.95,
    reviewsCount: 78,
    price: 190,
    originalPrice: 220,
    priceUnit: "per KG",
    packSizes: [
      { size: "1 KG", price: 190, savings: "Standard Rate" },
      { size: "5 KG", price: 900, savings: "Save 5%" },
      { size: "10 KG", price: 1748, savings: "Save 8%" },
    ],
    features: [
      "Zero moisture surface tension for emulsified purees",
      "Longer paste preservation without added vinegar",
      "Tested for high natural allicin concentration",
      "Bulk commercial food grade sacks",
    ],
    kitchenYield: "100% Net Yield for Puree",
    storageDays: "35 Days at 2°C–4°C",
    availableStock: 600,
    isInStock: true,
  },
  {
    id: "single-clove-mountain",
    slug: "single-clove-mountain",
    title: "Single Clove Mountain Kashmiri Garlic",
    badge: "Wild Mountain",
    badgeType: "bestseller",
    category: "specialty",
    grade: "Grade A",
    cloveSize: "Himalayan Single Cloves",
    description: "Rare wild Himalayan snow pearls rich in medicinal sulfur compounds and allicin.",
    fullDescription: "Rare wild Himalayan snow pearls rich in medicinal sulfur compounds and allicin. Naturally harvested from high altitude mountain soils.",
    image: DEFAULT_GARLIC_IMAGES[1],
    rating: 5.0,
    reviewsCount: 42,
    price: 550,
    originalPrice: 620,
    priceUnit: "per KG",
    packSizes: [
      { size: "1 KG", price: 550, savings: "Standard Rate" },
      { size: "5 KG", price: 2610, savings: "Save 5%" },
    ],
    features: [
      "Wild collected Himalayan single pearls",
      "Extremely concentrated medicinal allicin",
      "Naturally cured and sorted",
    ],
    kitchenYield: "100% Usable Pearl Cloves",
    storageDays: "60 Days at 2°C–4°C",
    availableStock: 90,
    isInStock: true,
  },
  {
    id: "dehydrated-crispy-flakes",
    slug: "dehydrated-crispy-flakes",
    title: "Dehydrated Crispy Golden Garlic Flakes",
    badge: "Value Added",
    badgeType: "pure",
    category: "specialty",
    grade: "Grade A",
    cloveSize: "Uniform Crisp Flakes",
    description: "Crunchy roasted garlic flakes for garnishing noodles, soups, and specialty biriyanis.",
    fullDescription: "Crunchy roasted garlic flakes for garnishing noodles, soups, and specialty biriyanis. Pure garlic aroma with zero burnt notes.",
    image: DEFAULT_GARLIC_IMAGES[2],
    rating: 4.85,
    reviewsCount: 31,
    price: 450,
    originalPrice: 510,
    priceUnit: "per KG",
    packSizes: [
      { size: "1 KG", price: 450, savings: "Standard Rate" },
      { size: "5 KG", price: 2135, savings: "Save 5%" },
    ],
    features: [
      "Zero added starches or fillers",
      "Ready to sprinkle garnish",
      "Airtight moisture-barrier container",
    ],
    kitchenYield: "100% Ready-to-Use Crisp Flakes",
    storageDays: "180 Days ambient dry",
    availableStock: 120,
    isInStock: true,
  },
];
