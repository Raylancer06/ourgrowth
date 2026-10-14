'use client';

import { FileText, CheckCircle2, Eye, Download, Loader2 } from "lucide-react";
import { AccountOrder } from "./types";

interface InvoicesTabProps {
  orders: AccountOrder[];
  fetchingInvoice: string | null;
  onViewInvoice: (order: AccountOrder, autoPrint?: boolean) => void;
}

export default function InvoicesTab({
  orders,
  fetchingInvoice,
  onViewInvoice,
}: InvoicesTabProps) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container space-y-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-headline-sm text-lg font-bold text-primary">
          Certified GST Tax Invoices
        </h3>
        <span className="text-[11px] font-bold text-secondary bg-secondary-fixed/50 px-2.5 py-1 rounded-full">
          FSSAI &amp; GST Compliant
        </span>
      </div>
      <p className="text-xs text-on-surface-variant mb-4">
        Official commercial tax invoices generated upon order dispatch. Input Tax Credit (ITC) compliant.
      </p>

      {orders.length === 0 ? (
        <div className="py-12 text-center text-on-surface-variant border-2 border-dashed border-surface-container rounded-3xl">
          <FileText className="w-8 h-8 mx-auto mb-2 text-secondary opacity-60" />
          <p className="font-bold text-sm text-primary">No tax invoices generated yet.</p>
          <p className="text-xs mt-1">Certified GST invoices will appear here once your orders are dispatched.</p>
        </div>
      ) : (
        orders.map((ord) => {
          const orderDate = ord.created_at
            ? new Date(ord.created_at).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "Recent";
          const invNum =
            ord.invoice_number ||
            `SI-${ord.order_number ? ord.order_number.replace("OG-", "") : ord.id}`;

          const isFetching = fetchingInvoice === (ord.order_number || ord.id);

          return (
            <div
              key={ord.id || ord.order_number}
              className="p-4 rounded-2xl bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary block font-mono">
                    Invoice #{invNum}
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified GST</span>
                  </span>
                </div>
                <span className="text-[11px] text-on-surface-variant block">
                  Ref Order: {ord.order_number || `ORD-${ord.id}`} • Date: {orderDate}
                </span>
                <span className="text-[11px] font-bold text-primary block">
                  Total: ₹{Number(ord.total_amount || ord.total || 0).toLocaleString("en-IN")}
                  <span className="text-secondary font-normal ml-1.5">(Incl. 5% GST)</span>
                </span>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => onViewInvoice(ord, false)}
                  disabled={isFetching}
                  className="px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs flex items-center gap-1 transition-colors disabled:opacity-50"
                >
                  {isFetching ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                  <span>View Tax Invoice</span>
                </button>
                <button
                  onClick={() => onViewInvoice(ord, true)}
                  disabled={isFetching}
                  className="px-3 py-1.5 rounded-full bg-secondary text-on-secondary hover:bg-primary font-bold text-xs flex items-center gap-1 transition-colors shadow-xs disabled:opacity-50"
                  title="Direct Print or Save PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
