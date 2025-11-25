import Image from "next/image";
import Link from "next/link";
import DashboardMenu from "@/components/DashboardMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F3F3F3] flex flex-col relative font-sans text-hendogray dm-sans">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-4 sm:p-10 z-50 flex justify-between items-start">
        {/* Logo */}
        <Link href="/dashboard">
          <Image 
            src="/zipcode.svg" 
            alt="zipdrop" 
            width={106} 
            height={28} 
            className="h-6 sm:h-8 w-auto"
            priority
          />
        </Link>

        {/* Menu Button */}
        <DashboardMenu />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
