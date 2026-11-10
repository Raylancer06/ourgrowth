'use client';

import { Wallet, ShieldCheck, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { AccountOrder, LedgerEntry } from "./types";

interface LedgerTabProps {
  orders: AccountOrder[];
  backendLedger?: LedgerEntry[];
  summary?: {
    total_billed: number;
    total_paid: number;
    outstanding_balance: number;
  };
}

export default function LedgerTab({ orders, backendLedger = [], summary }: LedgerTabProps) {
  const hasBackend = backendLedger && backendLedger.length > 0;

  const totalBilled = summary
    ? summary.total_billed
    : orders.reduce((sum, ord) => sum + Number(ord.total_amount || ord.total || 0), 0);

  const totalPaid = summary
    ? summary.total_paid
    : orders
        .filter((ord) => ord.status === "DELIVERED")
        .reduce((sum, ord) => sum + Number(ord.total_amount || ord.total || 0), 0);

  const outstandingBalance = summary
    ? summary.outstanding_balance
    : (totalBilled - totalPaid);

  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-surface-container">
        <div>
          <h3 className="font-headline-sm text-xl font-bold text-primary">
            Customer Khata &amp; Account Ledger
          </h3>
          <p className="text-xs text-on-surface-variant mt-1">
            Running account statement of garlic dispatches, verified GST debits, and reconciled admin payments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-surface-container-low border border-surface-container text-right">
            <span className="text-[10px] text-on-surface-variant font-bold block uppercase tracking-wider">
              Total Billed
            </span>
            <span className="font-headline-sm text-sm font-bold text-primary">
              ₹{totalBilled.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-surface-container-low border border-surface-container text-right">
            <span className="text-[10px] text-on-surface-variant font-bold block uppercase tracking-wider">
              Total Paid
            </span>
            <span className="font-headline-sm text-sm font-bold text-emerald-700">
              ₹{totalPaid.toLocaleString("en-IN")}
            </span>
          </div>
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

      {!hasBackend && orders.length === 0 ? (
        <div className="py-12 text-center text-on-surface-variant border-2 border-dashed border-surface-container rounded-3xl">
          <Wallet className="w-8 h-8 mx-auto mb-2 text-secondary opacity-60" />
          <p className="font-bold text-sm text-primary">No transaction history found.</p>
          <p className="text-xs mt-1">Invoice debits and receipts will be recorded here after orders or admin invoices are created.</p>
        </div>
      ) : hasBackend ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-surface-container text-on-surface-variant font-bold">
                <th className="pb-3">Date</th>
                <th className="pb-3">Particulars / Description</th>
                <th className="pb-3">Ref Doc #</th>
                <th className="pb-3 text-right">Debit (Invoice)</th>
                <th className="pb-3 text-right">Credit (Paid)</th>
                <th className="pb-3 text-right">Running Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {backendLedger.map((row, idx) => {
                const isDebit = row.debit > 0;
                return (
                  <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3 font-medium text-on-surface-variant font-mono">{row.date}</td>
                    <td className="py-3 font-semibold text-primary flex items-center gap-1.5">
                      {isDebit ? (
                        <ArrowUpRight className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      ) : (
                        <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      )}
                      <span>{row.particulars}</span>
                    </td>
                    <td className="py-3 text-on-surface-variant font-mono text-[11px]">
                      {row.ref_doc}
                    </td>
                    <td className="py-3 text-right font-semibold text-rose-600">
                      {row.debit > 0 ? `₹${row.debit.toLocaleString("en-IN")}` : "—"}
                    </td>
                    <td className="py-3 text-right font-semibold text-emerald-600">
                      {row.credit > 0 ? `₹${row.credit.toLocaleString("en-IN")}` : "—"}
                    </td>
                    <td className={`py-3 text-right font-bold ${row.balance > 0 ? 'text-amber-700' : 'text-primary'}`}>
                      ₹{row.balance.toLocaleString("en-IN")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
          <strong className="text-primary font-bold">Settlement Policy:</strong> Payments received via NEFT, RTGS, UPI, or Cash on Delivery recorded by Admin are reconciled in real-time against invoice debits. For accounts reconciliation or GST queries, contact accounts desk at <strong>+91 94760 20341</strong>.
        </div>
      </div>
    </div>
  );
}
