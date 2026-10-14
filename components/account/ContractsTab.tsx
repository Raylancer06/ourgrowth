'use client';

import { FileText, Calendar, CheckCircle2, Eye, Download, Loader2 } from "lucide-react";
import { AccountContract } from "./types";

interface ContractsTabProps {
  contracts: AccountContract[];
  fetchingContract: string | number | null;
  onViewContract: (contractId: string | number, autoPrint?: boolean) => void;
}

export default function ContractsTab({
  contracts,
  fetchingContract,
  onViewContract,
}: ContractsTabProps) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container space-y-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-headline-sm text-lg font-bold text-primary">
          B2B Supply Agreements &amp; Contracts
        </h3>
        <span className="text-[11px] font-bold text-secondary bg-secondary-fixed/50 px-2.5 py-1 rounded-full">
          Institutional &amp; Commercial
        </span>
      </div>
      <p className="text-xs text-on-surface-variant mb-4">
        Active recurring supply agreements, procurement rate locks, and legal commercial terms with OurGrowth Enterprises.
      </p>

      {contracts.length === 0 ? (
        <div className="py-12 text-center text-on-surface-variant border-2 border-dashed border-surface-container rounded-3xl">
          <FileText className="w-8 h-8 mx-auto mb-2 text-secondary opacity-60" />
          <p className="font-bold text-sm text-primary">No active supply contracts found.</p>
          <p className="text-xs mt-1">Institutional supply contracts created by admin will appear here.</p>
        </div>
      ) : (
        contracts.map((c) => {
          const isFetching = fetchingContract === c.id;

          return (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary block text-sm">
                    {c.subject || "Garlic Supply Agreement"}
                  </span>
                  <span className="text-[10px] bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-full font-bold uppercase">
                    {c.status || "Active"}
                  </span>
                </div>
                <span className="text-[11px] text-on-surface-variant block font-mono">
                  Contract #{c.contract_number} • Type: {c.type || "Commercial Supply"}
                </span>
                <div className="flex items-center gap-3 text-[11px] text-on-surface-variant pt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-secondary" />
                    <span>Start: {c.start_date || "Immediate"}</span>
                  </span>
                  <span>•</span>
                  <span>Expires: {c.end_date || "Continuous"}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 border-surface-container pt-3 sm:pt-0">
                <div className="text-right">
                  <span className="font-headline-sm text-sm font-extrabold text-primary block">
                    {c.formatted_value || (c.value ? `₹${Number(c.value).toLocaleString("en-IN")}` : "Per Rate Card")}
                  </span>
                  <span className="text-[10px] text-on-surface-variant">Contract Value</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewContract(c.id, false)}
                    disabled={isFetching}
                    className="px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs flex items-center gap-1 transition-colors disabled:opacity-50"
                  >
                    {isFetching ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                    <span>View Agreement</span>
                  </button>
                  <button
                    onClick={() => onViewContract(c.id, true)}
                    disabled={isFetching}
                    className="px-3 py-1.5 rounded-full bg-secondary text-on-secondary hover:bg-primary font-bold text-xs flex items-center gap-1 transition-colors shadow-xs disabled:opacity-50"
                    title="Print or Save Contract PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
