"use client";

import Menu from "@/components/Menu";
import Image from "next/image";
import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      question: "How accurate are the postal codes and addresses returned by ZipDrop?",
      answer: "ZipDrop relies on official, global address validation APIs (like those used by major shipping carriers). When you search, the app returns the exact, mailable address and postal code recognized by the national postal authority, minimizing delivery errors."
    },
    {
      question: "Why should I use the \"Save to Address Book\" feature?",
      answer: "The Smart Address Book stores verified addresses in a secure cloud database tied to your account. This ensures persistence across sessions and devices, and confidence that saved addresses are correct and ready to use without re-validation."
    },
    {
      question: "Why does the app ask for my location?",
      answer: "The Geolocation feature uses your device's GPS coordinates and reverse geocoding to pinpoint your exact location. This is useful when you need to instantly retrieve the mailable address and postal code for your current position. Location data is only used for lookup and not stored unless you save the address."
    },
    {
      question: "Can I use ZipDrop for international addresses?",
      answer: "Yes! ZipDrop is designed for global use. You can look up addresses anywhere in the world, and results include the country-specific format showing how address elements should be ordered for that region."
    },
    {
      question: "How do I get an API key?",
      answer: "Simply create an account and head to your API Keys dashboard. You can generate up to 5 API keys per account. Each key is shown only once when created, so copy it somewhere safe immediately."
    },
    {
      question: "Is there a rate limit on the API?",
      answer: "Currently, we track usage per API key but don't enforce strict rate limits. However, we reserve the right to throttle excessive usage to ensure fair access for all users. Check your dashboard to monitor your request counts."
    },
    {
      question: "What happens if my API key is compromised?",
      answer: "If you suspect your API key has been compromised, delete it immediately from your dashboard and create a new one. We recommend rotating your keys periodically and never committing them to public repositories."
    },
    {
      question: "Does the API support CORS?",
      answer: "Yes! The API has CORS enabled, so you can call it directly from frontend JavaScript without needing a backend proxy. It works from the browser and localhost out of the box."
    },
    {
      question: "What address formats are supported?",
      answer: "You can input addresses in various formats—full addresses, partial addresses, landmarks, or even just a city and country. The API will do its best to return the most accurate match with complete postal information."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use industry-standard encryption for data in transit and at rest. Your saved addresses are tied to your authenticated account and are never shared with third parties. API keys are hashed before storage."
    },
    {
      question: "Can I use ZipDrop for commercial projects?",
      answer: "Yes, you can integrate the ZipDrop API into your commercial applications. Whether it's an e-commerce checkout, a shipping form, or a CRM system, our API is designed for production use."
    },
    {
      question: "What if an address isn't found?",
      answer: "If the API can't find a match, it returns a 404 error with a helpful message. Try being more specific with your query, or check for typos. Some very new or rural addresses may take time to appear in global databases."
    },
  ];

  return (
    <div className="min-h-screen bg-[#F3F3F3] flex flex-col relative font-sans text-hendogray dm-sans">
      {/* Header / Menu Button */}
      <header className="absolute top-0 right-0 p-4 sm:p-10 z-50">
        <Menu />
      </header>

      <main className="flex-1 px-4 py-12 sm:px-8">
        <div className="max-w-5xl mx-auto w-full">
          
          {/* Logo */}
          <div className="mb-8">
            <Link href="/">
              <Image 
                src="/zipcode.svg" 
                alt="zipdrop" 
                width={106} 
                height={28} 
                className="h-6 sm:h-8 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#333] mb-3">FAQ</h1>
            <p className="text-lg text-gray-600">Everything you need to know about ZipDrop</p>
          </div>

          {/* FAQ Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#61EB76] transition-colors"
              >
                <h2 className="font-bold text-[#333] text-lg mb-3">{faq.question}</h2>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-12 text-center bg-white rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-[#333] mb-3">Still have questions?</h2>
            <p className="text-gray-600 mb-6">Can&apos;t find what you&apos;re looking for? We&apos;re here to help.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/docs" 
                className="rounded-full bg-[#61EB76] px-6 py-2.5 font-semibold text-[#40800C] hover:bg-[#61EB76]/90 transition-colors"
              >
                Read the Docs
              </Link>
              <a 
                href="mailto:hendersondike@gmail.com" 
                className="rounded-full border-2 border-gray-300 bg-white px-6 py-2.5 font-semibold text-gray-700 hover:border-gray-400 transition-colors"
              >
                Contact Me
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
