"use client";

import Menu from "@/components/Menu";
import Image from "next/image";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#F3F3F3] flex flex-col relative font-sans text-hendogray dm-sans">
      {/* Header / Menu Button */}
      <header className="absolute top-0 right-0 p-4 sm:p-10 z-50">
        <Menu />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-8">
        <div className="max-w-2xl w-full flex flex-col items-start gap-6">
          
          {/* Logo */}
          <div className="mb-2">
            <Image 
              src="/zipcode.svg" 
              alt="zipdrop" 
              width={106} 
              height={28} 
              className="h-6 sm:h-8 w-auto"
              priority
            />
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl font-bold text-[#333]">FAQ</h1>

          {/* Text Content */}
          <div className="space-y-8 text-md sm:text-lg leading-relaxed text-hendogray">
            
            <div className="space-y-2">
              <h2 className="font-bold text-[#333]">Q1: How accurate are the postal codes and addresses returned by ZipDrop?</h2>
              <p>
                ZipDrop is designed to simulate relying on official, global address validation APIs (like those used by major shipping carriers). When you search, the app aims to return the exact, mailable address and postal code recognized by the national postal authority. It also provides the correct country-specific format (e.g., where the zip code or house number must appear), minimizing delivery errors.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-bold text-[#333]">Q2: Why do I need to use the &quot;Save to Address Book&quot; feature if I already found the address?</h2>
              <p>
                The Smart Address Book uses a secure cloud database tied to your user ID. This ensures two things: 1. Persistence: Your verified addresses are permanently stored and available across different sessions and devices. 2. Confidence: Once an address is saved, you know it&apos;s a correct, clean, and validated address, ready to be copied and used without having to search or re-validate it later.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-bold text-[#333]">Q3: Why does the app ask for my location when I use the &quot;Geolocation&quot; feature?</h2>
              <p>
                The Geolocation feature uses your device&apos;s GPS coordinates (latitude and longitude) and a reverse geocoding service to pinpoint your exact location. This is useful when you are at an unfamiliar location and need to instantly retrieve the formal, mailable street address and postal code associated with your precise coordinates. Your location data is used only for the lookup and is not permanently stored unless you explicitly save the resulting address.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-bold text-[#333]">Q4: Can I use ZipDrop for addresses outside of my current country?</h2>
              <p>
                Yes, ZipDrop is designed for global use. Not only can you look up addresses anywhere in the world, but the results display the Country-Specific Format. This crucial detail tells you how the recipient’s country requires the address elements to be ordered—for example, knowing if the postal code belongs on the first or last line of the address block when preparing mail.
              </p>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
