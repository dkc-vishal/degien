"use client";
import React, { useState } from "react";
import {
  Menu,
  UserCircle,
  Home,
  Shirt,
  Store,
  LayoutGrid,
  List,
} from "lucide-react";

const styleCards = [
  {
    styleName: "Classic Polo Shirt",
    styleNumber: "ST-11023",
    vendor: "ABC Garments",
  },
  {
    styleName: "Denim Jacket",
    styleNumber: "DJ-54210",
    vendor: "XYZ Fashions",
  },
  {
    styleName: "Summer T-Shirt",
    styleNumber: "TS-77891",
    vendor: "CoolWear Inc.",
  },
  {
    styleName: "Formal Trousers",
    styleNumber: "FT-90112",
    vendor: "TailorPro",
  },
  {
    styleName: "Winter Hoodie",
    styleNumber: "WH-34215",
    vendor: "Urban Layers",
  },
  {
    styleName: "Kids Romper",
    styleNumber: "KR-66321",
    vendor: "LittleStars",
  },
  {
    styleName: "Athletic Shorts",
    styleNumber: "AS-55118",
    vendor: "Sportify",
  },
  {
    styleName: "Linen Shirt",
    styleNumber: "LS-88433",
    vendor: "EcoStyle",
  },
];

const StyleCard = ({
  styleName,
  styleNumber,
  vendor,
}: {
  styleName: string;
  styleNumber: string;
  vendor: string;
}) => (
  <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
    <h3 className="text-xl font-bold text-purple-700 mb-2">{styleName}</h3>
    <p className="text-gray-500 text-sm">Style Number</p>
    <p className="text-gray-800 font-semibold">{styleNumber}</p>
    <p className="text-gray-500 text-sm mt-2">Vendor</p>
    <p className="text-gray-800 font-semibold">{vendor}</p>
  </div>
);

const StyleListRow = ({
  styleName,
  styleNumber,
  vendor,
}: {
  styleName: string;
  styleNumber: string;
  vendor: string;
}) => (
  <tr className="hover:bg-gray-50 border-b">
    <td className="px-4 py-2">{styleName}</td>
    <td className="px-4 py-2">{styleNumber}</td>
    <td className="px-4 py-2">{vendor}</td>
  </tr>
);

const StyleDetailsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md fixed h-full top-0 left-0 z-10 p-6">
        <div className="text-2xl font-bold text-purple-700 mb-8">MyApp</div>
        <nav className="space-y-4 text-gray-700">
          <a href="#" className="flex items-center gap-2 hover:text-purple-600">
            <Home className="w-5 h-5" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-purple-600">
            <Shirt className="w-5 h-5" />
            Styles
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-purple-600">
            <Store className="w-5 h-5" />
            Vendors
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Menu className="w-6 h-6 text-gray-600" />
            <h1 className="text-xl font-semibold text-gray-800">Style Dashboard</h1>
          </div>
          <UserCircle className="w-8 h-8 text-purple-600" />
        </header>

        {/* Content */}
        <main className="p-8">
          {/* Toggle Button in Body */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-purple-800">
              Style {viewMode === "card" ? "Cards" : "List"}
            </h2>
            <button
              onClick={() =>
                setViewMode((prev) => (prev === "card" ? "list" : "card"))
              }
              className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-2 rounded-full"
              title="Toggle View"
            >
              {viewMode === "card" ? (
                <List className="w-5 h-5" />
              ) : (
                <LayoutGrid className="w-5 h-5" />
              )}
            </button>
          </div>

          {viewMode === "card" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {styleCards.map((style, index) => (
                <StyleCard
                  key={index}
                  styleName={style.styleName}
                  styleNumber={style.styleNumber}
                  vendor={style.vendor}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-auto">
              <table className="min-w-full text-left text-sm text-gray-600">
                <thead className="bg-purple-100 text-purple-800">
                  <tr>
                    <th className="px-4 py-3">Style Name</th>
                    <th className="px-4 py-3">Style Number</th>
                    <th className="px-4 py-3">Vendor</th>
                  </tr>
                </thead>
                <tbody>
                  {styleCards.map((style, index) => (
                    <StyleListRow
                      key={index}
                      styleName={style.styleName}
                      styleNumber={style.styleNumber}
                      vendor={style.vendor}
                    />
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

export default StyleDetailsPage;
