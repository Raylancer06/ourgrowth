'use client';

import { Printer, X, Building } from "lucide-react";
import { AccountInvoice } from "./types";

interface InvoiceModalProps {
  invoice: AccountInvoice;
  onClose: () => void;
}

export default function InvoiceModal({ invoice, onClose }: InvoiceModalProps) {
  return (
    <div id="invoice-modal-overlay" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div id="invoice-modal-content" className="bg-surface-container-lowest max-w-3xl w-full rounded-3xl p-6 sm:p-8 border border-surface-container shadow-2xl space-y-6 my-8">
        <div className="flex items-center justify-between border-b border-surface-container pb-4">
          <div className="flex items-center gap-3">
            <img
              src={invoice.seller?.logo_url || "/images/custom/ourgrowth_logo.png"}
              alt="OurGrowth Enterprises"
              className="h-12 w-auto object-contain"
            />
            <div>
              <h2 className="font-headline-sm text-xl font-bold text-primary">
                Tax Invoice #{invoice.invoice_number}
              </h2>
              <p className="text-xs text-on-surface-variant">
                Date: {invoice.invoice_date} {invoice.order_number && `• Ref: ${invoice.order_number}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary transition-colors"
              title="Print / Save PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Seller & Buyer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
            <span className="text-[10px] uppercase font-bold text-secondary block">Seller (Supplier)</span>
            <p className="font-bold text-primary text-sm">{invoice.seller?.company_name || "OurGrowth Enterprises"}</p>
            <p className="text-on-surface-variant">{invoice.seller?.address}</p>
            <p className="text-on-surface-variant">{invoice.seller?.city}, {invoice.seller?.state} {invoice.seller?.zipcode}</p>
            <p className="font-semibold text-primary">GSTIN: {invoice.seller?.gstin || "19AABCU9603R1ZM"}</p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
            <span className="text-[10px] uppercase font-bold text-secondary block">Bill To (Recipient)</span>
            <p className="font-bold text-primary text-sm">{invoice.buyer?.company_name || invoice.buyer?.contact_person}</p>
            <p className="text-on-surface-variant">
              {typeof invoice.buyer?.billing_address === "object"
                ? `${invoice.buyer?.billing_address?.address || ""} ${invoice.buyer?.billing_address?.city || ""}`
                : invoice.buyer?.billing_address}
            </p>
            <p className="text-on-surface-variant">Contact: {invoice.buyer?.phone || invoice.buyer?.email}</p>
            <p className="font-semibold text-primary">
              GSTIN: {invoice.buyer?.gstin || "Unregistered / Retail"}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-surface-container text-on-surface-variant font-bold">
                <th className="py-2">Item Description</th>
                <th className="py-2 text-center">HSN</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Rate</th>
                <th className="py-2 text-right">Taxable</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {invoice.items?.map((it: any, idx: number) => (
                <tr key={idx} className="text-on-surface">
                  <td className="py-2.5">
                    <span className="font-bold text-primary block">{it.product_name}</span>
                    {it.sku && <span className="text-[10px] text-on-surface-variant">{it.sku}</span>}
                  </td>
                  <td className="py-2.5 text-center">{it.hsn_code || "—"}</td>
                  <td className="py-2.5 text-center">{it.quantity}</td>
                  <td className="py-2.5 text-right">₹{Number(it.unit_price).toFixed(2)}</td>
                  <td className="py-2.5 text-right">₹{Number(it.taxable_amount).toFixed(2)}</td>
                  <td className="py-2.5 text-right font-bold text-primary">₹{Number(it.total_amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Totals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-surface-container">
          <div>
            {invoice.amount_in_words && (
              <div className="p-3 bg-surface-container-low rounded-xl">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Amount in Words</span>
                <p className="font-semibold text-primary">{invoice.amount_in_words}</p>
              </div>
            )}
          </div>

          <div className="space-y-1.5 p-4 bg-surface-container-low rounded-2xl">
            <div className="flex justify-between text-on-surface-variant">
              <span>Taxable Subtotal:</span>
              <span>₹{Number(invoice.subtotal).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-primary pt-2 border-t border-surface-container">
              <span>Grand Total:</span>
              <span>₹{Number(invoice.total_amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Payment Details: Bandhan Bank, UPI QR Code & Authorized Signature */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-surface-container-low border border-surface-container text-xs">
          {/* Bank Details */}
          <div className="space-y-1.5 md:col-span-1">
            <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
              <Building className="w-3.5 h-3.5 text-secondary" />
              <span>Bank Transfer Details</span>
            </div>
            <div className="space-y-1 text-on-surface-variant text-[11px]">
              <p><strong className="text-primary">Bank:</strong> {invoice.seller?.bank_name || "Bandhan Bank"}</p>
              <p><strong className="text-primary">Account No:</strong> <span className="font-mono font-bold text-primary">{invoice.seller?.bank_account_number || "20100087821983"}</span></p>
              <p><strong className="text-primary">IFSC Code:</strong> <span className="font-mono font-bold text-primary">{invoice.seller?.bank_ifsc || "BDBL0001029"}</span></p>
              <p><strong className="text-primary">Branch:</strong> {invoice.seller?.bank_branch || "Bandhan Bank, Kolkata"}</p>
              <p><strong className="text-primary">UPI VPA:</strong> <span className="font-mono font-bold text-secondary">{invoice.seller?.upi_id || "9775828152@mbkns"}</span></p>
            </div>
          </div>

          {/* UPI QR Code */}
          <div className="flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-emerald-500/80 shadow-xs">
            <div className="relative w-36 h-36 rounded-xl overflow-hidden border border-gray-200 p-1 bg-white">
              <img
                src={invoice.seller?.upi_qr_url || "/images/custom/ourgrowth_upi_qr.jpg"}
                alt="Bandhan Bank UPI QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xs font-extrabold text-secondary mt-1.5">Scan &amp; Pay via UPI</span>
            <span className="text-[10px] text-on-surface-variant font-mono">9775828152@mbkns</span>
            <span className="text-[9px] text-gray-400">GPay • PhonePe • Paytm • BHIM</span>
          </div>

          {/* Authorized Signatory */}
          <div className="flex flex-col items-center md:items-end justify-between text-right p-1">
            <span className="text-[10px] font-bold uppercase text-on-surface-variant">For OurGrowth Enterprises</span>
            <div className="my-2 relative w-32 h-14">
              <img
                src={invoice.seller?.signature_url || "/images/custom/ourgrowth_signature.png"}
                alt="Authorized Signatory"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-[10px] text-on-surface-variant">
              <p className="font-bold text-primary">{invoice.seller?.authorized_signatory_name || "Niloy Sarkar"}</p>
              <p className="text-[9px]">Authorised Signatory / Proprietor</p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-surface-container text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => window.print()}
            className="px-5 py-2 rounded-full bg-secondary text-on-secondary hover:bg-primary font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>

      <style>{`
        @media print {
          body {
            background: white !important;
          }
          header, footer, nav, .no-print {
            display: none !important;
          }
          #invoice-modal-overlay {
            position: static !important;
            background: white !important;
            padding: 0 !important;
          }
          #invoice-modal-content {
            border: 1px solid #e5e7eb !important;
            box-shadow: none !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 10mm !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
