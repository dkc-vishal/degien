"use client";
import React, { useState } from "react";
import { LayoutGrid, List, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateStyleModal from "@/components/core/CreateStyleModal";

const styleCards = [
  { styleName: "Classic Polo Shirt", image: "/images/classic-polo-shirt.jpg", order: 5000, quantity: 2300 },
  { styleName: "Denim Jacket", image: "/images/denim-jacket.jpg", order: 4200, quantity: 1800 },
  { styleName: "Summer T-Shirt", image: "", order: 6000, quantity: 3200 },
  { styleName: "Formal Trousers", image: "/images/formal-trousers.jpg", order: 3500, quantity: 1500 },
  { styleName: "Winter Hoodie", image: "/images/winter-hoodie.jpg", order: 4800, quantity: 2400 },
  { styleName: "Kids Romper", image: "/images/kids-romper.jpg", order: 2000, quantity: 800 },
  { styleName: "Athletic Shorts", image: "/images/athletic-shorts.jpg", order: 3000, quantity: 1000 },
  { styleName: "Linen Shirt", image: "/images/linen-shirt.jpg", order: 2700, quantity: 1200 },
];

const StyleCard = ({ styleName, image, order, quantity, onClick }) => (
  <div
    onClick={onClick}
    className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-100 hover:border-blue-400 hover:shadow-md transition duration-200 transform hover:-translate-y-1 cursor-pointer w-[250px] h-[260px] mb-8"
  >
    {/* Style Name */}
    <div className="px-3 pt-2 pb-1 text-[18px] font-extrabold text-gray-800 border-b border-gray-100 h-[56px] flex items-center justify-center leading-tight overflow-hidden whitespace-nowrap truncate line-clamp-1">
      {styleName}
    </div>

    {/* Image or No Image Placeholder */}
    <div className="w-[140px] h-[120px] mx-auto mt-2 flex items-center justify-center">
      {image ? (
        <img
          src={image}
          alt={styleName}
          className="w-[140px] h-[120px] object-cover"
        />
      ) : (
        <span className="italic text-red-600 font-semibold text-sm text-center">
          No Image Uploaded!
        </span>
      )}
    </div>

    {/* Order & Qty */}
    <div className="pl-4 mt-4 text-sm text-gray-700 font-semibold">
      <div>Order: {order}</div>
      <div>Qty: {quantity}</div>
    </div>
  </div>
);

const ProductionStyles = () => {

  const [viewMode, setViewMode] = useState("card");
  const router = useRouter();
  
  // create new style modal state 

  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateStyle = (newStyleName: string) => {
    console.log("New Style Created:", newStyleName);
    setShowCreateModal(false);
  }

  const handleCardClick = (styleName) => {
    const kebab = styleName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    router.push(`/production-styles/${kebab}`);
  };

  return (
    <div className="w-full px-6 py-8">
      <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Styles</h2>
        <div className="flex items-center gap-8 mr-32">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-1 px-4 py-1.5 bg-blue-400 hover:bg-white hover:text-blue-400 text-white text-lg rounded-md transition cursor-pointer border border-transparent shadow-md hover:border-blue-400"
          >
            <Plus className="w-6 h-6" />
            Create New Style
          </button>
          <button
            onClick={() => setViewMode(viewMode === "card" ? "list" : "card")}
            className="bg-blue-100 hover:bg-blue-500 text-blue-400 p-2 rounded-full transition cursor-pointer hover:text-white"
            aria-label="Toggle View"
            title="Toggle View"
          >
            {viewMode === "card" ? <List className="w-5 h-5" /> : <LayoutGrid className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {viewMode === "card" ? (
        <div className="flex flex-wrap gap-12 justify-center mt-9">
          {styleCards.map((style, index) => (
            <StyleCard key={index} {...style} onClick={() => handleCardClick(style.styleName)} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white rounded-xl shadow-sm text-sm">
            <thead className="bg-blue-50 text-blue-700">
              <tr className="text-center font-medium">
                <th className="px-6 py-3">Style Name</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3">Quantity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {styleCards.map((style, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50 text-center transition-all cursor-pointer"
                  onClick={() => handleCardClick(style.styleName)}
                >
                  <td className="px-6 py-4 font-medium text-gray-800">{style.styleName}</td>
                  <td className="px-6 py-4">
                    {style.image ? (
                      <img
                        src={style.image}
                        alt={style.styleName}
                        className="w-14 h-14 object-cover rounded-md mx-auto"
                      />
                    ) : (
                      <span className="text-red-600 font-bold">No Image Uploaded!</span>
                    )}
                  </td>
                  <td className="px-6 py-4">{style.order}</td>
                  <td className="px-6 py-4">{style.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create new style modal */}

      {
        showCreateModal && (
          <CreateStyleModal
            onClose={() => setShowCreateModal(false)}
            onCreate={handleCreateStyle}
          />
        )
      }

    </div>
  );
};

export default ProductionStyles;
