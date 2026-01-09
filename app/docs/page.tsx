import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import {
  Rocket,
  Target,
  Code,
  Key,
  AlertTriangle,
  ShieldAlert,
  CheckCircle,
  Clock,
  Globe,
  HelpCircle,
  Zap,
  Terminal,
  Star,
} from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#F3F3F3] flex flex-col relative font-sans text-hendogray dm-sans">
      {/* Header / Menu Button */}
      <header className="absolute top-0 right-0 p-4 sm:p-10 z-50">
        <Menu />
      </header>

      <main className="flex-1 px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-4xl">
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

          {/* Hero */}
          <div className="mb-16">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
              API Documentation
            </h1>
            <p className="text-xl text-gray-600">
              Because nobody should have to ask their users &quot;What&apos;s
              your zip code?&quot; in 2026. We got you.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-16 grid gap-4 sm:grid-cols-3">
            <a
              href="#getting-started"
              className="group rounded-lg border border-gray-200 bg-white p-5 transition-all hover:border-[#61EB76]">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#61EB76]/10">
                <Rocket className="h-5 w-5 text-[#40800C]" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-[#40800C]">
                Getting Started
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                From zero to postal hero in 2 minutes
              </p>
            </a>
            <a
              href="#endpoints"
              className="group rounded-lg border border-gray-200 bg-white p-5 transition-all hover:border-[#61EB76]">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#61EB76]/10">
                <Target className="h-5 w-5 text-[#40800C]" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-[#40800C]">
                API Endpoints
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                One endpoint to rule them all
              </p>
            </a>
            <a
              href="#examples"
              className="group rounded-lg border border-gray-200 bg-white p-5 transition-all hover:border-[#61EB76]">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#61EB76]/10">
                <Code className="h-5 w-5 text-[#40800C]" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-[#40800C]">
                Code Examples
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Copy, paste, ship. In that order.
              </p>
            </a>
          </div>

          {/* Getting Started */}
          <section id="getting-started" className="mb-16 scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#61EB76]/10">
                <Rocket className="h-5 w-5 text-[#40800C]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Getting Started
              </h2>
            </div>

            <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Step 1: Get Your API Key
                </h3>
                <p className="mb-4 text-gray-600">
                  Head over to your{" "}
                  <Link
                    href="/dashboard/api-keys"
                    className="font-medium text-[#40800C] underline hover:no-underline">
                    API Keys dashboard
                  </Link>{" "}
                  and create a shiny new key. We&apos;ll only show you the full
                  key once, so treat it like your Netflix password — copy it
                  somewhere safe immediately.
                </p>
                <div className="flex gap-3 rounded-lg bg-amber-50 border border-amber-200 p-4">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />
                  <p className="text-sm text-amber-800">
                    <strong>Pro tip:</strong> Don&apos;t commit your API key to
                    GitHub. We&apos;ve all been there, and it&apos;s not fun
                    explaining to your boss why someone used your key to look up
                    10,000 addresses in Antarctica.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Step 2: Make Your First Request
                </h3>
                <p className="mb-4 text-gray-600">
                  Include your API key in the{" "}
                  <code className="rounded bg-gray-100 px-2 py-0.5 text-sm font-mono text-gray-800">
                    X-API-Key
                  </code>{" "}
                  header. That&apos;s it. No OAuth dance, no token refresh
                  nightmares, no sacrificing a rubber duck to the authentication
                  gods.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Step 3: Profit
                </h3>
                <p className="text-gray-600">
                  Just kidding. But your checkout forms will finally work, and
                  your users will stop rage-quitting because they can&apos;t
                  remember their zip code.
                </p>
              </div>
            </div>
          </section>

          {/* Base URL */}
          <section className="mb-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Base URL</h2>
            <div className="rounded-lg bg-gray-900 p-4">
              <code className="text-sm text-[#61EB76]">
                https://your-domain.com/api/v1
              </code>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Replace{" "}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono">
                your-domain.com
              </code>{" "}
              with wherever you&apos;ve deployed this beautiful piece of
              software.
            </p>
          </section>

          {/* Authentication */}
          <section className="mb-16">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#61EB76]/10">
                <Key className="h-5 w-5 text-[#40800C]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Authentication
              </h2>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="mb-4 text-gray-600">
                All API requests require authentication via the{" "}
                <code className="rounded bg-gray-100 px-2 py-0.5 text-sm font-mono text-gray-800">
                  X-API-Key
                </code>{" "}
                header. No key? No postal codes. It&apos;s like a bouncer for
                your API requests.
              </p>

              <div className="rounded-lg bg-gray-900 p-4">
                <pre className="text-sm text-gray-100 overflow-x-auto">
                  <code>{`curl -H "X-API-Key: zd_your_api_key_here" \\
  https://your-domain.com/api/v1/lookup?address=123+Main+St`}</code>
                </pre>
              </div>

              <div className="flex gap-3 mt-4 rounded-lg bg-red-50 border border-red-200 p-4">
                <ShieldAlert className="h-5 w-5 shrink-0 text-red-600" />
                <p className="text-sm text-red-800">
                  <strong>Missing or invalid API key?</strong> You&apos;ll get a
                  401 error. The API equivalent of &quot;You shall not
                  pass!&quot;
                </p>
              </div>
            </div>
          </section>

          {/* Endpoints */}
          <section id="endpoints" className="mb-16 scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#61EB76]/10">
                <Target className="h-5 w-5 text-[#40800C]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                API Endpoints
              </h2>
            </div>

            {/* Lookup Endpoint */}
            <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700">
                    GET
                  </span>
                  <span className="rounded bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
                    POST
                  </span>
                  <code className="font-mono text-gray-900">/lookup</code>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  The star of the show. Give it an address, get back a postal
                  code and more.
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Request Parameters */}
                <div>
                  <h4 className="mb-3 font-semibold text-gray-900">
                    Request Parameters
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="pb-2 text-left font-semibold text-gray-900">
                            Parameter
                          </th>
                          <th className="pb-2 text-left font-semibold text-gray-900">
                            Type
                          </th>
                          <th className="pb-2 text-left font-semibold text-gray-900">
                            Required
                          </th>
                          <th className="pb-2 text-left font-semibold text-gray-900">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 font-mono text-[#40800C]">
                            address
                          </td>
                          <td className="py-2 text-gray-600">string</td>
                          <td className="py-2">
                            <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                              Required
                            </span>
                          </td>
                          <td className="py-2 text-gray-600">
                            The address to look up. Can be full or partial.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* GET Example */}
                <div>
                  <h4 className="mb-3 font-semibold text-gray-900">
                    GET Request
                  </h4>
                  <p className="mb-3 text-sm text-gray-600">
                    Pass the address as a query parameter. Perfect for that
                    &quot;I&apos;m too lazy to set up a POST request&quot;
                    energy.
                  </p>
                  <div className="rounded-lg bg-gray-900 p-4">
                    <pre className="text-sm text-gray-100 overflow-x-auto">
                      <code>{`GET /api/v1/lookup?address=1600+Pennsylvania+Ave+Washington+DC

Headers:
  X-API-Key: zd_your_api_key_here`}</code>
                    </pre>
                  </div>
                </div>

                {/* POST Example */}
                <div>
                  <h4 className="mb-3 font-semibold text-gray-900">
                    POST Request
                  </h4>
                  <p className="mb-3 text-sm text-gray-600">
                    For when you want to feel fancy and send a JSON body.
                  </p>
                  <div className="rounded-lg bg-gray-900 p-4">
                    <pre className="text-sm text-gray-100 overflow-x-auto">
                      <code>{`POST /api/v1/lookup

Headers:
  Content-Type: application/json
  X-API-Key: zd_your_api_key_here

Body:
{
  "address": "1600 Pennsylvania Ave, Washington DC"
}`}</code>
                    </pre>
                  </div>
                </div>

                {/* Success Response */}
                <div>
                  <h4 className="mb-3 font-semibold text-gray-900">
                    <span className="mr-2 inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                      200
                    </span>
                    Success Response
                  </h4>
                  <div className="rounded-lg bg-gray-900 p-4">
                    <pre className="text-sm text-gray-100 overflow-x-auto">
                      <code>{`{
  "success": true,
  "data": {
    "postalCode": "20500",
    "street": "1600 Pennsylvania Avenue NW",
    "city": "Washington",
    "state": "DC",
    "country": "United States",
    "countryCode": "US",
    "formattedAddress": "1600 Pennsylvania Avenue NW, Washington, DC 20500, USA",
    "coordinates": {
      "latitude": 38.8977,
      "longitude": -77.0365
    }
  }
}`}</code>
                    </pre>
                  </div>
                  <p className="mt-3 text-sm text-gray-500">
                    Fun fact: That&apos;s the White House. The API works for
                    famous addresses too.
                  </p>
                </div>

                {/* Error Responses */}
                <div>
                  <h4 className="mb-3 font-semibold text-gray-900">
                    Error Responses
                  </h4>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-gray-200 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                          401
                        </span>
                        <span className="font-medium text-gray-900">
                          Unauthorized
                        </span>
                      </div>
                      <code className="text-sm text-gray-600">{`{ "error": "Missing API key" }`}</code>
                      <p className="mt-2 text-sm text-gray-500">
                        You forgot the bouncer password (API key).
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                          404
                        </span>
                        <span className="font-medium text-gray-900">
                          Not Found
                        </span>
                      </div>
                      <code className="text-sm text-gray-600">{`{ "error": "Address not found" }`}</code>
                      <p className="mt-2 text-sm text-gray-500">
                        Even we can&apos;t find &quot;123 Fake Street,
                        Narnia&quot;.
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                          400
                        </span>
                        <span className="font-medium text-gray-900">
                          Bad Request
                        </span>
                      </div>
                      <code className="text-sm text-gray-600">{`{ "error": "Address is required" }`}</code>
                      <p className="mt-2 text-sm text-gray-500">
                        You sent us nothing. We need *something* to work with
                        here.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Code Examples */}
          <section id="examples" className="mb-16 scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#61EB76]/10">
                <Terminal className="h-5 w-5 text-[#40800C]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Code Examples
              </h2>
            </div>
            <p className="mb-6 text-gray-600">
              Copy-paste ready code. Because life&apos;s too short to write
              boilerplate.
            </p>

            <div className="space-y-6">
              {/* JavaScript/Fetch */}
              <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                  <span className="font-semibold text-gray-900">
                    JavaScript (Fetch)
                  </span>
                </div>
                <div className="bg-gray-900 p-4">
                  <pre className="text-sm text-gray-100 overflow-x-auto">
                    <code>{`const response = await fetch('/api/v1/lookup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'zd_your_api_key_here'
  },
  body: JSON.stringify({
    address: '350 Fifth Avenue, New York, NY'
  })
});

const data = await response.json();
console.log(data.data.postalCode); // "10118" (Empire State Building!)
`}</code>
                  </pre>
                </div>
              </div>

              {/* cURL */}
              <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                  <span className="font-semibold text-gray-900">cURL</span>
                </div>
                <div className="bg-gray-900 p-4">
                  <pre className="text-sm text-gray-100 overflow-x-auto">
                    <code>{`curl -X POST https://your-domain.com/api/v1/lookup \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: zd_your_api_key_here" \\
  -d '{"address": "350 Fifth Avenue, New York, NY"}'`}</code>
                  </pre>
                </div>
              </div>

              {/* Python */}
              <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                  <span className="font-semibold text-gray-900">
                    Python (requests)
                  </span>
                </div>
                <div className="bg-gray-900 p-4">
                  <pre className="text-sm text-gray-100 overflow-x-auto">
                    <code>{`import requests

response = requests.post(
    'https://your-domain.com/api/v1/lookup',
    headers={
        'Content-Type': 'application/json',
        'X-API-Key': 'zd_your_api_key_here'
    },
    json={'address': '350 Fifth Avenue, New York, NY'}
)

data = response.json()
print(data['data']['postalCode'])  # "10118"`}</code>
                  </pre>
                </div>
              </div>

              {/* React Hook */}
              <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                  <span className="font-semibold text-gray-900">
                    React Hook (for the cool kids)
                  </span>
                </div>
                <div className="bg-gray-900 p-4">
                  <pre className="text-sm text-gray-100 overflow-x-auto">
                    <code>{`import { useState } from 'react';

function usePostalLookup() {
  const [loading, setLoading] = useState(false);
  
  const lookup = async (address: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_ZIPDROP_KEY!
        },
        body: JSON.stringify({ address })
      });
      return await res.json();
    } finally {
      setLoading(false);
    }
  };
  
  return { lookup, loading };
}

// Usage:
const { lookup, loading } = usePostalLookup();
const result = await lookup('123 Main St');`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Rate Limits */}
          <section className="mb-16">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#61EB76]/10">
                <Clock className="h-5 w-5 text-[#40800C]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Rate Limits & Usage
              </h2>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="mb-4 text-gray-600">
                We track how many requests each API key makes. Not because
                we&apos;re nosy, but because it helps you know if someone&apos;s
                borrowing your key without asking.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 shrink-0 text-[#40800C]" />
                  <span>Request counts visible in your dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 shrink-0 text-[#40800C]" />
                  <span>Last used timestamp for each key</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 shrink-0 text-[#40800C]" />
                  <span>Up to 5 API keys per account</span>
                </li>
              </ul>
            </div>
          </section>

          {/* CORS */}
          <section className="mb-16">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#61EB76]/10">
                <Globe className="h-5 w-5 text-[#40800C]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">CORS Support</h2>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="text-gray-600">
                Good news! The API has CORS enabled, meaning you can call it
                directly from your frontend JavaScript. No need for a backend
                proxy or weird workarounds. We believe in making
                developers&apos; lives easier, not harder.
              </p>
              <div className="flex gap-3 mt-4 rounded-lg bg-[#61EB76]/10 border border-[#61EB76]/30 p-4">
                <Zap className="h-5 w-5 shrink-0 text-[#40800C]" />
                <p className="text-sm text-[#40800C]">
                  <strong>TL;DR:</strong> Yes, it works from the browser. Yes,
                  it works from localhost. You&apos;re welcome.
                </p>
              </div>
            </div>
          </section>

          {/* Need Help */}
          <section className="mb-16">
            <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <HelpCircle className="h-7 w-7 text-gray-500" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-gray-900">
                Still Confused?
              </h2>
              <p className="mb-4 text-gray-600">
                That&apos;s okay. We&apos;ve all been there. Check out the FAQ
                or just start playing with the API — sometimes the best
                documentation is trial and error.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/navigation/faq"
                  className="rounded-full bg-[#61EB76] px-6 py-2.5 font-semibold text-[#40800C] hover:bg-[#61EB76]/90">
                  Read the FAQ
                </Link>
                <Link
                  href="/dashboard/api-keys"
                  className="rounded-full border-2 border-gray-300 bg-white px-6 py-2.5 font-semibold text-gray-700 hover:border-gray-400">
                  Get an API Key
                </Link>
              </div>
            </div>
          </section>

          {/* Sign up / Login notice */}
          <p className="mb-16 text-center text-gray-600">
            To get your API keys, you&apos;ll need to{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#40800C] hover:underline">
              sign up
            </Link>{" "}
            or{" "}
            <Link
              href="/login"
              className="font-semibold text-[#40800C] hover:underline">
              log in
            </Link>{" "}
            to your account.
          </p>

          {/* Footer */}
          <footer className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
            <p>
              Made with care by{" "}
              <span className="font-medium text-gray-700">hendo</span>
            </p>
            <p className="mt-2">
              If this API made your day better, consider giving the repo a star
            </p>
            <a
              href="https://github.com/Hendo10X/zipdrop"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50">
              <Star className="h-4 w-4" />
              Star on GitHub
            </a>
          </footer>
        </div>
      </main>
    </div>
  );
}
