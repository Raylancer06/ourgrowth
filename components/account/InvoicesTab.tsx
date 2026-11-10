'use client';

import { FileText, CheckCircle2, Eye, Download, Loader2, AlertCircle, Clock } from "lucide-react";
import { AccountOrder, BackendSalesInvoice } from "./types";

interface InvoicesTabProps {
  orders: AccountOrder[];
  backendInvoices?: BackendSalesInvoice[];
  fetchingInvoice: string | null;
  onViewInvoice: (orderOrInvoice: any, autoPrint?: boolean) => void;
}

export default function InvoicesTab({
  orders,
  backendInvoices = [],
  fetchingInvoice,
  onViewInvoice,
}: InvoicesTabProps) {
  const hasBackendInvoices = backendInvoices && backendInvoices.length > 0;
  const hasOrders = orders && orders.length > 0;

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">PAID</span>;
      case 'partial':
        return <span className="text-[10px] bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-bold">PARTIAL</span>;
      case 'overdue':
        return <span className="text-[10px] bg-rose-100 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-full font-bold">OVERDUE</span>;
      default:
        return <span className="text-[10px] bg-blue-100 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full font-bold">{status?.toUpperCase() || 'UNPAID'}</span>;
    }
  };

  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container space-y-4">
      <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
        <div>
          <h3 className="font-headline-sm text-lg font-bold text-primary">
            Certified GST Tax Invoices
          </h3>
          <p className="text-xs text-on-surface-variant">
            Official commercial tax invoices created by admin or order dispatch. Input Tax Credit (ITC) compliant.
          </p>
        </div>
        <span className="text-[11px] font-bold text-secondary bg-secondary-fixed/50 px-2.5 py-1 rounded-full">
          FSSAI &amp; GST Compliant
        </span>
      </div>

      {!hasBackendInvoices && !hasOrders ? (
        <div className="py-12 text-center text-on-surface-variant border-2 border-dashed border-surface-container rounded-3xl">
          <FileText className="w-8 h-8 mx-auto mb-2 text-secondary opacity-60" />
          <p className="font-bold text-sm text-primary">No tax invoices generated yet.</p>
          <p className="text-xs mt-1">Certified GST invoices entered by Admin or from dispatches will appear here automatically.</p>
        </div>
      ) : hasBackendInvoices ? (
        <div className="space-y-3">
          {backendInvoices.map((inv) => {
            const isFetching = fetchingInvoice === inv.invoice_number || fetchingInvoice === String(inv.id);
            const itemsText = inv.items && inv.items.length > 0
              ? inv.items.map(it => `${it.quantity}x ${it.name}`).join(', ')
              : `${inv.items_count || 1} Garlic Products`;

            return (
              <div
                key={inv.id}
                className="p-4 rounded-2xl bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs border border-surface-container/60 shadow-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-primary block font-mono text-sm">
                      {inv.invoice_number}
                    </span>
                    {getStatusBadge(inv.status)}
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified GST</span>
                    </span>
                  </div>

                  <span className="text-[11px] text-on-surface-variant block">
                    Invoice Date: <strong>{inv.invoice_date || 'Recent'}</strong>
                    {inv.due_date && <> • Due: <strong>{inv.due_date}</strong></>}
                  </span>

                  <p className="text-[11px] text-on-surface-variant font-medium">
                    {itemsText}
                  </p>

                  <div className="flex items-center gap-3 pt-0.5 text-[11px]">
                    <span className="font-bold text-primary">
                      Total: ₹{Number(inv.total_amount).toLocaleString("en-IN")}
                    </span>
                    {inv.paid_amount > 0 && (
                      <span className="text-emerald-700 font-semibold">
                        Paid: ₹{Number(inv.paid_amount).toLocaleString("en-IN")}
                      </span>
                    )}
                    {inv.balance_amount > 0 && (
                      <span className="text-amber-700 font-bold">
                        Due: ₹{Number(inv.balance_amount).toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => onViewInvoice({ order_number: inv.invoice_number, id: inv.id }, false)}
                    disabled={isFetching}
                    className="px-3.5 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50 shadow-xs"
                  >
                    {isFetching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>View Invoice</span>
                  </button>
                  <button
                    onClick={() => onViewInvoice({ order_number: inv.invoice_number, id: inv.id }, true)}
                    disabled={isFetching}
                    className="px-3.5 py-1.5 rounded-full bg-secondary text-on-secondary hover:bg-primary font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs disabled:opacity-50"
                    title="Direct Print or Save PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((ord) => {
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
          })}
        </div>
      )}
    </div>
  );
}
