
// not implementing currently 

"use client";

import React from "react";
import { MdLockOutline } from "react-icons/md";

interface FileOrFolder {
  type: "file" | "folder";
  name?: string;
  title?: string;
  files?: FileOrFolder[];
}

interface FolderCardProps {
  title: string;
  files: FileOrFolder[];
  onClick: () => void;
  disabled?: boolean;
}

const FolderCard: React.FC<FolderCardProps> = ({ title, files, onClick, disabled }) => {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl border shadow-sm transition-all duration-200 p-4 h-[250px] cursor-pointer
      ${files.length > 0 ? "bg-white hover:border-blue-400 hover:shadow-md" : "bg-red-50 border-red-200"}`}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800 text-md truncate">
          {title}
        </h3>
        {disabled && (
          <div className="absolute top-4 right-2 flex items-center gap-1 text-xs bg-red-500 text-white px-2 py-1 rounded-md shadow-sm font-semibold">
            <MdLockOutline className="w-4 h-4" /> Read-Only
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center h-full -translate-y-4 flex-1">
        {files.length === 0 ? (
          <span className="text-red-500 italic text-2xl font-semibold">Empty</span>
        ) : files.length === 1 ? (
          <img src="/spreadsheet_icon.png" alt="file" className="w-20 h-20 object-contain" />
        ) : files.length === 2 ? (
          <div className="flex items-center justify-center h-full gap-6">
            {files.slice(0, 2).map((_, idx) => (
              <img
                key={idx}
                src="/spreadsheet_icon.png"
                alt="file"
                className="w-16 h-16 object-contain"
              />
            ))}
          </div>
        ) : files.length === 3 ? (
          <div className="grid grid-cols-2 gap-4">
            <img src="/spreadsheet_icon.png" className="w-14 h-14 object-contain" />
            <img src="/spreadsheet_icon.png" className="w-14 h-14 object-contain" />
            <div className="col-span-2 flex justify-center">
              <img src="/spreadsheet_icon.png" className="w-16 h-16 object-contain" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5">
            {files.slice(0, 4).map((_, idx) => (
              <img
                key={idx}
                src="/spreadsheet_icon.png"
                alt="file"
                className="w-14 h-14 object-contain"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderCard;
