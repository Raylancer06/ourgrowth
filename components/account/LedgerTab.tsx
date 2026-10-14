'use client';

import { Wallet, ShieldCheck } from "lucide-react";
import { AccountOrder } from "./types";

interface LedgerTabProps {
  orders: AccountOrder[];
}

export default function LedgerTab({ orders }: LedgerTabProps) {
  const totalBilled = orders.reduce((sum, ord) => sum + Number(ord.total_amount || ord.total || 0), 0);
  const totalPaid = orders
    .filter((ord) => ord.status === "DELIVERED")
    .reduce((sum, ord) => sum + Number(ord.total_amount || ord.total || 0), 0);
  const outstandingBalance = totalBilled - totalPaid;

  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-surface-container">
        <div>
          <h3 className="font-headline-sm text-xl font-bold text-primary">
            Customer Khata &amp; Account Ledger
          </h3>
          <p className="text-xs text-on-surface-variant mt-1">
            Running account statement of garlic dispatches, verified GST debits, and reconciled payments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-surface-container-low border border-surface-container text-right">
            <span className="text-[10px] text-on-surface-variant font-bold block uppercase tracking-wider">
              Outstanding Balance
            </span>
            <span className={`font-headline-sm text-lg font-black ${outstandingBalance > 0 ? "text-amber-600" : "text-emerald-600"}`}>
              ₹{outstandingBalance.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="py-12 text-center text-on-surface-variant border-2 border-dashed border-surface-container rounded-3xl">
          <Wallet className="w-8 h-8 mx-auto mb-2 text-secondary opacity-60" />
          <p className="font-bold text-sm text-primary">No transaction history found.</p>
          <p className="text-xs mt-1">Invoice debits and receipts will be recorded here after orders are placed.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-surface-container text-on-surface-variant font-bold">
                <th className="pb-3">Date</th>
                <th className="pb-3">Particulars / Description</th>
                <th className="pb-3">Ref Doc #</th>
                <th className="pb-3 text-right">Debit (Invoice)</th>
                <th className="pb-3 text-right">Credit (Paid)</th>
                <th className="pb-3 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {orders.map((ord, idx) => {
                const orderDate = ord.created_at
                  ? new Date(ord.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "Recent";
                const amount = Number(ord.total_amount || ord.total || 0);
                const isDelivered = ord.status === "DELIVERED";

                return (
                  <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3 font-medium text-on-surface-variant">{orderDate}</td>
                    <td className="py-3 font-semibold text-primary">
                      Garlic Order ({ord.order_number || `ORD-${ord.id}`})
                    </td>
                    <td className="py-3 text-on-surface-variant font-mono text-[11px]">
                      {ord.invoice_number || `SI-${ord.id}`}
                    </td>
                    <td className="py-3 text-right font-semibold text-rose-600">
                      ₹{amount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 text-right font-semibold text-emerald-600">
                      {isDelivered ? `₹${amount.toLocaleString("en-IN")}` : "-"}
                    </td>
                    <td className="py-3 text-right font-bold text-primary">
                      ₹0
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="p-4 rounded-2xl bg-surface-container-low/80 border border-surface-container flex items-start gap-3 text-xs text-on-surface-variant">
        <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
        <div>
          <strong className="text-primary font-bold">Settlement Policy:</strong> Payments received via NEFT, RTGS, UPI, or Cash on Delivery are reconciled against invoice debits within 24 hours. For inquiries, contact accounts desk at <strong>+91 94760 20341</strong>.
        </div>
      </div>
    </div>
  );
}
