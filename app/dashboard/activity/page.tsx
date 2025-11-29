"use client";

import { useEffect, useState } from "react";
import { Clock, Activity, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ActivityItem {
  id: string;
  action: string;
  details: string | null;
  metadata: string | null;
  createdAt: string;
}

export default function ActivityPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activity");

        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }

        const data = await response.json();
        setActivities(data.activities);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
        toast.error("Failed to load activity log");
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMins < 1) return "Just now";
    if (diffInMins < 60) return `${diffInMins} minute${diffInMins > 1 ? "s" : ""} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getActionIcon = (action: string) => {
    const iconClass = "text-[#40800C]";
    const iconSize = 16;

    switch (action) {
      case "address_saved":
        return <Activity className={iconClass} size={iconSize} />;
      case "address_deleted":
        return <Activity className={iconClass} size={iconSize} />;
      case "address_updated":
        return <Activity className={iconClass} size={iconSize} />;
      default:
        return <Activity className={iconClass} size={iconSize} />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "address_saved":
        return "bg-green-100 text-green-800";
      case "address_deleted":
        return "bg-red-100 text-red-800";
      case "address_updated":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#40800C]" size={40} />
        <p className="mt-4 text-gray-500">Loading activity...</p>
      </div>
    );
  }

  return (
    <div className=" px-6 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Activity Log</h1>
          <p className="mt-2 text-gray-600">
            Track all your address-related activities
          </p>
        </div>

        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 bg-white py-12">
            <div className="rounded bg-gray-100 p-4">
              <Clock className="text-gray-400" size={40} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No activity yet
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Your activity history will appear here as you use the app.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="rounded border border-gray-200 bg-white p-4  transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#61EB76]/10 p-2">
                    {getActionIcon(activity.action)}
                  </div>

                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <span
                          className={`inline-block rounded px-2 py-1 text-xs font-semibold ${getActionColor(
                            activity.action
                          )}`}
                        >
                          {activity.action.replace(/_/g, " ").toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(activity.createdAt)}
                      </span>
                    </div>

                    {activity.details && (
                      <p className="text-sm text-gray-700">{activity.details}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}