"use client";
import React, { useState } from "react";
import { LayoutGrid, List } from "lucide-react";

interface FolderCard {
  id: number;
  title: string;
  files: string[];
  highlight?: boolean;
}

const initialFolders: FolderCard[] = [
  { id: 1, title: "1.Sampling", files: [] },
  {
    id: 2,
    title: "2.Master-110",
    files: ["Style 1", "Style 2", "Style 3"],
    highlight: true,
  },
  { id: 3, title: "3.Tech Graded Spec", files: ["Style 7"] },
  { id: 4, title: "4.FIT / PP / TOP / WEB Analysis", files: [] },
  { id: 5, title: "5.QA Audit Forms", files: ["Style 13", "Style 14"] },
  { id: 6, title: "6.QA Audit Analysis", files: [] },
];

// const navLinks = [
//   { name: "Dashboard", href: "#" },
//   { name: "Users", href: "/Layout/UserDetails" },
//   { name: "Register", href: "/Layout/Resistation" },
//   { name: "Login", href: "/Layout/Login" },
//   { name: "Change Password", href: "/Layout/ChangePassword" },
// ];

const FolderManagerPage: React.FC = () => {
  const [folders, setFolders] = useState<FolderCard[]>(initialFolders);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen min-w-full flex bg-gray-100">

      <div className="flex-1 flex flex-col">

        {/* Main Section */}

        <main className="p-6">
          {/* Title and Toggle */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Folders</h2>
            <button
              onClick={() =>
                setViewMode((prev) => (prev === "grid" ? "list" : "grid"))
              }
              className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700"
              title="Toggle View"
            >
              {viewMode === "grid" ? (
                <List className="w-5 h-5" />
              ) : (
                <LayoutGrid className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* View Mode Rendering */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className={`relative rounded-xl border shadow-sm hover:shadow-lg transition-all duration-200 p-4 h-[250px] ${folder.highlight
                    ? "border-yellow-400 bg-yellow-50"
                    : folder.files.length === 0
                      ? "border-red-300 bg-red-100"
                      : "border-gray-200 bg-white"
                    }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {folder.title}
                    </h3>
                  </div>
                  <div className="flex flex-col items-center justify-center h-full -translate-y-4">
                    {folder.files.length > 0 ? (
                      <div className="grid grid-cols-2 gap-7 relative">
                        {/* Top Row Images */}
                        <img src="/spreadsheet_icon.png" alt="spreadsheet" className="w-14 h-14 object-contain" />
                        <img src="/spreadsheet_icon.png" alt="spreadsheet" className="w-14 h-14 object-contain" />

                        {/* Spacer to align the third image to center */}
                        <div className="col-span-2 flex justify-center mt-[-12px]">
                          <img src="/spreadsheet_icon.png" alt="spreadsheet" className="w-16 h-16 object-contain" />
                        </div>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold italic text-gray-600">Empty</span>
                    )}
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-xl p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-700 border-separate border-spacing-y-2 border-spacing-x-2">
                  <thead className="bg-purple-100 text-purple-800 uppercase text-xs font-semibold">
                    <tr>
                      <th className="px-6 py-3 text-left">Folder Title</th>
                      <th className="px-6 py-3 text-left">Files</th>
                    </tr>
                  </thead>
                  <tbody>
                    {folders.map((folder, idx) => (
                      <tr
                        key={folder.id}
                        className={`transition ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-purple-50`}
                      >
                        <td className="px-6 py-3 font-medium text-gray-800 rounded-l-lg">
                          {folder.title}
                        </td>
                        <td className={`px-6 py-3 rounded-r-lg ${folder.files.length === 0 ? "text-red-600 italic font-medium" : "text-gray-700"}`}>
                          {folder.files.length > 0 ? folder.files.join(", ") : "Empty"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>

          )}
        </main>
      </div>
    </div>
  );
};

export default FolderManagerPage;
