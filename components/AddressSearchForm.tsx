"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Search } from "lucide-react";
import { toast } from "sonner";

const addressSearchSchema = z.object({
  address: z.string().min(1, "Please enter an address"),
});

type AddressSearchFormData = z.infer<typeof addressSearchSchema>;

export interface VerifiedAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  countryCode: string;
  formattedAddress: string;
  latitude: string;
  longitude: string;
  placeId: string;
}

interface AddressSearchFormProps {
  onAddressVerified: (address: VerifiedAddress) => void;
  onGeolocationClick?: () => void;
}

export function AddressSearchForm({
  onAddressVerified,
  onGeolocationClick,
}: AddressSearchFormProps) {
  const [isVerifying, setIsVerifying] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressSearchFormData>({
    resolver: zodResolver(addressSearchSchema),
  });

  const onSubmit = async (data: AddressSearchFormData) => {
    setIsVerifying(true);

    try {
      const response = await fetch("/api/addresses/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: data.address }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Failed to verify address");
        return;
      }

      toast.success("Address verified successfully");
      onAddressVerified(result.address);
    } catch (error) {
      toast.error("An error occurred while verifying the address");
      console.error("Address verification error:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <MapPin size={20} />
          </div>
          <input
            {...register("address")}
            type="text"
            placeholder="Enter street address or landmark"
            className="w-full rounded border border-gray-300 bg-white px-12 py-4 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-[#40800C] focus:outline-none focus:ring-2 focus:ring-[#40800C]/20"
            disabled={isVerifying}
          />
        </div>

        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isVerifying}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#61EB76] px-4 sm:px-6 py-3 sm:py-4 font-semibold text-[#40800C] transition-all duration-200 hover:bg-[#61EB76]/90 disabled:cursor-not-allowed disabled:opacity-50">
            <Search size={20} />
            {isVerifying ? "Verifying..." : "Verify Address"}
          </button>

          {onGeolocationClick && (
            <button
              type="button"
              onClick={onGeolocationClick}
              className="flex items-center justify-center gap-2 rounded-full border-2 border-[#40800C] bg-white px-4 sm:px-6 py-3 sm:py-4 font-semibold text-[#40800C] transition-all duration-200 hover:bg-[#61EB76]/5">
              <MapPin size={20} />
              Use My Location
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
