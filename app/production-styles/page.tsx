"use client";
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateStyleModal from "@/components/core/CreateStyleModal";

const StyleCard = ({ styleName, image, order, quantity, onClick }) => (
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

    {/* Order & Qty */}
    <div className="pl-6 mt-6 text-base text-gray-700 font-semibold space-y-1">
      <div>Order: {order}</div>
      <div>Qty: {quantity}</div>
    </div>
  </div>
);

const ProductionStyles = () => {

  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchStyles = async () => {
      setLoading(true);
      const mockData = [
        { styleName: "Raya Bandana", image: "/images/raya-bandana.webp", order: 4000, quantity: 1800 },
        { styleName: "Blake Thermal", image: "/images/blake-thermal.jpg", order: 3500, quantity: 1600 },
        { styleName: "Pixie Cardi", image: "/images/Pixie_Cardi.webp", order: 5200, quantity: 2400 },
        { styleName: "Brynn Maxi Skirt", image: "/images/Brynn_Maxi_Skirt.webp", order: 3100, quantity: 1400 },
        { styleName: "Cedar Jacket", image: "/images/Cedar_Jacket.avif", order: 4500, quantity: 2100 },
        { styleName: "Kaiden Pant", image: "/images/kaiden-pant.webp", order: 3900, quantity: 1700 },
        { styleName: "Luna Cardi", image: "/images/Luna_Cardi.webp", order: 4800, quantity: 2200 }
      ];
      setTimeout(() => {
        setStyles(mockData);
        setLoading(false);
      }, 500);
    };

    fetchStyles();
  }, []);

  const handleCreateStyle = (styleName) => {
    const newStyle = {
      styleName,
      image: "",
      order: 0,
      quantity: 0,
    };
    setStyles((prev) => [...prev, newStyle]);
    setShowCreateModal(false);
  };

  const handleCardClick = (styleName) => {
    const kebab = styleName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    router.push(`/production-styles/${kebab}`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 px-8 py-10">
      <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800">Production Styles</h2>
        <div className="flex items-center gap-6 mr-32">
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-400 hover:bg-white hover:text-blue-400 text-white text-lg rounded-md transition cursor-pointer border border-transparent shadow-md hover:border-blue-400"
          >
            <Plus className="w-6 h-6" />
            Create New Style
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-9 mt-9">
        {styles.map((style, index) => (
          <StyleCard key={index} {...style} onClick={() => handleCardClick(style.styleName)} />
        ))}
      </div>

      {showCreateModal && (
        <CreateStyleModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateStyle}
        />
      )}
    </div>
  );
};

export default ProductionStyles;
