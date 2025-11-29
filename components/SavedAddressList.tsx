"use client";

import { useEffect, useState } from "react";
import { SavedAddressCard, SavedAddressType } from "./SavedAddressCard";
import { MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function SavedAddressList() {
  const [addresses, setAddresses] = useState<SavedAddressType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAddresses = async () => {
    try {
      const response = await fetch("/api/addresses/saved");

      if (!response.ok) {
        throw new Error("Failed to fetch addresses");
      }

      const data = await response.json();
      setAddresses(data.addresses);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      toast.error("Failed to load saved addresses");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/addresses/saved/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete address");
      }

      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      toast.success("Address deleted successfully");
    } catch (error) {
      console.error("Failed to delete address:", error);
      toast.error("Failed to delete address");
    }
  };

  const handleUpdate = async (id: string, label: string) => {
    try {
      const response = await fetch(`/api/addresses/saved/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label }),
      });

      if (!response.ok) {
        throw new Error("Failed to update address");
      }

      const data = await response.json();
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === id ? data.address : addr))
      );
    } catch (error) {
      console.error("Failed to update address:", error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="animate-spin text-[#40800C]" size={40} />
        <p className="mt-4 text-gray-500">Loading saved addresses...</p>
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-12">
        <div className="rounded-full bg-gray-100 p-4">
          <MapPin className="text-gray-400" size={40} />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          No saved addresses
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Verify an address and save it to your address book to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
        <p className="mt-1 text-sm text-gray-500">
          {addresses.length} {addresses.length === 1 ? "address" : "addresses"}{" "}
          saved
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((address) => (
          <SavedAddressCard
            key={address.id}
            address={address}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}
