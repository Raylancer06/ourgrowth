"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Truck, Download, Calendar, MapPin, RefreshCw, FileText, ChevronRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/components/ui/Toast";

export default function AccountDashboardPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "schedule" | "invoices" | "profile">("orders");
  const { showToast } = useToast();

  const orders = [
    {
      id: "OG-847291",
      date: "30 Sep 2026",
      items: "50 KG Jumbo Peeled Garlic Master Crate",
      total: "₹9,200",
      status: "In Reefer Transit (3.1°C)",
      deliveryTime: "Today, 07:15 AM",
    },
    {
      id: "OG-793420",
      date: "23 Sep 2026",
      items: "10 KG Biriyani Handi Special + 10 KG Paste Grade",
      total: "₹3,950",
      status: "Delivered & Verified",
      deliveryTime: "23 Sep, 06:40 AM",
    },
    {
      id: "OG-712894",
      date: "16 Sep 2026",
      items: "50 KG Jumbo Peeled Garlic Master Crate",
      total: "₹9,200",
      status: "Delivered & Verified",
      deliveryTime: "16 Sep, 06:55 AM",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter py-8">
          {/* Dashboard Header */}
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider block">
                Verified B2B Account
              </span>
              <h1 className="font-headline-sm text-2xl sm:text-3xl font-bold text-primary mt-1">
                Nizam Biriyani Hub — Central Commissary
              </h1>
              <p className="text-xs text-on-surface-variant mt-1">
                GSTIN: 19AAAAA0000A1Z5 • Account Manager: Karan Mehta (+91 94760 20341)
              </p>
            </div>
            <Link
              href="/bulk-orders"
              className="px-5 py-2.5 rounded-full bg-secondary hover:bg-primary text-on-secondary font-bold text-xs shadow-sm transition-colors whitespace-nowrap"
            >
              + Quick 50KG Requisition
            </Link>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 border-b border-surface-container pb-3 mb-6 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "orders" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              Recent Orders &amp; Shipments
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

          {/* Tab 1: Orders List */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary text-sm">{ord.id}</span>
                      <span className="text-xs text-on-surface-variant">• {ord.date}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          ord.status.includes("Transit")
                            ? "bg-secondary-fixed text-on-secondary-fixed animate-pulse"
                            : "bg-surface-container text-on-surface-variant"
                        }`}
                      >
                        {ord.status}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant font-medium">{ord.items}</p>
                    <span className="text-[11px] text-on-surface-variant block">Scheduled Arrival: {ord.deliveryTime}</span>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 border-surface-container pt-3 sm:pt-0">
                    <div className="text-right">
                      <span className="font-headline-sm text-base font-extrabold text-primary block">
                        {ord.total}
                      </span>
                      <span className="text-[10px] text-secondary font-bold">GST Paid</span>
                    </div>
                    <button
                      onClick={() => showToast(`1-Click Reorder triggered for ${ord.id}!`)}
                      className="px-4 py-2 rounded-full bg-secondary text-on-secondary hover:bg-primary font-bold text-xs transition-colors flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reorder</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Standing Schedule */}
          {activeTab === "schedule" && (
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
          {activeTab === "invoices" && (
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container space-y-4">
              <h3 className="font-headline-sm text-lg font-bold text-primary mb-2">
                Download Certified GST Invoices
              </h3>
              {orders.map((ord) => (
                <div key={ord.id} className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-primary block">{ord.id} — Invoice ({ord.date})</span>
                    <span className="text-[11px] text-on-surface-variant">Tax Amount: ₹184 • Total: {ord.total}</span>
                  </div>
                  <button
                    onClick={() => alert(`Downloading ${ord.id}-TaxInvoice.pdf`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-lowest text-primary font-bold hover:bg-primary hover:text-white transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: Profile */}
          {activeTab === "profile" && (
            <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container space-y-4 max-w-xl text-xs">
              <h3 className="font-headline-sm text-lg font-bold text-primary">Kitchen Dispatch Profile</h3>
              <div className="space-y-2">
                <div><strong>Trade Name:</strong> Nizam Biriyani Hub Pvt Ltd</div>
                <div><strong>Primary Kitchen:</strong> 14/2 Park Street, Kolkata - 700016</div>
                <div><strong>Receiving Contact:</strong> Chef Rahim Khan (+91 94760 20341)</div>
                <div><strong>Reefer Van Access:</strong> Loading Gate #2 (Direct Walk-In Entry)</div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
