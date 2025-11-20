import Menu from "@/components/Menu";
import Image from "next/image";

export default function AboutPage() {
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
          <h1 className="text-4xl sm:text-5xl font-bold text-[#333]">About</h1>

          {/* Text Content */}
          <div className="space-y-6 text-md sm:text-lg leading-relaxed text-hendogray">
            <p>
              Why did I build Zipdrop? Honestly, it was a profound civic duty... or maybe it was just spite. I got tired of having packages end up in a parallel dimension because I dared to type &quot;St.&quot; instead of &quot;Street,&quot; or because the shipping form demanded a county that hasn&apos;t existed since the Middle Ages.
            </p>
            <p>
              I grew weary of the endless, soul-crushing cycle: Googling an address, copying it into a checkout box, watching the USPS API spit out an error, trying three different permutations, and eventually just guessing.
            </p>
            <p>
              So, I spent thousands of hours integrating complex global validation APIs, reverse geocoding services, and cloud storage just so you don&apos;t have to waste seven minutes figuring out where the zip code goes in Switzerland. You&apos;re welcome. Now go mail something before the delivery drones revolt.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
