"use client";

import { useState } from "react";
import { MapPin, Trash2, Edit2, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export interface SavedAddressType {
  id: string;
  label: string | null;
  street: string;
  city: string;
  state: string | null;
  postalCode: string;
  country: string;
  formattedAddress: string;
  latitude: string | null;
  longitude: string | null;
  createdAt: string;
}

interface SavedAddressCardProps {
  address: SavedAddressType;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, label: string) => Promise<void>;
}

export function SavedAddressCard({
  address,
  onDelete,
  onUpdate,
}: SavedAddressCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [label, setLabel] = useState(address.label || "");

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this address?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(address.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await onUpdate(address.id, label);
      setIsEditing(false);
      toast.success("Address label updated");
    } catch (error) {
      toast.error("Failed to update label");
    }
  };

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

  return (
    <div className="rounded border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-gray-300">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-[#61EB76]/10 p-2">
            <MapPin className="text-[#40800C]" size={20} />
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Label (e.g., Home, Work)"
                  className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:border-[#40800C] focus:outline-none focus:ring-1 focus:ring-[#40800C]"
                  autoFocus
                />
                <button
                  onClick={handleUpdate}
                  className="rounded-full bg-[#61EB76] px-3 py-1 text-sm text-[#40800C] hover:bg-[#61EB76]/90"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setLabel(address.label || "");
                  }}
                  className="rounded-full border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <h3 className="font-semibold text-gray-900">
                {address.label || "Unlabeled Address"}
              </h3>
            )}
            <p className="mt-1 text-sm text-gray-600">
              {address.formattedAddress}
            </p>
          </div>
        </div>

        {!isEditing && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              title="Edit label"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={handleCopy}
              className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              title="Copy address"
            >
              {isCopied ? (
                <Check size={16} className="text-green-600" />
              ) : (
                <Copy size={16} />
              )}
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              title="Delete address"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-3 text-xs">
        {address.city && (
          <div>
            <span className="font-medium text-gray-500">City: </span>
            <span className="text-gray-700">{address.city}</span>
          </div>
        )}
        {address.state && (
          <div>
            <span className="font-medium text-gray-500">State: </span>
            <span className="text-gray-700">{address.state}</span>
          </div>
        )}
        {address.postalCode && (
          <div>
            <span className="font-medium text-gray-500">Postal Code: </span>
            <span className="text-gray-700">{address.postalCode}</span>
          </div>
        )}
        {address.country && (
          <div>
            <span className="font-medium text-gray-500">Country: </span>
            <span className="text-gray-700">{address.country}</span>
          </div>
        )}
      </div>
    </div>
  );
}
