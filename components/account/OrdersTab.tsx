'use client';

import Link from "next/link";
import { Package, RefreshCw, ShoppingBag, FileText, CheckCircle2 } from "lucide-react";
import { AccountOrder } from "./types";

interface OrdersTabProps {
  orders: AccountOrder[];
  formatStatus: (status: string) => { label: string; class: string };
  onReorder: (order: AccountOrder) => void;
  onViewInvoice?: (order: AccountOrder, autoPrint?: boolean) => void;
}

export default function OrdersTab({ orders, formatStatus, onReorder, onViewInvoice }: OrdersTabProps) {
  if (orders.length === 0) {
    return (
      <div className="py-12 px-6 text-center text-on-surface-variant border-2 border-dashed border-surface-container rounded-3xl bg-surface-container-lowest">
        <Package className="w-8 h-8 mx-auto mb-2 text-secondary opacity-60" />
        <p className="font-bold text-sm text-primary">No orders placed yet.</p>
        <p className="text-xs mt-1">
          Your garlic dispatches and tracking history will appear here once you place an order.
        </p>
        <Link
          href="/shop"
          className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-secondary text-on-secondary hover:bg-primary font-bold text-xs transition-colors shadow-sm"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Browse Garlic Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((ord) => {
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
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  ord.payment_status === 'paid' 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {ord.payment_status === 'paid' ? 'PAID' : (ord.payment_status ? ord.payment_status.toUpperCase() : 'PENDING')}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-medium">{itemsSummary}</p>
              <span className="text-[11px] text-on-surface-variant block">
                Scheduled Slot: {ord.delivery_slot || "Morning Slot (06:00 - 08:30 AM)"}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 border-surface-container pt-3 sm:pt-0">
              <div className="text-right">
                <span className="font-headline-sm text-base font-extrabold text-primary block">
                  ₹{Number(ord.total_amount || ord.total || 0).toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-secondary font-bold">5% GST Included</span>
              </div>
              <div className="flex items-center gap-2">
                {onViewInvoice && (
                  <button
                    onClick={() => onViewInvoice(ord, false)}
                    className="px-3.5 py-2 rounded-full border border-secondary/30 bg-surface hover:bg-secondary/10 text-secondary font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                    title="View Certified GST Tax Invoice"
                  >
                    <FileText className="w-3.5 h-3.5 text-secondary" />
                    <span>Invoice</span>
                  </button>
                )}
                <button
                  onClick={() => onReorder(ord)}
                  className="px-4 py-2 rounded-full bg-secondary text-on-secondary hover:bg-primary font-bold text-xs transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reorder</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
