export interface Testimonial {
  id: string;
  name: string;
  role: string;
  outlet: string;
  avatar: string;
  comment: string;
  rating: number;
  highlighted?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "review-1",
    name: "Rahim Khan",
    role: "Master Chef",
    outlet: "Nizam Biriyani Hub",
    avatar: "RK",
    comment: "We run four high-cadence biriyani outlets. Peeling 40kg of garlic every morning was an absolute nightmare. OurGrowth provides dry, crisp cloves that retain that pungent kick throughout dum cooking.",
    rating: 5,
  },
  {
    id: "review-2",
    name: "Chef Sunita Das",
    role: "Founder & Head Chef",
    outlet: "Urban Wok Cloud Kitchens",
    avatar: "SD",
    comment: "The dry air-peeled process genuinely makes a difference. Previous market suppliers soaked garlic in water which spoiled our garlic oil sauces within 2 days. OurGrowth cloves last fresh in the cooler for weeks.",
    rating: 5,
    highlighted: true,
  },
  {
    id: "review-3",
    name: "Anand Mukherjee",
    role: "Culinary Director",
    outlet: "Royal Bengal Caterers",
    avatar: "AM",
    comment: "Their 10kg master crate supply has never missed a morning delivery window. When catering for weddings with 2,000+ plates, knowing our garlic is 100% clean and ready gives us massive peace of mind.",
    rating: 5,
  },
];
