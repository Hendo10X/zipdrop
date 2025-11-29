import Image from "next/image";
import Link from "next/link";
import DashboardMenu from "@/components/DashboardMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F3F3F3] flex flex-col font-sans text-hendogray dm-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-6 sm:p-10 z-50 flex justify-between items-start bg-[#F3F3F3]">
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

      {/* Main Content with padding to avoid header overlap */}
      <main className="flex-1 pt-20 sm:pt-24">
        {children}
      </main>
    </div>
  );
}
