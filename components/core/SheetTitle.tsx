"use client";
import React from "react";

interface SheetTitleProps {
  title: string;
  version: string;
  versionDate?: string;
}
const SheetTitle = ({ title, version, versionDate }: SheetTitleProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-600">version - {version}</p>
      {versionDate && (
        <p className="text-sm text-gray-600">version Date - {versionDate}</p>
      )}
    </div>
  );
};
export default SheetTitle;
