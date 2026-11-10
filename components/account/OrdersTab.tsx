'use client';

import { useState } from "react";
import Link from "next/link";
import { Package, RefreshCw, ShoppingBag, FileText, CheckCircle2, XCircle, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { AccountOrder } from "./types";

interface OrdersTabProps {
  orders: AccountOrder[];
  formatStatus: (status: string) => { label: string; class: string };
  onReorder: (order: AccountOrder) => void;
  onViewInvoice?: (order: AccountOrder, autoPrint?: boolean) => void;
  onCancelOrder?: (order: AccountOrder, reason: string) => Promise<void>;
  onDeleteOrder?: (order: AccountOrder) => Promise<void>;
}

export default function OrdersTab({
  orders,
  formatStatus,
  onReorder,
  onViewInvoice,
  onCancelOrder,
  onDeleteOrder,
}: OrdersTabProps) {
  const [cancelModalOrder, setCancelModalOrder] = useState<AccountOrder | null>(null);
  const [deleteModalOrder, setDeleteModalOrder] = useState<AccountOrder | null>(null);
  const [cancelReason, setCancelReason] = useState("Order placed by mistake");
  const [customReason, setCustomReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmCancel = async () => {
    if (!cancelModalOrder || !onCancelOrder) return;
    setIsSubmitting(true);
    try {
      const finalReason = cancelReason === "Other" ? (customReason || "Customer cancellation") : cancelReason;
      await onCancelOrder(cancelModalOrder, finalReason);
      setCancelModalOrder(null);
      setCustomReason("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteModalOrder || !onDeleteOrder) return;
    setIsSubmitting(true);
    try {
      await onDeleteOrder(deleteModalOrder);
      setDeleteModalOrder(null);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        const upperStatus = ord.status ? ord.status.toUpperCase() : "NEW";
        const isCancellable = ["NEW", "PENDING", "CONFIRMED", "PROCESSING"].includes(upperStatus);
        const isDeletable = ["CANCELLED", "DRAFT"].includes(upperStatus);

        const itemsSummary = ord.items && Array.isArray(ord.items)
          ? ord.items.map((it: any) => `${it.quantity}x ${it.product_name || it.name || it.sku} (${it.pack_size || "Standard"})`).join(", ")
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
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-primary text-sm font-mono">{ord.order_number || `ORD-${ord.id}`}</span>
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
              <div className="flex items-center gap-2 flex-wrap justify-end">
                {onViewInvoice && (
                  <button
                    onClick={() => onViewInvoice(ord, false)}
                    className="px-3 py-1.5 rounded-full border border-secondary/30 bg-surface hover:bg-secondary/10 text-secondary font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                    title="View Certified GST Tax Invoice"
                  >
                    <FileText className="w-3.5 h-3.5 text-secondary" />
                    <span>Invoice</span>
                  </button>
                )}

                {isCancellable && onCancelOrder && (
                  <button
                    onClick={() => setCancelModalOrder(ord)}
                    className="px-3 py-1.5 rounded-full border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold text-xs transition-colors flex items-center gap-1 shadow-xs"
                    title="Cancel this order"
                  >
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Cancel</span>
                  </button>
                )}

                {isDeletable && onDeleteOrder && (
                  <button
                    onClick={() => setDeleteModalOrder(ord)}
                    className="px-3 py-1.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 font-bold text-xs transition-colors flex items-center gap-1 shadow-xs"
                    title="Delete cancelled order record"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-gray-500" />
                    <span>Delete</span>
                  </button>
                )}

                <button
                  onClick={() => onReorder(ord)}
                  className="px-3.5 py-1.5 rounded-full bg-secondary text-on-secondary hover:bg-primary font-bold text-xs transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reorder</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Cancellation Modal */}
      {cancelModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-3xl p-6 border border-surface-container shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h4 className="font-bold text-base text-primary">Cancel Order?</h4>
                <p className="text-xs text-on-surface-variant">Order #{cancelModalOrder.order_number || cancelModalOrder.id}</p>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant">
              Are you sure you want to cancel this order? Once cancelled, the garlic packing process will be stopped immediately.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-primary block">Select reason for cancellation:</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full text-xs rounded-xl border border-surface-container p-2.5 bg-surface text-primary focus:outline-hidden focus:ring-2 focus:ring-secondary/40"
              >
                <option value="Order placed by mistake">Order placed by mistake</option>
                <option value="Need to change delivery slot / address">Need to change delivery slot / address</option>
                <option value="Need to modify garlic quantity or pack size">Need to modify garlic quantity or pack size</option>
                <option value="Procured elsewhere">Procured elsewhere</option>
                <option value="Other">Other Reason</option>
              </select>
            </div>

            {cancelReason === "Other" && (
              <div>
                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Please specify reason..."
                  rows={2}
                  className="w-full text-xs rounded-xl border border-surface-container p-2.5 bg-surface text-primary focus:outline-hidden focus:ring-2 focus:ring-secondary/40"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setCancelModalOrder(null)}
                className="px-4 py-2 rounded-full border border-surface-container text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                Keep Order
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmCancel}
                className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                <span>Confirm Cancellation</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-surface-container-lowest max-w-sm w-full rounded-3xl p-6 border border-surface-container shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h4 className="font-bold text-base text-primary">Delete Order Record?</h4>
                <p className="text-xs text-on-surface-variant">Order #{deleteModalOrder.order_number || deleteModalOrder.id}</p>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant">
              This will permanently remove the cancelled order from your customer history. This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setDeleteModalOrder(null)}
                className="px-4 py-2 rounded-full border border-surface-container text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-full bg-gray-800 hover:bg-black text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>Delete Order</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
