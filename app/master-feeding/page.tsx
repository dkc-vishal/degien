"use client";
import FolderCard from "@/components/core/FolderCard";

const masterCards = [
  { title: "1. Sampling", files: [], link: "/SamplingWatchPoint" },
  { title: "2. Tech Spec", files: ["Style 7"], link: "/tech-spec" },
  { title: "3. 110 Feeding", files: ["Style 1", "Style 2", "Style 3"], link: "/form-110" },
];

export default function MasterFeedingPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Master Feeding Sections</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {masterCards.map((card, index) => (
          <FolderCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
