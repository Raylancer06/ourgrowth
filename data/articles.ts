export interface Article {
  id: string;
  slug: string;
  category: "efficiency" | "storage" | "health" | "recipes";
  categoryLabel: string;
  title: string;
  excerpt: string;
  readTime: string;
  tag: string;
  image: string;
  date: string;
  author: string;
  badge: string;
  stats?: { label: string; manual: string; ourgrowth: string; savings: string };
}

export const articles: Article[] = [
  {
    id: "kitchen-roi-peeled-garlic",
    slug: "kitchen-roi-peeled-garlic",
    category: "efficiency",
    categoryLabel: "Kitchen Efficiency & ROI",
    title: "Commercial Kitchen Math: Why Peeling Garlic in-House Costs Restaurants 35% More in Hidden Labor",
    excerpt: "A comprehensive breakdown of knife-labor hours, 18-24% peel shrinkage loss, and waste disposal costs versus high-grade, vacuum-sealed ready cloves that unlock faster dinner covers.",
    readTime: "7 Min Deep-Dive",
    tag: "B2B Strategy",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFsqXzpNUbbgN_9GpCJQM25GhYZa6UOGWlIEZriYfwdA_buSMawmO-6q932m-g6329oumxCbCGn3qJ1aL8PCKAvxJgSMsBRdZPcOwLFuAMKYmAQq_cipMWLGG1_QLG_7XnUYB0tU2wE7FfAg4-L9nibkKv3659fe98Tk6KPAL4IzprLhp_wZs5rw0-0wqWVuZOdKCxTSpV2kCmQpaZMbFexXvr5amrwUhDBm5mr3C1r-H8IIF2NvuRuJmqE2_WRWJyRg",
    date: "Sep 2026",
    author: "Chef Vikram Sen",
    badge: "Cost Breakdown",
    stats: {
      label: "Prep Cost Per 10kg Batch",
      manual: "₹1,420 / batch",
      ourgrowth: "₹920 / batch",
      savings: "-35% Cost Reduction",
    },
  },
  {
    id: "allicin-preservation-science",
    slug: "allicin-preservation-science",
    category: "health",
    categoryLabel: "Health & Allicin Benefits",
    title: "The Biochemical Armor: How Dry Air-Peeling Protects Volatile Allicin Oils From Oxidation",
    excerpt: "Why traditional wet peeling leaches away precious culinary aroma within 48 hours, and how high-velocity pneumatic shearing seals the clove surface without cellar moisture rot.",
    readTime: "5 Min Science",
    tag: "Food Chemistry",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgQYxwz2rNFbeiXBFemY0cI2BkdqXlX1gHE0eBfwwzSu0Y_6w8mgLeNv1WoGU5IxRZGqmqeGKSwBGQk2GYx5NPZtGVHnWZzGx1pDUYMXOsZWj_JBm3Tnuon086AtRM5_xMiOoTeMePfEme-Vb-c1S8n-0udYB8tbH3X0yqi36JhXroeQ0yRsOZ8mOU8fe5FdwCE73tW1gFHgJMx8iqf4IDRON5v3if0OFD64oeklDk_ufofpxuNUMs",
    date: "Sep 2026",
    author: "Dr. Ananya Bose",
    badge: "Biochemical Guide",
  },
  {
    id: "cold-chain-reefer-storage",
    slug: "cold-chain-reefer-storage",
    category: "storage",
    categoryLabel: "Freshness & Storage",
    title: "The 2°C–4°C Sweet Spot: Extending Chilled Garlic Shelf-Life Up To 30 Days in Commercial Kitchen Coolers",
    excerpt: "Master guidelines for restaurant prep tables: preventing condensation build-up, pouch resealing protocols, and optimal walk-in cooler shelf placement.",
    readTime: "6 Min Standard",
    tag: "Kitchen SOPs",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNI-Zhnqf4Bc4Z80xyh9ZcG5PgHZYZjDOAafR01lMMXThiMh4TqyUjki-RcEB3jM2soHYLy_8W-VS92TeZWdWACYe2rmuPBb9kTL4S6H0viCNcxX87VRiYqxPHRwp499Tmr5YTSAtKEmab384DBeNX0qxq4DkbXuhH_3hJfjrfs23kIvzOY-iYRu-Qv85vy9dBnHYXXgDOecLYzZaZfg8pgipfrSlTOhvfhjG7LzTFLgnk2bAktDnNxQylH1rsSefrIw",
    date: "Aug 2026",
    author: "Logistics Team OurGrowth",
    badge: "Storage SOP",
  },
  {
    id: "dum-cooking-garlic-potency",
    slug: "dum-cooking-garlic-potency",
    category: "recipes",
    categoryLabel: "Chef Recipes & Techniques",
    title: "Dum Steam Infusion: Why India's Top Biriyani Masters Reject Bleached Market Garlic",
    excerpt: "Bleached garlic turns sour, mushy, and grey during a 90-minute sealed dum cook. Here's how dry-peeled whole jumbo cloves impart clean, buttery, aromatic undertones.",
    readTime: "8 Min Masterclass",
    tag: "Culinary Technique",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBX9Lx3_jJmhS-xpnNxWKNyC-pUFFuJ7riy_38w4buXgM6X7LozF5krKZQOEVb2hRoYzPwy4revekR3paqAa996rhkPauIYI5nszp2QNwlv2cZcE6omvR-xkMjYyl-hhTParHn0_9cBLLGoS9KdtXbzSoqsuZ-BPzM6gLw9YjIXCqzgqjth5sFiTHb-L4wBHQwhKGgOTW-dsogFQrFr5U-bRwuCH_zZ5F8Omw3WvyCdTzhcVHMuoVuSzwSS4N4FMkW85g",
    date: "Aug 2026",
    author: "Ustad Rahim Khan",
    badge: "Chef Technique",
  },
];
