import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/animations/SmoothScroll";
import ScrollProgress from "@/components/animations/ScrollProgress";
import { ToastProvider } from "@/components/ui/Toast";
import { CartProvider } from "@/context/CartContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OurGrowth Enterprises | Pure · Peeled · Garlic",
  description:
    "Premium farm-direct peeled garlic cloves, dry air-peeled under FSSAI certified food safety standards. Daily cold-chain delivery for commercial kitchens across India.",
  keywords: [
    "peeled garlic",
    "wholesale garlic",
    "cold-chain garlic",
    "restaurant food supply",
    "pure peeled garlic",
    "OurGrowth enterprises",
    "bulk garlic delivery",
  ],
  openGraph: {
    title: "OurGrowth Enterprises | Pure · Peeled · Garlic",
    description:
      "Wholesale Rates For Commercial Kitchens & Food Brands. Daily cold-chain delivery in 1KG, 5KG & 10KG packs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable}`}>
      <body className="bg-surface font-sans text-on-surface antialiased selection:bg-secondary-container selection:text-primary">
        <SmoothScroll>
          <CartProvider>
            <ToastProvider>
              <ScrollProgress />
              {children}
            </ToastProvider>
          </CartProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
