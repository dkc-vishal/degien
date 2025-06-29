"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import AddStyleModal from "@/components/core/AddStyleModal";
import { useRouter } from "next/navigation";


// Sample styles (same as before or fetched)
const styleCards = [
  { styleName: "Classic Polo Shirt", image: "/images/classic-polo-shirt.jpg" },
  { styleName: "Denim Jacket", image: "/images/denim-jacket.jpg" },
  { styleName: "Summer T-Shirt", image: "" },
  { styleName: "Formal Trousers", image: "/images/formal-trousers.jpg" },
  { styleName: "Winter Hoodie", image: "/images/winter-hoodie.jpg" },
  { styleName: "Kids Romper", image: "/images/kids-romper.jpg" },
  { styleName: "Athletic Shorts", image: "/images/athletic-shorts.jpg" },
  { styleName: "Linen Shirt", image: "/images/linen-shirt.jpg" },
];

const StyleCard = ({ styleName, image, onClick }) => (
  <div
    onClick={onClick}
    className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-100 hover:border-blue-400 hover:shadow-md transition duration-200 transform hover:-translate-y-1 cursor-pointer w-[250px] h-[200px] mb-8"
  >
    <div className="px-3 pt-2 pb-1 text-[18px] font-extrabold text-gray-800 border-b border-gray-100 h-[56px] flex items-center justify-center leading-tight overflow-hidden whitespace-nowrap truncate">
      {styleName}
    </div>

    <div className="w-[140px] h-[120px] mx-auto mt-2 flex items-center justify-center">
      {image ? (
        <img src={image} alt={styleName} className="w-[140px] h-[120px] object-cover" />
      ) : (
        <span className="italic text-red-600 font-semibold text-sm text-center">No Image Uploaded!</span>
      )}
    </div>
  </div>
);

const SamplingStyles: React.FC = () => {

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleCardClick = (styleName: string) => {
    const kebab = styleName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    router.push(`/sampling-styles/${kebab}`);
  };

  return (
    <div className="w-full px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Sampling Styles</h2>

        <div className="flex items-center gap-4 mr-30">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1 px-4 py-1.5 bg-blue-400 hover:bg-white hover:text-blue-400 text-white text-lg rounded-md transition cursor-pointer border border-transparent shadow-md hover:border-blue-400"
          >
            <Plus className="w-6 h-6" />
            Create New Style
          </button>
        </div>
      </div>

      {/* Grid of Style Cards */}
      <div className="flex flex-wrap gap-12 justify-center mt-9">
        {styleCards.map((style, index) => (
          <StyleCard
            key={index} 
            {...style}
            onclick={() => handleCardClick(style.styleName)}
            className="cursor-pointer hover:scale-105 transition-transform duration-200"
          />
        ))}
      </div>

      {/* Modal */}
      {showModal && <AddStyleModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default SamplingStyles;
