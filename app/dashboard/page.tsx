"use client";

import { useEffect, useState } from "react";
import { MapPin, Activity, Loader2, ArrowRight } from "lucide-react";
import { getUserClient as getUser } from "@/lib/user-client";
import Link from "next/link";

type UserData = {
  name: string;
  email: string;
};

interface ActivityItem {
  id: string;
  action: string;
  details: string | null;
  createdAt: string;
}

interface SavedAddressType {
  id: string;
  label: string | null;
  formattedAddress: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedAddressCount, setSavedAddressCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>([]);
  const [recentAddresses, setRecentAddresses] = useState<SavedAddressType[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, addressesRes, activitiesRes] = await Promise.all([
          getUser(),
          fetch("/api/addresses/saved"),
          fetch("/api/activity"),
        ]);

        if (userData) {
          setUser(userData);
        }

        if (addressesRes.ok) {
          const addressesData = await addressesRes.json();
          setSavedAddressCount(addressesData.addresses.length);
          setRecentAddresses(addressesData.addresses.slice(0, 3));
        }

        if (activitiesRes.ok) {
          const activitiesData = await activitiesRes.json();
          setRecentActivities(activitiesData.activities.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMins < 1) return "Just now";
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin text-[#40800C]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F3F3] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mx-auto w-full max-w-4xl sm:max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name || "User"}
          </h1>
          <p className="mt-2 text-gray-600">
            Here&apos;s what&apos;s happening with your addresses
          </p>
        </div>

        <div className="mb-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded border border-gray-200 bg-white p-6 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Saved Addresses
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {savedAddressCount}
                </p>
              </div>
              <div className="rounded-full bg-[#61EB76]/10 p-3">
                <MapPin className="text-[#40800C]" size={24} />
              </div>
            </div>
            <Link
              href="/dashboard/saved"
              className="mt-4 flex items-center text-sm font-medium text-[#40800C] hover:underline">
              View all
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="rounded border border-gray-200 bg-white p-6 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Recent Activities
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {recentActivities.length}
                </p>
              </div>
              <div className="rounded-full bg-[#61EB76]/10 p-3">
                <Activity className="text-[#40800C]" size={24} />
              </div>
            </div>
            <Link
              href="/dashboard/activity"
              className="mt-4 flex items-center text-sm font-medium text-[#40800C] hover:underline">
              View all
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="rounded border border-gray-200 bg-white p-6  sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Quick Action
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Verify a new address
                </p>
              </div>
            </div>
            <Link
              href="/verify"
              className="mt-4 block rounded-full bg-[#61EB76] px-4 py-2 text-center text-sm font-semibold text-[#40800C] transition-all duration-200 hover:bg-[#61EB76]/90">
              Verify Address
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded border border-gray-200 bg-white p-6 ">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Recent Addresses
            </h2>

            {recentAddresses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <MapPin className="mb-2 text-gray-400" size={40} />
                <p className="text-sm text-gray-500">No addresses saved yet</p>
                <Link
                  href="/verify"
                  className="mt-2 text-sm font-medium text-[#40800C] hover:underline">
                  Verify your first address
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentAddresses.map((address) => (
                  <div
                    key={address.id}
                    className="flex items-start gap-3 rounded border border-gray-100 p-3 transition-all hover:border-gray-200 hover:bg-gray-50">
                    <div className="rounded-full bg-[#61EB76]/10 p-2">
                      <MapPin className="text-[#40800C]" size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {address.label || "Unlabeled"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {address.formattedAddress}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {formatDate(address.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
                <Link
                  href="/dashboard/saved"
                  className="mt-4 flex items-center justify-center text-sm font-medium text-[#40800C] hover:underline">
                  View all addresses
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            )}
          </div>

          <div className="rounded border border-gray-200 bg-white p-6 ">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>

            {recentActivities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Activity className="mb-2 text-gray-400" size={40} />
                <p className="text-sm text-gray-500">No activity yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 rounded border border-gray-100 p-3">
                    <div className="rounded-full bg-[#61EB76]/10 p-2">
                      <Activity className="text-[#40800C]" size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action.replace(/_/g, " ").toUpperCase()}
                      </p>
                      {activity.details && (
                        <p className="text-sm text-gray-600">
                          {activity.details}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-gray-400">
                        {formatDate(activity.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
                <Link
                  href="/dashboard/activity"
                  className="mt-4 flex items-center justify-center text-sm font-medium text-[#40800C] hover:underline">
                  View all activity
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
