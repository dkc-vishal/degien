"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Clock } from "lucide-react";

const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

const NotificationCard = ({ message, timestamp, type, styleId, onPreview }) => {
  const router = useRouter();

  const handleRedirect = () => {
    const toastId = toast.loading("Redirecting to style page...", {
      duration: 2000,
    });

    setTimeout(() => {
      toast.dismiss(toastId);
      router.push(
        type === "sampling"
          ? `/sampling-styles/${styleId}`
          : `/production-styles/${styleId}`
      );
    }, 1200);
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-md px-4 py-3 hover:shadow-md transition space-y-2">
      {/* Message and Button */}
      <div className="flex justify-between items-center gap-2">
        <p className="text-gray-800 text-sm flex-1">{message}</p>

        <button
          onClick={handleRedirect}
          className="flex items-center gap-1 px-4 py-1.5 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md transition cursor-pointer"
        >
          View Style
        </button>

        <button
          onClick={onPreview}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 border border-blue-500 hover:bg-blue-50 rounded-md transition cursor-pointer"
        >
          Preview
        </button>

      </div>

      {/* Timestamp aligned left */}
      <div className="flex justify-start items-center">
        <span className="flex items-center gap-1 bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full mt-1">
          <Clock className="w-3.5 h-3.5" />
          {formatDateTime(timestamp)}
        </span>
      </div>
    </div>
  );
};

export default NotificationCard;
