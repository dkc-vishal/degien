"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaFolderOpen } from "react-icons/fa";
import { use } from "react";

// Dummy data

const orders = [
  { name: "NS Blake Thermal", id: "ns-blake-thermal", quantity: 180 },
  { name: "Naval", id: "naval", quantity: 220 },
];
const master = { name: "Master", id: "master", quantity: 400 };

// Convert kebab-case to Title Case

const convertKebabToTitle = (str: string) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const VendorPage = ({ params }: { params: { style: string } }) => {

  const router = useRouter();
  const { style } = use(params);
  const styleTitle = convertKebabToTitle(style);

  const handleVendorClick = (orderId: string) => {
    router.push(`/production-styles/${style}/${orderId}`);
  };

  const FolderCard = ({
    name,
    id,
    quantity,
    contains,
  }: {
    name: string;
    id: string;
    quantity: number;
    contains?: string[];
  }) => {
    const isMaster = id === "master";

    return (
      <div
        onClick={() => handleVendorClick(id)}
        className={`cursor-pointer w-[300px] min-h-[220px] border rounded-xl shadow-sm transition-all 
        flex flex-col px-5 py-4 relative
        ${isMaster
            ? "bg-white border-blue-300 hover:ring-2 hover:ring-blue-300"
            : "bg-yellow-50 border-gray-200 hover:ring-2 hover:ring-yellow-300"}`}
      >
        {/* Folder Name */}
        <div className="text-lg font-bold text-gray-800 text-center">{name}</div>

        {/* Master layout with subfolders */}
        {isMaster && contains ? (
          <>
            <div className="flex justify-center items-start gap-4 mt-4 mb-3">
              {contains.map((sub, idx) => (
                <div
                  key={idx}
                  className="bg-blue-400 rounded-md px-4 py-3 flex flex-col items-center gap-1 w-[140px] h-[100px] shadow-sm"
                >
                  <FaFolderOpen className="text-white w-6 h-6" />
                  <div className="text-sm text-white font-bold text-center leading-tight">
                    {sub}
                  </div>
                </div>
              ))}
            </div>

          </>

        ) : (
          // Regular Folder icon for orders
          <div className="flex justify-center mt-7 mb-4">
            <FaFolderOpen className="text-yellow-500 text-7xl" />
          </div>
        )}

        {/* Quantity Display */}
        <div
          className={`absolute text-sm font-semibold text-gray-700 ${isMaster
            ? "bottom-3 right-4"
            : "bottom-2 left-3"
            }`}
        >
          <span className="font-bold">{isMaster ? "Total Style Qty:" : "Order Qty:"}</span> {quantity}
        </div>
      </div>
    );
  };

  return (
    <div className="px-9 py-8">
      {/* Style Title */}
      <h2 className="text-xl font-bold text-gray-900 mb-8">{styleTitle}</h2>

      {/* Master Folder */}
      <div className="mb-6">
        <FolderCard
          {...master}
          contains={["Production Watchpoint", "Tech Spec"]}
        />
      </div>

      <hr className="my-6 border-gray-300" />

      {/* Orders Section */}
      <h2 className="text-xl font-semibold mt-8 mb-8">Orders</h2>
      <div className="flex flex-wrap gap-6">
        {orders.map((order) => (
          <FolderCard key={order.id} {...order} />
        ))}
      </div>
    </div>
  );
};

export default VendorPage;
