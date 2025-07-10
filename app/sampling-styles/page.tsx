"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import AddStyleModal from "@/components/core/AddStyleModal";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/core/PageHeader";

type StyleType = {
  styleName: string;
  image: string;
};

type StyleCardProps = {
  styleName: string;
  image: string;
  onClick: () => void;
};

const StyleCard: React.FC<StyleCardProps> = ({ styleName, image, onClick }) => (
  <div
    onClick={onClick}
    className="flex flex-col bg-white rounded-[2px] shadow-sm border border-gray-100 hover:border-blue-400 hover:shadow-md cursor-pointer w-[340px] h-[370px] mb-1"
  >
    {/* Style Name */}
    <div className="px-3 pt-2 pb-1 text-[20px] font-extrabold text-gray-800 border-b border-gray-100 h-[60px] flex items-center justify-center leading-tight overflow-hidden whitespace-nowrap truncate line-clamp-1">
      {styleName}
    </div>

    {/* Image or No Image Placeholder */}
    <div className="w-[270px] h-[210px] mx-auto mt-4 flex items-center justify-center">
      {image ? (
        <img
          src={image}
          alt={styleName}
          className="w-full h-full object-cover rounded-[2px]"
        />
      ) : (
        <span className="italic text-red-600 font-semibold text-sm text-center">
          No Image Uploaded!
        </span>
      )}
    </div>
  </div>
);

const SamplingStyles: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [styles, setStyles] = useState<StyleType[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleCardClick = (styleName: string) => {
    const kebab = styleName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    router.push(`/sampling-styles/${kebab}`);
  };

  useEffect(() => {
    // simulate API call
    const fetchStyles = async () => {
      setLoading(true);
      const mockData = [
        { styleName: "Raya Bandana", image: "/images/raya-bandana.webp" },
        { styleName: "Blake Thermal", image: "/images/blake-thermal.jpg" },
        { styleName: "Pixie Cardi", image: "/images/Pixie_Cardi.webp" },
        { styleName: "Brynn Maxi Skirt", image: "/images/Brynn_Maxi_Skirt.webp" },
        { styleName: "Cedar Jacket", image: "/images/Cedar_Jacket.avif" },
        { styleName: "Kaiden Pant", image: "/images/kaiden-pant.webp" },
        { styleName: "Luna Cardi", image: "/images/Luna_Cardi.webp" }
      ];
      setTimeout(() => {
        setStyles(mockData);
        setLoading(false);
      }, 500);
    };

    fetchStyles();
  }, []);

  return (
    <div className="w-full px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
        <PageHeader breadcrumb="Sampling Styles" />
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

      {!loading && styles.length === 0 && (
        <p className="text-center text-red-500 mt-10">
          No styles available. Make sure API is working.
        </p>
      )}

      {/* Grid of Style Cards */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[70vh] w-full">
          <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-9 mt-9">
          {styles.map((style, index) => (
            <StyleCard
              key={index}
              {...style}
              onClick={() => handleCardClick(style.styleName)}
            />
          ))}
        </div>
      )}

      {/* Modal to add new style */}
      {showModal && (
        <AddStyleModal
          onClose={() => setShowModal(false)}
          onAddStyle={(newStyle) => setStyles((prev) => [...prev, newStyle])}
        />
      )}
    </div>
  );
};

export default SamplingStyles;
