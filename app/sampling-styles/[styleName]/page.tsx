"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Folder } from "lucide-react";

const folders = [
  "Sampling Watchpoint",
  "Master-110",
  "Tech Graded Spec",
  "Fit/PP/Top/Web",
  "QA Audit forms",
  "QA Audit Analysis",
];

const SamplingStyleDetailPage: React.FC = () => {
  const { styleName } = useParams();

  return (
    <div className="w-full px-6 py-8">
      {/* Header */}
      <div className="mb-6 border-b pb-4 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 capitalize">
          {decodeURIComponent(styleName as string)}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Sampling Style Details
        </p>
      </div>

      {/* Folder Structure */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {folders.map((folder, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:border-blue-400 hover:shadow-md transition cursor-pointer"
          >
            <Folder className="text-blue-500 w-6 h-6" />
            <span className="text-gray-800 font-medium">{folder}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SamplingStyleDetailPage;
