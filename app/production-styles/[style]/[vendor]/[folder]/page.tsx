"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import FileCard from "@/components/core/FileCard";
import FolderCard from "@/components/core/FolderCard";

const folders: FolderItem[] = [
  {
    type: "folder",
    title: "Sampling",
    files: [
      { type: "file", name: "Sampling Watchpoint" },
    ],
  },
  {
    type: "folder",
    title: "Master-110",
    files: [
      { type: "file", name: "110" },
      { type: "file", name: "Floor Tag" },
    ],
  },
  {
    type: "folder",
    title: "Tech Graded Spec",
    files: [
      { type: "file", name: "Tech Spec View" },
      { type: "file", name: "Graded Spec" },
      { type: "file", name: "Print" },
    ],
  },
  {
    type: "folder",
    title: "Fit/PP/Top/Web",
    files: [
      {
        type: "folder",
        title: "Fit",
        files: [
          { type: "file", name: "Fit 1" },
          { type: "file", name: "Fit 2" },
          { type: "file", name: "Fit 3" },
        ],
      },
      {
        type: "folder",
        title: "PP",
        files: [
          { type: "file", name: "PP 1" },
          { type: "file", name: "PP 2" },
          { type: "file", name: "PP 3" },
        ],
      },
      {
        type: "folder",
        title: "Top",
        files: [
          { type: "file", name: "Top 1" },
          { type: "file", name: "Top 2" },
          { type: "file", name: "Top 3" },
        ],
      },
      {
        type: "folder",
        title: "Web",
        files: [
          { type: "file", name: "Web 1" },
          { type: "file", name: "Web 2" },
          { type: "file", name: "Web 3" },
          { type: "file", name: "Web 4" },
          { type: "file", name: "Web 5" },
          { type: "file", name: "Web 6" },
          { type: "file", name: "Web 7" },
          { type: "file", name: "Web 8" },
          { type: "file", name: "Web 9" },
          { type: "file", name: "Web 10" },
          { type: "file", name: "Web 11" },
          { type: "file", name: "Web 12" },
        ],
      },
    ],
  },
  {
    type: "folder",
    title: "QA Audit Forms",
    files: [
      {
        type: "folder",
        title: "Mid",
        files: [
          { type: "file", name: "Mid 1" },
          { type: "file", name: "Mid 2" },
          { type: "file", name: "Mid 3" },
        ],
      },
      {
        type: "folder",
        title: "Final",
        files: [
          { type: "file", name: "Final 1" },
          { type: "file", name: "Final 2" },
          { type: "file", name: "Final 3" },
        ],
      },
      {
        type: "folder",
        title: "Initial",
        files: [
          { type: "file", name: "Initial" },
          { type: "file", name: "Initial Follow Up" },
        ],
      },
    ],
  },
  {
    type: "folder",
    title: "QA Audit Analysis",
    files: [
      { type: "file", name: "QA Spec Audit Form" },
      { type: "file", name: "QA Inspection Point Audit Form" },
    ],
  },
];

const FileViewPage: React.FC = () => {

  const { style, vendor, folder } = useParams();
  const router = useRouter();

  const displayStyle = (style as string)
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

  const displayVendor = (vendor as string)
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

  // 🔍 Get the folder from the data structure using kebab-case match
  const matchingFolder = folders.find((f) =>
    f.title.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-") === folder
  );

  const cleanedFolderTitle = (matchingFolder?.title || (folder as string)).replace(/\//g, " · ");

  const handleSubfolderClick = (subfolderTitle: string) => {
    const subfolderSlug = subfolderTitle.toLowerCase().replace(/\s+/g, "-");
    router.push(`/production-styles/${style}/${vendor}/${folder}/${subfolderSlug}`);
  };


  return (
    <div className="w-full px-6 py-8">
      {/* 📌 Breadcrumb */}
      <h2 className="text-xl font-bold text-gray-700 mb-10 ml-10 mt-4">
        Production Styles / {displayStyle} / {displayVendor} / {cleanedFolderTitle}
      </h2>

      {/* Files + Folders Grid */}

      {matchingFolder?.files.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6 ml-6">
          {matchingFolder.files.map((item, idx) => {
            if (item.type === "file") {

              //  Render normal file card

              return <FileCard key={idx} name={item.name} />;
            } else if (item.type === "folder") {

              //  Render nested folder using FolderCard component

              return (
                <FolderCard
                  key={idx}
                  title={item.title}
                  files={item.files}
                  onClick={() => {
                    handleSubfolderClick(item.title);
                  }}
                />
              );
            }
          })}
        </div>
      ) : (
        <p className="italic text-red-500 text-lg font-medium">No files found.</p>
      )}
    </div>
  );
};

export default FileViewPage;

