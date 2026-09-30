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
}

export const products: Product[] = [
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
    fullDescription: "Our flagship Grade A Jumbo Peeled Garlic is pneumatically de-skinned with filtered air friction, leaving natural volatile allicin completely intact. Zero moisture soaking ensures cloves remain crisp, plump, and pan-ready for up to 30 days under refrigeration.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCabO8HJEP-tUgMOtNeoUZSDnNJ3mpuH6huHZAJKJSwPRuNOiBfAAmeFDDNX44uT9koJIC1FX43wl8uzqhumpZRkzDrGLeUCusTLkRNWK5lr55TKVeO3yMBjLvoHZNmb0zse8xK-VD8Tm4JdnlnTOPeRtyb_xMgsf3H79KFNJGXxtXbc67dm2MY6OGbtWRMS7nSeu7n917TV8ADDcpbzpqwfOF2g4yxUiJ65LsnF1CXx2XxwEWpxEH3hbXz98WDN2PKqg",
    secondaryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_Kw5xrGxNfAIULbpDWPYfhOLv5cfHf-rVNdGKMrSvN5IUuWjGWJM0-6slmV8TQMMAL2kDtZx7Z9jgSzEWR6tJK-QM8yiANk-Vvn0hI0OBcHys9xeRR1bd6wqU5Ac1vCZzYX2RCtToIJFcMaAFrUJ-ej9KmtqYsQwoj9eeaCxcTEqnoxmMMWJTRIg1AD6AIr9a_cFbe12BvRriShiDLXZfjQC7M2DiczKS4uzP8gJ-ltlcF6RRBZyrAnVNTTVBgKm-TQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCEzQUx7GS3EhxAXSiKaoAxdRi6_BYgoFmd0H50mScvxdcOONgzbtg69gn6mN-V49pcNrt1nKeRnNKL2Im2jSLXI3edA6Wk72I5h5OQx0S3Rh4bXcLO4oPQ4e9u-CKI5S7dQ9nHJ5qrV1pNeGCdpw1e5NnQJcX2egYA0D8g-eTyNJfE4yV_kg5DDa6sKTHjOLsqPX_rXhwalUP-9KaE6DzKhqdLV3IhBnpB5PYW2UZplU1eqDyNZAaAa0A1Gy9syse5vg",
    ],
    rating: 4.9,
    reviewsCount: 184,
    price: 240,
    originalPrice: 290,
    priceUnit: "per 1kg pouch",
    packSizes: [
      { size: "1 KG", price: 240, savings: "Save 17%" },
      { size: "5 KG", price: 1150, savings: "Save 21%" },
      { size: "10 KG", price: 2200, savings: "Save 24%" },
    ],
    features: [
      "Dry air friction peeled, 0% water content",
      "Guaranteed 30 days chilled shelf life (2°C–4°C)",
      "Zero sticky chemical washes or sodium bisulfite",
      "100% usable net clove weight",
    ],
    kitchenYield: "100% Net Yield (Saves 2.5 hrs daily prep)",
    storageDays: "30 Days at 2°C–4°C",
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
    fullDescription: "Formulated specifically for Mughlai master chefs and high-cadence biriyani houses. These dry-peeled cloves carry dense essential oil vesicles that release rich, aromatic pungency progressively under intense handi steam.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBX9Lx3_jJmhS-xpnNxWKNyC-pUFFuJ7riy_38w4buXgM6X7LozF5krKZQOEVb2hRoYzPwy4revekR3paqAa996rhkPauIYI5nszp2QNwlv2cZcE6omvR-xkMjYyl-hhTParHn0_9cBLLGoS9KdtXbzSoqsuZ-BPzM6gLw9YjIXCqzgqjth5sFiTHb-L4wBHQwhKGgOTW-dsogFQrFr5U-bRwuCH_zZ5F8Omw3WvyCdTzhcVHMuoVuSzwSS4N4FMkW85g",
    secondaryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTMp_TRUxwxJTER37_RWjHDs0M23-NveFw1dCMp_dNJjenCQ5RvSsy03G4jbSausltwX_nr_t7lt5vEUO4cQT3J8GtCYNtParUPokS2w1TRwSotvSVU7Re7m_4_UuMb1myqmfgsFVUG49Fls_gCBPK2Ra9Hv1Z_RWpl91dyhba-bYQrJajIhUVHXzKM5llO65I69upLJpYmorW40js3WYbL3XnVBqWda_ejQ-N5eHhyCU_MXn4qma1L6kBWhP9jSmxag",
    ],
    rating: 5.0,
    reviewsCount: 92,
    price: 1100,
    originalPrice: 1250,
    priceUnit: "per 5kg pack",
    packSizes: [
      { size: "5 KG", price: 1100, savings: "Save ₹150" },
      { size: "10 KG", price: 2100, savings: "Save ₹400" },
      { size: "25 KG", price: 5000, savings: "Save ₹1,250" },
    ],
    features: [
      "Extra large unbroken cloves, withstands high dum heat",
      "Zero sulfur degradation, pure unadulterated aroma",
      "Recommended by 90+ catering houses",
      "Airtight vacuum food-grade packaging",
    ],
    kitchenYield: "100% Usable Yield for 800+ Dum Portions",
    storageDays: "30 Days at 2°C–4°C",
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
    description: "Medium uniform cloves designed for high-cadence evening rush prep, wok tosses, and rapid sautéing in fast-casual kitchens.",
    fullDescription: "Designed for high-speed wok tosses, Indo-Chinese sautéing, and fast-casual food production lines. Uniform medium sizing ensures even pan searing without bitter burnt centers.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARydxRL1yzcGAyvJ-675OlosXsRqUur1FiR1-5fEAAMv1w2cve2KBy6vg--3jkyKjEZR6jnjhq_A8T11xT74fufA_fxxn1flX7Xf3ztV8KwauHM831i0ehPWrUDpxbxTDdzpKaZNoZFVTo80V8-kyiipHzLM6DIG2xSeNQzXJce7K7uu_dfAQ8yVVnzmAg3dvvgYf6x-L2n0qh3N4PcgWZHPf_IUG3USjn5zHamr46NlCnbf2-H2242WHP3c8VKj5_1g",
    secondaryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_3oOKwjI-vQJbMo09pl_zI5T98I15S1uUGNLtdEW-Yo_75AdfoY19PN_8osgEb5CrGVCFuNWfPTk8yumeEBtvvigYC3sRQxOvannpYJ5Yb2v6EfvV4E3OQH0wAPgxYF6DemaNZMSW2uThbP1k_Is0HLYg8xgnujTHhJ08330BVpveWLb80ELunFlRnng3LKdaZj0_FX0wcFezimLFrkI9tKcIjBeJT40cM3QF6m5uotR-vk74RuAyMUqqvrQ0Spbd3g",
    ],
    rating: 4.85,
    reviewsCount: 64,
    price: 2000,
    originalPrice: 2400,
    priceUnit: "per 10kg crate",
    packSizes: [
      { size: "10 KG", price: 2000, savings: "Save ₹400" },
      { size: "20 KG", price: 3850, savings: "Save ₹950" },
      { size: "50 KG", price: 9200, savings: "Save ₹2,800" },
    ],
    features: [
      "Optimized for high-cadence evening order rush",
      "Insulated reusable thermocol shipping crate",
      "Immediate chop, crush, or sauté readiness",
      "Pre-screened for zero stem clippings",
    ],
    kitchenYield: "100% Ready-to-Sauté Cloves",
    storageDays: "25 Days at 2°C–4°C",
  },
  {
    id: "pure-paste-blend",
    slug: "pure-paste-blend",
    title: "Pure Paste & Puree Clove Blend",
    badge: "Master Blends",
    badgeType: "pure",
    category: "specialty",
    grade: "Paste Grade",
    cloveSize: "Assorted Crisp Cloves",
    description: "Crisp, non-waterlogged cloves formulated for ultra-smooth ginger-garlic paste grinding without premature bubbling.",
    fullDescription: "Engineered specifically for central commissary paste production. Because our garlic is never water-soaked, master batches of ginger-garlic paste grind smoother, stay creamy, and resist premature fungal bubbling or acid discoloration.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgnUTnreGXEcvRcv8hTVQQOs0QBlqf1RAJWQVWaegBxEZjKjxPKXUTViQjOHvdw1yCaxQS_eR7VF2G7KLG9nNMWYRyzQav_3biEcShmIvpuPVVLKjcih7rYnYCAkSJ47Q4lctRM-OQp8LVcAR6ReEawpRYa4yslmvr8LnEH-NOHIMHjy9AYmul2mEkmgVBVyV5w9fWQdl2uU3aOMHk_TcsIqVcJc5ZKFh4XGP57jegvfAEJus50hKz8TFX54RknjqxhA",
    rating: 4.95,
    reviewsCount: 78,
    price: 1850,
    originalPrice: 2150,
    priceUnit: "per 10kg master pack",
    packSizes: [
      { size: "10 KG", price: 1850, savings: "Save ₹300" },
      { size: "25 KG", price: 4400, savings: "Save ₹975" },
      { size: "50 KG", price: 8500, savings: "Save ₹2,250" },
    ],
    features: [
      "Zero moisture surface tension for emulsified purees",
      "Longer paste preservation without added vinegar",
      "Tested for high natural allicin concentration",
      "Bulk commercial food grade sacks",
    ],
    kitchenYield: "Produces 12.5KG Master Ginger-Garlic Paste",
    storageDays: "35 Days at 2°C–4°C",
  },
  {
    id: "retail-pantry-four-pack",
    slug: "retail-pantry-four-pack",
    title: "Pantry Fresh 250g (Pack of 4)",
    badge: "Consumer Pack",
    badgeType: "pure",
    category: "retail",
    grade: "Grade A",
    cloveSize: "22-30mm Selected Cloves",
    description: "Four individually vacuum-sealed 250g pouches for home chefs and boutique catering stations.",
    fullDescription: "Open one pouch while the other three stay hermetically sealed in your refrigerator. Perfect for families, weekly home meal prep, and intimate boutique catering counters.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAazymcVUYok1VWwrs-vZHLTAaXvk2Fp7dbnv6mcsdhocp7GAEp4KDyud6m6azd17gI1lJlroNZlO84AqvCun65B2aY2BQxgGsUUeUuU87SQfi0vysLLQeB7kQ4G2FcNM4AeckhbBZGakXT9e6bVc2OuQuSJFgYuTQzByO9sDzKaO2m8Nxj1EklbAyO5S_PBRr_kDBOLd0Vk7wE-lMJcdg9546xy4NmWCsnVfstkbGhod_XIr6q6_6mGaqAE0HlnM9lOA",
    rating: 4.9,
    reviewsCount: 110,
    price: 260,
    originalPrice: 320,
    priceUnit: "per 4x250g bundle",
    packSizes: [
      { size: "1 KG (4x250g)", price: 260, savings: "Save ₹60" },
      { size: "2 KG (8x250g)", price: 500, savings: "Save ₹140" },
    ],
    features: [
      "Four separate sealed freshness packs",
      "Zero peeling smell on fingers",
      "FSSAI compliant micro-perforated film",
      "Cook immediately out of the pouch",
    ],
    kitchenYield: "100% Usable Pantry Garlic",
    storageDays: "30 Days at 2°C–4°C",
  },
  {
    id: "master-kitchen-50kg-lot",
    slug: "master-kitchen-50kg-lot",
    title: "Commercial Master Wholesale Lot",
    badge: "Institutional 50KG",
    badgeType: "commercial",
    category: "bulk-crates",
    grade: "Grade A",
    cloveSize: "25-35mm Jumbo Uniform",
    description: "Scheduled cold-chain transit in insulated Reefer crating for hotel banquets, central commissaries, and food brands.",
    fullDescription: "Our primary institutional contract product. Delivered under active temperature logging (2°C–4°C) with consolidated GST invoices and guaranteed morning kitchen arrival slots.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPQb_cy4Ct-zNmnLcmmDRGq0HDxhIXhwC-x8y9xboq2Tpf3LheFsqyxeld7wL-I8OiIs6BIOt_1mk4xyXXh2ZtzO8BNLSyjnX0R1lhQxLqeSBCv-uEUvqsf6lGNwHmlvOSFoZGUT4sixsZH4esVa6N1fKSrXsSzPEMWN4zIxZauOxtBNOKt7BEmvd28IOJJ3dfGLkjKKL1z1Q2eZZGMdtVJm2QhrQGHNROg_yt0Hi-qjf7ySMNBn8ApqlBSUzjhy5UtA",
    rating: 5.0,
    reviewsCount: 47,
    price: 9200,
    originalPrice: 11500,
    priceUnit: "per 50kg lot (₹184/kg)",
    packSizes: [
      { size: "50 KG Crate", price: 9200, savings: "Save ₹2,300" },
      { size: "100 KG Lot", price: 18000, savings: "Save ₹5,000" },
    ],
    features: [
      "Direct reefer dispatch with temp logging",
      "Consolidated GST invoice with E-way bill",
      "Dedicated account relationship manager",
      "Fixed contractual rate lock available",
    ],
    kitchenYield: "100% Usable Yield for 5,000+ Restaurant Meals",
    storageDays: "30 Days at 2°C–4°C",
  },
];
