"use client";

import React from "react";

interface FileCardProps {
  name: string;
}

const FileCard: React.FC<FileCardProps> = ({ name }) => {
  return (
    <div className="group cursor-pointer flex flex-col items-center justify-center w-[220px] h-[240px] transition-transform duration-200 hover:scale-105 p-4 rounded-md">
      <img
        src="/spreadsheet_icon.png"
        alt={name}
        className="w-[150px] h-[150px] object-contain"
      />
      <div className="mt-3 text-center text-gray-800 font-bold text-sm truncate group-hover:text-blue-500 w-full px-2 py-2 break-words whitespace-normal leading-tight">
        {name}
      </div>
    </div>
  );
};

export default FileCard;
