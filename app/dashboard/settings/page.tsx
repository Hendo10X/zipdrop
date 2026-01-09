"use client";

import { useEffect, useState, useCallback } from "react";
import { User, Bell, Shield, Globe, LogOut, Trash2, Check, Loader2 } from "lucide-react";
import { CountrySelect } from "@/components/CountrySelect";
import { getUserClient as getUser } from "@/lib/user-client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type UserData = {
  name: string;
  email: string;
};

type Preferences = {
  emailNotifications: boolean;
  defaultCountry: string;
};

export default function SettingsPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [preferences, setPreferences] = useState<Preferences>({
    emailNotifications: true,
    defaultCountry: "US",
  });
  const [savingField, setSavingField] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, prefsResponse] = await Promise.all([
          getUser(),
          fetch("/api/user/preferences"),
        ]);

        if (userData) {
          setUser(userData);
        }

        if (prefsResponse.ok) {
          const prefsData = await prefsResponse.json();
          setPreferences(prefsData.preferences);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const updatePreference = useCallback(
    async (key: keyof Preferences, value: boolean | string) => {
      setSavingField(key);
      const previousValue = preferences[key];

      // Optimistically update
      setPreferences((prev) => ({ ...prev, [key]: value }));

      try {
        const response = await fetch("/api/user/preferences", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [key]: value }),
        });

        if (!response.ok) {
          // Revert on error
          setPreferences((prev) => ({ ...prev, [key]: previousValue }));
          const data = await response.json();
          toast.error(data.error || "Failed to save preference");
        }
      } catch (error) {
        // Revert on error
        setPreferences((prev) => ({ ...prev, [key]: previousValue }));
        toast.error("Failed to save preference");
      } finally {
        setSavingField(null);
      }
    },
    [preferences]
  );

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authClient.signOut();
      router.push("/");
      router.refresh();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeletingAccount(true);

      const response = await fetch("/api/user/delete", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      await authClient.signOut();
      router.push("/");
      router.refresh();
      toast.success("Account deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete account");
      setIsDeletingAccount(false);
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
      <div className="mx-auto w-full max-w-3xl sm:max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your account preferences and settings
          </p>
        </div>

        <div className="space-y-6">
          {/* Account Information */}
          <div className="rounded border border-gray-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-[#61EB76]/10 p-2">
                <User className="text-[#40800C]" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Account Information
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <p className="mt-1 text-gray-900">{user?.name || "N/A"}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="mt-1 text-gray-900">{user?.email || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded border border-gray-200 bg-white p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-[#61EB76]/10 p-2">
                <Bell className="text-[#40800C]" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              {/* Email Notifications Toggle */}
              <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4 transition-colors hover:bg-gray-50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">
                    Email Notifications
                  </p>
                    <p className="mt-1 text-sm text-gray-500">
                    Receive email updates about your saved addresses
                  </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {savingField === "emailNotifications" && (
                      <Loader2 className="h-4 w-4 animate-spin text-[#40800C]" />
                    )}
                    <button
                      onClick={() =>
                        updatePreference(
                          "emailNotifications",
                          !preferences.emailNotifications
                        )
                      }
                      disabled={savingField === "emailNotifications"}
                      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#40800C]/20 focus:ring-offset-2 ${
                        preferences.emailNotifications
                          ? "bg-[#61EB76]"
                          : "bg-gray-300"
                      }`}
                      aria-label="Toggle email notifications"
                    >
                      <span
                        className={`absolute left-0.5 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200 ${
                          preferences.emailNotifications
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      >
                        {preferences.emailNotifications && (
                          <Check className="h-3 w-3 text-[#40800C]" />
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="rounded border border-gray-200 bg-white p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-[#61EB76]/10 p-2">
                <Globe className="text-[#40800C]" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Preferences
              </h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
                <div className="flex flex-col gap-3">
              <div>
                    <label className="font-medium text-gray-900">
                  Default Country
                </label>
                    <p className="mt-1 text-sm text-gray-500">
                      Set your preferred country for address verification
                    </p>
                  </div>
                  <div className="flex w-full items-center gap-2">
                    <CountrySelect
                      value={preferences.defaultCountry}
                      onChange={(value) => updatePreference("defaultCountry", value)}
                      disabled={savingField === "defaultCountry"}
                    />
                    {savingField === "defaultCountry" && (
                      <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#40800C]" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="rounded border border-gray-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-[#61EB76]/10 p-2">
                <Shield className="text-[#40800C]" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Security</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Account Actions
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center justify-center gap-2 rounded-full border-2 border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <LogOut size={18} />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center justify-center gap-2 rounded-full border-2 border-red-300 bg-white px-4 py-2 font-semibold text-red-600 transition-all duration-200 hover:border-red-400 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                    Delete Account
                  </button>
                </div>
              </div>

              {showDeleteConfirm && (
                <div className="rounded border-2 border-red-200 bg-red-50 p-4">
                  <h3 className="mb-2 font-semibold text-red-900">
                    Are you sure?
                  </h3>
                  <p className="mb-4 text-sm text-red-700">
                    This action cannot be undone. All your saved addresses and
                    activity will be permanently deleted.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleDeleteAccount}
                      disabled={isDeletingAccount}
                      className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isDeletingAccount
                        ? "Deleting..."
                        : "Yes, delete my account"}
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      disabled={isDeletingAccount}
                      className="rounded-full border-2 border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Auto-save indicator */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Check className="h-4 w-4" />
            <span>Changes are saved automatically</span>
          </div>
        </div>
      </div>
    </div>
  );
}
