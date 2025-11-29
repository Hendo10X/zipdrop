"use client";

import { useEffect, useState } from "react";
import { User, Bell, Shield, Globe, LogOut, Trash2 } from "lucide-react";
import { getUserClient as getUser } from "@/lib/user-client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type UserData = {
  name: string;
  email: string;
};

export default function SettingsPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [defaultCountry, setDefaultCountry] = useState("US");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSavePreferences = () => {
    toast.success("Preferences saved successfully");
  };

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
        <p className="text-gray-500">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className=" px-6 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your account preferences and settings
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded border border-gray-200 bg-white p-6 ">
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

          <div className="rounded border border-gray-200 bg-white p-6 ">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-[#61EB76]/10 p-2">
                <Bell className="text-[#40800C]" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-500">
                    Receive email updates about your saved addresses
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded bg-gray-200 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#61EB76] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#40800C]/20"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="rounded border border-gray-200 bg-white p-6 ">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-[#61EB76]/10 p-2">
                <Globe className="text-[#40800C]" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Preferences
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Default Country
                </label>
                <select
                  value={defaultCountry}
                  onChange={(e) => setDefaultCountry(e.target.value)}
                  className="mt-1 w-full rounded border border-gray-300 bg-white px-4 py-2 focus:border-[#40800C] focus:outline-none focus:ring-2 focus:ring-[#40800C]/20">
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded border border-gray-200 bg-white p-6 ">
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

          <div className="flex justify-end gap-3">
            <button
              onClick={handleSavePreferences}
              className="rounded-full bg-[#61EB76] px-6 py-3 font-semibold text-[#40800C] transition-all duration-200 hover:bg-[#61EB76]/90">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
