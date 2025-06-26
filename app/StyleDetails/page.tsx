"use client";
import React, { useState } from "react";
import { LayoutGrid, List } from "lucide-react";

const styleCards = [
  { styleName: "Classic Polo Shirt", styleNumber: "ST-11023", vendor: "ABC Garments" },
  { styleName: "Denim Jacket", styleNumber: "DJ-54210", vendor: "XYZ Fashions" },
  { styleName: "Summer T-Shirt", styleNumber: "TS-77891", vendor: "CoolWear Inc." },
  { styleName: "Formal Trousers", styleNumber: "FT-90112", vendor: "TailorPro" },
  { styleName: "Winter Hoodie", styleNumber: "WH-34215", vendor: "Urban Layers" },
  { styleName: "Kids Romper", styleNumber: "KR-66321", vendor: "LittleStars" },
  { styleName: "Athletic Shorts", styleNumber: "AS-55118", vendor: "Sportify" },
  { styleName: "Linen Shirt", styleNumber: "LS-88433", vendor: "EcoStyle" },
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
  <div className="p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-200">
    <h3 className="text-lg font-bold text-purple-700 mb-1">{styleName}</h3>
    <p className="text-gray-500 text-sm">Style Number</p>
    <p className="text-gray-700 font-medium">{styleNumber}</p>
    <p className="text-gray-500 text-sm mt-3">Vendor</p>
    <p className="text-gray-700 font-medium">{vendor}</p>
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
    <td className="px-6 py-3">{styleName}</td>
    <td className="px-6 py-3">{styleNumber}</td>
    <td className="px-6 py-3">{vendor}</td>
  </tr>
);

const StyleDetailsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 px-4">
      <div className="w-full max-w-7xl bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-purple-800">
            Style {viewMode === "card" ? "Cards" : "List"}
          </h2>
          <button
            onClick={() => setViewMode((prev) => (prev === "card" ? "list" : "card"))}
            className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-2 rounded-full transition"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm text-left text-gray-600 rounded-xl overflow-hidden shadow">
              <thead className="bg-purple-100 text-purple-800">
                <tr>
                  <th className="px-6 py-3">Style Name</th>
                  <th className="px-6 py-3">Style Number</th>
                  <th className="px-6 py-3">Vendor</th>
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
      </div>
    </div>
  );
};

export default StyleDetailsPage;
