'use client';

import { Printer, X } from "lucide-react";
import { AccountContract } from "./types";

interface ContractModalProps {
  contract: AccountContract;
  profile: any;
  onClose: () => void;
}

export default function ContractModal({ contract, profile, onClose }: ContractModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface-container-lowest max-w-3xl w-full rounded-3xl p-6 sm:p-8 border border-surface-container shadow-2xl space-y-6 my-8">
        <div className="flex items-center justify-between border-b border-surface-container pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-xl font-bold text-primary">
                {contract.subject || "Supply Agreement"}
              </h2>
              <span className="text-[10px] bg-secondary-fixed text-on-secondary-fixed px-2.5 py-0.5 rounded-full font-bold uppercase">
                {contract.status || "Active"}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Contract #{contract.contract_number} • Type: {contract.type}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary transition-colors"
              title="Print / Save Contract"
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

        {/* Parties Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Supplier */}
          <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
            <span className="text-[10px] uppercase font-bold text-secondary block">First Party (Supplier)</span>
            <p className="font-bold text-primary text-sm">{contract.seller?.company_name || "OurGrowth Enterprises"}</p>
            <p className="text-on-surface-variant">{contract.seller?.address || "Kolkata, West Bengal"}</p>
            <p className="font-semibold text-primary">GSTIN: {contract.seller?.gstin || "19AABCU9603R1ZM"}</p>
            <p className="text-on-surface-variant">Phone: {contract.seller?.phone || "+91 97758 28152"}</p>
          </div>

          {/* Client / Buyer */}
          <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
            <span className="text-[10px] uppercase font-bold text-secondary block">Second Party (Client / Institution)</span>
            <p className="font-bold text-primary text-sm">{contract.buyer?.name || profile?.company_name || profile?.name}</p>
            <p className="text-on-surface-variant">
              {typeof contract.buyer?.address === "object"
                ? `${contract.buyer?.address?.address_line_1 || ""} ${contract.buyer?.address?.city || ""}`
                : (contract.buyer?.address || "Registered Business Address")}
            </p>
            <p className="font-semibold text-primary">
              GSTIN: {contract.buyer?.gstin || profile?.tax_number || "Verified Commercial Buyer"}
            </p>
            <p className="text-on-surface-variant">Contact: {contract.buyer?.phone || profile?.phone}</p>
          </div>
        </div>

        {/* Commercial Terms & Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs p-4 rounded-2xl bg-surface-container-low/70 border border-surface-container">
          <div>
            <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Contract Valuation</span>
            <p className="font-extrabold text-base text-primary mt-0.5">{contract.formatted_value || `₹${contract.value}`}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Commencement Date</span>
            <p className="font-semibold text-primary mt-0.5">{contract.start_date || "Immediate"}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Expiry / Review Date</span>
            <p className="font-semibold text-primary mt-0.5">{contract.end_date || "Continuous Supply"}</p>
          </div>
        </div>

        {/* Scope & Description */}
        <div className="space-y-2 text-xs">
          <span className="text-[11px] uppercase font-bold text-primary block">Scope of Supply &amp; Terms</span>
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-surface-container text-on-surface leading-relaxed whitespace-pre-line text-xs font-medium">
            {contract.description || "The Supplier agrees to deliver certified dry-air peeled garlic under guaranteed cold-chain logistics conforming to FSSAI food quality norms. The Client agrees to adhere to scheduled payment settlement terms."}
          </div>
        </div>

        {/* Bank Details & Authorized Signatures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-surface-container-low border border-surface-container text-xs">
          {/* Bank settlement */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-secondary block">Settlement Bank Account</span>
            <p><strong className="text-primary">Bank:</strong> Bandhan Bank</p>
            <p><strong className="text-primary">Account No:</strong> <span className="font-mono font-bold text-primary">20100087821983</span></p>
            <p><strong className="text-primary">IFSC Code:</strong> <span className="font-mono font-bold text-primary">BDBL0001029</span></p>
            <p><strong className="text-primary">UPI ID:</strong> <span className="font-mono font-bold text-secondary">9775828152@mbkns</span></p>
          </div>

          {/* Signatures */}
          <div className="flex flex-col items-center sm:items-end justify-between text-right">
            <span className="text-[10px] font-bold uppercase text-on-surface-variant">Authorised Seal &amp; Signature</span>
            <div className="my-2 relative w-32 h-14">
              <img
                src={contract.seller?.signature_url || "/images/custom/ourgrowth_signature.png"}
                alt="Authorized Signatory"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-[10px] text-on-surface-variant text-right">
              <p className="font-bold text-primary">{contract.seller?.authorized_signatory || "Niloy Sarkar (Proprietor)"}</p>
              <p className="text-[9px]">For OurGrowth Enterprises</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
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
            <span>Print Agreement</span>
          </button>
        </div>
      </div>
    </div>
  );
}
