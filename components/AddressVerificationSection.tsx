"use client";

import { useState } from "react";
import { AddressSearchForm, VerifiedAddress } from "./AddressSearchForm";
import { AddressVerificationResult } from "./AddressVerificationResult";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AddressVerificationSection() {
  const [verifiedAddress, setVerifiedAddress] = useState<VerifiedAddress | null>(null);
  const [isGeolocating, setIsGeolocating] = useState(false);
  const router = useRouter();

  const handleAddressVerified = (address: VerifiedAddress) => {
    setVerifiedAddress(address);
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsGeolocating(true);
    toast.info("Getting your location...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch("/api/addresses/geolocation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          });

          const result = await response.json();

          if (!response.ok) {
            toast.error(result.error || "Failed to get address from location");
            return;
          }

          toast.success("Address found from your location");
          setVerifiedAddress(result.address);
        } catch (error) {
          toast.error("An error occurred while getting your location");
          console.error("Geolocation error:", error);
        } finally {
          setIsGeolocating(false);
        }
      },
      (error) => {
        setIsGeolocating(false);
        let errorMessage = "Failed to get your location";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }

        toast.error(errorMessage);
      }
    );
  };

  const handleSaveAddress = async (label?: string) => {
    if (!verifiedAddress) return;

    try {
      const response = await fetch("/api/addresses/saved", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label,
          street: verifiedAddress.street,
          city: verifiedAddress.city,
          state: verifiedAddress.state,
          postalCode: verifiedAddress.postalCode,
          country: verifiedAddress.country,
          formattedAddress: verifiedAddress.formattedAddress,
          latitude: verifiedAddress.latitude,
          longitude: verifiedAddress.longitude,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Please sign in to save addresses");
          router.push("/login");
          return;
        }
        toast.error(result.error || "Failed to save address");
        return;
      }

      toast.success("Address saved to your address book!");
    } catch (error) {
      console.error("Failed to save address:", error);
      toast.error("An error occurred while saving the address");
    }
  };

  return (
    <div className="w-full space-y-6">
      <AddressSearchForm
        onAddressVerified={handleAddressVerified}
        onGeolocationClick={isGeolocating ? undefined : handleGeolocation}
      />

      {verifiedAddress && (
        <AddressVerificationResult
          address={verifiedAddress}
          onSave={handleSaveAddress}
        />
      )}
    </div>
  );
}
