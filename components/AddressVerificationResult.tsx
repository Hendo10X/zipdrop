"use client";

import { useState } from "react";
import { MapPin, Save, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { VerifiedAddress } from "./AddressSearchForm";
import { PostalFormatDisplay } from "./PostalFormatDisplay";

interface AddressVerificationResultProps {
  address: VerifiedAddress;
  onSave?: (label?: string) => Promise<void>;
  showSaveButton?: boolean;
}

export function AddressVerificationResult({
  address,
  onSave,
  showSaveButton = true,
}: AddressVerificationResultProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showLabelInput, setShowLabelInput] = useState(false);
  const [label, setLabel] = useState("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address.formattedAddress);
      setIsCopied(true);
      toast.success("Address copied to clipboard");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy address");
    }
  };

  const handleSave = async () => {
    if (!onSave) return;

    setIsSaving(true);
    try {
      await onSave(label || undefined);
      setShowLabelInput(false);
      setLabel("");
    } catch (error) {
      console.error("Failed to save address:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full rounded border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-[#61EB76]/10 p-2">
            <MapPin className="text-[#40800C]" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Verified Address
            </h3>
            <p className="text-sm text-gray-500">
              Address has been validated and formatted
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 border-t border-gray-100 pt-4">
        {/* Postal Code - Priority Display */}
        <div className="rounded-lg border-2 border-[#61EB76] bg-[#61EB76]/5 p-4">
          <p className="text-xs font-medium text-[#40800C]">Postal Code</p>
          {address.postalCode ? (
            <p className="text-lg font-bold text-gray-900">{address.postalCode}</p>
          ) : (
            <p className="text-sm italic text-gray-500">No postal code available for this location</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {address.street && (
            <div className="col-span-2">
              <p className="text-xs font-medium text-gray-500">Street</p>
              <p className="text-sm text-gray-900">{address.street}</p>
            </div>
          )}

          {address.city && (
            <div>
              <p className="text-xs font-medium text-gray-500">City</p>
              <p className="text-sm text-gray-900">{address.city}</p>
            </div>
          )}

          {address.state && (
            <div>
              <p className="text-xs font-medium text-gray-500">State</p>
              <p className="text-sm text-gray-900">{address.state}</p>
            </div>
          )}

          {address.country && (
            <div className="col-span-2">
              <p className="text-xs font-medium text-gray-500">Country</p>
              <p className="text-sm text-gray-900">{address.country}</p>
            </div>
          )}
        </div>

        <div className="rounded bg-gray-50 p-3">
          <p className="text-xs font-medium text-gray-500">
            Formatted Address
          </p>
          <p className="text-sm text-gray-900">{address.formattedAddress}</p>
        </div>

        {address.latitude && address.longitude && (
          <div className="rounded bg-gray-50 p-3">
            <p className="text-xs font-medium text-gray-500">Coordinates</p>
            <p className="text-sm text-gray-900">
              {address.latitude}, {address.longitude}
            </p>
          </div>
        )}
      </div>

      <PostalFormatDisplay countryCode={address.countryCode} />

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleCopy}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
        >
          {isCopied ? <Check size={20} /> : <Copy size={20} />}
          {isCopied ? "Copied!" : "Copy Address"}
        </button>

        {showSaveButton && onSave && (
          <button
            onClick={() => setShowLabelInput(!showLabelInput)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#61EB76] px-4 py-3 font-semibold text-[#40800C] transition-all duration-200 hover:bg-[#61EB76]/90"
          >
            <Save size={20} />
            Save to Address Book
          </button>
        )}
      </div>

      {showLabelInput && (
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label (optional, e.g., Home, Work)"
            className="flex-1 rounded border border-gray-300 px-4 py-2 text-sm focus:border-[#40800C] focus:outline-none focus:ring-2 focus:ring-[#40800C]/20"
          />
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-full bg-[#61EB76] px-6 py-2 text-sm font-semibold text-[#40800C] transition-all duration-200 hover:bg-[#61EB76]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      )}
    </div>
  );
}
