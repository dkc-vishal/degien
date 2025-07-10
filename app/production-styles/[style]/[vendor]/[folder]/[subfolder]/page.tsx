"use client";

import React from "react";
import { useParams } from "next/navigation";
import FileCard from "@/components/core/FileCard";
import { folders } from "@/components/core/FolderData";

const SubFolderPage = () => {
  const {
    style,
    vendor,
    folder,
    subfolder,
  }: { style: string; vendor: string; folder: string; subfolder: string } =
    useParams();

  const displayTitle = (text: string | string[]) =>
    (text as string)
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");

  const displayPath = `Production Styles / ${displayTitle(
    style
  )} / ${displayTitle(vendor)} / ${displayTitle(folder)} / ${displayTitle(
    subfolder
  )}`;

  // Find the folder
  const matchingFolder = folders.find(
    (f) =>
      f.title.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-") === folder
  );

  // Find the subfolder inside that folder
  const matchingSubfolder =
    matchingFolder?.files.find(
      (sf) =>
        sf.type === "folder" &&
        sf.title.toLowerCase().replace(/\s+/g, "-") === subfolder
    ) || null;

  return (
    <div className="w-full px-6 py-8">
      <h2 className="text-xl font-bold text-gray-700 mb-10 ml-10 mt-4">
        {displayPath}
      </h2>

      {matchingSubfolder && matchingSubfolder.type === "folder" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6 ml-6">
          {matchingSubfolder.files.map((file: any, idx: any) => (
            <FileCard key={idx} name={file.name} />
          ))}
        </div>
      ) : (
        <p className="text-red-500 italic">No files found in this folder.</p>
      )}
    </div>
  );
};

export default SubFolderPage;
