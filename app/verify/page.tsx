import { AddressVerificationSection } from "@/components/AddressVerificationSection";
import Link from "next/link";
import Image from "next/image";
import DashboardMenu from "@/components/DashboardMenu";

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-[#F3F3F3] font-sans text-hendogray dm-sans ">
      <header className="fixed right-0 top-0 z-50 p-6 sm:p-10">
        <DashboardMenu />
      </header>

      <main className="flex min-h-screen flex-col px-4 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto w-full max-w-3xl space-y-12">
          <div>
            <Link href="/">
              <Image
                src="/zipcode.svg"
                alt="zipdrop"
                width={106}
                height={28}
                className="h-6 w-auto sm:h-8"
                priority
              />
            </Link>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Verify Your Address
            </h1>
            <p className="text-lg text-gray-600">
              Get instant validation with postal code, formatted address, and
              country-specific postal standards.
            </p>
          </div>

          <AddressVerificationSection />

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            <div className="rounded border border-gray-200 bg-white p-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#61EB76]/10">
                <svg
                  className="text-[#40800C]"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">
                Address Verification
              </h3>
              <p className="text-sm text-gray-600">
                Validate any address and receive the official postal code and
                corrected formatting.
              </p>
            </div>

            <div className="rounded border border-gray-200 bg-white p-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#61EB76]/10">
                <svg
                  className="text-[#40800C]"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">
                Postal Formatting
              </h3>
              <p className="text-sm text-gray-600">
                Get country-specific postal standards for error-free
                international mail.
              </p>
            </div>

            <div className="rounded border border-gray-200 bg-white p-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#61EB76]/10">
                <svg
                  className="text-[#40800C]"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">
                Smart Address Book
              </h3>
              <p className="text-sm text-gray-600">
                Save verified addresses for instant access and reuse in
                checkouts.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
