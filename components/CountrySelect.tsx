"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "JP", name: "Japan" },
  { code: "IN", name: "India" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
] as const;

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function CountrySelect({ value, onChange, disabled }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedCountry = COUNTRIES.find((c) => c.code === value) || COUNTRIES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex w-full items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-left transition-colors hover:border-gray-300 focus:border-[#40800C] focus:outline-none focus:ring-2 focus:ring-[#40800C]/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Image
          src={`https://flagcdn.com/24x18/${selectedCountry.code.toLowerCase()}.png`}
          alt={selectedCountry.name}
          width={24}
          height={18}
          className="shrink-0 rounded-sm"
          unoptimized
        />
        <span className="flex-1 text-sm font-medium text-gray-900">{selectedCountry.name}</span>
        <ChevronDown
          className={`ml-auto h-4 w-4 shrink-0 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="max-h-60 overflow-y-auto py-1">
            {COUNTRIES.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleSelect(country.code)}
                className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-gray-50 ${
                  country.code === value ? "bg-[#61EB76]/10" : ""
                }`}
              >
                <Image
                  src={`https://flagcdn.com/24x18/${country.code.toLowerCase()}.png`}
                  alt={country.name}
                  width={24}
                  height={18}
                  className="rounded-sm"
                  unoptimized
                />
                <span
                  className={`text-sm ${
                    country.code === value
                      ? "font-semibold text-[#40800C]"
                      : "font-medium text-gray-900"
                  }`}
                >
                  {country.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

