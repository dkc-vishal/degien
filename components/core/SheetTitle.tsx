"use client";
import React from "react";
import Link from "next/link";
import { FaPrint } from "react-icons/fa";
interface SheetTitleProps {
  title: string;
  version: string;
  versionDate?: string;
  printpage?: string;
}
const SheetTitle = ({ title, version, versionDate, printpage }: SheetTitleProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="uppercase text-[30px] text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-600">version - {version}</p>
      {versionDate && (
        <p className="text-sm text-gray-600">version Date - {versionDate}</p>
      )}
      {printpage && (
        <Link
        href={printpage}
        className="flex items-center gap-1  font-medium px-4 py-1 rounded-xl shadow-md transition duration-200"
      >
        <FaPrint />
      </Link>
      )}
    </div>
  );
};
export default SheetTitle;
