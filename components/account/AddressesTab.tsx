'use client';

import { useState } from "react";
import { Plus, X, Save, Edit3, Trash2, Check, MapPin, Building, Home, Briefcase, Loader2 } from "lucide-react";
import { ShippingAddressItem } from "./types";

interface AddressesTabProps {
  addresses: ShippingAddressItem[];
  profile: any;
  savingAddress: boolean;
  onSaveAddresses: (newAddresses: ShippingAddressItem[]) => Promise<void>;
}

export default function AddressesTab({
  addresses,
  profile,
  savingAddress,
  onSaveAddresses,
}: AddressesTabProps) {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState({
    label: "Home",
    name: "",
    phone: "",
    address: "",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "",
    is_default: false,
  });

  const openNewAddressForm = () => {
    setEditingAddressId(null);
    setAddressForm({
      label: profile?.company_name ? "Store / Shop" : "Home",
      name: profile?.name || "",
      phone: profile?.phone || "",
      address: "",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "",
      is_default: addresses.length === 0,
    });
    setIsEditingAddress(true);
  };

  const openEditAddressForm = (addr: ShippingAddressItem) => {
    setEditingAddressId(addr.id);
    setAddressForm({
      label: addr.label,
      name: addr.name,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      is_default: addr.is_default,
    });
    setIsEditingAddress(true);
  };

  const handleSaveAddressForm = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedList: ShippingAddressItem[] = [];

    if (editingAddressId) {
      updatedList = addresses.map((a) => {
        if (a.id === editingAddressId) {
          return {
            ...a,
            ...addressForm,
            is_default: addressForm.is_default,
          };
        }
        return addressForm.is_default ? { ...a, is_default: false } : a;
      });
    } else {
      const newAddr: ShippingAddressItem = {
        id: "addr_" + Date.now(),
        ...addressForm,
      };
      if (addressForm.is_default || addresses.length === 0) {
        updatedList = addresses.map((a) => ({ ...a, is_default: false }));
        updatedList.push({ ...newAddr, is_default: true });
      } else {
        updatedList = [...addresses, newAddr];
      }
    }

    await onSaveAddresses(updatedList);
    setIsEditingAddress(false);
  };

  const handleDeleteAddress = async (id: string) => {
    if (confirm("Are you sure you want to remove this delivery address?")) {
      const filtered = addresses.filter((a) => a.id !== id);
      if (filtered.length > 0 && !filtered.some((a) => a.is_default)) {
        filtered[0].is_default = true;
      }
      await onSaveAddresses(filtered);
    }
  };

  const handleSetDefaultAddress = async (id: string) => {
    const updated = addresses.map((a) => ({
      ...a,
      is_default: a.id === id,
    }));
    await onSaveAddresses(updated);
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-surface-container">
          <div>
            <h3 className="font-headline-sm text-xl font-bold text-primary">
              Saved Shipping Addresses
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">
              Manage delivery destinations for your home, kitchen, grocery store, or warehouse.
            </p>
          </div>
          {!isEditingAddress && (
            <button
              onClick={openNewAddressForm}
              className="px-5 py-2.5 rounded-full bg-secondary text-on-secondary hover:bg-primary font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Address</span>
            </button>
          )}
        </div>

        {/* Address Form (Add / Edit) */}
        {isEditingAddress && (
          <form onSubmit={handleSaveAddressForm} className="mt-6 p-6 rounded-2xl bg-surface-container-low border border-surface-container space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <h4 className="font-bold text-primary text-sm">
                {editingAddressId ? "Edit Shipping Address" : "Add New Shipping Address"}
              </h4>
              <button
                type="button"
                onClick={() => setIsEditingAddress(false)}
                className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Address Type / Label */}
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                Address Label
              </label>
              <div className="flex flex-wrap gap-2">
                {["Home", "Store / Shop", "Kitchen / Restaurant", "Work / Office", "Warehouse"].map((lbl) => (
                  <button
                    key={lbl}
                    type="button"
                    onClick={() => setAddressForm({ ...addressForm, label: lbl })}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                      addressForm.label === lbl
                        ? "bg-primary text-on-primary border-primary"
                        : "bg-surface-container-lowest text-on-surface-variant border-surface-container hover:bg-surface-container"
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Recipient Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Recipient Full Name"
                  value={addressForm.name}
                  onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Contact Phone Number *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={addressForm.phone}
                  onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Street Address / Flat / Building / Landmark *
              </label>
              <input
                required
                type="text"
                placeholder="House / Flat No, Street, Landmark"
                value={addressForm.address}
                onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            {/* City, State, Pincode */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  City *
                </label>
                <input
                  required
                  type="text"
                  placeholder="City"
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  State *
                </label>
                <input
                  required
                  type="text"
                  placeholder="State"
                  value={addressForm.state}
                  onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Pincode *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Pincode"
                  value={addressForm.pincode}
                  onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest text-xs sm:text-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>

            {/* Set as Default */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="is_default"
                checked={addressForm.is_default}
                onChange={(e) => setAddressForm({ ...addressForm, is_default: e.target.checked })}
                className="w-4 h-4 text-secondary rounded border-surface-container focus:ring-secondary"
              />
              <label htmlFor="is_default" className="text-xs text-on-surface font-semibold cursor-pointer">
                Set as default shipping address
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container">
              <button
                type="button"
                onClick={() => setIsEditingAddress(false)}
                className="px-4 py-2 rounded-full border border-surface-container text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingAddress}
                className="px-6 py-2 rounded-full bg-secondary text-on-secondary hover:bg-primary font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors disabled:opacity-60"
              >
                {savingAddress ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Address</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Addresses Cards Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.length === 0 && !isEditingAddress && (
            <div className="col-span-full py-12 text-center text-on-surface-variant border-2 border-dashed border-surface-container rounded-3xl">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-secondary opacity-60" />
              <p className="font-bold text-sm text-primary">No shipping addresses saved yet.</p>
              <p className="text-xs mt-1">Add your primary delivery address for faster 1-click checkout.</p>
              <button
                onClick={openNewAddressForm}
                className="mt-4 px-5 py-2.5 rounded-full bg-secondary text-on-secondary hover:bg-primary font-bold text-xs transition-colors"
              >
                + Add Address
              </button>
            </div>
          )}

          {addresses.map((addr) => {
            const isDefault = addr.is_default;
            return (
              <div
                key={addr.id}
                className={`p-5 rounded-2xl border transition-all relative flex flex-col justify-between ${
                  isDefault
                    ? "bg-secondary-fixed/10 border-secondary shadow-sm"
                    : "bg-surface-container-low border-surface-container hover:border-surface-container-high"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-surface-container text-secondary">
                        {addr.label.toLowerCase().includes("store") || addr.label.toLowerCase().includes("shop") ? (
                          <Building className="w-4 h-4" />
                        ) : addr.label.toLowerCase().includes("office") || addr.label.toLowerCase().includes("work") ? (
                          <Briefcase className="w-4 h-4" />
                        ) : (
                          <Home className="w-4 h-4" />
                        )}
                      </span>
                      <span className="font-bold text-primary text-sm">{addr.label}</span>
                    </div>
                    {isDefault && (
                      <span className="text-[10px] bg-secondary text-on-secondary px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Default</span>
                      </span>
                    )}
                  </div>

                  <p className="font-semibold text-xs text-primary">{addr.name}</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{addr.address}</p>
                  <p className="text-xs text-on-surface-variant">
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-[11px] text-on-surface-variant font-mono">Mobile: {addr.phone}</p>
                </div>

                <div className="pt-4 mt-3 border-t border-surface-container flex items-center justify-between">
                  <div>
                    {!isDefault && (
                      <button
                        type="button"
                        onClick={() => handleSetDefaultAddress(addr.id)}
                        className="text-[11px] font-bold text-secondary hover:text-primary transition-colors"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditAddressForm(addr)}
                      className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                      title="Edit Address"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                      title="Delete Address"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
