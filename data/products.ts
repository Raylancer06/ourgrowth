export interface Product {
  id: string;
  title: string;
  badge: string;
  description: string;
  image: string;
  rating: number;
  packSizes: string[];
  priceEstimate: string;
}

export const products: Product[] = [
  {
    id: "jumbo-table-cloves",
    title: "Jumbo Table Cloves",
    badge: "Grade A Selected",
    description: "Plump, whole peeled cloves with zero skin residue. Best for roasting, fine-dining, and gourmet presentations.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCabO8HJEP-tUgMOtNeoUZSDnNJ3mpuH6huHZAJKJSwPRuNOiBfAAmeFDDNX44uT9koJIC1FX43wl8uzqhumpZRkzDrGLeUCusTLkRNWK5lr55TKVeO3yMBjLvoHZNmb0zse8xK-VD8Tm4JdnlnTOPeRtyb_xMgsf3H79KFNJGXxtXbc67dm2MY6OGbtWRMS7nSeu7n917TV8ADDcpbzpqwfOF2g4yxUiJ65LsnF1CXx2XxwEWpxEH3hbXz98WDN2PKqg",
    rating: 4.9,
    packSizes: ["1 KG", "5 KG", "10 KG", "50 KG Crate"],
    priceEstimate: "Wholesale Tier",
  },
  {
    id: "biriyani-handi-special",
    title: "Biriyani Handi Special",
    badge: "Commercial Bulk",
    description: "High-potency allicin concentration crafted to withstand long sealed dum steaming without losing raw pungent aroma.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBX9Lx3_jJmhS-xpnNxWKNyC-pUFFuJ7riy_38w4buXgM6X7LozF5krKZQOEVb2hRoYzPwy4revekR3paqAa996rhkPauIYI5nszp2QNwlv2cZcE6omvR-xkMjYyl-hhTParHn0_9cBLLGoS9KdtXbzSoqsuZ-BPzM6gLw9YjIXCqzgqjth5sFiTHb-L4wBHQwhKGgOTW-dsogFQrFr5U-bRwuCH_zZ5F8Omw3WvyCdTzhcVHMuoVuSzwSS4N4FMkW85g",
    rating: 5.0,
    packSizes: ["5 KG", "10 KG", "25 KG", "50 KG+"],
    priceEstimate: "High Allicin Bulk",
  },
  {
    id: "cloud-kitchen-crate",
    title: "Cloud Kitchen Crate",
    badge: "Speed Prep",
    description: "Medium uniform cloves designed for high-cadence evening rush prep, wok tosses, and rapid sautéing in fast-casual kitchens.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARydxRL1yzcGAyvJ-675OlosXsRqUur1FiR1-5fEAAMv1w2cve2KBy6vg--3jkyKjEZR6jnjhq_A8T11xT74fufA_fxxn1flX7Xf3ztV8KwauHM831i0ehPWrUDpxbxTDdzpKaZNoZFVTo80V8-kyiipHzLM6DIG2xSeNQzXJce7K7uu_dfAQ8yVVnzmAg3dvvgYf6x-L2n0qh3N4PcgWZHPf_IUG3USjn5zHamr46NlCnbf2-H2242WHP3c8VKj5_1g",
    rating: 4.85,
    packSizes: ["10 KG", "20 KG", "50 KG"],
    priceEstimate: "High Speed Economy",
  },
  {
    id: "pure-paste-blend",
    title: "Pure Paste Blend",
    badge: "Master Blends",
    description: "Crisp, non-waterlogged cloves formulated for ultra-smooth ginger-garlic paste grinding without premature bubbling.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgnUTnreGXEcvRcv8hTVQQOs0QBlqf1RAJWQVWaegBxEZjKjxPKXUTViQjOHvdw1yCaxQS_eR7VF2G7KLG9nNMWYRyzQav_3biEcShmIvpuPVVLKjcih7rYnYCAkSJ47Q4lctRM-OQp8LVcAR6ReEawpRYa4yslmvr8LnEH-NOHIMHjy9AYmul2mEkmgVBVyV5w9fWQdl2uU3aOMHk_TcsIqVcJc5ZKFh4XGP57jegvfAEJus50hKz8TFX54RknjqxhA",
    rating: 4.95,
    packSizes: ["10 KG", "25 KG", "100 KG Master Lot"],
    priceEstimate: "Processing Grade",
  },
];
