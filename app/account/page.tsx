"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, Truck, Download, Calendar, MapPin, RefreshCw, FileText, ChevronRight, CheckCircle2, User, LogOut, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/components/ui/Toast";
import { getCustomerProfile, getCustomerOrders } from "@/lib/api";

export default function AccountDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"orders" | "schedule" | "invoices" | "profile">("orders");
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const savedToken = localStorage.getItem("ourgrowth_customer_token") || localStorage.getItem("og_customer_token");
    if (!savedToken) {
      setLoading(false);
      return;
    }
    setToken(savedToken);

    // Fetch profile and orders
    Promise.all([
      getCustomerProfile(savedToken).catch(() => null),
      getCustomerOrders(savedToken).catch(() => null),
    ]).then(([profileRes, ordersRes]) => {
      if (profileRes?.customer) {
        setProfile(profileRes.customer);
      }
      if (ordersRes?.orders) {
        setOrders(ordersRes.orders);
      }
      setLoading(false);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ourgrowth_customer_token");
    localStorage.removeItem("og_customer_token");
    localStorage.removeItem("ourgrowth_customer_user");
    localStorage.removeItem("og_customer_profile");
    localStorage.removeItem("user_authenticated");
    setToken(null);
    setProfile(null);
    setOrders([]);
    showToast("Logged out successfully");
    router.push("/login");
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case "NEW":
        return { label: "Order Received", class: "bg-blue-100 text-blue-800" };
      case "CONFIRMED":
        return { label: "Confirmed", class: "bg-indigo-100 text-indigo-800" };
      case "PROCESSING":
        return { label: "Cold Room Processing", class: "bg-amber-100 text-amber-800" };
      case "PACKED":
        return { label: "Packed in Crate", class: "bg-teal-100 text-teal-800" };
      case "READY_FOR_DISPATCH":
        return { label: "Ready for Dispatch", class: "bg-emerald-100 text-emerald-800" };
      case "DISPATCHED":
        return { label: "In Reefer Transit", class: "bg-purple-100 text-purple-800 animate-pulse" };
      case "DELIVERED":
        return { label: "Delivered & Verified", class: "bg-green-100 text-green-800" };
      case "CANCELLED":
        return { label: "Cancelled", class: "bg-rose-100 text-rose-800" };
      default:
        return { label: status, class: "bg-surface-container text-on-surface-variant" };
    }
  };

  // Fallback demo orders if no API orders yet
  const displayOrders = orders.length > 0 ? orders : [
    {
      id: 991,
      order_number: "OG-847291",
      created_at: "2026-09-30T07:15:00Z",
      status: "DISPATCHED",
      delivery_slot: "Today Morning (06:00 - 08:30 AM)",
      items: [
        { product_name: "50 KG Jumbo Peeled Garlic Master Crate", pack_size: "50kg", quantity: 1, total: 9200 }
      ],
      total_amount: 9200,
      sales_invoice_id: null,
    },
    {
      id: 990,
      order_number: "OG-793420",
      created_at: "2026-09-23T06:40:00Z",
      status: "DELIVERED",
      delivery_slot: "Morning (06:00 - 08:30 AM)",
      items: [
        { product_name: "Biriyani Handi Special (10kg)", pack_size: "10kg", quantity: 1, total: 2000 },
        { product_name: "Paste Grade Crate (10kg)", pack_size: "10kg", quantity: 1, total: 1950 }
      ],
      total_amount: 3950,
      sales_invoice_id: 104,
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter py-8">
          {/* Dashboard Header */}
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-secondary uppercase tracking-wider block">
                  {profile ? "Verified B2B Account" : "Guest / B2B Kitchen Account"}
                </span>
                {profile && (
                  <span className="text-[10px] bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-full font-bold">
                    Connected to ERP
                  </span>
                )}
              </div>
              <h1 className="font-headline-sm text-2xl sm:text-3xl font-bold text-primary mt-1">
                {profile?.company_name || profile?.name || "Nizam Biriyani Hub — Central Commissary"}
              </h1>
              <p className="text-xs text-on-surface-variant mt-1">
                {profile?.phone ? `Contact: ${profile.phone}` : "Account Manager: Karan Mehta (+91 94760 20341)"}
                {profile?.customer_code && ` • Code: ${profile.customer_code}`}
                {profile?.email && ` • ${profile.email}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2.5 rounded-full border border-surface-container hover:bg-surface-container text-xs font-bold text-on-surface-variant flex items-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  href="/login?redirect=/account"
                  className="px-4 py-2.5 rounded-full border border-secondary text-secondary hover:bg-secondary hover:text-white text-xs font-bold transition-colors"
                >
                  Log In to Kitchen
                </Link>
              )}
              <Link
                href="/bulk-orders"
                className="px-5 py-2.5 rounded-full bg-secondary hover:bg-primary text-on-secondary font-bold text-xs shadow-sm transition-colors whitespace-nowrap"
              >
                + Quick 50KG Requisition
              </Link>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 border-b border-surface-container pb-3 mb-6 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "orders" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              Recent Orders &amp; Shipments ({orders.length > 0 ? orders.length : displayOrders.length})
            </button>
            <button
              onClick={() => setActiveTab("schedule")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "schedule" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              Standing Delivery Schedule
            </button>
            <button
              onClick={() => setActiveTab("invoices")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "invoices" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              Tax Invoices &amp; Ledger
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "profile" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              Kitchen Dispatch Profile
            </button>
          </div>

          {/* Loading indicator */}
          {loading && (
            <div className="flex items-center justify-center p-12 text-sm text-on-surface-variant gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-secondary" />
              <span>Fetching live order and account details from ERP...</span>
            </div>
          )}

          {/* Tab 1: Orders List */}
          {!loading && activeTab === "orders" && (
            <div className="space-y-4">
              {displayOrders.map((ord: any) => {
                const statusMeta = formatStatus(ord.status);
                const itemsSummary = ord.items && Array.isArray(ord.items)
                  ? ord.items.map((it: any) => `${it.quantity}x ${it.product_name || it.sku} (${it.pack_size || "Standard"})`).join(", ")
                  : (ord.items || "Peeled Garlic Dispatch");
                const orderDate = ord.created_at ? new Date(ord.created_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                }) : "Recent";

                return (
                  <div
                    key={ord.id || ord.order_number}
                    className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary text-sm">{ord.order_number || `ORD-${ord.id}`}</span>
                        <span className="text-xs text-on-surface-variant">• {orderDate}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusMeta.class}`}>
                          {statusMeta.label}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant font-medium">{itemsSummary}</p>
                      <span className="text-[11px] text-on-surface-variant block">
                        Scheduled Slot: {ord.delivery_slot || "Morning Dispatch (06:00 - 08:30 AM)"}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 border-surface-container pt-3 sm:pt-0">
                      <div className="text-right">
                        <span className="font-headline-sm text-base font-extrabold text-primary block">
                          ₹{Number(ord.total_amount || ord.total || 0).toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] text-secondary font-bold">5% GST Included</span>
                      </div>
                      <button
                        onClick={() => showToast(`1-Click Reorder triggered for ${ord.order_number || ord.id}!`)}
                        className="px-4 py-2 rounded-full bg-secondary text-on-secondary hover:bg-primary font-bold text-xs transition-colors flex items-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reorder</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: Standing Schedule */}
          {!loading && activeTab === "schedule" && (
            <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container space-y-6">
              <h3 className="font-headline-sm text-lg font-bold text-primary">
                Weekly Reefer Subscription Route
              </h3>
              <p className="text-xs text-on-surface-variant">
                Your kitchen receives standing crates every Tuesday and Friday at 6:30 AM before prep shift.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex items-center justify-between">
                  <div>
                    <span className="font-bold text-primary text-xs block">Tuesday Morning Drop</span>
                    <span className="text-xs text-on-surface-variant">50 KG Master Crate (Grade A)</span>
                  </div>
                  <span className="text-xs font-bold text-secondary bg-secondary-fixed/50 px-2 py-1 rounded">Active</span>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex items-center justify-between">
                  <div>
                    <span className="font-bold text-primary text-xs block">Friday Morning Drop</span>
                    <span className="text-xs text-on-surface-variant">50 KG Master Crate (Biriyani Dum)</span>
                  </div>
                  <span className="text-xs font-bold text-secondary bg-secondary-fixed/50 px-2 py-1 rounded">Active</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Invoices */}
          {!loading && activeTab === "invoices" && (
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container space-y-4">
              <h3 className="font-headline-sm text-lg font-bold text-primary mb-2">
                Download Certified GST Invoices
              </h3>
              {displayOrders.map((ord: any) => {
                const taxAmt = Math.round(Number(ord.total_amount || ord.total || 0) * 0.05 / 1.05);
                const orderDate = ord.created_at ? new Date(ord.created_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                }) : "2026-09-30";

                return (
                  <div key={ord.id || ord.order_number} className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-primary block">{ord.order_number || `ORD-${ord.id}`} — Tax Invoice ({orderDate})</span>
                      <span className="text-[11px] text-on-surface-variant">
                        5% GST: ₹{taxAmt} • Total: ₹{Number(ord.total_amount || ord.total || 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <button
                      onClick={() => alert(`Downloading Invoice for ${ord.order_number || ord.id}. In production, this generates signed ERP invoice PDF.`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-lowest text-primary font-bold hover:bg-primary hover:text-white transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 4: Profile */}
          {!loading && activeTab === "profile" && (
            <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container space-y-4 max-w-xl text-xs">
              <h3 className="font-headline-sm text-lg font-bold text-primary">Kitchen Dispatch Profile</h3>
              <div className="space-y-3">
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold block">Trade Name / Restaurant</span>
                  <span className="font-bold text-sm text-primary">{profile?.company_name || profile?.name || "Nizam Biriyani Hub Pvt Ltd"}</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold block">Primary Kitchen Dispatch Address</span>
                  <span className="font-medium text-xs text-primary">
                    {profile?.shipping_address?.address || profile?.billing_address?.address || "14/2 Park Street, Kolkata - 700016"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-surface-container-low rounded-xl">
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold block">Receiving Contact</span>
                    <span className="font-bold text-xs text-primary">{profile?.name || "Head Chef"} ({profile?.phone || "+91 94760 20341"})</span>
                  </div>
                  <div className="p-3 bg-surface-container-low rounded-xl">
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold block">Customer Code</span>
                    <span className="font-bold text-xs text-secondary">{profile?.customer_code || "CUST-B2B-101"}</span>
                  </div>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold block">Cold Chain Access Note</span>
                  <span className="text-xs text-on-surface-variant">Direct Reefer Van walk-in entry via rear receiving dock. Early morning morning delivery slot (06:00 - 08:30 AM).</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
