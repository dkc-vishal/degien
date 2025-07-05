"use client";

import React from "react";
import { useParams } from "next/navigation";
import FileCard from "@/components/core/FileCard"; 
import PageHeader from "@/components/core/PageHeader";

const folders = [
  { title: "Sampling", files: ["Sampling Watchpoint"] },
  { title: "Master-110", files: ["110"] },
  { title: "Tech Graded Spec", files: ["Tech Spec View", "Graded Spec", "Print"] },
  { title: "Fit/PP/Top/Web", files: ["Fit", "PP", "Top", "Web"] },
  { title: "QA Audit Forms", files: ["Mid", "Initial", "Initial Follow Up", "Final"] },
  { title: "QA Audit Analysis", files: ["Callouts", "QA Audit Form", "Inspection Point Print"] },
  { title: "Testing", files: ["testing 1", "testing 2"] },
];

const FileViewPage: React.FC = () => {
  const { styleName, folderName } = useParams();

  const displayStyle = (styleName as string)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const matchingFolder = folders.find(
    (folder) =>
      folder.title.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-") === folderName
  );

  const displayFolderTitle = matchingFolder?.title || folderName;

  return (
    <div className="w-full px-6 py-8">
      
      <PageHeader breadcrumb={`Sampling Styles / ${displayStyle} / ${displayFolderTitle}`} />

      {matchingFolder?.files.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {matchingFolder.files.map((file, idx) => (
            <FileCard key={idx} name={file} />
          ))}
        </div>
      ) : (
        <p className="italic text-red-500 text-lg font-medium">No files found.</p>
      )}
    </div>
  );
};

export default FileViewPage;
