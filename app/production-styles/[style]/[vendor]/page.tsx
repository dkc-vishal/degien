"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { MdLockOutline } from "react-icons/md";
import { use } from "react";
import FolderCard from "@/components/core/FolderCard";

interface FolderCard {
  id: number;
  title: string;
  files: string[];
}

const convertKebabToTitle = (kebab: string) =>
  kebab
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

// const getInitialFolders = (): FolderCard[] => [
//   {
//     id: 1,
//     title: "Sampling",
//     files: ["Sampling Watchpoint"],
//   },
//   {
//     id: 2,
//     title: "Master-110",
//     files: ["110"],
//   },
//   {
//     id: 3,
//     title: "Tech Graded Spec",
//     files: ["Tech Spec View", "Graded Spec", "Print"],
//   },
//   {
//     id: 4,
//     title: "Fit/PP/Top/Web",
//     files: ["Fit", "PP", "Top", "Web"],
//   },
//   {
//     id: 5,
//     title: "QA Audit Forms",
//     files: ["Mid", "Initial", "Initial Follow Up", "Final"],
//   },
//   {
//     id: 6,
//     title: "QA Audit Analysis",
//     files: ["Callouts", "QA Audit Form", "Inspection Point Print"],
//   },
// ];

const getInitialFolders = (vendor: string): FolderCard[] => {
  const normalizedVendor = vendor.toLowerCase();

  if (normalizedVendor === "master") {
    return [
      { id: 1, title: "1. Sampling Watchpoint", files: ["demo"], disabled: true },
      { id: 2, title: "2. Tech Graded Specs", files: ["demo"] },
      { id: 3, title: "3. Production Watchpoint", files: ["demo"] },
    ];
  }

  return [
    { id: 1, title: "Sampling", files: ["Sampling Watchpoint"] },
    { id: 2, title: "Master-110", files: ["110"] },
    { id: 3, title: "Tech Graded Spec", files: ["Tech Spec View", "Graded Spec", "Print"] },
    { id: 4, title: "Fit/PP/Top/Web", files: ["Fit", "PP", "Top", "Web"] },
    { id: 5, title: "QA Audit Forms", files: ["Mid", "Initial", "Initial Follow Up", "Final"] },
    { id: 6, title: "QA Audit Analysis", files: ["Callouts", "QA Audit Form", "Inspection Point Print"] },
  ];
};

const StyleDashboardPage = ({ params }: { params: { style: string; vendor: string } }) => {
  const router = useRouter();
  const { style, vendor } = use(params);

  const styleName = convertKebabToTitle(style);
  const vendorName = convertKebabToTitle(vendor);

  const [folders, setFolders] = useState<FolderCard[]>([]);

  useEffect(() => {
    setFolders(getInitialFolders(vendorName));
  }, [vendorName]);

  const handleFolderClick = (folder: FolderCard) => {
    const folderSlug = folder.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/\//g, "-")
      .replace(/[^\w-]+/g, "");
    router.push(`/production-styles/${style}/${vendor}/${folderSlug}`);
  };

  return (
    <div className="min-h-screen min-w-full flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 mb-6">
        <h2 className="text-xl font-bold text-gray-700">
          Production Styles / {styleName} / {vendorName}
        </h2>
      </div>

      {/* Folder Grid Layout */}
      <main className="p-6 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {folders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => handleFolderClick(folder)}
              className={`relative rounded-xl border shadow-sm transition-all duration-200 p-4 h-[250px] cursor-pointer
              ${folder.files.length > 0 ? "bg-white hover:border-blue-400 hover:shadow-md" : "bg-red-50 border-red-200"}`}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800 text-md truncate">
                  {folder.title}
                </h3>
                {folder.disabled && (
                  <div className="absolute top-4 right-2 flex items-center gap-1 text-xs bg-red-500 text-white px-2 py-1 rounded-md shadow-sm font-semibold">
                    <MdLockOutline className="w-4 h-4" /> Read-Only
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center justify-center h-full -translate-y-4 flex-1">
                {folder.files.length > 0 ? (
                  folder.files.length === 1 ? (
                    <div className="flex items-center justify-center h-full">
                      <img
                        src="/spreadsheet_icon.png"
                        alt="file"
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                  ) : folder.files.length === 2 ? (
                    <div className="flex items-center justify-center h-full gap-6">
                      {folder.files.slice(0, 2).map((_, idx) => (
                        <img
                          key={idx}
                          src="/spreadsheet_icon.png"
                          alt="file"
                          className="w-16 h-16 object-contain"
                        />
                      ))}
                    </div>
                  ) : folder.files.length === 3 ? (
                    <div className="grid grid-cols-2 gap-4">
                      <img src="/spreadsheet_icon.png" className="w-14 h-14 object-contain" />
                      <img src="/spreadsheet_icon.png" className="w-14 h-14 object-contain" />
                      <div className="col-span-2 flex justify-center">
                        <img src="/spreadsheet_icon.png" className="w-16 h-16 object-contain" />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-5">
                      {folder.files.slice(0, 4).map((_, idx) => (
                        <img
                          key={idx}
                          src="/spreadsheet_icon.png"
                          alt="file"
                          className="w-14 h-14 object-contain"
                        />
                      ))}
                    </div>
                  )
                ) : (
                  <span className="text-red-500 italic text-2xl font-semibold">Empty</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StyleDashboardPage;
