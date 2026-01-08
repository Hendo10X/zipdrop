"use client";

import { useEffect, useState } from "react";
import { Key, Plus, Trash2, Copy, Check, Eye, EyeOff, Code, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  key?: string; // Only present when newly created
  requestCount: number;
  lastUsedAt: string | null;
  createdAt: string;
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const response = await fetch("/api/user/api-keys");
      if (response.ok) {
        const data = await response.json();
        setApiKeys(data.keys);
      }
    } catch (error) {
      console.error("Failed to fetch API keys:", error);
      toast.error("Failed to load API keys");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a name for the API key");
      return;
    }

    setIsCreating(true);
    try {
      const response = await fetch("/api/user/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to create API key");
        return;
      }

      setNewlyCreatedKey(data.apiKey.key);
      setApiKeys((prev) => [...prev, data.apiKey]);
      setNewKeyName("");
      setShowCreateForm(false);
      toast.success("API key created! Copy it now - it won't be shown again.");
    } catch (error) {
      toast.error("Failed to create API key");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this API key? This cannot be undone.")) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/user/api-keys/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setApiKeys((prev) => prev.filter((key) => key.id !== id));
        toast.success("API key deleted");
      } else {
        toast.error("Failed to delete API key");
      }
    } catch (error) {
      toast.error("Failed to delete API key");
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#40800C]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F3F3] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">API Keys</h1>
          <p className="mt-2 text-gray-600">
            Manage API keys for integrating postal code lookup into your applications
          </p>
        </div>

        {/* Quick Start Guide */}
        <div className="mb-6 rounded-lg border border-[#61EB76]/30 bg-[#61EB76]/5 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-[#61EB76]/20 p-2">
              <Code className="h-5 w-5 text-[#40800C]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Quick Start</h3>
              <p className="mt-1 text-sm text-gray-600">
                Use your API key to lookup postal codes from any address:
              </p>
              <div className="mt-3 overflow-x-auto rounded-lg bg-gray-900 p-4">
                <pre className="text-sm text-gray-100">
                  <code>{`curl -X GET "https://yourdomain.com/api/v1/lookup?address=123 Main St" \\
  -H "X-API-Key: your_api_key"`}</code>
                </pre>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Or use POST with JSON body:
              </p>
              <div className="mt-2 overflow-x-auto rounded-lg bg-gray-900 p-4">
                <pre className="text-sm text-gray-100">
                  <code>{`fetch('/api/v1/lookup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your_api_key'
  },
  body: JSON.stringify({ address: '123 Main St, New York' })
})`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Newly Created Key Alert */}
        {newlyCreatedKey && (
          <div className="mb-6 rounded-lg border-2 border-amber-300 bg-amber-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900">
                  🔑 Save your API key now!
                </h3>
                <p className="mt-1 text-sm text-amber-800">
                  This is the only time you&apos;ll see the full key. Copy and store it securely.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <code className="flex-1 rounded bg-white px-3 py-2 font-mono text-sm text-gray-900 border border-amber-200">
                    {newlyCreatedKey}
                  </code>
                  <button
                    onClick={() => handleCopy(newlyCreatedKey, "new")}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-200 text-amber-800 hover:bg-amber-300"
                  >
                    {copiedId === "new" ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
              <button
                onClick={() => setNewlyCreatedKey(null)}
                className="text-amber-600 hover:text-amber-800"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Create New Key */}
        <div className="mb-6">
          {showCreateForm ? (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="mb-3 font-semibold text-gray-900">Create New API Key</h3>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="Key name (e.g., Production, Development)"
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#40800C] focus:outline-none focus:ring-2 focus:ring-[#40800C]/20"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCreate}
                    disabled={isCreating}
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#61EB76] px-4 py-2.5 font-semibold text-[#40800C] hover:bg-[#61EB76]/90 disabled:opacity-50"
                  >
                    {isCreating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Plus size={18} />
                    )}
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewKeyName("");
                    }}
                    className="rounded-lg border border-gray-200 px-4 py-2.5 font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowCreateForm(true)}
              disabled={apiKeys.length >= 5}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-white py-4 font-semibold text-gray-600 transition-colors hover:border-[#40800C] hover:text-[#40800C] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={20} />
              Create New API Key
              {apiKeys.length >= 5 && (
                <span className="text-sm font-normal">(Max 5 keys)</span>
              )}
            </button>
          )}
        </div>

        {/* API Keys List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Your API Keys ({apiKeys.length}/5)
          </h2>

          {apiKeys.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Key className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">No API keys yet</h3>
              <p className="text-sm text-gray-500">
                Create your first API key to start integrating postal code lookup
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {apiKeys.map((key) => (
                <div
                  key={key.id}
                  className="rounded-lg border border-gray-200 bg-white p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#61EB76]/10">
                        <Key className="h-5 w-5 text-[#40800C]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{key.name}</h3>
                        <div className="flex items-center gap-2">
                          <code className="text-sm text-gray-500 font-mono">
                            {key.keyPrefix}
                          </code>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(key.id)}
                        disabled={deletingId === key.id}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        title="Delete API key"
                      >
                        {deletingId === key.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 border-t border-gray-100 pt-3">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {(key.requestCount ?? 0).toLocaleString()} requests
                    </span>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      Created {new Date(key.createdAt).toLocaleDateString()}
                    </span>
                    {key.lastUsedAt && (
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                        Last used {new Date(key.lastUsedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* API Response Format */}
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Response Format</h2>
          <div className="overflow-x-auto rounded-lg bg-gray-900 p-4">
            <pre className="text-sm text-gray-100">
              <code>{`{
  "success": true,
  "data": {
    "postalCode": "10001",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "country": "United States",
    "countryCode": "US",
    "formattedAddress": "123 Main St, New York, NY 10001, USA",
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.006
    }
  }
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

