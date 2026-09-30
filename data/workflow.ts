export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  iconName: string;
}

export const workflowSteps: WorkflowStep[] = [
  {
    step: 1,
    title: "Select Product",
    description: "Browse vacuum packs (250g to 10KG bulk) or specialty garlic products.",
    iconName: "ShoppingBag",
  },
  {
    step: 2,
    title: "Place Order",
    description: "Enter delivery address and choose instant online or cash/UPI on delivery.",
    iconName: "Send",
  },
  {
    step: 3,
    title: "Order Confirmation",
    description: "Instant order verification with automated invoice & WhatsApp updates.",
    iconName: "CheckCircle",
  },
  {
    step: 4,
    title: "Fresh Packing",
    description: "Cold-chain vacuum packed on the morning of dispatch for maximum shelf life.",
    iconName: "Package",
  },
  {
    step: 5,
    title: "Doorstep Delivery",
    description: "Same-day or next-day scheduled transit right to your home or commercial kitchen.",
    iconName: "Truck",
  },
  {
    step: 6,
    title: "Payment on Delivery",
    description: "Inspect fresh peeled garlic and pay securely via Cash, UPI QR, or Bank Transfer.",
    iconName: "CreditCard",
  },
];
