"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, Truck, CreditCard, CheckCircle2, ChevronRight, 
  ArrowRight, Lock, MapPin, Home, Store, Briefcase, Plus, Loader2, Tag 
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";
import { createOrder, getCustomerProfile } from "@/lib/api";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, coldChainFee, total, clearCart, appliedCoupon, discountAmount } = useCart();
  const { showToast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "upi" | "neft">("cod");
  const [deliverySlot, setDeliverySlot] = useState<string>("morning");
  const [isPlacing, setIsPlacing] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Saved Addresses State
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("custom");

  const [formData, setFormData] = useState({
    restaurantName: "",
    chefName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    gstin: "",
  });

  // Load profile and saved addresses if logged in; redirect if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("ourgrowth_customer_token") || localStorage.getItem("og_customer_token");
    if (!token) {
      router.replace("/login?redirect=/checkout");
      return;
    }

    getCustomerProfile(token)
      .then((res) => {
        if (!res?.customer) {
          localStorage.removeItem("ourgrowth_customer_token");
          localStorage.removeItem("og_customer_token");
          localStorage.removeItem("ourgrowth_customer_user");
          localStorage.removeItem("user_authenticated");
          router.replace("/login?redirect=/checkout");
          return;
        }

        const cust = res.customer;
        const rawShipping = cust.shipping_address;
        let addrs: any[] = [];

        if (rawShipping && Array.isArray(rawShipping.addresses) && rawShipping.addresses.length > 0) {
          addrs = rawShipping.addresses;
        } else if (rawShipping && typeof rawShipping === "object" && rawShipping.address) {
          addrs = [{
            id: "addr_primary",
            label: cust.company_name ? "Store / Shop" : "Home",
            name: cust.name || "Recipient",
            phone: cust.phone || "",
            address: rawShipping.address,
            city: rawShipping.city || "",
            state: rawShipping.state || "",
            pincode: rawShipping.pincode || "",
            is_default: true,
          }];
        }

        setSavedAddresses(addrs);

        // Find default address or first address
        const defaultAddr = addrs.find((a) => a.is_default) || addrs[0];
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr.id);
          setFormData({
            restaurantName: cust.company_name || "",
            chefName: defaultAddr.name || cust.name || "",
            phone: defaultAddr.phone || cust.phone || "",
            email: cust.email || "",
            address: defaultAddr.address || "",
            city: defaultAddr.city || "",
            pincode: defaultAddr.pincode || "",
            gstin: cust.tax_number || "",
          });
        } else {
          setFormData((prev) => ({
            ...prev,
            restaurantName: cust.company_name || "",
            chefName: cust.name || "",
            phone: cust.phone || "",
            email: cust.email || "",
            gstin: cust.tax_number || "",
          }));
        }
        setCheckingAuth(false);
      })
      .catch((err) => {
        console.warn("Could not prefill user profile at checkout:", err);
        localStorage.removeItem("ourgrowth_customer_token");
        localStorage.removeItem("og_customer_token");
        localStorage.removeItem("ourgrowth_customer_user");
        localStorage.removeItem("user_authenticated");
        router.replace("/login?redirect=/checkout");
      });
  }, [router]);

  const handleSelectAddress = (addr: any) => {
    setSelectedAddressId(addr.id);
    setFormData((prev) => ({
      ...prev,
      chefName: addr.name || prev.chefName,
      phone: addr.phone || prev.phone,
      address: addr.address || "",
      city: addr.city || "",
      pincode: addr.pincode || "",
    }));
  };

  const handleSelectCustomAddress = () => {
    setSelectedAddressId("custom");
    setFormData((prev) => ({
      ...prev,
      address: "",
      city: "",
      pincode: "",
    }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      showToast("Your cart is empty. Please add items to proceed.");
      return;
    }

    const token = localStorage.getItem("ourgrowth_customer_token") || localStorage.getItem("og_customer_token");
    if (!token) {
      showToast("Please log in or create an account to place an order.");
      router.replace("/login?redirect=/checkout");
      return;
    }

    setIsPlacing(true);

    try {
      const orderItems = items.map((i) => ({
        sku: i.productId,
        pack_size: i.packSize,
        quantity: i.quantity,
      }));

      const orderRes = await createOrder(token, {
        items: orderItems,
        payment_method: paymentMethod,
        delivery_slot: deliverySlot,
        shipping_address: {
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
          restaurant_name: formData.restaurantName,
          chef_name: formData.chefName,
          phone: formData.phone,
        },
        customer_notes: `Delivery slot: ${deliverySlot}. Order for ${formData.restaurantName || formData.chefName}.`,
        coupon_code: appliedCoupon ? appliedCoupon.code : undefined,
      });

      if (orderRes.success && orderRes.order) {
        const orderId = orderRes.order.order_number;
        const finalTotal = orderRes.order.total_amount.toString();

        localStorage.setItem("latest_order_id", orderId);
        localStorage.setItem("latest_order_total", finalTotal);
        localStorage.setItem("latest_order_chef", formData.chefName || "Valued Customer");
        localStorage.setItem("latest_order_restaurant", formData.restaurantName || formData.chefName || "Retail Order");
        localStorage.setItem("latest_order_phone", formData.phone || "");
        localStorage.setItem("latest_order_payment_method", paymentMethod.toUpperCase());
        localStorage.setItem("latest_order_items", JSON.stringify(items));

        clearCart();
        showToast("Order Placed Successfully! Directing to Reefer Tracking...");
        router.push("/order-confirmation");
      } else {
        showToast(orderRes.message || "Failed to place order. Please check your delivery details.");
      }
    } catch (err: any) {
      showToast("Order placement failed. Please check your network connection.");
    } finally {
      setIsPlacing(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
        <Header />
        <main className="w-full pt-28 bg-surface flex-1 flex flex-col items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-secondary mb-3" />
          <p className="text-sm font-medium text-on-surface-variant">Verifying account session...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium mb-6">
            <Link href="/cart" className="hover:text-primary transition-colors">Cart</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary font-bold">Checkout &amp; Delivery Details</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Requisition / Delivery Address & Details */}
            <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container shadow-sm">
              <h2 className="font-headline-sm text-xl sm:text-2xl font-bold text-primary mb-1">
                Delivery &amp; Contact Details
              </h2>
              <p className="text-xs text-on-surface-variant mb-6">
                Chilled Reefer vehicles deliver directly to your doorstep, kitchen, or retail store.
              </p>

              {/* Saved Addresses Selector (if logged in and has addresses) */}
              {savedAddresses.length > 0 && (
                <div className="mb-6 p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-primary uppercase tracking-wider block">
                      Choose From Saved Addresses:
                    </label>
                    <Link
                      href="/account"
                      className="text-[11px] font-bold text-secondary hover:underline"
                    >
                      Manage Addresses →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {savedAddresses.map((addr) => {
                      const isSelected = selectedAddressId === addr.id;
                      return (
                        <div
                          key={addr.id}
                          onClick={() => handleSelectAddress(addr)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? "bg-secondary-fixed/30 border-secondary shadow-xs ring-1 ring-secondary"
                              : "bg-surface-container-lowest border-surface-container hover:border-surface-container-highest"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-bold text-primary px-2 py-0.5 rounded-full bg-surface-container border border-surface-container">
                              {addr.label}
                            </span>
                            {addr.is_default && (
                              <span className="text-[10px] bg-secondary text-on-secondary px-1.5 py-0.2 rounded font-bold">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="font-bold text-xs text-primary">{addr.name}</p>
                          <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-0.5">
                            {addr.address}, {addr.city} - {addr.pincode}
                          </p>
                          <p className="text-[10px] text-on-surface-variant mt-1">
                            Mobile: {addr.phone}
                          </p>
                        </div>
                      );
                    })}

                    {/* Option to type custom address */}
                    <div
                      onClick={handleSelectCustomAddress}
                      className={`p-3.5 rounded-xl border border-dashed cursor-pointer transition-all flex flex-col items-center justify-center text-center ${
                        selectedAddressId === "custom"
                          ? "bg-secondary-fixed/30 border-secondary ring-1 ring-secondary"
                          : "bg-surface-container-lowest border-surface-container hover:border-surface-container-highest text-on-surface-variant"
                      }`}
                    >
                      <Plus className="w-4 h-4 text-secondary mb-1" />
                      <span className="text-xs font-bold text-primary">Enter a different address</span>
                      <span className="text-[10px] text-on-surface-variant">Fill in new location below</span>
                    </div>
                  </div>
                </div>
              )}

              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      Full Name / Receiver Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.chefName}
                      onChange={(e) => setFormData({ ...formData, chefName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      Company / Store / Brand (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sharma Mart or Mughlai Hub"
                      value={formData.restaurantName}
                      onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      WhatsApp / Mobile Updates *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 94760 20341"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      Billing Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="user@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Delivery Address *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Floor, Flat / Door No, Street, Landmark"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      City / Distribution Route
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Kolkata"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      Pincode
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 700019"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    GSTIN for Input Tax Credit (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="19AAAAA0000A1Z5"
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary uppercase font-mono"
                  />
                </div>

                {/* Delivery Slot Selection */}
                <div className="pt-4 border-t border-surface-container">
                  <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                    Choose Delivery Arrival Slot:
                  </label>
                  <div className="grid grid-cols-2 gap-3 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setDeliverySlot("morning")}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        deliverySlot === "morning"
                          ? "border-secondary bg-secondary-container/40 text-primary shadow-xs"
                          : "border-surface-container bg-surface-container-low text-on-surface-variant"
                      }`}
                    >
                      <div className="text-primary font-bold">Morning Slot (6:00 AM - 8:30 AM)</div>
                      <div className="text-[11px] text-on-surface-variant font-normal">Early morning kitchen &amp; store delivery</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliverySlot("evening")}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        deliverySlot === "evening"
                          ? "border-secondary bg-secondary-container/40 text-primary shadow-xs"
                          : "border-surface-container bg-surface-container-low text-on-surface-variant"
                      }`}
                    >
                      <div className="text-primary font-bold">Midday Slot (2:00 PM - 4:30 PM)</div>
                      <div className="text-[11px] text-on-surface-variant font-normal">Standard afternoon delivery</div>
                    </button>
                  </div>
                </div>

                {/* Payment Option */}
                <div className="pt-4 border-t border-surface-container">
                  <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                    Payment Method:
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        paymentMethod === "cod"
                          ? "border-secondary bg-secondary-container/40 text-primary shadow-xs"
                          : "border-surface-container bg-surface-container-low text-on-surface-variant"
                      }`}
                    >
                      <div>Pay on Delivery / COD</div>
                      <div className="text-[10px] text-on-surface-variant font-normal">Cash or UPI at Doorstep</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        paymentMethod === "upi"
                          ? "border-secondary bg-secondary-container/40 text-primary shadow-xs"
                          : "border-surface-container bg-surface-container-low text-on-surface-variant"
                      }`}
                    >
                      <div>UPI QR Code</div>
                      <div className="text-[10px] text-on-surface-variant font-normal">Instant GPay / PhonePe</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("neft")}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        paymentMethod === "neft"
                          ? "border-secondary bg-secondary-container/40 text-primary shadow-xs"
                          : "border-surface-container bg-surface-container-low text-on-surface-variant"
                      }`}
                    >
                      <div>RTGS / NEFT Transfer</div>
                      <div className="text-[10px] text-on-surface-variant font-normal">Corporate Invoice Transfer</div>
                    </button>
                  </div>

                  {/* Payment Details Preview */}
                  {paymentMethod === "upi" && (
                    <div className="mt-3 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-4 text-xs">
                      <img
                        src="/images/ourgrowth_upi_qr.jpg"
                        alt="OurGrowth UPI QR Code"
                        className="w-20 h-20 rounded-xl border border-emerald-200 shadow-sm shrink-0 object-contain bg-white p-1"
                      />
                      <div>
                        <div className="font-bold text-emerald-950 text-sm">M/s OurGrowth Enterprises</div>
                        <div className="font-mono text-emerald-800 font-bold text-xs mt-0.5">UPI ID: 9775828152@mbkns</div>
                        <div className="text-[11px] text-emerald-700/90 mt-1">
                          Scan with PhonePe, Google Pay, Paytm, or any BHIM UPI app.
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "neft" && (
                    <div className="mt-3 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs space-y-1">
                      <div className="font-bold text-emerald-950 text-sm mb-1.5 flex items-center justify-between">
                        <span>Direct Bank Settlement</span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold uppercase">NEFT / RTGS / IMPS</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div><span className="text-gray-500">Bank Name:</span> <strong className="text-gray-900 block font-semibold">Bandhan Bank</strong></div>
                        <div><span className="text-gray-500">Beneficiary:</span> <strong className="text-gray-900 block font-semibold">M/s OurGrowth Enterprises</strong></div>
                        <div><span className="text-gray-500">Account Number:</span> <strong className="text-emerald-800 font-mono font-bold block text-xs">20100087821983</strong></div>
                        <div><span className="text-gray-500">IFSC Code:</span> <strong className="text-emerald-800 font-mono font-bold block text-xs">BDBL0001029</strong></div>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Right Column: Order Review Box */}
            <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-3xl border border-surface-container shadow-sm flex flex-col gap-6">
              <h3 className="font-headline-sm text-lg font-bold text-primary border-b border-surface-container pb-3">
                Order Review ({items.length} {items.length === 1 ? "Item" : "Items"})
              </h3>

              <div className="divide-y divide-surface-container/60 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-surface-container-low shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-primary block leading-tight">{item.title}</span>
                        <span className="text-[11px] text-on-surface-variant">{item.packSize} × {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold text-primary">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-surface-container pt-3 text-xs">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal:</span>
                  <span className="font-bold text-on-surface">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Cold-Chain Crating:</span>
                  <span className="font-bold text-secondary">{coldChainFee === 0 ? "FREE" : `₹${coldChainFee}`}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-secondary font-bold">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Coupon Discount ({appliedCoupon?.code}):</span>
                    </span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-primary border-t border-surface-container pt-2">
                  <span>Payable Total:</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isPlacing}
                className="w-full py-4 rounded-full bg-secondary hover:bg-primary disabled:opacity-50 text-on-secondary font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>{isPlacing ? "Placing Your Order..." : "Confirm & Place Order"}</span>
              </button>

              <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container text-xs text-on-surface-variant space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-primary">
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                  <span>100% Quality &amp; Yield Guarantee</span>
                </div>
                <p className="text-[11px]">
                  Inspect your garlic upon Reefer van arrival. Pay only after confirming zero skin residue and pristine allicin aroma.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
