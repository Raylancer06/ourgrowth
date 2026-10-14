'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Package, MapPin, FileText, ChevronRight, User, LogOut, Loader2, 
  Lock, ShoppingBag, Truck
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/components/ui/Toast";
import { 
  getCustomerProfile, getCustomerOrders, getOrderInvoice, updateCustomerProfile,
  getCustomerContracts, getContractDetails
} from "@/lib/api";

import { ShippingAddressItem, AccountOrder, AccountInvoice, AccountContract } from "@/components/account/types";
import OrdersTab from "@/components/account/OrdersTab";
import AddressesTab from "@/components/account/AddressesTab";
import ProfileTab from "@/components/account/ProfileTab";
import SecurityTab from "@/components/account/SecurityTab";
import InvoicesTab from "@/components/account/InvoicesTab";
import ContractsTab from "@/components/account/ContractsTab";
import LedgerTab from "@/components/account/LedgerTab";
import ScheduleTab from "@/components/account/ScheduleTab";
import InvoiceModal from "@/components/account/InvoiceModal";
import ContractModal from "@/components/account/ContractModal";

export default function AccountDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "profile" | "security" | "invoices" | "contracts" | "ledger" | "schedule">("orders");
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<AccountOrder[]>([]);
  const [contracts, setContracts] = useState<AccountContract[]>([]);
  const [addresses, setAddresses] = useState<ShippingAddressItem[]>([]);
  const [savingAddress, setSavingAddress] = useState(false);

  // Modals
  const [selectedInvoice, setSelectedInvoice] = useState<AccountInvoice | null>(null);
  const [fetchingInvoice, setFetchingInvoice] = useState<string | null>(null);
  const [selectedContract, setSelectedContract] = useState<AccountContract | null>(null);
  const [fetchingContract, setFetchingContract] = useState<string | number | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("ourgrowth_customer_token") || localStorage.getItem("og_customer_token");
    if (!savedToken) {
      router.replace("/login?redirect=/account");
      return;
    }
    setToken(savedToken);

    Promise.all([
      getCustomerProfile(savedToken).catch(() => null),
      getCustomerOrders(savedToken).catch(() => null),
      getCustomerContracts(savedToken).catch(() => null),
    ]).then(([profileRes, ordersRes, contractsRes]) => {
      if (profileRes?.customer) {
        const cust = profileRes.customer;
        setProfile(cust);

        // Parse addresses
        if (cust.shipping_address) {
          try {
            const parsed = typeof cust.shipping_address === "string" ? JSON.parse(cust.shipping_address) : cust.shipping_address;
            if (parsed?.addresses && Array.isArray(parsed.addresses)) {
              setAddresses(parsed.addresses);
            } else if (parsed?.address) {
              setAddresses([{
                id: "default_1",
                label: cust.company_name ? "Store / Shop" : "Home",
                name: cust.name || "",
                phone: cust.phone || "",
                address: parsed.address || "",
                city: parsed.city || "Kolkata",
                state: parsed.state || "West Bengal",
                pincode: parsed.pincode || "",
                is_default: true,
              }]);
            }
          } catch {
            // Ignore JSON parse errors
          }
        }
      }

      if (ordersRes?.orders) {
        setOrders(ordersRes.orders);
      }

      if (contractsRes?.contracts) {
        setContracts(contractsRes.contracts);
      }
      setLoading(false);
    });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("ourgrowth_customer_token");
    localStorage.removeItem("og_customer_token");
    localStorage.removeItem("ourgrowth_customer_user");
    showToast("You have been signed out successfully.");
    router.replace("/");
  };

  const formatStatus = (status: string) => {
    switch (status?.toUpperCase()) {
      case "NEW":
        return { label: "Order Received", class: "bg-blue-100 text-blue-800" };
      case "CONFIRMED":
        return { label: "Confirmed", class: "bg-indigo-100 text-indigo-800" };
      case "PROCESSING":
        return { label: "Processing & Cold Room Sorting", class: "bg-amber-100 text-amber-800" };
      case "PACKED":
        return { label: "Packed in Crate", class: "bg-teal-100 text-teal-800" };
      case "READY_FOR_DISPATCH":
        return { label: "Ready for Dispatch", class: "bg-emerald-100 text-emerald-800" };
      case "DISPATCHED":
        return { label: "In Transit", class: "bg-purple-100 text-purple-800 animate-pulse" };
      case "DELIVERED":
        return { label: "Delivered", class: "bg-green-100 text-green-800" };
      case "CANCELLED":
        return { label: "Cancelled", class: "bg-rose-100 text-rose-800" };
      default:
        return { label: status, class: "bg-surface-container text-on-surface-variant" };
    }
  };

  const handleSaveAddresses = async (newAddresses: ShippingAddressItem[]) => {
    if (!token) return;
    setSavingAddress(true);

    const defaultAddr = newAddresses.find((a) => a.is_default) || newAddresses[0];
    const shippingPayload = {
      address: defaultAddr ? defaultAddr.address : "",
      city: defaultAddr ? defaultAddr.city : "Kolkata",
      state: defaultAddr ? defaultAddr.state : "West Bengal",
      pincode: defaultAddr ? defaultAddr.pincode : "",
      addresses: newAddresses,
    };

    try {
      const res = await updateCustomerProfile(token, {
        shipping_address: shippingPayload,
      });

      if (res.success && res.customer) {
        setProfile(res.customer);
        setAddresses(newAddresses);
        localStorage.setItem("ourgrowth_customer_user", JSON.stringify(res.customer));
        showToast("Address saved successfully!");
      } else {
        showToast(res.message || "Failed to update address.");
      }
    } catch {
      showToast("Network error while saving address.");
    } finally {
      setSavingAddress(false);
    }
  };

  const handleViewInvoice = async (ord: AccountOrder, autoPrint = false) => {
    if (!token) {
      showToast("Please log in to view certified invoices.");
      return;
    }

    const orderRef = ord.order_number || String(ord.id);
    setFetchingInvoice(orderRef);
    try {
      const res = await getOrderInvoice(token, orderRef);
      if (res.success && res.invoice) {
        setSelectedInvoice(res.invoice);
        if (autoPrint) {
          setTimeout(() => {
            window.print();
          }, 400);
        }
      } else {
        showToast(res.message || "Invoice details could not be retrieved.");
      }
    } catch {
      showToast("Failed to fetch tax invoice. Please try again.");
    } finally {
      setFetchingInvoice(null);
    }
  };

  const handleViewContract = async (contractId: string | number, autoPrint = false) => {
    if (!token) {
      showToast("Please log in to view supply contracts.");
      return;
    }

    setFetchingContract(contractId);
    try {
      const res = await getContractDetails(token, contractId);
      if (res.success && res.contract) {
        setSelectedContract(res.contract);
        if (autoPrint) {
          setTimeout(() => {
            window.print();
          }, 400);
        }
      } else {
        showToast(res.message || "Contract details could not be retrieved.");
      }
    } catch {
      showToast("Network error fetching supply contract.");
    } finally {
      setFetchingContract(null);
    }
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
        <Header />
        <main className="w-full pt-28 bg-surface flex-1 flex flex-col items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-secondary mb-3" />
          <p className="text-sm font-medium text-on-surface-variant">Checking account session...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Header />

      <main className="w-full pt-28 bg-surface flex-1">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter py-8">
          {/* Dashboard Header */}
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Profile Avatar Display */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-secondary-fixed/30 border-2 border-secondary/20 flex items-center justify-center shrink-0 shadow-sm">
                {profile?.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name || "Customer Avatar"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-extrabold text-xl sm:text-2xl text-secondary">
                    {(profile?.name || "C").charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-headline-sm text-xl sm:text-2xl font-black text-primary">
                    {profile?.company_name || profile?.name || "Garlic Partner"}
                  </h1>
                  <span className="text-[10px] bg-secondary text-on-secondary px-2.5 py-0.5 rounded-full font-bold">
                    {profile?.business_type || "Commercial Buyer"}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  {profile?.email} • {profile?.phone || "Mobile verified"}
                </p>
                <div className="flex items-center gap-3 pt-1 text-[11px] text-on-surface-variant">
                  <span>Customer ID: <strong className="text-primary font-mono">{profile?.customer_code || `OG-C${profile?.id}`}</strong></span>
                  {profile?.tax_number && (
                    <>
                      <span>•</span>
                      <span>GSTIN: <strong className="text-primary font-mono">{profile?.tax_number}</strong></span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end border-t sm:border-0 border-surface-container pt-3 sm:pt-0">
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full border border-surface-container text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
              <Link
                href="/shop"
                className="px-5 py-2 rounded-full bg-secondary text-on-secondary hover:bg-primary font-bold text-xs transition-colors shadow-sm"
              >
                + Place Order
              </Link>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 border-b border-surface-container pb-3 mb-6 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "orders" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              Recent Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("addresses")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "addresses" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              Saved Addresses ({addresses.length})
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "profile" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              Profile Settings
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "security" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Password &amp; Security</span>
            </button>
            <button
              onClick={() => setActiveTab("invoices")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "invoices" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              Tax Invoices
            </button>
            <button
              onClick={() => setActiveTab("contracts")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "contracts" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Supply Contracts ({contracts.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("ledger")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "ledger" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              Khata / Ledger
            </button>
            <button
              onClick={() => setActiveTab("schedule")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "schedule" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              Standing Delivery Schedule
            </button>
          </div>

          {/* Tab Content Rendering */}
          {activeTab === "orders" && (
            <OrdersTab
              orders={orders}
              formatStatus={formatStatus}
              onReorder={(ord) => showToast(`1-Click Reorder triggered for ${ord.order_number || ord.id}!`)}
            />
          )}

          {activeTab === "addresses" && (
            <AddressesTab
              addresses={addresses}
              profile={profile}
              savingAddress={savingAddress}
              onSaveAddresses={handleSaveAddresses}
            />
          )}

          {activeTab === "profile" && (
            <ProfileTab
              profile={profile}
              token={token}
              showToast={showToast}
              onProfileUpdated={(updated) => {
                setProfile(updated);
                localStorage.setItem("ourgrowth_customer_user", JSON.stringify(updated));
              }}
            />
          )}

          {activeTab === "security" && (
            <div className="max-w-3xl">
              <SecurityTab profile={profile} token={token} showToast={showToast} />
            </div>
          )}

          {activeTab === "invoices" && (
            <InvoicesTab
              orders={orders}
              fetchingInvoice={fetchingInvoice}
              onViewInvoice={handleViewInvoice}
            />
          )}

          {activeTab === "contracts" && (
            <ContractsTab
              contracts={contracts}
              fetchingContract={fetchingContract}
              onViewContract={handleViewContract}
            />
          )}

          {activeTab === "ledger" && (
            <LedgerTab orders={orders} />
          )}

          {activeTab === "schedule" && (
            <ScheduleTab />
          )}
        </div>

        {/* Invoice Modal */}
        {selectedInvoice && (
          <InvoiceModal
            invoice={selectedInvoice}
            onClose={() => setSelectedInvoice(null)}
          />
        )}

        {/* Supply Contract Modal */}
        {selectedContract && (
          <ContractModal
            contract={selectedContract}
            profile={profile}
            onClose={() => setSelectedContract(null)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
