"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import offlineAnimation from "@/public/animations/no-internet.json";

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gray-900 text-white text-center">
      {/* Animation */}
      <Player
        autoplay
        loop
        src={offlineAnimation}
        style={{ height: "280px", width: "280px" }}
      />

      {/* Heading */}
      <h1 className="text-3xl font-bold mt-6">You're Currently Offline</h1>

      {/* Description */}
      <p className="text-gray-300 max-w-xl mt-4">
        It seems your device has lost internet connectivity. You won’t be able
        to access or update any live content until you're back online.
      </p>

      {/* Checklist */}
      <ul className="text-sm text-gray-400 mt-6 list-disc list-inside space-y-1 text-left max-w-sm">
        <li>Check your Wi-Fi or mobile data connection.</li>
        <li>Ensure airplane mode is turned off.</li>
        <li>Reconnect to the internet.</li>
        <li>Kindly refresh the page manually.</li>
      </ul>

      {/* Support Note */}
      <p className="text-xs text-gray-500 mt-6">
        Still having trouble? Contact IT support or try again later.
      </p>
    </div>
  );
}
