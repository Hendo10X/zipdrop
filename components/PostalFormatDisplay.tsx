"use client";

import { FileText } from "lucide-react";

interface PostalFormat {
  country: string;
  format: string;
  example: string;
  notes?: string;
}

const postalFormats: Record<string, PostalFormat> = {
  US: {
    country: "United States",
    format: "[Name]\n[Street Address]\n[City], [State] [ZIP Code]",
    example: "John Doe\n123 Main Street\nNew York, NY 10001",
    notes: "ZIP+4 format (12345-6789) is optional but recommended",
  },
  CA: {
    country: "Canada",
    format:
      "[Name]\n[Street Address]\n[City] [Province] [Postal Code]\n[CANADA]",
    example: "Jane Smith\n456 Maple Ave\nToronto ON M5H 2N2\nCANADA",
    notes: "Postal code format: A1A 1A1 (letter-number-letter number-letter-number)",
  },
  GB: {
    country: "United Kingdom",
    format: "[Name]\n[Street Address]\n[City]\n[Postal Code]\n[UNITED KINGDOM]",
    example: "James Brown\n789 Oxford Street\nLondon\nW1D 1BS\nUNITED KINGDOM",
    notes: "Postcodes can vary in format (e.g., W1A 1AA, M1 1AE, CR2 6XH)",
  },
  AU: {
    country: "Australia",
    format: "[Name]\n[Street Address]\n[City] [State] [Postcode]\n[AUSTRALIA]",
    example: "Sarah Johnson\n321 George Street\nSydney NSW 2000\nAUSTRALIA",
    notes: "Postcode is 4 digits",
  },
  DE: {
    country: "Germany",
    format: "[Name]\n[Street Address]\n[Postal Code] [City]\n[GERMANY]",
    example: "Hans Mueller\nHauptstraße 123\n10115 Berlin\nGERMANY",
    notes: "Postal code comes before the city name",
  },
  FR: {
    country: "France",
    format: "[Name]\n[Street Address]\n[Postal Code] [City]\n[FRANCE]",
    example: "Marie Dubois\n45 Rue de Rivoli\n75001 Paris\nFRANCE",
    notes: "Postal code is 5 digits",
  },
  JP: {
    country: "Japan",
    format: "[Postal Code]\n[Prefecture] [City]\n[Street Address]\n[Name]\n[JAPAN]",
    example: "〒100-0001\nTokyo Chiyoda-ku\n1-1-1 Chiyoda\nTaro Yamada\nJAPAN",
    notes: "Address is written in reverse order (largest to smallest)",
  },
};

interface PostalFormatDisplayProps {
  countryCode: string;
}

export function PostalFormatDisplay({ countryCode }: PostalFormatDisplayProps) {
  const postalFormat = postalFormats[countryCode];

  if (!postalFormat) {
    return null;
  }

  return (
    <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-4">
      <div className="mb-2 flex items-center gap-2">
        <FileText className="text-blue-600" size={20} />
        <h4 className="font-semibold text-blue-900">
          Postal Format for {postalFormat.country}
        </h4>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium text-blue-700">Standard Format:</p>
          <pre className="mt-1 whitespace-pre-wrap rounded bg-white p-2 text-xs text-gray-800">
            {postalFormat.format}
          </pre>
        </div>

        <div>
          <p className="text-xs font-medium text-blue-700">Example:</p>
          <pre className="mt-1 whitespace-pre-wrap rounded bg-white p-2 text-xs text-gray-800">
            {postalFormat.example}
          </pre>
        </div>

        {postalFormat.notes && (
          <div className="rounded bg-blue-100 p-2">
            <p className="text-xs text-blue-800">
              <span className="font-semibold">Note:</span> {postalFormat.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
