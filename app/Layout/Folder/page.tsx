"use client";
import React, { useState } from "react";
import { GiClothes } from "react-icons/gi";
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

const navLinks = [
  { name: "Dashboard", href: "#" },
  { name: "Users", href: "/Layout/UserDetails" },
  { name: "Register", href: "/Layout/Resistation" },
  { name: "Login", href: "/Layout/Login" },
  { name: "Change Password", href: "/Layout/ChangePassword" },
];

const FolderManagerPage: React.FC = () => {
  const [folders, setFolders] = useState<FolderCard[]>(initialFolders);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen min-w-full flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col min-h-screen">
        <div className="p-4.5 border-b">
          <span className="text-xl font-bold text-purple-700">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block px-4 py-2 rounded hover:bg-purple-100 text-gray-700 font-medium"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="w-full bg-white shadow flex items-center justify-between px-8 py-4">
          <span className="text-lg font-semibold text-purple-700">
            Folder Management
          </span>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Admin</span>
            <img
              src="/public/globe.svg"
              alt="avatar"
              className="w-8 h-8 rounded-full bg-purple-200"
            />
          </div>
        </header>

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
                  className={`relative rounded-xl border shadow-sm hover:shadow-lg transition-all duration-200 p-4 h-[250px] bg-white ${
                    folder.highlight
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {folder.title}
                    </h3>
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center h-full -translate-y-4">
                    {folder.files.length > 0 ? (
                      <span className="text-lg flex gap-2 items-center font-bold text-gray-600 truncate">
                        <GiClothes className="w-20 h-20" />
                      </span>
                    ) : (
                      <span className="text-2xl font-bold italic text-gray-600">
                        Empty
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white shadow rounded-xl overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-purple-100 text-purple-800">
                  <tr>
                    <th className="px-4 py-3">Folder Title</th>
                    <th className="px-4 py-3">Files</th>
                  </tr>
                </thead>
                <tbody>
                  {folders.map((folder) => (
                    <tr
                      key={folder.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-2 font-medium">{folder.title}</td>
                      <td className="px-4 py-2">
                        {folder.files.length > 0
                          ? folder.files.join(", ")
                          : "Empty"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FolderManagerPage;
