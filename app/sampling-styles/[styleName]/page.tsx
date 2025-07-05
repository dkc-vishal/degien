"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/core/PageHeader";

// Folder data
const folders = [
  {
    title: "Sampling",
    files: ["Sampling Watchpoint"],
  },
];

const SamplingStyleDetailPage: React.FC = () => {
  const { styleName } = useParams();
  const router = useRouter();

  const displayName = (styleName as string)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleFolderClick = (folder: { title: string; files: string[] }) => {
    const kebabFolder = folder.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/\//g, '-')
      .replace(/[^\w-]+/g, '');

    router.push(`/sampling-styles/${styleName}/${kebabFolder}`);
  };

  return (
    <div className="w-full px-6 py-8">

      <PageHeader breadcrumb={`Sampling Styles / ${displayName}`} />


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {folders.map((folder, index) => (
          <div
            key={index}
            onClick={() => handleFolderClick(folder)}
            className={`relative rounded-xl border shadow-sm transition-all duration-200 p-4 h-[250px] cursor-pointer
              ${folder.files.length > 0
                ? "bg-white hover:border-blue-400 hover:shadow-md"
                : "bg-red-50 border-red-200"
              }`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-800 text-md truncate">
                {folder.title}
              </h3>
            </div>

            <div className="flex flex-col items-center justify-center h-full -translate-y-4 flex-1">
              {folder.files.length > 0 ? (
                folder.files.length === 1 ? (
                  <div className="flex items-center justify-center h-full">
                    <img
                      src="/spreadsheet_icon.png"
                      alt="file"
                      className="w-26 h-26 object-contain"
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
                <span className="text-red-500 italic text-2xl font-semibold">
                  Empty
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SamplingStyleDetailPage;
