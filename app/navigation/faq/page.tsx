export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#F3F3F3] flex flex-col items-center justify-center font-sans text-hendogray dm-sans p-8">
      <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
      <div className="max-w-2xl w-full space-y-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="font-bold text-lg mb-2">How does ZipDrop work?</h2>
          <p>We use advanced geolocation and address verification APIs to ensure your address is 100% accurate.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="font-bold text-lg mb-2">Is it free to use?</h2>
          <p>Yes, the basic lookup features are completely free.</p>
        </div>
      </div>
    </div>
  );
}
