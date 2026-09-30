export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "How should peeled garlic be stored for maximum freshness?",
    answer: "Store our peeled garlic pouches in your refrigerator at 2°C to 4°C. Our vacuum and breathable micro-perforated food-grade pouches maintain peak aroma, firm texture, and crispness for up to 30 days without freezing.",
  },
  {
    id: "faq-2",
    question: "Do you use water soaking or chemicals to peel the skins?",
    answer: "Never. We use high-velocity filtered dry air-jet friction peeling. Traditional wet peeling washes away volatile allicin oils and induces rapid fermentation. Our dry method leaves cloves pristine, raw, and completely dry to the touch.",
  },
  {
    id: "faq-3",
    question: "What are the minimum order quantities for restaurant wholesale?",
    answer: "Commercial wholesale rates start at 10kg crates. For institutional contracts exceeding 50kg per week, we assign dedicated cold-chain routes with customized daily or bi-weekly morning deliveries and consolidated GST invoicing.",
  },
  {
    id: "faq-4",
    question: "Is OurGrowth certified by food safety authorities?",
    answer: "Yes, our packing and processing hubs are 100% compliant with FSSAI certified standard operating procedures (Licence: 12823000000000) under temperature-controlled hygiene standards.",
  },
  {
    id: "faq-5",
    question: "How fast is transit and delivery across India?",
    answer: "We offer same-day morning delivery for partner metro hubs, and 24–48 hour refrigerated cold-chain transit across major commercial zones with temperature data loggers included.",
  },
];
