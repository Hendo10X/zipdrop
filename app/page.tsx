import Image from "next/image";
import GetStartedButton from "@/components/GetStartedButton";

import Menu from "@/components/Menu";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F3F3F3] flex flex-col relative font-sans text-hendogray dm-sans">
      {/* Header / Menu Button */}
      <header className="absolute top-0 right-0 p-4 sm:p-10 z-50">
        <Menu />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:px-8 sm:py-12">
        <div className="max-w-2xl w-full flex flex-col items-start gap-8">
          
          {/* Logo Badge */}
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

          {/* Text Content */}
          <div className="space-y-4 sm:space-y-6 text-md sm:text-lg leading-tighter">
            <p>
              The application serves as your comprehensive, smart address utility, designed to eliminate the common frustrations associated with finding and verifying mailable destinations. It allows users to input any street address or landmark and instantly receive the official, validated postal code, the full corrected address, and, crucially, the precise postal formatting standard required for that specific country or region—a feature vital for error-free international correspondence.
            </p>
            <p>
              Going beyond simple lookup, the app leverages device geolocation to
              convert a user&apos;s current physical coordinates into a certified
              mailable address on the fly. All verified addresses can be securely
              saved to the integrated Smart Address Book, ensuring that personal
              or frequently used delivery points are always correct, instantly
              accessible, and ready for use in e-commerce checkouts or package
              shipping forms, ultimately guaranteeing accuracy and saving
              significant time
            </p>
          </div>

          {/* CTA Button */}
          <div className="w-full flex justify-between items-center mt-2">
            <span className="text-sm font-medium text-hendogray/60">
              built by hendo
            </span>
            <GetStartedButton />
          </div>
        </div>
      </main>
    </div>
  );
}


