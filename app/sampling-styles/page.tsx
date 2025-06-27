"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import AddStyleModal from "@/components/core/AddStyleModal";

const ProductionStylesPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Sampling Styles</h2>

        <div className="flex items-center gap-4 mr-30">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1 px-4 py-1.5 bg-blue-400 hover:bg-blue-500 text-white text-sm rounded-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Style
          </button>
        </div>
      </div>

      {/* Your other page content here */}

      {/* Modal */}
      {showModal && <AddStyleModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ProductionStylesPage;
